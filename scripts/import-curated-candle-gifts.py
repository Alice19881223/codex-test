"""Import 12 reviewed candle and gift-box pairs from the three curated archives.

Usage: python3 scripts/import-curated-candle-gifts.py /path/to/打包1.zip /path/to/打包2.zip /path/to/打包3.zip
"""
from contextlib import ExitStack
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES = {
    'Quiet Botanicals': 'a-moment-of-quiet',
    'For Mum, With Love': 'close-to-you',
    'Garden Joys': 'little-joys',
    'Spring Garden': 'morning-light',
    'Poetic Botanicals': 'everyday-poetry',
}
COLLECTION_OVERRIDES = {
    'Midnight Poppy': 'close-to-you',
    'Golden Midnight Bloom': 'chinese-style',
}

# archive, standalone, archive, gift-box image, name, series, scent, palette, introduction
DESIGNS = [
    ('打包1', '午夜蓝金线罂粟香氛蜡烛.png', '打包3', '象牙礼盒与午夜蓝香氛蜡烛.png',
     'Midnight Poppy', 'Quiet Botanicals', 'black-tea-cedarwood', 'blue',
     'A midnight-blue vessel traced with fine golden poppies brings a calm, tailored mood to darker interiors. Black Tea & Cedarwood adds dry tea leaves and polished woods to its understated botanical character.'),
    ('打包3', '12414d13-f6c0-406d-98da-24e8a9f7fe19.png', '打包1', '象牙礼盒与金色花纹香氛蜡烛.png',
     'Golden Midnight Bloom', 'Poetic Botanicals', 'oud-saffron', 'blue',
     'A hand-drawn golden peony glows against deep navy ceramic, turning a single flower into a small piece of everyday poetry. Oud & Saffron gives the design a warm, mysterious evening depth.'),
    ('打包2', '琥珀棱纹香薰蜡烛-7.png', '打包1', '奢华香薰蜡烛与礼盒-8.png',
     'Amber Rivulet', 'Quiet Botanicals', 'amber-vanilla', 'amber',
     'Warm amber glass and horizontal ribbing catch the light in soft golden bands. Amber & Vanilla mirrors the glow with a smooth, enveloping fragrance direction.'),
    ('打包1', '母亲节橡木心意香薰蜡烛-2.png', '打包2', '母亲节高端香薰蜡烛礼盒-6.png',
     'Oakheart for Mum', 'For Mum, With Love', 'sandalwood-cashmere', 'sand',
     'Natural oak grain and a blush heart create a warm, lasting thank-you for Mum. Sandalwood & Cashmere complements the tactile wood with a soft and comforting finish.'),
    ('打包1', '母亲节温柔告白香薰蜡烛-3.png', '打包1', '母亲节香氛蜡烛礼盒-8.png',
     'Love Note for Mum', 'For Mum, With Love', 'rose-green-leaves', 'blush',
     'A gentle handwritten message, blush label and tiny hearts make this candle feel like a personal note. Rose & Green Leaves keeps the floral expression fresh and natural.'),
    ('打包2', '淡蓝花卉母亲节香薰蜡烛-1.png', '打包1', '母亲节香薰蜡烛礼盒-5.png',
     'Blue Garden for Mum', 'For Mum, With Love', 'jasmine-orange-blossom', 'blue',
     'Raised ivory flowers trail across soft blue ceramic in a garden-inspired gift for Mum. Jasmine & Orange Blossom extends the design with luminous white florals.'),
    ('打包1', '象牙雏菊浮雕香氛蜡烛.png', '打包1', '象牙白环瓣花烛礼盒.png',
     'Ivory Daisy', 'Garden Joys', 'bergamot-neroli', 'ivory',
     'A dimensional ivory daisy with a warm wooden centre gives a simple vessel a cheerful handcrafted detail. Bergamot & Neroli adds a bright, sunlit freshness.'),
    ('打包2', '极简薄荷青釉陶瓷蜡烛-1.png', '打包2', '极简薄荷绿蜡烛礼盒-2.png',
     'Mint Stillness', 'Quiet Botanicals', 'eucalyptus-mint', 'sage',
     'Speckled mint ceramic and a natural wood wick create a clean, restful object for quiet rooms. Eucalyptus & Mint reinforces its crisp, airy character.'),
    ('打包2', '母亲节粉雾爱心香薰蜡烛-4.png', '打包2', '母亲节精品香薰蜡烛礼盒-7.png',
     'Blush Heart Confetti', 'For Mum, With Love', 'peony-lychee', 'blush',
     'Fine heart illustrations float across a soft blush vessel and matching gift box. Peony & Lychee gives the affectionate design a delicate floral-fruit lift.'),
    ('打包2', '翡翠泡泡雕塑香薰蜡烛-9.png', '打包2', '翡翠绿泡泡蜡烛礼盒-10.png',
     'Emerald Bubbles', 'Garden Joys', 'fig-green-leaves', 'sage',
     'Glossy emerald spheres wrap the vessel in a playful sculptural rhythm. Fig & Green Leaves balances the bold form with a lush, modern green fragrance direction.'),
    ('打包3', 'fbcdd473-5971-4dac-b5f4-5118d13caeb3.png', '打包3', '1bd71bcc-c31b-49ac-8f5e-0b4cc236280d.png',
     'Blue Linen Botanicals', 'Spring Garden', 'soft-linen', 'blue',
     'Powder-blue stripes and a delicate botanical panel recall fresh linen beside an open spring window. Soft Linen keeps the pairing light, clean and easy to live with.'),
    ('打包3', '9ba134c8-27b5-4278-82d5-9a7f77a1ba6c.png', '打包3', 'fdcac25a-82b0-46c5-8537-aa7abfe5d0c7.png',
     'Sage Butterfly Garden', 'Spring Garden', 'white-tea-rosemary', 'sage',
     'Ivory butterflies with fine golden edges rest on muted sage ceramic. White Tea & Rosemary brings a transparent tea note and gentle garden freshness.'),
]

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    assert len(sys.argv) == 4, 'Pass 打包1.zip, 打包2.zip and 打包3.zip'
    products = read('candle-products.json')
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')
    collections = read('candle-collections.json')

    previous = [p for p in products if p['series'] in SERIES]
    previous_images = {p['image'] for p in previous}
    previous_keys = {p['series'] + ' | ' + p['name'] for p in previous}
    for product in previous:
        ref = item_no('candle', product['image'])
        assignments.pop(ref, None)
        identities.setdefault('candle', {}).pop(product['image'], None)
    products = [p for p in products if p['series'] not in SERIES]
    for scent in scents:
        scent['matches'] = [m for m in scent['matches'] if not (m['category'] == 'candle' and m['image'] in previous_images)]

    folder = ROOT / 'assets/candles/curated-gifts'
    folder.mkdir(parents=True, exist_ok=True)
    added, sources = [], []
    with ExitStack() as stack:
        archives = {Path(arg).stem: stack.enter_context(zipfile.ZipFile(arg)) for arg in sys.argv[1:]}
        members = {(archive_name, Path(member).name): (archive, member)
                   for archive_name, archive in archives.items()
                   for member in archive.namelist()
                   if member.lower().endswith(('.png', '.jpg', '.jpeg')) and not member.startswith('__MACOSX/')}

        def image(archive_name, filename):
            archive, member = members[(archive_name, filename)]
            data = archive.read(member)
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
                entry['variants'].append({'src': variant.relative_to(ROOT).as_posix(), 'width': variant_width, 'bytes': variant.stat().st_size})
            media[src] = entry
            sources.append({'sourceArchive': archive_name + '.zip', 'source': filename, 'sha256': digest,
                            'image': src, 'width': width, 'height': height})
            return src

        for single_archive, single_name, box_archive, box_name, name, series, scent, palette, introduction in DESIGNS:
            src = image(single_archive, single_name)
            packaging = image(box_archive, box_name)
            ref = item_no('candle', src)
            identities.setdefault('candle', {})[src] = ref
            product = {
                'id': 'curated-gift-' + Path(src).stem,
                'name': name,
                'series': series,
                'productType': 'Scented candle',
                'image': src,
                'packagingImage': packaging,
                'images': [src, packaging],
                'assignedScent': scent,
                'designDescription': introduction + ' Suggested fragrance pairing; final formulation and availability are confirmed with your sample.',
            }
            products.append(product)
            added.append(product)
            display[src] = {'palette': palette}
            assignments[ref] = {'scent': scent, 'basis': 'Suggested pairing based on the supplied design, colour, gifting message and theme.'}
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': 'candle', 'image': src, 'name': name, 'series': series
            })

    by_collection = {slug: [] for slug in set(SERIES.values()) | set(COLLECTION_OVERRIDES.values())}
    for product in added:
        slug = COLLECTION_OVERRIDES.get(product['name'], SERIES[product['series']])
        by_collection[slug].append(product['series'] + ' | ' + product['name'])
    for collection in collections:
        flat = [key for key in collection['productKeys'] if key not in previous_keys]
        new_keys = by_collection.get(collection['slug'], [])
        if new_keys:
            # Preserve previously reviewed seasonal and series-led openings.
            # The new edit follows the existing products inside each matching theme.
            flat = flat + new_keys
            collection['productKeys'] = flat
            collection['pages'] = [flat[i:i + 12] for i in range(0, len(flat), 12)]
            collection['manualPageOrder'] = True

    manifest = {
        'sourceArchives': sorted(Path(arg).name for arg in sys.argv[1:]),
        'productCount': len(added),
        'imageCount': len(sources),
        'products': added,
        'images': sources,
        'collectionCounts': {slug: len(keys) for slug, keys in by_collection.items()},
        'pairingNotes': 'All 12 designs have visually reviewed standalone and coordinated gift-box photographs.',
    }
    for name, data in [
        ('candle-products.json', products), ('fragrances.json', scents),
        ('product-display.json', display), ('product-fragrances.json', assignments),
        ('image-manifest.json', media), ('product-identities.json', identities),
        ('candle-collections.json', collections), ('curated-candle-gifts-source-manifest.json', manifest),
    ]:
        write(name, data)
    print('Imported 12 candle designs with 24 reviewed product and gift-box photographs.')

if __name__ == '__main__':
    main()
