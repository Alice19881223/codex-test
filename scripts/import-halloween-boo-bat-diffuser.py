"""Import the reviewed smoky-purple Halloween bat diffuser pair."""
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
PREFIX = 'halloween-bat-diffuser-'
PRODUCT_FILE = 'Lanarve万圣节蝙蝠无火香薰瓶-1.png'
PACKAGING_FILE = '灰紫磨砂玻璃蝙蝠香薰礼盒-2.png'


def read(name):
    return json.loads((ROOT / 'assets' / name).read_text())


def write(name, data):
    (ROOT / 'assets' / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def main():
    if len(sys.argv) != 2:
        raise SystemExit('Pass 香薰打包.zip')
    products = read('halloween-products.json')
    scents = read('fragrances.json')
    display = read('product-display.json')
    assignments = read('product-fragrances.json')
    media = read('image-manifest.json')
    identities = read('product-identities.json')

    previous = [p for p in products if p.get('id', '').startswith(PREFIX)]
    previous_images = {p['image'] for p in previous}
    products = [p for p in products if not p.get('id', '').startswith(PREFIX)]
    for product in previous:
        assignments.pop(item_no('halloween', product['image']), None)
        identities.setdefault('halloween', {}).pop(product['image'], None)
        display.pop(product['image'], None)
    for profile in scents:
        profile['matches'] = [match for match in profile['matches']
                              if not (match['category'] == 'halloween' and match['image'] in previous_images)]

    folder = ROOT / 'assets/halloween/boo-bat-diffuser'
    folder.mkdir(parents=True, exist_ok=True)
    sources = []
    with zipfile.ZipFile(sys.argv[1]) as archive:
        members = {Path(member).name: member for member in archive.namelist()
                   if member.lower().endswith(('.png', '.jpg', '.jpeg', '.webp'))
                   and not member.startswith('__MACOSX/')}
        assert {PRODUCT_FILE, PACKAGING_FILE} <= set(members)

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

        src = image(PRODUCT_FILE, 'product')
        packaging = image(PACKAGING_FILE, 'packaging')

    name = 'Smoky Boo Bat Diffuser'
    series = 'Purple Moonlight'
    scent = 'lavender-cedarwood'
    product = {
        'id': PREFIX + Path(src).stem,
        'name': name,
        'series': series,
        'productType': 'Reed diffuser',
        'image': src,
        'packagingImage': packaging,
        'images': [src, packaging],
        'assignedScent': scent,
        'designDescription': 'A smoky lavender glass diffuser pairs a hand-drawn black bat with a tiny pumpkin and warm brushed-gold collar. Lavender & Cedarwood complements its muted purple moonlight atmosphere. Suggested Halloween fragrance pairing; final formulation and availability are confirmed with your sample.',
    }
    products.append(product)
    ref = item_no('halloween', src)
    identities.setdefault('halloween', {})[src] = ref
    display[src] = {'palette': 'lavender'}
    assignments[ref] = {
        'scent': scent,
        'basis': 'Suggested pairing based on the reviewed smoky-purple Halloween vessel, bat motif and coordinated packaging.'
    }
    next(profile for profile in scents if profile['id'] == scent)['matches'].append({
        'category': 'halloween', 'image': src, 'name': name, 'series': series
    })

    manifest = {
        'sourceArchive': Path(sys.argv[1]).name,
        'productCount': 1,
        'imageCount': 2,
        'pairedCount': 1,
        'products': [product],
        'images': sources,
        'placement': 'Halloween Reed Diffusers, after Lavender Castle Diffuser and before the remaining diffuser colour groups.',
    }
    for filename, data in [
        ('halloween-products.json', products),
        ('fragrances.json', scents),
        ('product-display.json', display),
        ('product-fragrances.json', assignments),
        ('image-manifest.json', media),
        ('product-identities.json', identities),
        ('halloween-boo-bat-diffuser-source-manifest.json', manifest),
    ]:
        write(filename, data)

    runpy.run_path(str(ROOT / 'scripts/reorder-halloween-tones.py'), run_name='__main__')
    products = read('halloween-products.json')
    catalog = ROOT / 'catalog.js'
    text = catalog.read_text()
    text, count = re.subn(r'const halloweenProducts = \[.*?\n\];',
                          lambda match: 'const halloweenProducts = ' + json.dumps(products, ensure_ascii=False, indent=2) + ';',
                          text, count=1, flags=re.S)
    assert count == 1
    catalog.write_text(text)
    print('Imported Smoky Boo Bat Diffuser into the final Halloween reed diffuser group.')


if __name__ == '__main__':
    main()
