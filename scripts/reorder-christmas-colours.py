"""Apply the owner's reviewed colour-led Christmas catalogue order."""
from pathlib import Path
import json

ROOT=Path(__file__).resolve().parents[1]
GROUPS=[
 ('Red · Green · Ivory','''Festive Confetti Candle
Festive Confetti Reed Diffuser
Christmas Stocking Candle
Christmas Stocking Reed Diffuser
Evergreen Tree Candle
Evergreen Tree Reed Diffuser
Starlight Red Candle
Starlight Red Reed Diffuser
Smiling Gingerbread Candle
Ruby Winter Forest
Forest Green Silver Trees
Forest Green Cone Candle
Sage Forest Candle
Sage Forest Reed Diffuser
Christmas Keepsake Glass Candle
Christmas Keepsake Glass Reed Diffuser
Merry Evergreen Candle
Merry Evergreen Reed Diffuser
Winter Cottage Candle
Winter Cottage Reed Diffuser
Festive Dachshund Candle
Festive Dachshund Reed Diffuser
Crimson Cottage Glow Candle
Evergreen Pudding Candle
Gingerbread Fragrance Gift Set
Christmas Tree Candle
Santa Candle
Santa & Tree Candle Duo
Snowy Tree Glass Candle
Christmas Pets Candle
Crimson Winter Fir
Home for Christmas Wreath
Snowy Christmas Village
North Pole Workshop
Tartan Christmas Tree
Gingerbread Noel House
Ivory Christmas Angel
Sweet Home Christmas Bell
Green Door Christmas Elf
Gingerbread Christmas at Home
Waving Santa Candle
Evergreen Star Tree
Crimson Christmas Angel
Merry XMAS Robin
Merry Christmas Village
Joy to the World Tree
Christmas Story Drum
Cedar & Spice Tree
Red Door Christmas Elf
Enchanted Forest Reindeer
A Little Christmas Joy Santa
Evergreen Minimal Tree
Nordic Forest Story
Letters to Santa
Ivory Forest Deer
Candy Stripe Tree
Christmas Cheer Snowman
Christmas Tree & Gingerbread
Ivory Winter Village
Merry XMAS Market
Crimson Tree
Evergreen Village
Ribbon Evergreen
Snowman Ho Ho Ho
Evergreen Tag Tree
Christmas Countdown
Nutcracker Merry Christmas
Festive HO!
Gingerbread Noel
Letters to Santa North Pole
North Pole Post
Christmas Icon Parade
Candy Garden
Vintage Ribbon Tree
North Pole Workshop Sign
North Pole Village Sign
Red Stripe Christmas Fir
Holly Jolly Christmas
HO HO HO
Vintage Santa Christmas
Christmas Icon Story
Green Checkerboard Tree
Be Merry & Bright
Christmas Peace
Christmas Story Signpost
Ivory Hand-Drawn Tree'''),
 ('Bright Colour','''Lilac Gingerbread Candle
Lilac Gingerbread Reed Diffuser
Violet Christmas Village
Violet Christmas Village Duo
Pink Gingerbread Candle
Pink Gingerbread Reed Diffuser
Rose Pink Cone Candle
Citrus Christmas Joy Candle
Amber Christmas Cookies
Champagne Winter Forest
Ivory Silver Trees
Silver Winter Forest
Silver Snowflakes
Charcoal Golden Reindeer
Olive Christmas Wishes
Cinnamon Orange Dome
Forest Garland Dome
Winter Berry Dome
Disco Ball Holiday
Santa Merry & Bright
Pink Christmas Forest
Pink Checkerboard Tree
Pink Christmas Ballet
Pink Ribbon Wreath
Snow Globe Gingerbread
Pastel Christmas Train
Christmas Wishes Gift
Magic Holiday
Bright Three Trees
Sweet Gingerbread Wishes
Christmas Cocoa
Christmas Mittens
Christmas Gift Tower
Pink Ribbon Wish
Christmas Wishes Bows
Pink Gingham Merry Wishes
Pearl Candy Canes'''),
 ('Winter Blue','''Winter Ballet Candle
Blue Winter Forest
Snowman Moonlit Cottage
Ice Star Wish
Frosted Nutcracker
Ice Blue Snowflake
Silent Night Tree
Midnight Snowflake
Blue Merry & Bright
Ice Blue Tree
Ice Blue Snowman
Ice Blue Silver Tree'''),
 ('Harmonious Tones','''Warm Ivory Candle Trio
Pinecone Candle
Golden Winter Reindeer
Golden Noel Angel
Angel’s Wish Candle
Christmas Angel Reed Diffuser
Ivory Winter Rocking Horse
Crimson Star Tree
Sage Rocking Horse
Forest Green Candle Trio
Golden Snowflake
Golden Starlight Tree
Golden Santa
Golden Forest Reindeer
Ivory Tree Tag
Golden Christmas Ballet
Ivory Three Trees
Silent Night Strings
Joy to the World Ballet
Minimal Christmas Eve Tree'''),
 ('Sand Art','''Cedar Kiss
Christmas Tree Sand Candle
Coastal Lime
Sea Salt & Sage
English Pear & Freesia'''),
 ('Scented Ornaments','''Gingerbread, Tree & Reindeer
Ivory Tree, Snowflake & Reindeer
Snowflake, Cottage & Reindeer
Ivory Botanical Tree Ornament
Forest Tree Ornament
Olive Tree Ornament
Burgundy Botanical Ornament'''),
]

products=json.loads((ROOT/'assets/christmas-products.json').read_text());lookup={p['name']:p for p in products}
groups=[{'name':name,'products':items.splitlines()} for name,items in GROUPS];flat=[name for group in groups for name in group['products']]
assert len(flat)==len(set(flat))==len(products) and set(flat)==set(lookup),'Colour-led groups must contain every Christmas product exactly once'
pages=[flat[i:i+12] for i in range(0,len(flat),12)]
order_path=ROOT/'assets/catalogue-order.json';order=json.loads(order_path.read_text());order['christmas']=pages;order_path.write_text(json.dumps(order,ensure_ascii=False,indent=2)+'\n')
layout_path=ROOT/'assets/catalogue-layouts.json';layouts=json.loads(layout_path.read_text());layouts['christmas']=[[lookup[name]['image'] for name in page] for page in pages];layout_path.write_text(json.dumps(layouts,ensure_ascii=False,indent=2)+'\n')
(ROOT/'assets/christmas-merchandising-groups.json').write_text(json.dumps({'groups':groups,'pageSize':12,'pageCounts':[len(page) for page in pages]},ensure_ascii=False,indent=2)+'\n')
print('Christmas colour groups:',[(group['name'],len(group['products'])) for group in groups])
