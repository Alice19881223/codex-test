"""Arrange Halloween products in restrained, colour-coherent atmosphere groups."""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
GROUPS=[
 ('Light Designer Edit','''Lavender Haunted Manor
Lavender Haunted House
Pastel Spooky
Blush Haunted House
Starry Witch Ghost
Pumpkin Stripe Ghost
Golden Stripe Ghost
Little Pumpkin Ghost
Pumpkin Party Glow
Moonlit Magic Pumpkin
Boo & Cream Pumpkin
Woodland Toadstool'''),
 ('Black & Midnight','''Pumpkin Cottage Night
Moonlit Witch Ghost
Deep Teal Ghost Night
Midnight Ballet Candle
Spooky Forest Night
Bat & Pumpkin Gold
Black Cat Moon
Midnight Cat Witch
Botanical Ghost
Pumpkin Parade
Candy Corn Moon
Floating Ghost
Midnight Shy Ghost'''),
 ('Ivory & White','''Midnight Witch Hat
Ivory Ghost Garden
Ghost & Black Cat
The Witch Is In
Book of Spells Ghost
Ghost Reading Club
Wise Little Ghost
Pumpkin & Black Cat
Mummy Goose
Pumpkin & Little Ghost'''),
 ('Golden Pumpkin','''Golden Familiar
Haunted Pumpkin Night
Jack-O’-Lantern Carnival
Batwing Pumpkin
Candy Stripe Boo'''),
 ('Purple Magic','''Purple Ghost Forest
Purple Witch Ghost
Purple Bat Mischief
Lilac Bat Spell
Magenta Bat
Boo After Dark
Trick or Treat Spirits'''),
 ('Halloween Reed Diffusers','''Berry Bat Diffuser
Lavender Castle Diffuser
Sage Witch Diffuser
Pumpkin Bat Diffuser
Reading Ghost Diffuser
Pink Haunted House Diffuser
Pastel Spooky Bat Diffuser'''),
]
products=json.loads((ROOT/'assets/halloween-products.json').read_text());lookup={p['name']:p for p in products};groups=[{'name':name,'products':items.splitlines()} for name,items in GROUPS];flat=[name for g in groups for name in g['products']]
assert len(flat)==len(set(flat))==len(products) and set(flat)==set(lookup),'Tone groups must contain every Halloween product exactly once'
products=[lookup[name] for name in flat];pages=[products[i:i+12] for i in range(0,len(products),12)]
(ROOT/'assets/halloween-products.json').write_text(json.dumps(products,ensure_ascii=False,indent=2)+'\n')
order=json.loads((ROOT/'assets/catalogue-order.json').read_text());order['halloween']=[[p['name'] for p in page] for page in pages];(ROOT/'assets/catalogue-order.json').write_text(json.dumps(order,ensure_ascii=False,indent=2)+'\n')
layouts=json.loads((ROOT/'assets/catalogue-layouts.json').read_text());layouts['halloween']=[[p['image'] for p in page] for page in pages];(ROOT/'assets/catalogue-layouts.json').write_text(json.dumps(layouts,ensure_ascii=False,indent=2)+'\n')
(ROOT/'assets/halloween-merchandising-groups.json').write_text(json.dumps({'groups':groups,'pageSize':12,'pageCounts':[len(p) for p in pages]},ensure_ascii=False,indent=2)+'\n')
print('Halloween tone groups:',[(g['name'],len(g['products'])) for g in groups])
