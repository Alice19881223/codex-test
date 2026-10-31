"""Import the reviewed lifestyle, message and ocean candle photographs.

Usage: python3 scripts/import-lifestyle-ocean-candles.py \
  /path/to/生活系列.zip /path/to/打包2.zip \
  '/path/to/打包3 海洋系列.zip' /path/to/海洋系列1.zip
"""
from contextlib import ExitStack
from io import BytesIO
from pathlib import Path
import hashlib, json, sys, zipfile

from PIL import Image, ImageOps
from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
SERIES_COLLECTIONS = {
    'Joyful Little Things': 'little-joys',
    'Words in Bloom': 'close-to-you',
    'Coastal Daydreams': 'everyday-poetry',
}
COLLECTION_OVERRIDES = {
    'Happy Fries': 'everyday-poetry',
}

# archive index, product image, packaging image, name, series, scent, palette, description
DESIGNS = [
    (0, 'fries-product.png', 'fries-packaging.png', 'Happy Fries', 'Joyful Little Things',
     'caramel-cream', 'ivory',
     'A smiling carton of golden fries turns an everyday favourite into a playful little celebration. Caramel & Cream gives the cheerful design a warm, dessert-like comfort.'),
    (1, 'ChatGPT Image 2026年10月30日 14_02_59.png', 'ChatGPT Image 2026年10月30日 14_03_04.png',
     'Rose Ribbon', 'Words in Bloom', 'peony-lychee', 'blush',
     'A dimensional rose-pink bow rests on softly irregular ivory ceramic, creating a small gift that feels already wrapped. Peony & Lychee adds a delicate floral-fruit brightness.'),
    (1, 'gratitude-product.png', 'gratitude-packaging.png', 'Gratitude in Bloom', 'Words in Bloom',
     'rose-green-leaves', 'ivory',
     'A fine pink flower rises through the word gratitude as a quiet reminder to notice what is good. Rose & Green Leaves keeps the sentiment fresh, natural and thoughtful.'),
    (1, 'happiness-product.png', 'happiness-packaging.png', 'A Little Happiness', 'Words in Bloom',
     'bergamot-neroli', 'gold',
     'A small sunflower and handwritten happiness bring a note of uncomplicated sunshine to the room. Bergamot & Neroli mirrors its optimistic yellow palette with clear citrus and blossom.'),
    (1, 'kindness-product.png', 'kindness-packaging.png', 'Kindness Grows', 'Words in Bloom',
     'white-tea-rosemary', 'sage',
     'A slender lavender-blue flower turns kindness into a simple botanical message. White Tea & Rosemary gives the gentle design an airy herbal calm.'),
    (1, 'ribbon-product.png', 'ribbon-packaging.png', 'Ribbon of Joy', 'Words in Bloom',
     'soft-linen', 'ivory',
     'A red, white and blue striped bow brings a crisp, celebratory accent to warm ivory ceramic. Soft Linen complements its neat ribbon detail with a clean and comforting finish.'),
    (2, 'ChatGPT 图像 2026年10月29日 14_46_14.png', 'ChatGPT 图像 2026年10月29日 14_45_59.png',
     'Blue Shoal', 'Coastal Daydreams', 'sea-salt-driftwood', 'blue',
     'A raised blue fish and hand-finished ivory vessel recall an easy walk beside clear coastal water. Sea Salt & Driftwood gives the design a mineral, sun-bleached shoreline character.'),
    (2, 'ChatGPT 图像 2026年10月29日 14_46_21.png', 'ChatGPT 图像 2026年10月29日 14_46_05.png',
     'Steady Helm', 'Coastal Daydreams', 'cedarwood-vetiver', 'blue',
     'A sculpted blue ship wheel brings a composed nautical detail to softly shaped ceramic. Cedarwood & Vetiver pairs dry woods and earthy depth with its steady-at-the-helm story.'),
    (2, 'ChatGPT 图像 2026年10月29日 14_46_25.png', 'ChatGPT 图像 2026年10月29日 14_46_09.png',
     'Little Sailor', 'Coastal Daydreams', 'soft-linen', 'blue',
     'A tiny sailor cap gives the ivory vessel a clean, light-hearted maritime identity. Soft Linen suggests fresh fabric drying in a bright harbour breeze.'),
    (2, 'rainbow-product.png', 'rainbow-packaging.png', 'After the Rain', 'Coastal Daydreams',
     'white-tea-bergamot', 'blue',
     'A small pastel rainbow appears like clear sky after a passing coastal shower. White Tea & Bergamot keeps the mood transparent, bright and gently uplifting.'),
    (2, 'shell-product.png', 'shell-packaging.png', 'Coastal Shell', 'Coastal Daydreams',
     'sea-salt-driftwood', 'blue',
     'A fine blue shell sits on warm ivory ceramic like a keepsake gathered at the waterline. Sea Salt & Driftwood extends the quiet beach memory with mineral air and pale woods.'),
    (3, 'sailboat-product.png', 'sailboat-packaging.png', 'Sail Away', 'Coastal Daydreams',
     'lime-basil', 'sage',
     'A small green-and-blue sailboat catches an imagined summer breeze. Lime & Basil gives this open-water scene a crisp citrus and green-herb lift.'),
    (3, 'starfish-product.png', 'starfish-packaging.png', 'Tidepool Star', 'Coastal Daydreams',
     'sea-salt-driftwood', 'blue',
     'A hand-drawn blue starfish becomes a simple emblem of slow days exploring the shore. Sea Salt & Driftwood adds cool mineral air and weathered wood.'),
    (3, 'striped-fish-product.png', 'striped-fish-packaging.png', 'Sea Breeze Fish', 'Coastal Daydreams',
     'grapefruit-bergamot', 'blue',
     'A striped blue fish with a coral-red tail brings graphic coastal colour to the ivory vessel. Grapefruit & Bergamot matches its lively contrast with sparkling citrus.'),
    (3, 'sunset-product.png', 'sunset-packaging.png', 'Golden Hour Tide', 'Coastal Daydreams',
     'amber-vanilla', 'blush',
     'Layered blue waves meet a peach sunset in a tiny relief landscape. Amber & Vanilla reflects the last warm light with a smooth golden glow.'),
    (3, 'sunshine-product.png', 'sunshine-packaging.png', 'Pocket Sunshine', 'Coastal Daydreams',
     'bergamot-neroli', 'gold',
     'A sleepy golden sun brings a soft smile to the ivory vessel. Bergamot & Neroli captures its bright, easy warmth through citrus peel and white blossom.'),
    (3, '云朵.png', '云朵1.png', 'Cloud Linen', 'Coastal Daydreams',
     'soft-linen', 'blue',
     'A glossy powder-blue cloud floats on softly formed ceramic, suggesting fresh sheets and an open sky. Soft Linen keeps the design clean, airy and restful.'),
    (3, '星星月亮1.png', '星星月亮.png', 'Moon & Little Star', 'Coastal Daydreams',
     'lavender-cedarwood', 'blue',
     'A deep blue crescent and tiny golden star create a calm bedtime sky. Lavender & Cedarwood supports the nocturnal mood with aromatic softness and quiet woods.'),
    (3, '降落伞.png', '降落伞1.png', 'Cedar Air', 'Coastal Daydreams',
     'clean-cotton', 'blue',
     'A pale blue parachute drifts across ivory ceramic in a small story of open air and gentle adventure. Clean Cotton gives it a bright, weightless freshness.'),
]

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    assert len(sys.argv) == 5, 'Pass the four supplied archives in the documented order'
    products = read('candle-products.json')
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')
    collections = read('candle-collections.json')

    series = set(SERIES_COLLECTIONS)
    previous = [p for p in products if p['series'] in series]
    previous_images = {p['image'] for p in previous}
    previous_keys = {p['series'] + ' | ' + p['name'] for p in previous}
    for product in previous:
        ref = item_no('candle', product['image'])
        assignments.pop(ref, None)
        identities.setdefault('candle', {}).pop(product['image'], None)
        display.pop(product['image'], None)
    products = [p for p in products if p['series'] not in series]
    for profile in scents:
        profile['matches'] = [m for m in profile['matches']
                              if not (m['category'] == 'candle' and m['image'] in previous_images)]

    folder = ROOT / 'assets/candles/lifestyle-ocean'
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

        for archive_index, product_file, box_file, name, product_series, scent, palette, description in DESIGNS:
            src = image(archive_index, product_file, 'product')
            packaging = image(archive_index, box_file, 'packaging')
            ref = item_no('candle', src)
            identities.setdefault('candle', {})[src] = ref
            product = {
                'id': 'lifestyle-ocean-' + Path(src).stem,
                'name': name,
                'series': product_series,
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
                                'basis': 'Suggested pairing based on the supplied motif, palette and emotional theme.'}
            next(profile for profile in scents if profile['id'] == scent)['matches'].append({
                'category': 'candle', 'image': src, 'name': name, 'series': product_series
            })

    grouped = {slug: [] for slug in set(SERIES_COLLECTIONS.values()) | set(COLLECTION_OVERRIDES.values())}
    for product in added:
        slug = COLLECTION_OVERRIDES.get(product['name'], SERIES_COLLECTIONS[product['series']])
        grouped[slug].append(product['series'] + ' | ' + product['name'])
    for collection in collections:
        flat = [key for key in collection['productKeys'] if key not in previous_keys]
        new_keys = grouped.get(collection['slug'], [])
        if new_keys:
            flat.extend(new_keys)
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
        'collectionCounts': {slug: len(keys) for slug, keys in grouped.items()},
        'reviewNotes': 'All supplied files were visually reviewed and paired as product and coordinated packaging photographs; no exact source duplicates were found.',
    }
    for name, data in [
        ('candle-products.json', products), ('fragrances.json', scents),
        ('product-display.json', display), ('product-fragrances.json', assignments),
        ('image-manifest.json', media), ('product-identities.json', identities),
        ('candle-collections.json', collections),
        ('lifestyle-ocean-source-manifest.json', manifest),
    ]:
        write(name, data)
    print(f'Imported {len(added)} candles with {len(sources)} reviewed product and packaging photographs.')

if __name__ == '__main__':
    main()
