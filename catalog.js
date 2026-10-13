'use strict';
const products = {
 candle: { title: 'Scented candle', description: 'A warm glow, a gentle scent, a moment just for you. Explore a candle ritual for slow evenings and everyday pauses.', label: 'The art of slowing down.' },
 reed: { title: 'Reed diffuser', description: 'A quiet, continuous presence. Discover fragrances designed to bring a welcoming feeling to living rooms, entryways and personal spaces.', label: 'A beautiful, lasting presence.' },
 crystal: { title: 'Crystal diffuser', description: 'A sculptural scent ritual. Pair decorative crystals with your preferred fragrance to create a personal accent for a desk, bedside or reading corner.', label: 'Scent, in a different light.' },
 gift: { title: 'The ritual gift set', description: 'Explore beautifully presented crystal diffuser gift sets, including glass dome, sculpted bowl and botanical glass designs. Contact us to discuss your preferred collection and fragrance.', label: 'Beautiful to give. Lovely to keep.' }
};
const scents = [
 ['Santal & Amber','Woody','Sandalwood · amber · musk'],['Cedar & Fig','Woody','Cedar · fig leaf · green woods'],['Hinoki Forest','Woody','Hinoki · cypress · moss'],['Oud & Saffron','Woody','Oud · saffron · dry woods'],['Vetiver & Moss','Woody','Vetiver · oakmoss · earth'],
 ['Rose & Peony','Floral','Rose · peony · soft musk'],['Jasmine Tea','Floral','Jasmine · tea leaf · musk'],['White Neroli','Floral','Neroli · orange blossom · petitgrain'],['Iris & Violet','Floral','Iris · violet · powder'],['Tuberose at Dusk','Floral','Tuberose · jasmine · cream'],
 ['Bergamot & Lime','Citrus','Bergamot · lime · green tea'],['Yuzu & Ginger','Citrus','Yuzu · ginger · lemon'],['Mandarin Grove','Citrus','Mandarin · orange leaf · cedar'],['Grapefruit & Basil','Citrus','Grapefruit · basil · vetiver'],['Lemon Verbena','Citrus','Lemon · verbena · green leaf'],
 ['Sea Salt & Sage','Fresh','Sea salt · sage · driftwood'],['White Tea','Fresh','White tea · bergamot · musk'],['Lavender Linen','Fresh','Lavender · clean linen · musk'],['Eucalyptus Mint','Fresh','Eucalyptus · mint · green notes'],['Rain & Bamboo','Fresh','Bamboo · watery notes · green leaf'],
 ['Vanilla & Tonka','Gourmand','Vanilla · tonka · soft woods'],['Pistachio Cream','Gourmand','Pistachio · almond · vanilla'],['Coconut & Sandalwood','Gourmand','Coconut · sandalwood · cream'],['Coffee & Cacao','Gourmand','Coffee · cacao · vanilla'],['Pear & Freesia','Gourmand','Pear · freesia · soft amber'],
 ['Amber & Cashmere','Warm','Amber · cashmere woods · musk'],['Black Tea & Spice','Warm','Black tea · cardamom · cedar'],['Incense & Myrrh','Warm','Incense · myrrh · resins'],['Suede & Santal','Warm','Suede · sandalwood · musk'],['Cardamom & Cedar','Warm','Cardamom · cedar · amber']
].map(([name,family,notes],index)=>({id:`fragrance-${index+1}`,name,family,notes,products:family==='Gourmand'?['candle','reed']:['candle','reed','crystal']}));

