"""Import reviewed gifting candles and the matching Sage Lace candle/diffuser.

Usage: python3 scripts/import-gift-and-sage-lace.py /path/to/打包2.zip /path/to/打包.zip
"""
from contextlib import ExitStack
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES = {'Together Pieces', 'Celebration Gardens', 'Sage Lace'}

# archive index, product image, packaging image, name, series, category, collection, scent, palette, description
DESIGNS = [
    (0, '酒红豆沙拼合香薰蜡烛双器-1.png', '兰纳维拼图双烛礼盒-2.png',
     'Pieces Together', 'Together Pieces', 'candle', 'close-to-you', 'sandalwood-cashmere', 'burgundy',
     'Two sculptural candle vessels in wine red and soft blush interlock like puzzle pieces, expressing closeness through a form designed to come together. Sandalwood & Cashmere adds a smooth, comforting warmth.'),
    (0, '新居花语香薰蜡烛-3.png', '新居香薰蜡烛礼盒-4.png',
     'Happy New Home', 'Celebration Gardens', 'candle', 'close-to-you', 'clean-cotton', 'ivory',
     'A welcoming little house sits among cheerful garden flowers with a handwritten new-home message. Clean Cotton suggests fresh rooms, sunlit windows and the calm beginning of a new chapter.'),
    (0, '生日花卉香薰蜡烛-1.png', '生日限定香氛蜡烛礼盒-2.png',
     'Birthday Flower Garden', 'Celebration Gardens', 'candle', 'little-joys', 'peony-lychee', 'blush',
     'Birthday candles and colourful flowers form a joyful illustrated garden around a handwritten greeting. Peony & Lychee gives the celebration a bright floral-fruit sparkle.'),
    (1, 'lanarve-candle-v2.png', 'lanarve-candle-packaging-v2.png',
     'Sage Lace Candle', 'Sage Lace', 'candle', 'a-moment-of-quiet', 'white-tea-rosemary', 'sage',
     'A repeating lace-like rosette pattern wraps a softly coloured sage vessel, combining delicate detail with a restful palette. White Tea & Rosemary keeps the mood airy, herbal and composed.'),
    (1, 'lanarve-diffuser-v4.png', 'lanarve-diffuser-packaging-v4.png',
     'Sage Lace Reed Diffuser', 'Sage Lace', 'reed', 'a-quiet-pause', 'white-tea-rosemary', 'sage',
     'The Sage Lace pattern continues across a compact ceramic diffuser with natural reeds and coordinated ivory packaging. White Tea & Rosemary brings a transparent tea note and gentle herbal freshness.'),
]

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    assert len(sys.argv) == 3, 'Pass 打包2.zip and 打包.zip'
    catalogues = {category: read(category + '-products.json') for category in ('candle', 'reed')}
    collections = {category: read(category + '-collections.json') for category in ('candle', 'reed')}
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')

    previous = [(category, product) for category, rows in catalogues.items()
                for product in rows if product['series'] in SERIES]
    previous_images = {(category, product['image']) for category, product in previous}
    previous_keys = {product['series'] + ' | ' + product['name'] for _, product in previous}
    for category, product in previous:
        ref = item_no(category, product['image'])
        assignments.pop(ref, None)
        identities.setdefault(category, {}).pop(product['image'], None)
        display.pop(product['image'], None)
    for category in catalogues:
        catalogues[category] = [p for p in catalogues[category] if p['series'] not in SERIES]
    for profile in scents:
        profile['matches'] = [m for m in profile['matches']
                              if (m['category'], m['image']) not in previous_images]

    folder = ROOT / 'assets/companions/gift-and-sage-lace'
    folder.mkdir(parents=True, exist_ok=True)
    added, sources = [], []
    with ExitStack() as stack:
        archives = [stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]]
        members = [{Path(member).name: member for member in archive.namelist()
                    if member.lower().endswith(('.png', '.jpg', '.jpeg'))
                    and not member.startswith('__MACOSX/')}
                   for archive in archives]

        def image(archive_index, filename, role):
            archive = archives[archive_index]
            data = archive.read(members[archive_index][filename])
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
            sources.append({'sourceArchive': Path(sys.argv[archive_index + 1]).name,
                            'source': filename, 'role': role, 'sha256': digest,
                            'image': src, 'width': width, 'height': height})
            return src

        for archive_index, product_file, box_file, name, series, category, collection, scent, palette, description in DESIGNS:
            src = image(archive_index, product_file, 'product')
            packaging = image(archive_index, box_file, 'packaging')
            ref = item_no(category, src)
            identities.setdefault(category, {})[src] = ref
            product = {
                'id': 'gift-sage-lace-' + Path(src).stem,
                'name': name,
                'series': series,
                'productType': 'Scented candle' if category == 'candle' else 'Reed diffuser',
                'image': src,
                'packagingImage': packaging,
                'images': [src, packaging],
                'assignedScent': scent,
                'designDescription': description + ' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.',
            }
            catalogues[category].append(product)
            added.append(dict(product, category=category, collection=collection))
            display[src] = {'palette': palette}
            assignments[ref] = {'scent': scent,
                                'basis': 'Suggested pairing based on the supplied design, palette, product format and gifting theme.'}
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': category, 'image': src, 'name': name, 'series': series
            })

    for category, rows in collections.items():
        additions = [p for p in added if p['category'] == category]
        for collection in rows:
            flat = [key for key in collection['productKeys'] if key not in previous_keys]
            flat.extend(p['series'] + ' | ' + p['name'] for p in additions
                        if p['collection'] == collection['slug'])
            collection['productKeys'] = flat
            collection['pages'] = [flat[i:i + 12] for i in range(0, len(flat), 12)]
            collection['manualPageOrder'] = True

    manifest = {
        'sourceArchives': [Path(arg).name for arg in sys.argv[1:]],
        'productCount': len(added),
        'imageCount': len(sources),
        'pairedCount': len(added),
        'products': added,
        'images': sources,
        'collectionCounts': {
            'candle/close-to-you': 2,
            'candle/little-joys': 1,
            'candle/a-moment-of-quiet': 1,
            'reed/a-quiet-pause': 1,
        },
        'reviewNotes': 'All five supplied products were visually reviewed and paired with their coordinated packaging photograph; no exact source duplicates were found.',
    }
    for name, data in [
        ('candle-products.json', catalogues['candle']), ('reed-products.json', catalogues['reed']),
        ('candle-collections.json', collections['candle']), ('reed-collections.json', collections['reed']),
        ('fragrances.json', scents), ('product-display.json', display),
        ('product-fragrances.json', assignments), ('image-manifest.json', media),
        ('product-identities.json', identities), ('gift-and-sage-lace-source-manifest.json', manifest),
    ]:
        write(name, data)
    print('Imported 4 candle designs and 1 reed diffuser with 10 reviewed photographs.')

if __name__ == '__main__':
    main()
