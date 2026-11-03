"""Arrange Halloween products in restrained, colour-coherent atmosphere groups."""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
GROUPS=[
 ('Midnight Navy & Charcoal','''Pumpkin Parade
Candy Corn Moon
Golden Familiar
Spooky Forest Night
Bat & Pumpkin Gold
Black Cat Moon
Midnight Cat Witch
Botanical Ghost
Floating Ghost
Midnight Shy Ghost
The Witch Is In
Midnight Ballet Candle
Pumpkin Cottage Night
Moonlit Witch Ghost
Deep Teal Ghost Night
Sage Witch Diffuser'''),
 ('Purple Moonlight','''Boo After Dark
Trick or Treat Spirits
Moonlit Magic Pumpkin
Lilac Bat Spell
Lavender Haunted House
Lavender Haunted Manor
Magenta Bat
Purple Bat Mischief
Purple Witch Ghost
Purple Ghost Forest
Berry Bat Diffuser
Lavender Castle Diffuser'''),
 ('Pumpkin & Amber','''Batwing Pumpkin
Haunted Pumpkin Night
Jack-O’-Lantern Carnival
Pumpkin Party Glow
Candy Stripe Boo
Little Pumpkin Ghost
Woodland Toadstool
Pumpkin Bat Diffuser'''),
 ('Ivory Ghost Stories','''Midnight Witch Hat
Starry Witch Ghost
Pumpkin Stripe Ghost
Golden Stripe Ghost
Boo & Cream Pumpkin
Pumpkin & Little Ghost
Ghost & Black Cat
Ivory Ghost Garden
Mummy Goose
Book of Spells Ghost
Ghost Reading Club
Wise Little Ghost
Pumpkin & Black Cat
Reading Ghost Diffuser'''),
 ('Pastel Magic','''Pastel Spooky
Blush Haunted House
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
