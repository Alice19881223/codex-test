"""Apply the owner's reviewed cross-catalogue candle moves and removal."""
from pathlib import Path
import json

from product_records import item_no

ROOT = Path(__file__).resolve().parents[1]
HALLOWEEN_NAMES = ['Little Pumpkin Ghost', 'Midnight Ballet Candle']
REMOVE_NAME = 'Pumpkin & Ghost'
CLOSE_NAMES = ['Ivory Daisy', 'Emerald Bubbles']
POETRY_NAMES = ['Happy Fries']

def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())

def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

def main():
    candles = read('candle-products.json')
    halloween = read('halloween-products.json')
    collections = read('candle-collections.json')
    layouts = read('catalogue-layouts.json')
    order = read('catalogue-order.json')
    scents = read('fragrances.json')
    assignments = read('product-fragrances.json')
    identities = read('product-identities.json')
    display = read('product-display.json')

    by_name = {product['name']: product for product in candles}
    moved = [by_name[name] for name in HALLOWEEN_NAMES]
    removed = by_name[REMOVE_NAME]
    affected = set(HALLOWEEN_NAMES + [REMOVE_NAME] + CLOSE_NAMES + POETRY_NAMES)
    candles = [product for product in candles if product['name'] not in set(HALLOWEEN_NAMES + [REMOVE_NAME])]
    halloween = [product for product in halloween if product['name'] not in set(HALLOWEEN_NAMES)] + moved

    for product in moved:
        old_ref = item_no('candle', product['image'])
        new_ref = item_no('halloween', product['image'])
        if old_ref in assignments:
            assignments[new_ref] = assignments.pop(old_ref)
        identities.setdefault('candle', {}).pop(product['image'], None)
        identities.setdefault('halloween', {})[product['image']] = new_ref
    removed_ref = item_no('candle', removed['image'])
    assignments.pop(removed_ref, None)
    identities.setdefault('candle', {}).pop(removed['image'], None)
    display.pop(removed['image'], None)

    moved_images = {product['image'] for product in moved}
    for profile in scents:
        next_matches = []
        for match in profile['matches']:
            if match['category'] == 'candle' and match['image'] == removed['image']:
                continue
            if match['category'] == 'candle' and match['image'] in moved_images:
                match = dict(match, category='halloween')
            next_matches.append(match)
        profile['matches'] = next_matches

    affected_keys = {by_name[name]['series'] + ' | ' + name for name in affected}
    for collection in collections:
        collection['productKeys'] = [key for key in collection['productKeys'] if key not in affected_keys]
    targets = {
        'close-to-you': CLOSE_NAMES,
        'everyday-poetry': POETRY_NAMES,
    }
    for slug, names in targets.items():
        collection = next(c for c in collections if c['slug'] == slug)
        collection['productKeys'].extend(by_name[name]['series'] + ' | ' + name for name in names)
    for collection in collections:
        flat = collection['productKeys']
        collection['pages'] = [flat[i:i + 12] for i in range(0, len(flat), 12)]
        collection['manualPageOrder'] = True

    existing_halloween_images = [image for page in layouts['halloween'] for image in page
                                 if image not in moved_images]
    existing_halloween_images.extend(product['image'] for product in moved)
    layouts['halloween'] = [existing_halloween_images[i:i + 12]
                            for i in range(0, len(existing_halloween_images), 12)]
    existing_halloween_names = [name for page in order['halloween'] for name in page
                                if name not in set(HALLOWEEN_NAMES)]
    existing_halloween_names.extend(HALLOWEEN_NAMES)
    order['halloween'] = [existing_halloween_names[i:i + 12]
                          for i in range(0, len(existing_halloween_names), 12)]

    halloween_manifest = read('halloween-source-manifest.json')
    halloween_manifest['relocatedProducts'] = [
        {'name': product['name'], 'image': product['image'], 'from': 'candle/little-joys'}
        for product in moved
    ]
    manifest = {
        'movedToHalloween': HALLOWEEN_NAMES,
        'removed': REMOVE_NAME,
        'movedToCloseToYou': CLOSE_NAMES,
        'movedToEverydayPoetry': POETRY_NAMES,
    }
    for name, data in [
        ('candle-products.json', candles), ('halloween-products.json', halloween),
        ('candle-collections.json', collections), ('catalogue-layouts.json', layouts),
        ('catalogue-order.json', order), ('fragrances.json', scents),
        ('product-fragrances.json', assignments), ('product-identities.json', identities),
        ('product-display.json', display), ('halloween-source-manifest.json', halloween_manifest),
        ('selected-candle-reorganization-manifest.json', manifest),
    ]:
        write(name, data)
    print('Moved two candles to Halloween, three candles to mood collections, and removed Pumpkin & Ghost.')

if __name__ == '__main__':
    main()
