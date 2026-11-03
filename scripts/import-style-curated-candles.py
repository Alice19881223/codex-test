"""Import six reviewed candle and packaging pairs into their matching collections.

Usage: python3 scripts/import-style-curated-candles.py /path/to/打包1.zip
"""
from io import BytesIO
from pathlib import Path
import hashlib
import json
import re
import runpy
import sys
import zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
PREFIXES = ('style-curated-candle-', 'style-curated-christmas-')

# category, product image, packaging image, name, series, collection, scent, palette, description
DESIGNS = [
    ('christmas', '戴圣诞帽的双雪人陶瓷蜡烛.png', 'Lanarve包装盒字样左移.png',
     'Snowman Friends Candle', 'Winter Blue Christmas', None, 'fir-cedarwood', 'blue',
     'Two smiling snowmen and a softly painted fir tree bring a gentle winter-blue character to this hand-finished ceramic candle. Fir & Cedarwood extends the snowy woodland mood with evergreen freshness and warm woods.'),
    ('candle', 'Lanarve海沫织纹香氛蜡烛.png', '水绿色香薰蜡烛与象牙礼盒.png',
     'Seafoam Woven Glass', 'Sea Glass', 'morning-light', 'sea-salt-driftwood', 'blue',
     'Fine seafoam, aqua and lilac threads wrap the glass in a woven textile effect that catches clear morning light. Sea Salt & Driftwood complements its airy coastal palette.'),
    ('candle', '青瓷飞鹤香氛蜡烛-1.png', '兰纳维青瓷仙鹤香薰礼盒-2.png',
     'Celadon Crane Flight', 'Celadon Flight', 'chinese-style', 'osmanthus-green-tea', 'sage',
     'White cranes cross a softly speckled celadon vessel in a quiet composition inspired by traditional Chinese decorative arts. Osmanthus & Green Tea adds a refined floral-tea freshness.'),
    ('candle', '黑银陶艺香氛蜡烛-1.png', '兰纳维黑银釉香薰礼盒-2.png',
     'Black Silver Stillness', 'Stone & Stillness', 'a-moment-of-quiet', 'fireside-smoked-woods', 'charcoal',
     'Layered black and silver glaze gives the rounded ceramic vessel the depth of smoke moving across a moonlit surface. Fireside & Smoked Woods reinforces its dark, contemplative character.'),
    ('candle', '渐变郁金香陶瓷香薰蜡烛.png', '郁金香蜡烛与无缝磁吸礼盒.png',
     'Blush Tulip Bloom', 'Chromatic Bloom', 'close-to-you', 'peony-lychee', 'blush',
     'Overlapping tulip petals rise in a blush-to-ivory gradient, turning the candle into a soft sculptural flower for thoughtful gifting. Peony & Lychee gives it a bright floral-fruit lift.'),
    ('candle', '黑猫条纹陶瓷香薰蜡烛.png', '黑猫蜡烛与极简礼盒.png',
     'Striped Black Cat', 'Little Companions', 'little-joys', 'pear-freesia', 'charcoal',
     'A curious black cat peeks from bold hand-painted stripes, giving the ceramic candle a playful illustrated personality. Pear & Freesia keeps the character light, cheerful and giftable.'),
]

ANCHORS = {
    'Seafoam Woven Glass': 'Sea Glass | Sea Glass Glow',
    'Celadon Crane Flight': 'Blue & White Botanicals | Cobalt Blossom',
    'Black Silver Stillness': 'Stone & Stillness | Ivory Stillness',
    'Blush Tulip Bloom': 'Chromatic Bloom | Blush Blossom',
    'Striped Black Cat': 'Little Companions | Corgi Cuddles',
}


def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())


