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
