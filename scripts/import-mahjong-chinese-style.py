"""Import the reviewed Mahjong candle pairs and build the 中国风 collection.

Usage: python3 scripts/import-mahjong-chinese-style.py /path/to/麻将系列.zip
"""
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES = 'Mahjong Stories'
COLLECTION_SLUG = 'chinese-style'

# product image, packaging image, name, scent, palette, description
DESIGNS = [
    ('fortune-product.png', 'fortune-packaging.png', 'Fortune Tile', 'osmanthus-green-tea', 'blue',
     'The blue 發 tile is a traditional symbol of prosperity, presented as a small ivory ceramic keepsake. Osmanthus & Green Tea adds a graceful floral-tea character inspired by an unhurried gathering.'),
    ('一圈麻将香氛蜡烛-2.png', '象牙白麻将香氛礼盒-8.png', 'One Circle', 'green-tea-cedarwood', 'blue',
     'The colourful one-circle tile becomes a precise enamel-like motif on softly formed ivory ceramic. Green Tea & Cedarwood balances its graphic detail with calm tea leaves and polished wood.'),
    ('东字麻将香薰蜡烛.png', '麻将灵感象牙香薰蜡烛礼盒-4.png', 'East Wind', 'mugwort-incense', 'sage',
     'A deep green East Wind tile gives the ivory vessel a bold, auspicious focal point. Mugwort & Incense brings an aromatic herbal and softly smoky direction to the traditional character.'),
    ('象牙陶瓷双竹麻将蜡烛-2.png', '双竹香氛蜡烛与麻将纹礼盒-3.png', 'Two Bamboo', 'bamboo-white-florals', 'sage',
     'Two slender bamboo forms create a crisp green-and-blue Mahjong emblem on tactile ivory ceramic. Bamboo & White Florals mirrors the motif with fresh stems and luminous petals.'),
    ('白龙麻将香薰蜡烛.png', '白龙纹香氛蜡烛礼盒-6.png', 'White Dragon', 'white-tea-bergamot', 'blue',
     'The restrained blue frame of the White Dragon tile celebrates the beauty of open space and balance. White Tea & Bergamot keeps the composition clear, refined and quietly radiant.'),
    ('红龙中牌香氛蜡烛.png', '红龙香氛蜡烛礼盒-5.png', 'Red Dragon', 'pomegranate-amber', 'burgundy',
     'The vermilion 中 tile gives the ivory candle a confident festive accent associated with good fortune. Pomegranate & Amber adds juicy red fruit and a warm, glowing base.'),
    ('翡翠雀牌香氛蜡烛.png', '象牙香氛蜡烛与竹雀礼盒-7.png', 'Bamboo Sparrow', 'bamboo-white-florals', 'sage',
     'A green sparrow, the classic one-bamboo Mahjong motif, is drawn with fine red and blue detail. Bamboo & White Florals gives this lively emblem a fresh garden-air character.'),
]

# Existing candle designs whose motifs clearly belong to the same visual story.
EXISTING_KEYS = [
    'Blue & White Landscapes | Blue & White Landscape Candle',
    'Little Dreamers | Panda Slumber',
    'Botanical Teacups | Plum Blossom Teacup',
    'Botanical Teacups | Orchid Teacup',
    'Botanical Teacups | Bamboo Teacup',
    'Botanical Teacups | Chrysanthemum Teacup',
    'Bamboo Grove | Golden Bamboo Ripple',
    'Bamboo Grove | Sage Bamboo Ripple',
]
RELOCATIONS = {
    'Poetic Botanicals | Golden Midnight Bloom': 'close-to-you',
}

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    assert len(sys.argv) == 2, 'Pass 麻将系列.zip'
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

    folder = ROOT / 'assets/candles/mahjong'
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

        for product_file, box_file, name, scent, palette, description in DESIGNS:
            src = image(product_file, 'product')
            packaging = image(box_file, 'packaging')
            ref = item_no('candle', src)
            identities.setdefault('candle', {})[src] = ref
            product = {
                'id': 'mahjong-' + Path(src).stem,
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
            display[src] = {'palette': palette}
            assignments[ref] = {'scent': scent,
                                'basis': 'Suggested pairing based on the supplied Mahjong symbol, colour and Chinese cultural theme.'}
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': 'candle', 'image': src, 'name': name, 'series': SERIES
            })

    # Keep the new Mahjong story first, followed by the reviewed Chinese-style archive edit.
    new_keys = [p['series'] + ' | ' + p['name'] for p in added]
    claimed = previous_keys | set(EXISTING_KEYS) | set(RELOCATIONS)
    for collection in collections:
        collection['productKeys'] = [key for key in collection['productKeys'] if key not in claimed]
        collection['pages'] = [collection['productKeys'][i:i + 12]
                               for i in range(0, len(collection['productKeys']), 12)]
    for relocated_key, target_slug in RELOCATIONS.items():
        target = next(c for c in collections if c['slug'] == target_slug)
        target['productKeys'].append(relocated_key)
        target['pages'] = [target['productKeys'][i:i + 12]
                           for i in range(0, len(target['productKeys']), 12)]
    chinese = next((c for c in collections if c['slug'] == COLLECTION_SLUG), None)
    collection_keys = new_keys + EXISTING_KEYS
    if chinese is None:
        chinese = {}
        collections.append(chinese)
    chinese.update({
        'slug': COLLECTION_SLUG,
        'name': 'Chinese Artistry',
        'description': 'Mahjong symbols, blue-and-white landscapes, the Four Gentlemen and bamboo forms bring Chinese visual culture into a refined candle collection, paired with tea, incense, woods and luminous florals.',
        'eyebrow': 'CHINESE ARTISTRY',
        'story': 'From the social ritual of a Mahjong table to blue-and-white porcelain and the symbolic plum, orchid, bamboo and chrysanthemum, each design translates a familiar Chinese motif into a contemporary object for the home.',
        'icon': 'chinese-style',
        'productKeys': collection_keys,
        'pages': [collection_keys[i:i + 12] for i in range(0, len(collection_keys), 12)],
        'manualPageOrder': True,
    })

    manifest = {
        'sourceArchives': [Path(sys.argv[1]).name],
        'collection': COLLECTION_SLUG,
        'series': SERIES,
        'productCount': len(added),
        'imageCount': len(sources),
        'pairedCount': len(added),
        'products': added,
        'images': sources,
        'integratedExistingKeys': EXISTING_KEYS,
        'relocations': RELOCATIONS,
        'collectionCount': len(collection_keys),
        'reviewNotes': 'All seven supplied Mahjong designs were visually reviewed and paired with their coordinated packaging photograph.',
    }
    for name, data in [
        ('candle-products.json', products), ('fragrances.json', scents),
        ('product-display.json', display), ('product-fragrances.json', assignments),
        ('image-manifest.json', media), ('product-identities.json', identities),
        ('candle-collections.json', collections), ('mahjong-source-manifest.json', manifest),
    ]:
        write(name, data)
    print(f'Imported {len(added)} Mahjong candles and assembled {len(collection_keys)} 中国风 designs.')

if __name__ == '__main__':
    main()