def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def main():
    if len(sys.argv) != 2:
        raise SystemExit('Pass 打包1.zip')

    candle_products = read('candle-products.json')
    christmas_products = read('christmas-products.json')
    collections = read('candle-collections.json')
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')

    old = [(category, product) for category, products in
           (('candle', candle_products), ('christmas', christmas_products))
           for product in products if product.get('id', '').startswith(PREFIXES)]
    old_images = {(category, product['image']) for category, product in old}
    old_keys = {product['series'] + ' | ' + product['name'] for _, product in old}
    candle_products = [p for p in candle_products if not p.get('id', '').startswith(PREFIXES)]
    christmas_products = [p for p in christmas_products if not p.get('id', '').startswith(PREFIXES)]
    for category, product in old:
        identities.setdefault(category, {}).pop(product['image'], None)
        assignments.pop(item_no(category, product['image']), None)
        display.pop(product['image'], None)
    for profile in scents:
        profile['matches'] = [match for match in profile['matches']
                              if (match['category'], match['image']) not in old_images]
    for collection in collections:
        collection['productKeys'] = [key for key in collection['productKeys'] if key not in old_keys]

    folder = ROOT / 'assets/candles/style-curated'
    folder.mkdir(parents=True, exist_ok=True)
    added = []
    sources = []
    with zipfile.ZipFile(sys.argv[1]) as archive:
        members = {Path(member).name: member for member in archive.namelist()
                   if member.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
                   and not member.startswith('__MACOSX/')}
        expected = {filename for design in DESIGNS for filename in design[1:3]}
        assert expected <= set(members), f'Missing supplied files: {sorted(expected - set(members))}'

        def image(filename, role):
            data = archive.read(members[filename])
            digest = hashlib.sha256(data).hexdigest()
            im = ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB')
            im.thumbnail((1400, 1400))
            dest = folder / (digest[:20] + '.webp')
            im.save(dest, 'WEBP', quality=90, method=6)
            src = dest.relative_to(ROOT).as_posix()
            width, height = im.size
            entry = {'width': width, 'height': height, 'sourceBytes': len(data),
                     'src': src, 'variants': []}
            for variant_width in sorted({min(width, 480), min(width, 960), width}):
                variant = dest if variant_width == width else folder / (digest[:20] + f'-{variant_width}.webp')
                if variant_width != width:
                    small = im.copy()
                    small.thumbnail((variant_width, round(height * variant_width / width)), Image.Resampling.LANCZOS)
                    small.save(variant, 'WEBP', quality=88, method=4)
                entry['variants'].append({'src': variant.relative_to(ROOT).as_posix(),
                                          'width': variant_width, 'bytes': variant.stat().st_size})
            media[src] = entry
            sources.append({'sourceArchive': Path(sys.argv[1]).name, 'source': filename,
                            'role': role, 'sha256': digest, 'image': src,
                            'width': width, 'height': height})
            return src

        for category, product_file, box_file, name, series, collection, scent, palette, description in DESIGNS:
            src = image(product_file, 'product')
            packaging = image(box_file, 'packaging')
            identities.setdefault(category, {})[src] = item_no(category, src)
            product = {
                'id': ('style-curated-christmas-' if category == 'christmas' else 'style-curated-candle-') + Path(src).stem,
                'name': name,
                'series': series,
                'productType': 'Scented candle',
                'image': src,
                'packagingImage': packaging,
                'images': [src, packaging],
                'assignedScent': scent,
                'designDescription': description + ' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.',
            }
            (christmas_products if category == 'christmas' else candle_products).append(product)
            added.append({**product, 'category': category, 'collection': collection})
            display[src] = {'palette': palette}
            assignments[item_no(category, src)] = {
                'scent': scent,
                'basis': 'Suggested pairing based on the supplied vessel design, palette, theme and coordinated packaging.'
            }
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': category, 'image': src, 'name': name, 'series': series
            })

    for product in [p for p in added if p['category'] == 'candle']:
        collection = next(c for c in collections if c['slug'] == product['collection'])
        key = product['series'] + ' | ' + product['name']
        anchor = ANCHORS[product['name']]
        assert anchor in collection['productKeys'], f'Placement anchor missing: {anchor}'
        collection['productKeys'].insert(collection['productKeys'].index(anchor) + 1, key)
    for collection in collections:
        collection['pages'] = [collection['productKeys'][i:i + 12]
                               for i in range(0, len(collection['productKeys']), 12)]
        collection['manualPageOrder'] = True

    manifest = {
        'sourceArchive': Path(sys.argv[1]).name,
        'productCount': len(added),
        'imageCount': len(sources),
        'pairedCount': len(added),
        'products': added,
        'images': sources,
        'placements': {product['name']: product['collection'] or 'christmas/winter-blue'
                       for product in added},
        'reviewNotes': 'All six supplied designs were visually reviewed and paired with their coordinated packaging photographs.',
    }
    for name, data in [
        ('candle-products.json', candle_products),
        ('christmas-products.json', christmas_products),
        ('candle-collections.json', collections),
        ('fragrances.json', scents),
        ('product-display.json', display),
        ('product-fragrances.json', assignments),
        ('image-manifest.json', media),
        ('product-identities.json', identities),
        ('style-curated-candles-source-manifest.json', manifest),
    ]:
        write(name, data)

    runpy.run_path(str(ROOT / 'scripts/reorder-christmas-colours.py'), run_name='__main__')
    catalog = ROOT / 'catalog.js'
    text = catalog.read_text()
    blocks = {
        'candleProducts': candle_products,
        'christmasProducts': christmas_products,
    }
    for variable, products in blocks.items():
        text, count = re.subn(rf'const {variable} = \[.*?\n\];',
                              lambda match: f'const {variable} = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';',
                              text, count=1, flags=re.S)
        assert count == 1, f'Could not update {variable} in catalog.js'
    catalog.write_text(text)
    print('Imported six reviewed candle pairs into five core collections and Christmas.')


if __name__ == '__main__':
    main()