const candleProducts = [
  {
    "id": "candle-pair-706a9cb934df",
    "name": "Gardenia",
    "series": "Vintage Florals",
    "image": "assets/candles/paired/706a9cb934df23f1ce96.webp",
    "packagingImage": "assets/candles/paired/a2e5095ea428772230e4.webp",
    "images": [
      "assets/candles/paired/706a9cb934df23f1ce96.webp",
      "assets/candles/paired/a2e5095ea428772230e4.webp"
    ]
  },
  {
    "id": "candle-pair-10d7297ec4e2",
    "name": "Bluebell",
    "series": "Vintage Florals",
    "image": "assets/candles/paired/10d7297ec4e2e39c4df6.webp",
    "packagingImage": "assets/candles/paired/f269bd4932b34f76054f.webp",
    "images": [
      "assets/candles/paired/10d7297ec4e2e39c4df6.webp",
      "assets/candles/paired/f269bd4932b34f76054f.webp"
    ]
  },
  {
    "id": "candle-pair-73e3d5c1bd30",
    "name": "Amber Glass",
    "series": "Classic Amber",
    "image": "assets/candles/paired/73e3d5c1bd304f9fbfb5.webp",
    "packagingImage": "assets/candles/paired/c66deb8739623b19f52b.webp",
    "images": [
      "assets/candles/paired/73e3d5c1bd304f9fbfb5.webp",
      "assets/candles/paired/c66deb8739623b19f52b.webp"
    ]
  },
  {
    "id": "candle-pair-3ae397f5d9f6",
    "name": "Lucky No. 6",
    "series": "Lucky Numbers",
    "image": "assets/candles/paired/3ae397f5d9f617bbf348.webp",
    "packagingImage": "assets/candles/paired/d3b115bb2804bfbd8b3b.webp",
    "images": [
      "assets/candles/paired/3ae397f5d9f617bbf348.webp",
      "assets/candles/paired/d3b115bb2804bfbd8b3b.webp"
    ]
  },
  {
    "id": "candle-pair-07944550f1fc",
    "name": "Lucky No. 2",
    "series": "Lucky Numbers",
    "image": "assets/candles/paired/07944550f1fc2592d815.webp",
    "packagingImage": "assets/candles/paired/1110e2e926713baf03d6.webp",
    "images": [
      "assets/candles/paired/07944550f1fc2592d815.webp",
      "assets/candles/paired/1110e2e926713baf03d6.webp"
    ]
  },
  {
    "id": "candle-pair-c1025ec341c6",
    "name": "Lucky No. 8",
    "series": "Lucky Numbers",
    "image": "assets/candles/paired/c1025ec341c6a7b60413.webp",
    "packagingImage": "assets/candles/paired/4d07ee5940491e00b5f8.webp",
    "images": [
      "assets/candles/paired/c1025ec341c6a7b60413.webp",
      "assets/candles/paired/4d07ee5940491e00b5f8.webp"
    ]
  },
  {
    "id": "candle-pair-7be1aa85d017",
    "name": "Ruby Bow",
    "series": "Lolita",
    "image": "assets/candles/paired/7be1aa85d0170c284922.webp",
    "packagingImage": "assets/candles/paired/9e696612e82bc93aa01b.webp",
    "images": [
      "assets/candles/paired/7be1aa85d0170c284922.webp",
      "assets/candles/paired/9e696612e82bc93aa01b.webp"
    ]
  },
  {
    "id": "candle-pair-14b03567b9e1",
    "name": "Blush Bow",
    "series": "Lolita",
    "image": "assets/candles/paired/14b03567b9e1d531039d.webp",
    "packagingImage": "assets/candles/paired/16e3c5bbc6ba450f1b8d.webp",
    "images": [
      "assets/candles/paired/14b03567b9e1d531039d.webp",
      "assets/candles/paired/16e3c5bbc6ba450f1b8d.webp"
    ]
  },
  {
    "id": "candle-pair-b1a337722ec5",
    "name": "Dark Woods",
    "series": "Lace Glass",
    "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
    "packagingImage": "assets/candles/paired/2dc32de313a8e84fcf59.webp",
    "images": [
      "assets/candles/paired/b1a337722ec53404ae09.webp",
      "assets/candles/paired/2dc32de313a8e84fcf59.webp"
    ]
  },
  {
    "id": "candle-pair-d9feede215a3",
    "name": "Baltic Amber",
    "series": "Lace Glass",
    "image": "assets/candles/paired/d9feede215a30484aa79.webp",
    "packagingImage": "assets/candles/paired/9abe0bfd62ce490f1fed.webp",
    "images": [
      "assets/candles/paired/d9feede215a30484aa79.webp",
      "assets/candles/paired/9abe0bfd62ce490f1fed.webp"
    ]
  },
  {
    "id": "candle-pair-cdc473daed5f",
    "name": "White Peach Oolong",
    "series": "Lace Glass",
    "image": "assets/candles/paired/cdc473daed5f344ade64.webp",
    "packagingImage": "assets/candles/paired/693b598247312f2d6f9d.webp",
    "images": [
      "assets/candles/paired/cdc473daed5f344ade64.webp",
      "assets/candles/paired/693b598247312f2d6f9d.webp"
    ]
  },
  {
    "id": "candle-pair-d6e65e02000c",
    "name": "Blood Orange",
    "series": "Lace Glass",
    "image": "assets/candles/paired/d6e65e02000c1649cfca.webp",
    "packagingImage": "assets/candles/paired/7aaf53f3e8bba6621716.webp",
    "images": [
      "assets/candles/paired/d6e65e02000c1649cfca.webp",
      "assets/candles/paired/7aaf53f3e8bba6621716.webp"
    ]
  },
  {
    "id": "candle-pair-b2a6e2ce97db",
    "name": "White Florals",
    "series": "Lace Glass",
    "image": "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
    "packagingImage": "assets/candles/paired/dc3f55e7c387f686ab57.webp",
    "images": [
      "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
      "assets/candles/paired/dc3f55e7c387f686ab57.webp"
    ]
  },
  {
    "id": "candle-pair-287d23366d4c",
    "name": "Provence Lavender",
    "series": "Lace Glass",
    "image": "assets/candles/paired/287d23366d4c063f04f9.webp",
    "packagingImage": "assets/candles/paired/c312bc78bf1b43b0d8dd.webp",
    "images": [
      "assets/candles/paired/287d23366d4c063f04f9.webp",
      "assets/candles/paired/c312bc78bf1b43b0d8dd.webp"
    ]
  },
  {
    "id": "candle-pair-4fbc33c9500b",
    "name": "Ivory Porcelain",
    "series": "Minimal Relief",
    "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
    "packagingImage": "assets/candles/paired/106d2fc4935b4b7b2cc4.webp",
    "images": [
      "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
      "assets/candles/paired/106d2fc4935b4b7b2cc4.webp"
    ]
  },
  {
    "id": "candle-pair-5489f55a8056",
    "name": "Gardenia",
    "series": "Gradient Glass",
    "image": "assets/candles/paired/5489f55a80565a8ad3b2.webp",
    "packagingImage": "assets/candles/paired/b0855ecbddc2adcdcf30.webp",
    "images": [
      "assets/candles/paired/5489f55a80565a8ad3b2.webp",
      "assets/candles/paired/b0855ecbddc2adcdcf30.webp"
    ]
  },
  {
    "id": "candle-pair-f62beb39ab18",
    "name": "Lavender",
    "series": "Gradient Glass",
    "image": "assets/candles/paired/f62beb39ab1806d66782.webp",
    "packagingImage": "assets/candles/paired/ae3112e954834affa0dd.webp",
    "images": [
      "assets/candles/paired/f62beb39ab1806d66782.webp",
      "assets/candles/paired/ae3112e954834affa0dd.webp"
    ]
  },
  {
    "id": "candle-pair-b09baac75da0",
    "name": "Vanilla",
    "series": "Gradient Glass",
    "image": "assets/candles/paired/b09baac75da0893acee3.webp",
    "packagingImage": "assets/candles/paired/ae7ebd2a2b6d58486da2.webp",
    "images": [
      "assets/candles/paired/b09baac75da0893acee3.webp",
      "assets/candles/paired/ae7ebd2a2b6d58486da2.webp"
    ]
  },
  {
    "id": "candle-pair-7af4fa22a012",
    "name": "Osmanthus",
    "series": "Postbox",
    "image": "assets/candles/paired/7af4fa22a012b5c0ef40.webp",
    "packagingImage": "assets/candles/paired/67ebc54f4c26fd7d7c4f.webp",
    "images": [
      "assets/candles/paired/7af4fa22a012b5c0ef40.webp",
      "assets/candles/paired/67ebc54f4c26fd7d7c4f.webp"
    ]
  },
  {
    "id": "candle-pair-20c64492ea43",
    "name": "Lavender",
    "series": "Postbox",
    "image": "assets/candles/paired/20c64492ea431b4ad239.webp",
    "packagingImage": "assets/candles/paired/bb066868239f215d9791.webp",
    "images": [
      "assets/candles/paired/20c64492ea431b4ad239.webp",
      "assets/candles/paired/bb066868239f215d9791.webp"
    ]
  },
  {
    "id": "candle-pair-986d2edec086",
    "name": "Peach Oolong",
    "series": "Postbox",
    "image": "assets/candles/paired/986d2edec0865818a739.webp",
    "packagingImage": "assets/candles/paired/344cc96301badbf5193c.webp",
    "images": [
      "assets/candles/paired/986d2edec0865818a739.webp",
      "assets/candles/paired/344cc96301badbf5193c.webp"
    ]
  },
  {
    "id": "candle-pair-e2419ac62b56",
    "name": "Lime Basil",
    "series": "Postbox",
    "image": "assets/candles/paired/e2419ac62b562d3b0520.webp",
    "packagingImage": "assets/candles/paired/55e6b22f7e789ed6870f.webp",
    "images": [
      "assets/candles/paired/e2419ac62b562d3b0520.webp",
      "assets/candles/paired/55e6b22f7e789ed6870f.webp"
    ]
  },
  {
    "id": "candle-pair-9dbd2373b514",
    "name": "Island Cotton",
    "series": "Postbox",
    "image": "assets/candles/paired/9dbd2373b514ef18213d.webp",
    "packagingImage": "assets/candles/paired/fcd88f6d07b78575664d.webp",
    "images": [
      "assets/candles/paired/9dbd2373b514ef18213d.webp",
      "assets/candles/paired/fcd88f6d07b78575664d.webp"
    ]
  },
  {
    "id": "candle-pair-522eb2b41054",
    "name": "Ivory Oval",
    "series": "Oval Relief",
    "image": "assets/candles/paired/522eb2b410541447b0fc.webp",
    "packagingImage": "assets/candles/paired/8a70871381303efce209.webp",
    "images": [
      "assets/candles/paired/522eb2b410541447b0fc.webp",
      "assets/candles/paired/8a70871381303efce209.webp"
    ]
  },
  {
    "id": "candle-pair-ef573ef4b49c",
    "name": "Pearl Ivory",
    "series": "Iridescent",
    "image": "assets/candles/paired/ef573ef4b49c1af85848.webp",
    "packagingImage": "assets/candles/paired/6656addaa2c24bdf1028.webp",
    "images": [
      "assets/candles/paired/ef573ef4b49c1af85848.webp",
      "assets/candles/paired/6656addaa2c24bdf1028.webp"
    ]
  },
  {
    "id": "candle-pair-947cbc1d98de",
    "name": "Obsidian",
    "series": "Iridescent",
    "image": "assets/candles/paired/947cbc1d98dee6da5d51.webp",
    "packagingImage": "assets/candles/paired/54011dbbaaf2210a2aae.webp",
    "images": [
      "assets/candles/paired/947cbc1d98dee6da5d51.webp",
      "assets/candles/paired/54011dbbaaf2210a2aae.webp"
    ]
  },
  {
    "id": "candle-pair-a890e2a4dac9",
    "name": "Ivory Sunflower",
    "series": "Sunflower",
    "image": "assets/candles/paired/a890e2a4dac981243da3.webp",
    "packagingImage": "assets/candles/paired/c7a0b25b8a3f49c19bd0.webp",
    "images": [
      "assets/candles/paired/a890e2a4dac981243da3.webp",
      "assets/candles/paired/c7a0b25b8a3f49c19bd0.webp"
    ]
  },
  {
    "id": "candle-pair-2d960ad5048d",
    "name": "Golden Sunflower",
    "series": "Sunflower",
    "image": "assets/candles/paired/2d960ad5048dc6d12875.webp",
    "packagingImage": "assets/candles/paired/3e76ed4ff03598873fcc.webp",
    "images": [
      "assets/candles/paired/2d960ad5048dc6d12875.webp",
      "assets/candles/paired/3e76ed4ff03598873fcc.webp"
    ]
  },
  {
    "id": "candle-pair-e6a379ea95e7",
    "name": "Iced Patchouli",
    "series": "Organic Glass",
    "image": "assets/candles/paired/e6a379ea95e7f1408253.webp",
    "packagingImage": "assets/candles/paired/f841e8ccae48704eac5b.webp",
    "images": [
      "assets/candles/paired/e6a379ea95e7f1408253.webp",
      "assets/candles/paired/f841e8ccae48704eac5b.webp"
    ]
  },
  {
    "id": "candle-pair-1f1fd2e0ca38",
    "name": "Desert Rose",
    "series": "Organic Glass",
    "image": "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
    "packagingImage": "assets/candles/paired/e825cd690be6d303c884.webp",
    "images": [
      "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
      "assets/candles/paired/e825cd690be6d303c884.webp"
    ]
  },
  {
    "id": "candle-pair-e9583a062cd6",
    "name": "Ivory Deer",
    "series": "Deer Collection",
    "image": "assets/candles/paired/e9583a062cd69e708bb4.webp",
    "packagingImage": "assets/candles/paired/cd4259b2f7df021f41bf.webp",
    "images": [
      "assets/candles/paired/e9583a062cd69e708bb4.webp",
      "assets/candles/paired/cd4259b2f7df021f41bf.webp"
    ]
  },
  {
    "id": "candle-pair-6557fed21b15",
    "name": "Smoky Deer",
    "series": "Deer Collection",
    "image": "assets/candles/paired/6557fed21b15dacbccfa.webp",
    "packagingImage": "assets/candles/paired/b7f54f3e9c2cb871ec9d.webp",
    "images": [
      "assets/candles/paired/6557fed21b15dacbccfa.webp",
      "assets/candles/paired/b7f54f3e9c2cb871ec9d.webp"
    ]
  },
  {
    "id": "candle-pair-b053837f0428",
    "name": "Birthday Celebration",
    "series": "Playful Birthday",
    "image": "assets/candles/paired/b053837f042853978ab8.webp",
    "packagingImage": "assets/candles/paired/82b416ab42c6f7b94661.webp",
    "images": [
      "assets/candles/paired/b053837f042853978ab8.webp",
      "assets/candles/paired/82b416ab42c6f7b94661.webp"
    ]
  },
  {
    "id": "candle-pair-257c6ea41af4",
    "name": "Pumpkin & Ghost",
    "series": "Halloween",
    "image": "assets/candles/paired/257c6ea41af465989ab3.webp",
    "packagingImage": "assets/candles/paired/c33e601c26cf2548040e.webp",
    "images": [
      "assets/candles/paired/257c6ea41af465989ab3.webp",
      "assets/candles/paired/c33e601c26cf2548040e.webp"
    ]
  },
  {
    "name": "Concrete — 01",
    "image": "assets/candles/candles-001.webp",
    "series": "Concrete"
  },
  {
    "name": "Concrete — 02",
    "image": "assets/candles/candles-002.webp",
    "series": "Concrete"
  },
  {
    "name": "Round Gift Box — 01",
    "image": "assets/candles/candles-003.webp",
    "series": "Round Gift Box"
  },
  {
    "name": "Clock — 01",
    "image": "assets/candles/candles-004.webp",
    "series": "Clock"
  },
  {
    "name": "Clock — 02",
    "image": "assets/candles/candles-005.webp",
    "series": "Clock"
  },
  {
    "name": "Metallic Finish — 01",
    "image": "assets/candles/candles-006.webp",
    "series": "Metallic Finish"
  },
  {
    "name": "Metallic Finish — 02",
    "image": "assets/candles/candles-007.webp",
    "series": "Metallic Finish"
  },
  {
    "name": "Woven — 01",
    "image": "assets/candles/candles-008.webp",
    "series": "Woven"
  },
  {
    "name": "Woven — 02",
    "image": "assets/candles/candles-009.webp",
    "series": "Woven"
  },
  {
    "name": "Woven — 03",
    "image": "assets/candles/candles-010.webp",
    "series": "Woven"
  },
  {
    "name": "Sunlit Rituals — 01",
    "image": "assets/candles/candles-011.webp",
    "series": "Sunlit Rituals"
  },
  {
    "name": "Sunlit Rituals — 02",
    "image": "assets/candles/candles-012.webp",
    "series": "Sunlit Rituals"
  },
  {
    "name": "Metallic — 01",
    "image": "assets/candles/candles-013.webp",
    "series": "Metallic"
  },
  {
    "name": "Metallic — 02",
    "image": "assets/candles/candles-014.webp",
    "series": "Metallic"
  },
  {
    "name": "Pet Portraits — 01",
    "image": "assets/candles/candles-015.webp",
    "series": "Pet Portraits"
  },
  {
    "name": "Pet Portraits — 02",
    "image": "assets/candles/candles-016.webp",
    "series": "Pet Portraits"
  },
  {
    "name": "Pet Portraits — 03",
    "image": "assets/candles/candles-017.webp",
    "series": "Pet Portraits"
  },
  {
    "name": "Pet Portraits — 04",
    "image": "assets/candles/candles-018.webp",
    "series": "Pet Portraits"
  },
  {
    "name": "Wild — 01",
    "image": "assets/candles/candles-019.webp",
    "series": "Wild"
  },
  {
    "name": "Wild — 02",
    "image": "assets/candles/candles-020.webp",
    "series": "Wild"
  },
  {
    "name": "Wild — 03",
    "image": "assets/candles/candles-021.webp",
    "series": "Wild"
  },
  {
    "name": "Vanilla & Peony — 01",
    "image": "assets/candles/candles-022.webp",
    "series": "Vanilla & Peony"
  },
  {
    "name": "Vanilla & Peony — 02",
    "image": "assets/candles/candles-023.webp",
    "series": "Vanilla & Peony"
  },
  {
    "name": "Nature Poetry — 01",
    "image": "assets/candles/candles-024.webp",
    "series": "Nature Poetry"
  },
  {
    "name": "Nature Poetry — 02",
    "image": "assets/candles/candles-025.webp",
    "series": "Nature Poetry"
  },
  {
    "name": "Nature Poetry — 03",
    "image": "assets/candles/candles-026.webp",
    "series": "Nature Poetry"
  },
  {
    "name": "Nature Poetry — 04",
    "image": "assets/candles/candles-027.webp",
    "series": "Nature Poetry"
  },
  {
    "name": "Éloria — 01",
    "image": "assets/candles/candles-028.webp",
    "series": "Éloria"
  },
  {
    "name": "Éloria — 02",
    "image": "assets/candles/candles-029.webp",
    "series": "Éloria"
  },
  {
    "name": "Éloria — 03",
    "image": "assets/candles/candles-030.webp",
    "series": "Éloria"
  },
  {
    "name": "Dreamscape II — 01",
    "image": "assets/candles/candles-031.webp",
    "series": "Dreamscape II"
  },
  {
    "name": "Turquoise — 01",
    "image": "assets/candles/candles-032.webp",
    "series": "Turquoise"
  },
  {
    "name": "Birthday — 01",
    "image": "assets/candles/candles-033.webp",
    "series": "Birthday"
  },
  {
    "name": "Birthday — 02",
    "image": "assets/candles/candles-034.webp",
    "series": "Birthday"
  },
  {
    "name": "Birthday — 03",
    "image": "assets/candles/candles-035.webp",
    "series": "Birthday"
  },
  {
    "name": "Glass Dome — 01",
    "image": "assets/candles/candles-036.webp",
    "series": "Glass Dome"
  },
  {
    "name": "Glass Dome — 02",
    "image": "assets/candles/candles-037.webp",
    "series": "Glass Dome"
  },
  {
    "name": "Glass Dome — 03",
    "image": "assets/candles/candles-038.webp",
    "series": "Glass Dome"
  },
  {
    "name": "Glass Dome — 04",
    "image": "assets/candles/candles-039.webp",
    "series": "Glass Dome"
  },
  {
    "name": "Glass Dome — 05",
    "image": "assets/candles/candles-040.webp",
    "series": "Glass Dome"
  },
  {
    "name": "Her · Him · Us — 01",
    "image": "assets/candles/candles-041.webp",
    "series": "Her · Him · Us"
  },
  {
    "name": "Her · Him · Us — 02",
    "image": "assets/candles/candles-042.webp",
    "series": "Her · Him · Us"
  },
  {
    "name": "Her · Him · Us — 03",
    "image": "assets/candles/candles-043.webp",
    "series": "Her · Him · Us"
  },
  {
    "name": "Four Seasons Botanicals — 01",
    "image": "assets/candles/candles-044.webp",
    "series": "Four Seasons Botanicals"
  },
  {
    "name": "Four Seasons Botanicals — 02",
    "image": "assets/candles/candles-045.webp",
    "series": "Four Seasons Botanicals"
  },
  {
    "name": "Four Seasons Botanicals — 03",
    "image": "assets/candles/candles-046.webp",
    "series": "Four Seasons Botanicals"
  },
  {
    "name": "Four Seasons Botanicals — 04",
    "image": "assets/candles/candles-047.webp",
    "series": "Four Seasons Botanicals"
  },
  {
    "name": "Dreamscape — 01",
    "image": "assets/candles/candles-048.webp",
    "series": "Dreamscape"
  },
  {
    "name": "Dreamscape — 02",
    "image": "assets/candles/candles-049.webp",
    "series": "Dreamscape"
  },
  {
    "name": "Dreamscape — 03",
    "image": "assets/candles/candles-050.webp",
    "series": "Dreamscape"
  },
  {
    "name": "Garden — 01",
    "image": "assets/candles/candles-051.webp",
    "series": "Garden"
  },
  {
    "name": "Garden — 02",
    "image": "assets/candles/candles-052.webp",
    "series": "Garden"
  },
  {
    "name": "Garden — 03",
    "image": "assets/candles/candles-053.webp",
    "series": "Garden"
  },
  {
    "name": "Garden — 04",
    "image": "assets/candles/candles-054.webp",
    "series": "Garden"
  },
  {
    "name": "Forest Poetry — 01",
    "image": "assets/candles/candles-055.webp",
    "series": "Forest Poetry"
  },
  {
    "name": "Forest Poetry — 02",
    "image": "assets/candles/candles-056.webp",
    "series": "Forest Poetry"
  },
  {
    "name": "Garden Reverie — 01",
    "image": "assets/candles/candles-057.webp",
    "series": "Garden Reverie"
  },
  {
    "name": "Garden Reverie — 02",
    "image": "assets/candles/candles-058.webp",
    "series": "Garden Reverie"
  },
  {
    "name": "Garden Reverie — 03",
    "image": "assets/candles/candles-059.webp",
    "series": "Garden Reverie"
  },
  {
    "name": "Floral Reverie — 01",
    "image": "assets/candles/candles-060.webp",
    "series": "Floral Reverie"
  },
  {
    "name": "Floral Reverie — 02",
    "image": "assets/candles/candles-061.webp",
    "series": "Floral Reverie"
  },
  {
    "name": "Botanical Fragrance — 01",
    "image": "assets/candles/candles-062.webp",
    "series": "Botanical Fragrance"
  },
  {
    "name": "Botanical Fragrance — 02",
    "image": "assets/candles/candles-063.webp",
    "series": "Botanical Fragrance"
  },
  {
    "name": "Botanical Fragrance — 03",
    "image": "assets/candles/candles-064.webp",
    "series": "Botanical Fragrance"
  },
  {
    "name": "Botanical Fragrance — 04",
    "image": "assets/candles/candles-065.webp",
    "series": "Botanical Fragrance"
  },
  {
    "name": "Bright Glass — 01",
    "image": "assets/candles/candles-066.webp",
    "series": "Bright Glass"
  },
  {
    "name": "Bright Glass — 02",
    "image": "assets/candles/candles-067.webp",
    "series": "Bright Glass"
  },
  {
    "name": "Amber Dream — 01",
    "image": "assets/candles/candles-068.webp",
    "series": "Amber Dream"
  },
  {
    "name": "Colour Stories — 01",
    "image": "assets/candles/candles-069.webp",
    "series": "Colour Stories"
  },
  {
    "name": "Colour Stories — 02",
    "image": "assets/candles/candles-070.webp",
    "series": "Colour Stories"
  },
  {
    "name": "Colour Stories — 03",
    "image": "assets/candles/candles-071.webp",
    "series": "Colour Stories"
  },
  {
    "name": "Christmas — 01",
    "image": "assets/candles/candles-072.webp",
    "series": "Christmas"
  },
  {
    "name": "Christmas — 02",
    "image": "assets/candles/candles-073.webp",
    "series": "Christmas"
  },
  {
    "name": "Christmas — 03",
    "image": "assets/candles/candles-074.webp",
    "series": "Christmas"
  },
  {
    "name": "Bamboo — 01",
    "image": "assets/candles/candles-075.webp",
    "series": "Bamboo"
  },
  {
    "name": "Bamboo — 02",
    "image": "assets/candles/candles-076.webp",
    "series": "Bamboo"
  },
  {
    "name": "Stone — 01",
    "image": "assets/candles/candles-077.webp",
    "series": "Stone"
  },
  {
    "name": "Stone — 02",
    "image": "assets/candles/candles-078.webp",
    "series": "Stone"
  },
  {
    "name": "Square — 01",
    "image": "assets/candles/candles-079.webp",
    "series": "Square"
  },
  {
    "name": "Square — 02",
    "image": "assets/candles/candles-080.webp",
    "series": "Square"
  },
  {
    "name": "Sculpted Relief — 01",
    "image": "assets/candles/candles-081.webp",
    "series": "Sculpted Relief"
  },
  {
    "name": "Sculpted Relief — 02",
    "image": "assets/candles/candles-082.webp",
    "series": "Sculpted Relief"
  },
  {
    "name": "Sculpted Relief — 03",
    "image": "assets/candles/candles-083.webp",
    "series": "Sculpted Relief"
  },
  {
    "name": "Playful Glass Dome — 01",
    "image": "assets/candles/candles-084.webp",
    "series": "Playful Glass Dome"
  },
  {
    "name": "Playful Glass Dome — 02",
    "image": "assets/candles/candles-085.webp",
    "series": "Playful Glass Dome"
  },
  {
    "name": "Playful Glass Dome — 03",
    "image": "assets/candles/candles-086.webp",
    "series": "Playful Glass Dome"
  },
  {
    "name": "Playful Glass Dome — 04",
    "image": "assets/candles/candles-087.webp",
    "series": "Playful Glass Dome"
  },
  {
    "name": "Ivory Stone — 01",
    "image": "assets/candles/candles-088.webp",
    "series": "Ivory Stone"
  },
  {
    "name": "Jellyfish — 01",
    "image": "assets/candles/candles-089.webp",
    "series": "Jellyfish"
  }
];
const reedProducts = [
  {
    "name": "Colour Collection",
    "image": "assets/reeds/reed-01.webp",
    "series": "Reed diffuser collection"
  },
  {
    "name": "Seven-Colour Gift Set",
    "image": "assets/reeds/reed-02.webp",
    "series": "Reed diffuser gift set"
  },
  {
    "name": "Rain Forest Reed Diffuser",
    "image": "assets/reeds/reed-03.webp",
    "series": "Reed diffuser"
  },
  {
    "name": "Rain Forest Bottle & Box",
    "image": "assets/reeds/reed-04.webp",
    "series": "Fragrance bottle and packaging"
  },
  {
    "name": "Tea Rituals — 01",
    "image": "assets/reeds/reeds-090.webp",
    "series": "Tea Rituals"
  },
  {
    "name": "Tea Rituals — 02",
    "image": "assets/reeds/reeds-091.webp",
    "series": "Tea Rituals"
  },
  {
    "name": "Tea Rituals — 03",
    "image": "assets/reeds/reeds-092.webp",
    "series": "Tea Rituals"
  },
  {
    "name": "Tea Rituals — 04",
    "image": "assets/reeds/reeds-093.webp",
    "series": "Tea Rituals"
  },
  {
    "name": "Fresh Moments — 01",
    "image": "assets/reeds/reeds-094.webp",
    "series": "Fresh Moments"
  },
  {
    "name": "Fresh Moments — 02",
    "image": "assets/reeds/reeds-095.webp",
    "series": "Fresh Moments"
  },
  {
    "name": "Fresh Moments — 03",
    "image": "assets/reeds/reeds-096.webp",
    "series": "Fresh Moments"
  },
  {
    "name": "Fresh Moments — 04",
    "image": "assets/reeds/reeds-097.webp",
    "series": "Fresh Moments"
  },
  {
    "name": "Pastel — 01",
    "image": "assets/reeds/reeds-098.webp",
    "series": "Pastel"
  },
  {
    "name": "Pastel — 02",
    "image": "assets/reeds/reeds-099.webp",
    "series": "Pastel"
  },
  {
    "name": "Mountain — 01",
    "image": "assets/reeds/reeds-100.webp",
    "series": "Mountain"
  },
  {
    "name": "Mountain — 02",
    "image": "assets/reeds/reeds-101.webp",
    "series": "Mountain"
  },
  {
    "name": "Mountain — 03",
    "image": "assets/reeds/reeds-102.webp",
    "series": "Mountain"
  },
  {
    "name": "Botanical — 01",
    "image": "assets/reeds/reeds-103.webp",
    "series": "Botanical"
  },
  {
    "name": "Cylindrical — 01",
    "image": "assets/reeds/reeds-104.webp",
    "series": "Cylindrical"
  },
  {
    "name": "Cylindrical — 02",
    "image": "assets/reeds/reeds-105.webp",
    "series": "Cylindrical"
  },
  {
    "name": "Cylindrical — 03",
    "image": "assets/reeds/reeds-106.webp",
    "series": "Cylindrical"
  },
  {
    "name": "Cylindrical — 04",
    "image": "assets/reeds/reeds-107.webp",
    "series": "Cylindrical"
  },
  {
    "name": "Square Glass — 01",
    "image": "assets/reeds/reeds-108.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 02",
    "image": "assets/reeds/reeds-109.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 03",
    "image": "assets/reeds/reeds-110.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 04",
    "image": "assets/reeds/reeds-111.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 05",
    "image": "assets/reeds/reeds-112.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 06",
    "image": "assets/reeds/reeds-113.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 07",
    "image": "assets/reeds/reeds-114.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 08",
    "image": "assets/reeds/reeds-115.webp",
    "series": "Square Glass"
  },
  {
    "name": "Botanical Infusion — 01",
    "image": "assets/reeds/reeds-116.webp",
    "series": "Botanical Infusion"
  },
  {
    "name": "Botanical Infusion — 02",
    "image": "assets/reeds/reeds-117.webp",
    "series": "Botanical Infusion"
  },
  {
    "name": "Botanical Infusion — 03",
    "image": "assets/reeds/reeds-118.webp",
    "series": "Botanical Infusion"
  },
  {
    "name": "Minimal — 01",
    "image": "assets/reeds/reeds-119.webp",
    "series": "Minimal"
  },
  {
    "name": "Minimal — 02",
    "image": "assets/reeds/reeds-120.webp",
    "series": "Minimal"
  },
  {
    "name": "Sculptural — 01",
    "image": "assets/reeds/reeds-121.webp",
    "series": "Sculptural"
  },
  {
    "name": "Metallic — 01",
    "image": "assets/reeds/reeds-122.webp",
    "series": "Metallic"
  },
  {
    "name": "Metallic — 02",
    "image": "assets/reeds/reeds-123.webp",
    "series": "Metallic"
  },
  {
    "name": "Blush — 01",
    "image": "assets/reeds/reeds-124.webp",
    "series": "Blush"
  },
  {
    "name": "Spherical — 01",
    "image": "assets/reeds/reeds-125.webp",
    "series": "Spherical"
  },
  {
    "name": "Spherical — 02",
    "image": "assets/reeds/reeds-126.webp",
    "series": "Spherical"
  },
  {
    "name": "Spherical — 03",
    "image": "assets/reeds/reeds-127.webp",
    "series": "Spherical"
  },
  {
    "name": "Classic Amber — 01",
    "image": "assets/reeds/reeds-128.webp",
    "series": "Classic Amber"
  },
  {
    "name": "Classic Amber — 02",
    "image": "assets/reeds/reeds-129.webp",
    "series": "Classic Amber"
  },
  {
    "name": "Sandalwood — 01",
    "image": "assets/reeds/reeds-130.webp",
    "series": "Sandalwood"
  },
  {
    "name": "Amber Bouquet",
    "image": "assets/reeds/reed-c188d2780401e54a.webp",
    "series": "Floral Bouquet"
  },
  {
    "name": "Amber Tea",
    "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
    "series": "Floral Bouquet"
  },
  {
    "name": "White Tea Blossom",
    "image": "assets/reeds/reed-374f9f3b71955935.webp",
    "series": "Floral Bouquet"
  },
  {
    "name": "Amber Floral Arrangement",
    "image": "assets/reeds/reed-61ad69a502bd3498.webp",
    "series": "Floral Bouquet"
  },
  {
    "name": "White Gardenia",
    "image": "assets/reeds/reed-3646bcf197e2090c.webp",
    "series": "Floral Bouquet"
  },
  {
    "name": "Four Seasons Tea",
    "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Gardenia & White Tea",
    "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Osmanthus & Longjing",
    "image": "assets/reeds/reed-f82a3208f64026bc.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Plum & Sencha",
    "image": "assets/reeds/reed-1883f549fd4393dd.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Olive Magnolia",
    "image": "assets/reeds/reed-0d3f3a982460ae6d.webp",
    "series": "Floral Tea"
  },
  {
    "name": "White Peach & Oolong",
    "image": "assets/reeds/reed-6ffc48159c0055e0.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Jasmine Green Tea",
    "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
    "series": "Floral Tea"
  },
  {
    "name": "Seven-Day Fragrance Gift Set",
    "image": "assets/reeds/reed-6760c2cb73451078.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Refresh",
    "image": "assets/reeds/reed-e216d9fbfb361cfc.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Joy",
    "image": "assets/reeds/reed-ab4ba29f23a51f7f.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Focus",
    "image": "assets/reeds/reed-fb8173ad10d76faa.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Spark",
    "image": "assets/reeds/reed-baddad1b04ff467e.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Wander",
    "image": "assets/reeds/reed-7a574f3e4a4ab4e6.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Glow",
    "image": "assets/reeds/reed-8d477d2ae4137382.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Rest",
    "image": "assets/reeds/reed-167e5464ca5d6fc7.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Winter Bonfire",
    "image": "assets/reeds/reed-56e38210a5f9a26d.webp",
    "series": "Festive"
  },
  {
    "name": "Christmas Amber",
    "image": "assets/reeds/reed-b695597b0dabb53c.webp",
    "series": "Festive"
  },
  {
    "name": "Fireside Wishes",
    "image": "assets/reeds/reed-b96dc85d16ee173c.webp",
    "series": "Festive"
  },
  {
    "name": "Cedar Cabin",
    "image": "assets/reeds/reed-5e8b9aaf6c03a6a0.webp",
    "series": "Festive"
  }
];
const crystalProducts = [
  {
    "name": "Peach Whisper",
    "image": "assets/crystals/crystal-01.webp",
    "series": "Glass dome"
  },
  {
    "name": "Lavender Reverie",
    "image": "assets/crystals/crystal-02.webp",
    "series": "Glass dome"
  },
  {
    "name": "Morning Mist",
    "image": "assets/crystals/crystal-03.webp",
    "series": "Glass dome"
  },
  {
    "name": "Verdant Calm",
    "image": "assets/crystals/crystal-04.webp",
    "series": "Glass dome"
  },
  {
    "name": "Cedar Relief",
    "image": "assets/crystals/crystal-05.webp",
    "series": "Sculpted bowl"
  },
  {
    "name": "Ivory Texture",
    "image": "assets/crystals/crystal-06.webp",
    "series": "Sculpted bowl"
  },
  {
    "name": "Ivory Relief",
    "image": "assets/crystals/crystal-07.webp",
    "series": "Sculpted bowl"
  },
  {
    "name": "Amber Dusk",
    "image": "assets/crystals/crystal-08.webp",
    "series": "Sculpted bowl"
  },
  {
    "name": "Blue Serenity",
    "image": "assets/crystals/crystal-09.webp",
    "series": "Botanical glass"
  },
  {
    "name": "Purple Mist",
    "image": "assets/crystals/crystal-10.webp",
    "series": "Botanical glass"
  },
  {
    "name": "Rose Mist",
    "image": "assets/crystals/crystal-11.webp",
    "series": "Botanical glass"
  },
  {
    "name": "Botanical Light",
    "image": "assets/crystals/crystal-12.webp",
    "series": "Botanical glass"
  },
  {
    "name": "Forest Reverie",
    "image": "assets/crystals/crystal-13.webp",
    "series": "Botanical glass"
  }
];
