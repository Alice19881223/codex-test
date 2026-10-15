"""Arrange existing products by series first and compatible photographic palettes second."""
from pathlib import Path
from collections import OrderedDict,Counter
import json
ROOT=Path(__file__).resolve().parents[1]
DISPLAY=json.loads((ROOT/'assets/product-display.json').read_text())
PALETTES=['ivory','sand','gold','amber','walnut','burgundy','blush','lavender','blue','sage','charcoal']
def palette(p):return DISPLAY.get(p['image'],{}).get('palette','ivory')
def series_blocks(entries):
 groups=OrderedDict()
 for p in entries:groups.setdefault((p.get('category',''),p['series']),[]).append(p)
 blocks=[]
 for items in groups.values():
  items=sorted(items,key=lambda p:PALETTES.index(palette(p)))
  representative=Counter(palette(p) for p in items).most_common(1)[0][0]
  blocks.append((PALETTES.index(representative),items))
 return sorted(blocks,key=lambda b:b[0])
def arrange(entries):return [p for _,items in series_blocks(entries) for p in items]
def paginate(entries,limit=12):
 blocks=series_blocks(entries);pending=[]
 for tone,items in blocks:
  pending.extend((tone,items[i:i+limit]) for i in range(0,len(items),limit))
 pages=[]
 while pending:
  tone,items=pending.pop(0);page=list(items)
  while len(page)<limit:
   candidates=[(abs(tone-other),i) for i,(other,items) in enumerate(pending) if len(items)<=limit-len(page)]
   if not candidates:break
   _,i=min(candidates);page.extend(pending.pop(i)[1])
  pages.append(page)
 return pages
