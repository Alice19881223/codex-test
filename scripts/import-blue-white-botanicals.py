"""Import the reviewed blue-and-white botanical candle pairs into Chinese Artistry.

Usage: python3 scripts/import-blue-white-botanicals.py /path/to/中国风.zip
"""
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES = 'Blue & White Botanicals'
MAHJONG_SERIES = 'Mahjong Stories'
COLLECTION_SLUG = 'chinese-style'

# product image, packaging image, name, scent, description
DESIGNS = [
    ('兰纳维蓝白瓷香薰蜡烛-4.png', '青花植物纹香薰蜡烛礼盒-10.png', 'Blue Willow Arch',
     'osmanthus-green-tea',
     'Cobalt willow leaves rise in a graceful arch across ivory porcelain, balancing open space with fine botanical movement. Osmanthus & Green Tea gives the blue-and-white design a luminous floral-tea direction.'),
    ('奢华青花蓝莲香薰蜡烛-2.png', '蓝莲瓷蜡烛与礼盒-9.png', 'Lotus Medallion',
     'incense-myrrh',
     'A single blue lotus is framed by a delicate botanical wreath, recalling the symmetry of painted porcelain medallions. Incense & Myrrh adds a quiet resinous depth to the contemplative floral motif.'),
    ('蓝枝青花兰纳薇蜡烛-6.png', '蓝绘瓷蜡烛与礼盒-13.png', 'Cobalt Branch',
     'green-tea-cedarwood',
     'A hand-painted cobalt flower rises from a low border of leaves on clean ivory ceramic. Green Tea & Cedarwood supports the poised composition with fresh tea and polished wood.'),
    ('蓝白花卉瓷罐香氛蜡烛-3.png', '蓝花瓷香薰与奢华礼盒-11.png', 'Porcelain Garden',
     'oud-saffron',
     'Layered blue flowers and fine leafy stems form an abundant garden across the porcelain surface. Oud & Saffron brings warm woods and subtle spice to its richly detailed blue-and-white character.'),
    ('青叶瓷韵香薰蜡烛-1.png', '青玉叶香薰蜡烛与配套礼盒-8.png', 'Jade Leaf Rhythm',
     'mugwort-incense',
     'Rows of elongated blue-green leaves create a rhythmic border inspired by stylised porcelain decoration. Mugwort & Incense gives the graphic pattern an aromatic herbal and softly smoky tone.'),
    ('青花墨韵香氛蜡烛-7.png', '蓝花瓷香薰蜡烛礼盒-14.png', 'Ink Lotus',
     'black-tea-cedarwood',
     'A deep cobalt lotus opens among expressive ink-like leaves, translating brushwork into a contemporary porcelain candle. Black Tea & Cedarwood echoes the dark blue detail with dry tea and elegant woods.'),
    ('青花瓷蓝花香薰蜡烛-5.png', '蓝花瓷香薰蜡烛礼盒-12.png', 'Cobalt Blossom',
     'osmanthus-green-tea',
     'A single cobalt blossom and slender leaves create a calm blue-and-white composition with generous ivory space. Osmanthus & Green Tea adds a light floral sweetness and refined tea freshness.'),
]

BLUE_EXISTING_KEYS = ['Blue & White Landscapes | Blue & White Landscape Candle']
PANDA_BAMBOO_KEYS = [
    'Little Dreamers | Panda Slumber',
    'Bamboo Grove | Golden Bamboo Ripple',
    'Bamboo Grove | Sage Bamboo Ripple',
]
GAIWAN_KEYS = [
    'Botanical Teacups | Plum Blossom Teacup',
    'Botanical Teacups | Orchid Teacup',
    'Botanical Teacups | Bamboo Teacup',
    'Botanical Teacups | Chrysanthemum Teacup',
]

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    assert len(sys.argv) == 2, 'Pass 中国风.zip'
    products = read('candle-products.json')
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')
    collections = read('candle-collections.json')

    previous = [p for p in products if p['series'] == SERIES]
    previous_images = {p['image'] for p in previous}
    previous_keys = {p['series'] + ' | ' + p['name'] for p in previous}
    for product in previous:
        ref = item_no('candle', product['image'])
        assignments.pop(ref, None)
        identities.setdefault('candle', {}).pop(product['image'], None)
        display.pop(product['image'], None)
    products = [p for p in products if p['series'] != SERIES]
    for profile in scents:
        profile['matches'] = [m for m in profile['matches']
                              if not (m['category'] == 'candle' and m['image'] in previous_images)]

    folder = ROOT / 'assets/candles/blue-white-botanicals'
    folder.mkdir(parents=True, exist_ok=True)
    added, sources = [], []
    with zipfile.ZipFile(sys.argv[1]) as archive:
        members = {Path(member).name: member for member in archive.namelist()
                   if member.lower().endswith(('.png', '.jpg', '.jpeg'))
                   and not member.startswith('__MACOSX/')}

        def image(filename, role):
            data = archive.read(members[filename])
            digest = hashlib.sha256(data).hexdigest()
            im = ImageOps.exif_transpose(Image.open(BytesIO(data))).convert('RGB')
            im.thumbnail((1400, 1400))
            dest = folder / (digest[:20] + '.webp')
            im.save(dest, 'WEBP', quality=90, method=6)
            src = dest.relative_to(ROOT).as_posix()
            width, height = im.size
            entry = {'width': width, 'height': height, 'sourceBytes': len(data), 'src': src, 'variants': []}
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

        for product_file, box_file, name, scent, description in DESIGNS:
            assert 'Oriental Mystery' in next(profile for profile in scents if profile['id'] == scent)['themes']
            src = image(product_file, 'product')
            packaging = image(box_file, 'packaging')
            ref = item_no('candle', src)
            identities.setdefault('candle', {})[src] = ref
            product = {
                'id': 'blue-white-botanical-' + Path(src).stem,
                'name': name,
                'series': SERIES,
                'productType': 'Scented candle',
                'image': src,
                'packagingImage': packaging,
                'images': [src, packaging],
                'assignedScent': scent,
                'designDescription': description + ' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.',
            }
            products.append(product)
            added.append(product)
            display[src] = {'palette': 'blue'}
            assignments[ref] = {'scent': scent,
                                'basis': 'Oriental Mystery pairing for the supplied blue-and-white porcelain botanical design.'}
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': 'candle', 'image': src, 'name': name, 'series': SERIES
            })

    mahjong_keys = [p['series'] + ' | ' + p['name'] for p in products if p['series'] == MAHJONG_SERIES]
    blue_keys = [p['series'] + ' | ' + p['name'] for p in added]
    collection_keys = mahjong_keys + BLUE_EXISTING_KEYS + blue_keys + PANDA_BAMBOO_KEYS + GAIWAN_KEYS
    claimed = previous_keys | set(collection_keys)
    for collection in collections:
        if collection['slug'] != COLLECTION_SLUG:
            collection['productKeys'] = [key for key in collection['productKeys'] if key not in claimed]
            collection['pages'] = [collection['productKeys'][i:i + 12]
                                   for i in range(0, len(collection['productKeys']), 12)]
    chinese = next(c for c in collections if c['slug'] == COLLECTION_SLUG)
    chinese['productKeys'] = collection_keys
    chinese['pages'] = [collection_keys[i:i + 12] for i in range(0, len(collection_keys), 12)]
    chinese['manualPageOrder'] = True

    manifest = {
        'sourceArchives': [Path(sys.argv[1]).name],
        'collection': COLLECTION_SLUG,
        'series': SERIES,
        'productCount': len(added),
        'imageCount': len(sources),
        'pairedCount': len(added),
        'products': added,
        'images': sources,
        'orderedSections': {
            'mahjong': mahjong_keys,
            'blueAndWhitePorcelain': BLUE_EXISTING_KEYS + blue_keys,
            'pandaAndBamboo': PANDA_BAMBOO_KEYS,
            'gaiwanTea': GAIWAN_KEYS,
        },
        'collectionCount': len(collection_keys),
        'fragranceRequirement': 'All seven new blue-and-white porcelain candles use Oriental Mystery fragrance profiles.',
    }
    for name, data in [
        ('candle-products.json', products), ('fragrances.json', scents),
        ('product-display.json', display), ('product-fragrances.json', assignments),
        ('image-manifest.json', media), ('product-identities.json', identities),
        ('candle-collections.json', collections),
        ('blue-white-botanicals-source-manifest.json', manifest),
    ]:
        write(name, data)
    print(f'Imported {len(added)} blue-and-white porcelain candles and ordered {len(collection_keys)} Chinese Artistry designs.')

if __name__ == '__main__':
    main()
