'use strict';
const products = {
 candle: { title: 'Scented candle', description: 'A warm glow, a gentle scent, a moment just for you. Explore a candle ritual for slow evenings and everyday pauses.', label: 'The art of slowing down.' },
 reed: { title: 'Reed diffuser', description: 'A quiet, continuous presence. Discover fragrances designed to bring a welcoming feeling to living rooms, entryways and personal spaces.', label: 'A beautiful, lasting presence.' },
 crystal: { title: 'Crystal diffuser', description: 'A sculptural scent ritual. Pair decorative crystals with your preferred fragrance to create a personal accent for a desk, bedside or reading corner.', label: 'Scent, in a different light.' },
 gift: { title: 'The ritual gift set', description: 'Explore thoughtfully paired candles, diffusers and fragrance accessories. Contact us to discuss your preferred collection and fragrance.', label: 'Beautiful to give. Lovely to keep.' }
};
const fragranceThemes = ["Floral & Fruity", "Warm & Woody", "Fresh & Natural", "Tea & Tranquility", "Oriental Mystery"];
const scents = [
  {
    "id": "pear-freesia",
    "name": "Pear & Freesia",
    "themes": [
      "Floral & Fruity"
    ],
    "top": [
      "Pear",
      "bergamot"
    ],
    "heart": [
      "Freesia",
      "rose"
    ],
    "base": [
      "White musk",
      "soft woods"
    ],
    "description": "Light, sweet and airy; living rooms, bedrooms and spring gifting.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/3d49e14d13a50bc979c6.webp",
        "name": "English Pear & Freesia",
        "series": "Triangular Glass",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F3d49e14d13a50bc979c6.webp&scent=pear-freesia"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F8efb79e6978aa255e72c.webp&scent=pear-freesia"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/14b03567b9e1d531039d.webp",
        "name": "Blush Bow",
        "series": "Lolita",
        "href": "candles-close-to-you-2.html?product=assets%2Fcandles%2Fpaired%2F14b03567b9e1d531039d.webp&scent=pear-freesia"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e710e9777530e1a2f07e.webp",
        "name": "English Pear & Freesia",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Fe710e9777530e1a2f07e.webp&scent=pear-freesia"
      },
      {
        "category": "reed",
        "image": "assets/companions/eb66283958ad1067c60b.webp",
        "name": "Cylindrical \u2014 03",
        "series": "Cylindrical",
        "href": "reeds-in-bloom-3.html?product=assets%2Fcompanions%2Feb66283958ad1067c60b.webp&scent=pear-freesia"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Freesia \u00b7 rose",
    "collectionHref": "fragrance-pear-freesia.html"
  },
  {
    "id": "rose-green-leaves",
    "name": "Rose & Green Leaves",
    "themes": [
      "Floral & Fruity",
      "Fresh & Natural"
    ],
    "top": [
      "Green leaves",
      "bergamot"
    ],
    "heart": [
      "Rose",
      "geranium"
    ],
    "base": [
      "White musk",
      "cedarwood"
    ],
    "description": "Freshly cut roses with a green lift; romantic spaces and thoughtful gifts.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-041.webp",
        "name": "Her \u00b7 Him \u00b7 Us \u2014 01",
        "series": "Her \u00b7 Him \u00b7 Us",
        "href": "candles-close-to-you.html?product=assets%2Fcandles%2Fcandles-041.webp&scent=rose-green-leaves"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-111.webp",
        "name": "Square Glass \u2014 04",
        "series": "Square Glass",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-111.webp&scent=rose-green-leaves"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Fb782592d405151c5df31.webp&scent=rose-green-leaves"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/7be1aa85d0170c284922.webp",
        "name": "Ruby Bow",
        "series": "Lolita",
        "href": "candles-close-to-you-2.html?product=assets%2Fcandles%2Fpaired%2F7be1aa85d0170c284922.webp&scent=rose-green-leaves"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Ff316b932be71fe3aaf88.webp&scent=rose-green-leaves"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
        "name": "Desert Rose",
        "series": "Organic Glass",
        "href": "candles-close-to-you-2.html?product=assets%2Fcandles%2Fpaired%2F1f1fd2e0ca388db40ca3.webp&scent=rose-green-leaves"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/799aa3dbeae7975a972b.webp",
        "name": "Pink Rose Tablet",
        "series": "Rose Fragrance Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F799aa3dbeae7975a972b.webp&scent=rose-green-leaves"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Rose \u00b7 geranium",
    "collectionHref": "fragrance-rose-green-leaves.html"
  },
  {
    "id": "peony-lychee",
    "name": "Peony & Lychee",
    "themes": [
      "Floral & Fruity"
    ],
    "top": [
      "Lychee",
      "pear"
    ],
    "heart": [
      "Peony",
      "rose"
    ],
    "base": [
      "White musk",
      "soft amber"
    ],
    "description": "Dewy, tender and gently sweet; bedrooms and dressing tables.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/27cc25f4936db9e927d9.webp",
        "name": "Peony Blossom",
        "series": "Triangular Glass",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F27cc25f4936db9e927d9.webp&scent=peony-lychee"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-023.webp",
        "name": "Vanilla & Peony \u2014 02",
        "series": "Vanilla & Peony",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fcandles-023.webp&scent=peony-lychee"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-022.webp",
        "name": "Vanilla & Peony \u2014 01",
        "series": "Vanilla & Peony",
        "href": "candles-close-to-you.html?product=assets%2Fcandles%2Fcandles-022.webp&scent=peony-lychee"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-098.webp",
        "name": "Pastel \u2014 01",
        "series": "Pastel",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-098.webp&scent=peony-lychee"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F8efb79e6978aa255e72c.webp&scent=peony-lychee"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/a7da1073bd57b2db2336.webp",
        "name": "Blush Glass Dome Duo",
        "series": "Blush Moments",
        "href": "gift-collection-2.html?product=assets%2Fgifts%2Fpaired%2Fa7da1073bd57b2db2336.webp&scent=peony-lychee"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Peony \u00b7 rose",
    "collectionHref": "fragrance-peony-lychee.html"
  },
  {
    "id": "jasmine-orange-blossom",
    "name": "Jasmine & Orange Blossom",
    "themes": [
      "Floral & Fruity",
      "Fresh & Natural"
    ],
    "top": [
      "Citrus",
      "petitgrain"
    ],
    "heart": [
      "Jasmine",
      "orange blossom"
    ],
    "base": [
      "Musk",
      "light woods"
    ],
    "description": "Bright white florals with a green touch; living rooms and entryways.",
    "matches": [
      {
        "category": "sachets",
        "image": "assets/sachets/paired/14eefcbb28cb40378e95.webp",
        "name": "Ivory Floral Wreath",
        "series": "Floral Wax Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F14eefcbb28cb40378e95.webp&scent=jasmine-orange-blossom"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
        "name": "White Florals",
        "series": "Lace Glass",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fpaired%2Fb2a6e2ce97db70ea6f8a.webp&scent=jasmine-orange-blossom"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
        "name": "Jasmine Green Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-640affaca6c8bc7e.webp&scent=jasmine-orange-blossom"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-115.webp",
        "name": "Square Glass \u2014 08",
        "series": "Square Glass",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-115.webp&scent=jasmine-orange-blossom"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/4d646c939a3be7d88aef.webp",
        "name": "Graphite Jasmine",
        "series": "Matte Glass",
        "href": "reeds-in-bloom-3.html?product=assets%2Freeds%2Fpaired%2F4d646c939a3be7d88aef.webp&scent=jasmine-orange-blossom"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Jasmine \u00b7 orange blossom",
    "collectionHref": "fragrance-jasmine-orange-blossom.html"
  },
  {
    "id": "gardenia-tuberose",
    "name": "Gardenia & Tuberose",
    "themes": [
      "Floral & Fruity"
    ],
    "top": [
      "Green leaves",
      "bergamot"
    ],
    "heart": [
      "Gardenia",
      "tuberose",
      "jasmine"
    ],
    "base": [
      "Sandalwood",
      "musk"
    ],
    "description": "Full-bodied white florals; spacious living rooms and statement arrangements.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/706a9cb934df23f1ce96.webp",
        "name": "Gardenia",
        "series": "Vintage Florals",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fpaired%2F706a9cb934df23f1ce96.webp&scent=gardenia-tuberose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/5f3d2fbfc68b486eeb50.webp",
        "name": "Moonlit Gardenia \u2014 Tall",
        "series": "Ribbed Ceramic",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F5f3d2fbfc68b486eeb50.webp&scent=gardenia-tuberose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/89098584f61f10212aea.webp",
        "name": "Moonlit Gardenia \u2014 Rounded",
        "series": "Ribbed Ceramic",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F89098584f61f10212aea.webp&scent=gardenia-tuberose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-101.webp",
        "name": "Mountain \u2014 02",
        "series": "Mountain",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-101.webp&scent=gardenia-tuberose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-db41da38fbfc9eb9.webp&scent=gardenia-tuberose"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/5489f55a80565a8ad3b2.webp",
        "name": "Gardenia",
        "series": "Gradient Glass",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fpaired%2F5489f55a80565a8ad3b2.webp&scent=gardenia-tuberose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-3646bcf197e2090c.webp",
        "name": "White Gardenia",
        "series": "Floral Bouquet",
        "href": "reeds-in-bloom-3.html?product=assets%2Freeds%2Freed-3646bcf197e2090c.webp&scent=gardenia-tuberose"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/2e09dbec67e3048635e7.webp",
        "name": "Moonlit Gardenia",
        "series": "Botanical Wax Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F2e09dbec67e3048635e7.webp&scent=gardenia-tuberose"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Gardenia \u00b7 tuberose \u00b7 jasmine",
    "collectionHref": "fragrance-gardenia-tuberose.html"
  },
  {
    "id": "lime-basil",
    "name": "Lime & Basil",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Lime",
      "mandarin"
    ],
    "heart": [
      "Basil",
      "thyme"
    ],
    "base": [
      "Vetiver",
      "cedarwood"
    ],
    "description": "Crisp citrus with a spicy green edge; entryways and shared spaces.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/companions/6bb45b8d3cadf69b519f.webp",
        "name": "Refresh",
        "series": "Seven-Day Rituals",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Fcompanions%2F6bb45b8d3cadf69b519f.webp&scent=lime-basil"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/e2419ac62b562d3b0520.webp",
        "name": "Lime Basil",
        "series": "Postbox",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fpaired%2Fe2419ac62b562d3b0520.webp&scent=lime-basil"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/301de746753e02d728ce.webp",
        "name": "Citrus Fern",
        "series": "Botanical Wax Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F301de746753e02d728ce.webp&scent=lime-basil"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1480094b012dbf961dae.webp",
        "name": "Coastal Lime",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F1480094b012dbf961dae.webp&scent=lime-basil"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-102.webp",
        "name": "Mountain \u2014 03",
        "series": "Mountain",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Freeds%2Freeds-102.webp&scent=lime-basil"
      },
      {
        "category": "reed",
        "image": "assets/companions/7ca9a742e8adc548081d.webp",
        "name": "Cylindrical \u2014 04",
        "series": "Cylindrical",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Fcompanions%2F7ca9a742e8adc548081d.webp&scent=lime-basil"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Basil \u00b7 thyme",
    "collectionHref": "fragrance-lime-basil.html"
  },
  {
    "id": "grapefruit-bergamot",
    "name": "Grapefruit & Bergamot",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Grapefruit",
      "bergamot"
    ],
    "heart": [
      "Orange blossom",
      "fresh greens"
    ],
    "base": [
      "White musk",
      "cedarwood"
    ],
    "description": "Clean, bright and lightly bitter; living rooms and workspaces.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-011.webp",
        "name": "Sunlit Rituals \u2014 01",
        "series": "Sunlit Rituals",
        "href": "candles-close-to-you.html?product=assets%2Fcandles%2Fcandles-011.webp&scent=grapefruit-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-095.webp",
        "name": "Fresh Moments \u2014 02",
        "series": "Fresh Moments",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Freeds-095.webp&scent=grapefruit-bergamot"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
        "name": "Bergamot Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2Fb70e7617bf5fafac62ee.webp&scent=grapefruit-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/companions/c7a31362439fcd8e52cd.webp",
        "name": "Spark",
        "series": "Seven-Day Rituals",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Fcompanions%2Fc7a31362439fcd8e52cd.webp&scent=grapefruit-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-102.webp",
        "name": "Mountain \u2014 03",
        "series": "Mountain",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Freeds%2Freeds-102.webp&scent=grapefruit-bergamot"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Orange blossom \u00b7 fresh greens",
    "collectionHref": "fragrance-grapefruit-bergamot.html"
  },
  {
    "id": "lemon-verbena",
    "name": "Lemon & Verbena",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Lemon peel",
      "citron"
    ],
    "heart": [
      "Lemon verbena",
      "green leaves"
    ],
    "base": [
      "Musk",
      "light woods"
    ],
    "description": "Crisp and leafy; sunny rooms and spaces near the kitchen.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-075.webp",
        "name": "Bamboo \u2014 01",
        "series": "Bamboo",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-075.webp&scent=lemon-verbena"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-076.webp",
        "name": "Bamboo \u2014 02",
        "series": "Bamboo",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-076.webp&scent=lemon-verbena"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/301de746753e02d728ce.webp",
        "name": "Citrus Fern",
        "series": "Botanical Wax Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F301de746753e02d728ce.webp&scent=lemon-verbena"
      },
      {
        "category": "reed",
        "image": "assets/companions/27e4b122a9b559ae799d.webp",
        "name": "Minimal \u2014 01",
        "series": "Minimal",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Fcompanions%2F27e4b122a9b559ae799d.webp&scent=lemon-verbena"
      },
      {
        "category": "reed",
        "image": "assets/companions/7ca9a742e8adc548081d.webp",
        "name": "Cylindrical \u2014 04",
        "series": "Cylindrical",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Fcompanions%2F7ca9a742e8adc548081d.webp&scent=lemon-verbena"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Lemon verbena \u00b7 green leaves",
    "collectionHref": "fragrance-lemon-verbena.html"
  },
  {
    "id": "bergamot-neroli",
    "name": "Bergamot & Neroli",
    "themes": [
      "Fresh & Natural",
      "Floral & Fruity"
    ],
    "top": [
      "Bergamot",
      "bitter orange"
    ],
    "heart": [
      "Neroli",
      "petitgrain"
    ],
    "base": [
      "White musk",
      "soft amber"
    ],
    "description": "Fresh citrus softened by florals; calm entryways and bedrooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/7bd1f3d29f5f641ddd3d.webp",
        "name": "Ivory Daisy",
        "series": "Sculpted Floral",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F7bd1f3d29f5f641ddd3d.webp&scent=bergamot-neroli"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F4fbc33c9500b11ca9a9b.webp&scent=bergamot-neroli"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
        "name": "White Florals",
        "series": "Lace Glass",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fpaired%2Fb2a6e2ce97db70ea6f8a.webp&scent=bergamot-neroli"
      },
      {
        "category": "crystal",
        "image": "assets/companions/6ee1d58cc46162d5a542.webp",
        "name": "Morning Mist",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2F6ee1d58cc46162d5a542.webp&scent=bergamot-neroli"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F66dc6cb0548823f9cb12.webp&scent=bergamot-neroli"
      },
      {
        "category": "reed",
        "image": "assets/companions/27e4b122a9b559ae799d.webp",
        "name": "Minimal \u2014 01",
        "series": "Minimal",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Fcompanions%2F27e4b122a9b559ae799d.webp&scent=bergamot-neroli"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Neroli \u00b7 petitgrain",
    "collectionHref": "fragrance-bergamot-neroli.html"
  },
  {
    "id": "fig-green-leaves",
    "name": "Fig & Green Leaves",
    "themes": [
      "Floral & Fruity",
      "Fresh & Natural",
      "Warm & Woody"
    ],
    "top": [
      "Fig leaf",
      "green notes"
    ],
    "heart": [
      "Fig",
      "light coconut milk"
    ],
    "base": [
      "Cedarwood",
      "soft woods"
    ],
    "description": "Leafy, creamy and woody; design-led living rooms and studies.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-008.webp",
        "name": "Woven \u2014 01",
        "series": "Woven",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-008.webp&scent=fig-green-leaves"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-109.webp",
        "name": "Square Glass \u2014 02",
        "series": "Square Glass",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-109.webp&scent=fig-green-leaves"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-075.webp",
        "name": "Bamboo \u2014 01",
        "series": "Bamboo",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-075.webp&scent=fig-green-leaves"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2Fc135302863be554b69df.webp&scent=fig-green-leaves"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
        "name": "Botanical Sage Duo",
        "series": "Botanical Gifts",
        "href": "gift-collection-2.html?product=assets%2Fgifts%2Fpaired%2F79dda4dedcfa715ec1d1.webp&scent=fig-green-leaves"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F66dc6cb0548823f9cb12.webp&scent=fig-green-leaves"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Fig \u00b7 light coconut milk",
    "collectionHref": "fragrance-fig-green-leaves.html"
  },
  {
    "id": "blackcurrant-rose",
    "name": "Blackcurrant & Rose",
    "themes": [
      "Floral & Fruity"
    ],
    "top": [
      "Blackcurrant",
      "green leaves"
    ],
    "heart": [
      "Rose",
      "geranium"
    ],
    "base": [
      "Musk",
      "woods"
    ],
    "description": "Tart fruit meets delicate petals; living rooms and moments shared.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-041.webp",
        "name": "Her \u00b7 Him \u00b7 Us \u2014 01",
        "series": "Her \u00b7 Him \u00b7 Us",
        "href": "candles-close-to-you.html?product=assets%2Fcandles%2Fcandles-041.webp&scent=blackcurrant-rose"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Fb782592d405151c5df31.webp&scent=blackcurrant-rose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-111.webp",
        "name": "Square Glass \u2014 04",
        "series": "Square Glass",
        "href": "reeds-in-bloom-2.html?product=assets%2Freeds%2Freeds-111.webp&scent=blackcurrant-rose"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Ff316b932be71fe3aaf88.webp&scent=blackcurrant-rose"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/799aa3dbeae7975a972b.webp",
        "name": "Pink Rose Tablet",
        "series": "Rose Fragrance Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2F799aa3dbeae7975a972b.webp&scent=blackcurrant-rose"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
        "name": "Desert Rose",
        "series": "Organic Glass",
        "href": "candles-close-to-you-2.html?product=assets%2Fcandles%2Fpaired%2F1f1fd2e0ca388db40ca3.webp&scent=blackcurrant-rose"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/cea8db64b1b62b86670e.webp",
        "name": "Ebony & Rose Infusion",
        "series": "Botanical Glass",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Fpaired%2Fcea8db64b1b62b86670e.webp&scent=blackcurrant-rose"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Rose \u00b7 geranium",
    "collectionHref": "fragrance-blackcurrant-rose.html"
  },
  {
    "id": "pomegranate-amber",
    "name": "Pomegranate & Amber",
    "themes": [
      "Floral & Fruity",
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Pomegranate accord",
      "plum",
      "pink pepper"
    ],
    "heart": [
      "Rose",
      "gentle spices"
    ],
    "base": [
      "Amber",
      "cedarwood",
      "patchouli"
    ],
    "description": "Deep fruit and mature warmth; autumn and winter living rooms.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/d9feede215a30484aa79.webp",
        "name": "Baltic Amber",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fd9feede215a30484aa79.webp&scent=pomegranate-amber"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F20fd1335cbc93f2e83a3.webp&scent=pomegranate-amber"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F0cfedbd356005d4c2754.webp&scent=pomegranate-amber"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-128.webp",
        "name": "Classic Amber \u2014 01",
        "series": "Classic Amber",
        "href": "reeds-at-home-at-ease.html?product=assets%2Freeds%2Freeds-128.webp&scent=pomegranate-amber"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-c188d2780401e54a.webp",
        "name": "Amber Bouquet",
        "series": "Floral Bouquet",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Freed-c188d2780401e54a.webp&scent=pomegranate-amber"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Fb782592d405151c5df31.webp&scent=pomegranate-amber"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Rose \u00b7 gentle spices",
    "collectionHref": "fragrance-pomegranate-amber.html"
  },
  {
    "id": "lavender-cedarwood",
    "name": "Lavender & Cedarwood",
    "themes": [
      "Fresh & Natural",
      "Warm & Woody"
    ],
    "top": [
      "Bergamot",
      "a little rosemary"
    ],
    "heart": [
      "Lavender",
      "sage"
    ],
    "base": [
      "Cedarwood",
      "musk"
    ],
    "description": "Clean herbs and soft woods; bedrooms and quiet reading corners.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/companions/20aea59b3de55988cfcb.webp",
        "name": "Rest",
        "series": "Seven-Day Rituals",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2F20aea59b3de55988cfcb.webp&scent=lavender-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-068.webp",
        "name": "Amber Dream \u2014 01",
        "series": "Amber Dream",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fcandles-068.webp&scent=lavender-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/287d23366d4c063f04f9.webp",
        "name": "Provence Lavender",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2F287d23366d4c063f04f9.webp&scent=lavender-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/f62beb39ab1806d66782.webp",
        "name": "Lavender",
        "series": "Gradient Glass",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2Ff62beb39ab1806d66782.webp&scent=lavender-cedarwood"
      },
      {
        "category": "crystal",
        "image": "assets/companions/475614e9e2d215c64a93.webp",
        "name": "Lavender Reverie",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2F475614e9e2d215c64a93.webp&scent=lavender-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/20c64492ea431b4ad239.webp",
        "name": "Lavender",
        "series": "Postbox",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2F20c64492ea431b4ad239.webp&scent=lavender-cedarwood"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Lavender \u00b7 sage",
    "collectionHref": "fragrance-lavender-cedarwood.html"
  },
  {
    "id": "eucalyptus-mint",
    "name": "Eucalyptus & Mint",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Mint",
      "lemon"
    ],
    "heart": [
      "Eucalyptus",
      "rosemary"
    ],
    "base": [
      "Cedarwood",
      "white musk"
    ],
    "description": "Cool and transparent; bathrooms and spa-inspired spaces.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/companions/6bb45b8d3cadf69b519f.webp",
        "name": "Refresh",
        "series": "Seven-Day Rituals",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Fcompanions%2F6bb45b8d3cadf69b519f.webp&scent=eucalyptus-mint"
      },
      {
        "category": "reed",
        "image": "assets/companions/143ea721b89f464528da.webp",
        "name": "Wander",
        "series": "Seven-Day Rituals",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Fcompanions%2F143ea721b89f464528da.webp&scent=eucalyptus-mint"
      },
      {
        "category": "crystal",
        "image": "assets/companions/6ee1d58cc46162d5a542.webp",
        "name": "Morning Mist",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2F6ee1d58cc46162d5a542.webp&scent=eucalyptus-mint"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/64d6d060ce2595ff9070.webp",
        "name": "Mountain Rain",
        "series": "Colour Glass",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Fpaired%2F64d6d060ce2595ff9070.webp&scent=eucalyptus-mint"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/d2a2c13cb519e3a3e386.webp",
        "name": "Moss Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2Fd2a2c13cb519e3a3e386.webp&scent=eucalyptus-mint"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Eucalyptus \u00b7 rosemary",
    "collectionHref": "fragrance-eucalyptus-mint.html"
  },
  {
    "id": "lemon-lavender",
    "name": "Lemon & Lavender",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Lemon",
      "mandarin"
    ],
    "heart": [
      "Lavender",
      "light orange blossom"
    ],
    "base": [
      "Musk",
      "light woods"
    ],
    "description": "Bright citrus softened by lavender; easy everyday living.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reeds-097.webp",
        "name": "Fresh Moments \u2014 04",
        "series": "Fresh Moments",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-097.webp&scent=lemon-lavender"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
        "name": "Bergamot Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2Fb70e7617bf5fafac62ee.webp&scent=lemon-lavender"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-068.webp",
        "name": "Amber Dream \u2014 01",
        "series": "Amber Dream",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fcandles-068.webp&scent=lemon-lavender"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/287d23366d4c063f04f9.webp",
        "name": "Provence Lavender",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2F287d23366d4c063f04f9.webp&scent=lemon-lavender"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/20c64492ea431b4ad239.webp",
        "name": "Lavender",
        "series": "Postbox",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2F20c64492ea431b4ad239.webp&scent=lemon-lavender"
      },
      {
        "category": "crystal",
        "image": "assets/companions/475614e9e2d215c64a93.webp",
        "name": "Lavender Reverie",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2F475614e9e2d215c64a93.webp&scent=lemon-lavender"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/f62beb39ab1806d66782.webp",
        "name": "Lavender",
        "series": "Gradient Glass",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2Ff62beb39ab1806d66782.webp&scent=lemon-lavender"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Lavender \u00b7 light orange blossom",
    "collectionHref": "fragrance-lemon-lavender.html"
  },
  {
    "id": "white-tea-bergamot",
    "name": "White Tea & Bergamot",
    "themes": [
      "Tea & Tranquility",
      "Fresh & Natural"
    ],
    "top": [
      "Bergamot",
      "lemon peel"
    ],
    "heart": [
      "White tea accord",
      "light jasmine"
    ],
    "base": [
      "White musk",
      "light cedarwood"
    ],
    "description": "Sheer, airy and lightly sweet; entryways and bedrooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reeds-099.webp",
        "name": "Pastel \u2014 02",
        "series": "Pastel",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-099.webp&scent=white-tea-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-096.webp",
        "name": "Fresh Moments \u2014 03",
        "series": "Fresh Moments",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-096.webp&scent=white-tea-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/companions/97b297ac3d3b797368fa.webp",
        "name": "Square Glass \u2014 07",
        "series": "Square Glass",
        "href": "reeds-a-quiet-pause.html?product=assets%2Fcompanions%2F97b297ac3d3b797368fa.webp&scent=white-tea-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-db41da38fbfc9eb9.webp&scent=white-tea-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Fpaired%2F201427d60f110f84530c.webp&scent=white-tea-bergamot"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-374f9f3b71955935.webp",
        "name": "White Tea Blossom",
        "series": "Floral Bouquet",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freed-374f9f3b71955935.webp&scent=white-tea-bergamot"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F66dc6cb0548823f9cb12.webp&scent=white-tea-bergamot"
      }
    ],
    "family": "Tea & Tranquility",
    "notes": "White tea accord \u00b7 light jasmine",
    "collectionHref": "fragrance-white-tea-bergamot.html"
  },
  {
    "id": "white-tea-rosemary",
    "name": "White Tea & Rosemary",
    "themes": [
      "Tea & Tranquility",
      "Fresh & Natural"
    ],
    "top": [
      "Lemon",
      "a little mint"
    ],
    "heart": [
      "White tea accord",
      "rosemary"
    ],
    "base": [
      "Cedarwood",
      "musk"
    ],
    "description": "Fresh tea intertwined with herbs; studies and sunlit living rooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reeds-099.webp",
        "name": "Pastel \u2014 02",
        "series": "Pastel",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-099.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/companions/97b297ac3d3b797368fa.webp",
        "name": "Square Glass \u2014 07",
        "series": "Square Glass",
        "href": "reeds-a-quiet-pause.html?product=assets%2Fcompanions%2F97b297ac3d3b797368fa.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-096.webp",
        "name": "Fresh Moments \u2014 03",
        "series": "Fresh Moments",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-096.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-b2f6d6a6d3e67553.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-db41da38fbfc9eb9.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-374f9f3b71955935.webp",
        "name": "White Tea Blossom",
        "series": "Floral Bouquet",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freed-374f9f3b71955935.webp&scent=white-tea-rosemary"
      },
      {
        "category": "reed",
        "image": "assets/companions/5ad03d9fc0154ad26216.webp",
        "name": "Focus",
        "series": "Seven-Day Rituals",
        "href": "reeds-a-quiet-pause.html?product=assets%2Fcompanions%2F5ad03d9fc0154ad26216.webp&scent=white-tea-rosemary"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2Fc135302863be554b69df.webp&scent=white-tea-rosemary"
      }
    ],
    "family": "Tea & Tranquility",
    "notes": "White tea accord \u00b7 rosemary",
    "collectionHref": "fragrance-white-tea-rosemary.html"
  },
  {
    "id": "black-tea-cedarwood",
    "name": "Black Tea & Cedarwood",
    "themes": [
      "Tea & Tranquility",
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Bergamot",
      "a little black pepper"
    ],
    "heart": [
      "Black tea accord",
      "dried florals"
    ],
    "base": [
      "Cedarwood",
      "amber",
      "musk"
    ],
    "description": "Warm, dry and gently tannic; reading rooms and thoughtful evening rituals.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reeds-129.webp",
        "name": "Classic Amber \u2014 02",
        "series": "Classic Amber",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-129.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-090.webp",
        "name": "Tea Rituals \u2014 01",
        "series": "Tea Rituals",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-090.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-093.webp",
        "name": "Tea Rituals \u2014 04",
        "series": "Tea Rituals",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-093.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Fpaired%2F201427d60f110f84530c.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
        "name": "Amber Tea",
        "series": "Floral Bouquet",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freed-08fc7a8f9eb9370f.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/7d038471456f5c892207.webp",
        "name": "Midnight Blue Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F7d038471456f5c892207.webp&scent=black-tea-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/947cbc1d98dee6da5d51.webp",
        "name": "Obsidian",
        "series": "Iridescent",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F947cbc1d98dee6da5d51.webp&scent=black-tea-cedarwood"
      }
    ],
    "family": "Tea & Tranquility",
    "notes": "Black tea accord \u00b7 dried florals",
    "collectionHref": "fragrance-black-tea-cedarwood.html"
  },
  {
    "id": "osmanthus-green-tea",
    "name": "Osmanthus & Green Tea",
    "themes": [
      "Tea & Tranquility",
      "Floral & Fruity",
      "Oriental Mystery"
    ],
    "top": [
      "Citrus",
      "light apricot"
    ],
    "heart": [
      "Osmanthus",
      "green tea accord"
    ],
    "base": [
      "White musk",
      "light woods"
    ],
    "description": "Elegant tea with soft apricot-like florals; spring and autumn interiors.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/31d02f3668b75883be89.webp",
        "name": "Osmanthus Blossom",
        "series": "Floral Glass",
        "href": "reeds-in-bloom.html?product=assets%2Freeds%2Fpaired%2F31d02f3668b75883be89.webp&scent=osmanthus-green-tea"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-f82a3208f64026bc.webp",
        "name": "Osmanthus & Longjing",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-f82a3208f64026bc.webp&scent=osmanthus-green-tea"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-b2f6d6a6d3e67553.webp&scent=osmanthus-green-tea"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/7af4fa22a012b5c0ef40.webp",
        "name": "Osmanthus",
        "series": "Postbox",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fpaired%2F7af4fa22a012b5c0ef40.webp&scent=osmanthus-green-tea"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b232e0c6ef6a01e2730e.webp",
        "name": "Apricot Floral Wreath",
        "series": "Floral Wax Tablets",
        "href": "sachets.html?product=assets%2Fsachets%2Fpaired%2Fb232e0c6ef6a01e2730e.webp&scent=osmanthus-green-tea"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/3c06b51cf59cbf4d481d.webp",
        "name": "Golden Osmanthus",
        "series": "Colour Glass",
        "href": "reeds-in-bloom-3.html?product=assets%2Freeds%2Fpaired%2F3c06b51cf59cbf4d481d.webp&scent=osmanthus-green-tea"
      }
    ],
    "family": "Tea & Tranquility",
    "notes": "Osmanthus \u00b7 green tea accord",
    "collectionHref": "fragrance-osmanthus-green-tea.html"
  },
  {
    "id": "clean-cotton",
    "name": "Clean Cotton",
    "themes": [
      "Fresh & Natural"
    ],
    "top": [
      "Fresh air accord",
      "citrus",
      "green leaves"
    ],
    "heart": [
      "Lily of the valley",
      "light white florals"
    ],
    "base": [
      "White musk",
      "light woods"
    ],
    "description": "Freshly dried cotton; bedrooms and laundry spaces.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/7e95a9fee680e36d69cf.webp",
        "name": "White Musk Stone",
        "series": "Stone Diffuser",
        "href": "reeds-at-home-at-ease.html?product=assets%2Freeds%2Fpaired%2F7e95a9fee680e36d69cf.webp&scent=clean-cotton"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/522eb2b410541447b0fc.webp",
        "name": "Ivory Oval",
        "series": "Oval Relief",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F522eb2b410541447b0fc.webp&scent=clean-cotton"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F4fbc33c9500b11ca9a9b.webp&scent=clean-cotton"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-088.webp",
        "name": "Ivory Stone \u2014 01",
        "series": "Ivory Stone",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fcandles-088.webp&scent=clean-cotton"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F8efb79e6978aa255e72c.webp&scent=clean-cotton"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/9dbd2373b514ef18213d.webp",
        "name": "Island Cotton",
        "series": "Postbox",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fpaired%2F9dbd2373b514ef18213d.webp&scent=clean-cotton"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Lily of the valley \u00b7 light white florals",
    "collectionHref": "fragrance-clean-cotton.html"
  },
  {
    "id": "soft-linen",
    "name": "Soft Linen",
    "themes": [
      "Fresh & Natural",
      "Warm & Woody"
    ],
    "top": [
      "Bergamot",
      "light aldehydes"
    ],
    "heart": [
      "Iris",
      "light violet"
    ],
    "base": [
      "White musk",
      "soft woods"
    ],
    "description": "Soft, gently powdery and comforting; relaxed bedrooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/7e95a9fee680e36d69cf.webp",
        "name": "White Musk Stone",
        "series": "Stone Diffuser",
        "href": "reeds-at-home-at-ease.html?product=assets%2Freeds%2Fpaired%2F7e95a9fee680e36d69cf.webp&scent=soft-linen"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F4fbc33c9500b11ca9a9b.webp&scent=soft-linen"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/522eb2b410541447b0fc.webp",
        "name": "Ivory Oval",
        "series": "Oval Relief",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F522eb2b410541447b0fc.webp&scent=soft-linen"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/ef573ef4b49c1af85848.webp",
        "name": "Pearl Ivory",
        "series": "Iridescent",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2Fef573ef4b49c1af85848.webp&scent=soft-linen"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-088.webp",
        "name": "Ivory Stone \u2014 01",
        "series": "Ivory Stone",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fcandles-088.webp&scent=soft-linen"
      },
      {
        "category": "crystal",
        "image": "assets/companions/39ead58bc6ca45512276.webp",
        "name": "Ivory Texture",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F39ead58bc6ca45512276.webp&scent=soft-linen"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F8efb79e6978aa255e72c.webp&scent=soft-linen"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Iris \u00b7 light violet",
    "collectionHref": "fragrance-soft-linen.html"
  },
  {
    "id": "sea-salt-driftwood",
    "name": "Sea Salt & Driftwood",
    "themes": [
      "Fresh & Natural",
      "Warm & Woody"
    ],
    "top": [
      "Sea breeze accord",
      "bergamot"
    ],
    "heart": [
      "Sea salt accord",
      "sage"
    ],
    "base": [
      "Driftwood accord",
      "musk"
    ],
    "description": "Fresh and lightly mineral; bathrooms and coastal living rooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reed-03.webp",
        "name": "Rain Forest Reed Diffuser",
        "series": "Reed diffuser",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Freed-03.webp&scent=sea-salt-driftwood"
      },
      {
        "category": "reed",
        "image": "assets/companions/1b5ead3137dec1267c9b.webp",
        "name": "Square Glass \u2014 03",
        "series": "Square Glass",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Fcompanions%2F1b5ead3137dec1267c9b.webp&scent=sea-salt-driftwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-032.webp",
        "name": "Turquoise \u2014 01",
        "series": "Turquoise",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-032.webp&scent=sea-salt-driftwood"
      },
      {
        "category": "crystal",
        "image": "assets/companions/64e857d6f3b7717040c8.webp",
        "name": "Blue Serenity",
        "series": "Botanical glass",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F64e857d6f3b7717040c8.webp&scent=sea-salt-driftwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/64d6d060ce2595ff9070.webp",
        "name": "Mountain Rain",
        "series": "Colour Glass",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Fpaired%2F64d6d060ce2595ff9070.webp&scent=sea-salt-driftwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/f77399a59a07a9b8e1ad.webp",
        "name": "Sea Salt & Sage",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Ff77399a59a07a9b8e1ad.webp&scent=sea-salt-driftwood"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Sea salt accord \u00b7 sage",
    "collectionHref": "fragrance-sea-salt-driftwood.html"
  },
  {
    "id": "bamboo-white-florals",
    "name": "Bamboo & White Florals",
    "themes": [
      "Fresh & Natural",
      "Floral & Fruity"
    ],
    "top": [
      "Citrus",
      "green leaves"
    ],
    "heart": [
      "Bamboo accord",
      "light white florals"
    ],
    "base": [
      "Musk",
      "light cedarwood"
    ],
    "description": "Airy green notes with a sense of space; entryways and living rooms.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/reed-03.webp",
        "name": "Rain Forest Reed Diffuser",
        "series": "Reed diffuser",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Freed-03.webp&scent=bamboo-white-florals"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2Fa35269a079593416887d.webp&scent=bamboo-white-florals"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-075.webp",
        "name": "Bamboo \u2014 01",
        "series": "Bamboo",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-075.webp&scent=bamboo-white-florals"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-076.webp",
        "name": "Bamboo \u2014 02",
        "series": "Bamboo",
        "href": "candles-morning-light-3.html?product=assets%2Fcandles%2Fcandles-076.webp&scent=bamboo-white-florals"
      },
      {
        "category": "reed",
        "image": "assets/companions/d254438f943ca1177135.webp",
        "name": "Botanical \u2014 01",
        "series": "Botanical",
        "href": "reeds-in-bloom-2.html?product=assets%2Fcompanions%2Fd254438f943ca1177135.webp&scent=bamboo-white-florals"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2Fc135302863be554b69df.webp&scent=bamboo-white-florals"
      }
    ],
    "family": "Fresh & Natural",
    "notes": "Bamboo accord \u00b7 light white florals",
    "collectionHref": "fragrance-bamboo-white-florals.html"
  },
  {
    "id": "sandalwood-cashmere",
    "name": "Sandalwood & Cashmere",
    "themes": [
      "Warm & Woody"
    ],
    "top": [
      "Bergamot",
      "a little cardamom"
    ],
    "heart": [
      "Sandalwood",
      "soft florals"
    ],
    "base": [
      "Cashmere wood accord",
      "musk",
      "amber"
    ],
    "description": "Smooth, softly enveloping and low in sweetness; bedrooms and reading corners.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
        "name": "Dark Woods",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fb1a337722ec53404ae09.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/companions/f034578ed7703c8e8eda.webp",
        "name": "Square Glass \u2014 05",
        "series": "Square Glass",
        "href": "reeds-at-home-at-ease.html?product=assets%2Fcompanions%2Ff034578ed7703c8e8eda.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-130.webp",
        "name": "Sandalwood \u2014 01",
        "series": "Sandalwood",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Freeds-130.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-091.webp",
        "name": "Tea Rituals \u2014 02",
        "series": "Tea Rituals",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Freeds-091.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/0cd03e5f4aa361a2de7f.webp",
        "name": "Sage & Sandalwood \u2014 Rounded",
        "series": "Ribbed Ceramic",
        "href": "reeds-at-home-at-ease-3.html?product=assets%2Freeds%2Fpaired%2F0cd03e5f4aa361a2de7f.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/add3d2fe642716e15fb5.webp",
        "name": "Sage & Sandalwood \u2014 Tall",
        "series": "Ribbed Ceramic",
        "href": "reeds-at-home-at-ease-3.html?product=assets%2Freeds%2Fpaired%2Fadd3d2fe642716e15fb5.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "reed",
        "image": "assets/companions/57fc12ec0de57fe4822f.webp",
        "name": "Cylindrical \u2014 02",
        "series": "Cylindrical",
        "href": "reeds-at-home-at-ease-3.html?product=assets%2Fcompanions%2F57fc12ec0de57fe4822f.webp&scent=sandalwood-cashmere"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F148cecd4fd72c958a34c.webp&scent=sandalwood-cashmere"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Sandalwood \u00b7 soft florals",
    "collectionHref": "fragrance-sandalwood-cashmere.html"
  },
  {
    "id": "cedarwood-vetiver",
    "name": "Cedarwood & Vetiver",
    "themes": [
      "Warm & Woody",
      "Fresh & Natural"
    ],
    "top": [
      "Bergamot",
      "juniper"
    ],
    "heart": [
      "Cedarwood",
      "cypress"
    ],
    "base": [
      "Vetiver",
      "moss accord",
      "musk"
    ],
    "description": "Dry woods with an earthy edge; studies and minimal interiors.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-056.webp",
        "name": "Forest Poetry \u2014 02",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-056.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-055.webp",
        "name": "Forest Poetry \u2014 01",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-055.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "crystal",
        "image": "assets/companions/480e8ea00e1b76202c86.webp",
        "name": "Cedar Relief",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F480e8ea00e1b76202c86.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2Fa35269a079593416887d.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fb2b8111bb9e29b42d8ed.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Fpaired%2Fbf42dc79d33a16875f58.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-092.webp",
        "name": "Tea Rituals \u2014 03",
        "series": "Tea Rituals",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Freeds-092.webp&scent=cedarwood-vetiver"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Ffa0a43337a95d05c5727.webp&scent=cedarwood-vetiver"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Cedarwood \u00b7 cypress",
    "collectionHref": "fragrance-cedarwood-vetiver.html"
  },
  {
    "id": "fireside-smoked-woods",
    "name": "Fireside & Smoked Woods",
    "themes": [
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Black pepper",
      "light resin"
    ],
    "heart": [
      "Cedarwood",
      "guaiac wood"
    ],
    "base": [
      "Smoked wood accord",
      "amber",
      "vetiver"
    ],
    "description": "The atmosphere of a glowing fireplace; autumn and winter evenings.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
        "name": "Dark Woods",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fb1a337722ec53404ae09.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F20fd1335cbc93f2e83a3.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "reed",
        "image": "assets/companions/78919717797a963dc844.webp",
        "name": "Winter Bonfire",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2F78919717797a963dc844.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "reed",
        "image": "assets/companions/33ac66bd00830bdaa036.webp",
        "name": "Fireside Wishes",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2F33ac66bd00830bdaa036.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fb2b8111bb9e29b42d8ed.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/6557fed21b15dacbccfa.webp",
        "name": "Smoky Deer",
        "series": "Deer Collection",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F6557fed21b15dacbccfa.webp&scent=fireside-smoked-woods"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F148cecd4fd72c958a34c.webp&scent=fireside-smoked-woods"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Cedarwood \u00b7 guaiac wood",
    "collectionHref": "fragrance-fireside-smoked-woods.html"
  },
  {
    "id": "amber-vanilla",
    "name": "Amber & Vanilla",
    "themes": [
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Bergamot",
      "gentle spices"
    ],
    "heart": [
      "Amber accord",
      "benzoin"
    ],
    "base": [
      "Vanilla",
      "sandalwood",
      "musk"
    ],
    "description": "Warm, softly sweet and inviting; evening living rooms and bedrooms.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/73e3d5c1bd304f9fbfb5.webp",
        "name": "Amber Glass",
        "series": "Classic Amber",
        "href": "candles-a-moment-of-quiet-3.html?product=assets%2Fcandles%2Fpaired%2F73e3d5c1bd304f9fbfb5.webp&scent=amber-vanilla"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d9feede215a30484aa79.webp",
        "name": "Baltic Amber",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fd9feede215a30484aa79.webp&scent=amber-vanilla"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F0cfedbd356005d4c2754.webp&scent=amber-vanilla"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-128.webp",
        "name": "Classic Amber \u2014 01",
        "series": "Classic Amber",
        "href": "reeds-at-home-at-ease.html?product=assets%2Freeds%2Freeds-128.webp&scent=amber-vanilla"
      },
      {
        "category": "reed",
        "image": "assets/companions/cc0696772d15e3acdb9d.webp",
        "name": "Christmas Amber",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fcc0696772d15e3acdb9d.webp&scent=amber-vanilla"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-c188d2780401e54a.webp",
        "name": "Amber Bouquet",
        "series": "Floral Bouquet",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Freed-c188d2780401e54a.webp&scent=amber-vanilla"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
        "name": "Amber Tea",
        "series": "Floral Bouquet",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freed-08fc7a8f9eb9370f.webp&scent=amber-vanilla"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Faa4efc0a88d60dfb26a0.webp&scent=amber-vanilla"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2Fb09baac75da0893acee3.webp&scent=amber-vanilla"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Amber accord \u00b7 benzoin",
    "collectionHref": "fragrance-amber-vanilla.html"
  },
  {
    "id": "vanilla-tonka",
    "name": "Vanilla & Tonka",
    "themes": [
      "Warm & Woody"
    ],
    "top": [
      "Almond accord",
      "light citrus"
    ],
    "heart": [
      "Vanilla",
      "soft milky notes"
    ],
    "base": [
      "Tonka bean",
      "musk",
      "benzoin"
    ],
    "description": "Creamy, soft and comforting; autumn and winter candle rituals.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-023.webp",
        "name": "Vanilla & Peony \u2014 02",
        "series": "Vanilla & Peony",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fcandles-023.webp&scent=vanilla-tonka"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-022.webp",
        "name": "Vanilla & Peony \u2014 01",
        "series": "Vanilla & Peony",
        "href": "candles-close-to-you.html?product=assets%2Fcandles%2Fcandles-022.webp&scent=vanilla-tonka"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F20fd1335cbc93f2e83a3.webp&scent=vanilla-tonka"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Faa4efc0a88d60dfb26a0.webp&scent=vanilla-tonka"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
        "name": "Smiling Gingerbread Candle",
        "series": "Playful Christmas",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F1383bf46ac80e1d62944.webp&scent=vanilla-tonka"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2Fb09baac75da0893acee3.webp&scent=vanilla-tonka"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "christmas-collection-4.html?product=assets%2Fchristmas%2Fpaired%2F6d52f0817361816118b7.webp&scent=vanilla-tonka"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Vanilla \u00b7 soft milky notes",
    "collectionHref": "fragrance-vanilla-tonka.html"
  },
  {
    "id": "caramel-cream",
    "name": "Caramel & Cream",
    "themes": [
      "Warm & Woody"
    ],
    "top": [
      "Caramel",
      "a little sea salt accord"
    ],
    "heart": [
      "Cream",
      "baked notes"
    ],
    "base": [
      "Vanilla",
      "brown sugar accord"
    ],
    "description": "A sweet bakery-inspired mood; dessert themes and winter gifts.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/b053837f042853978ab8.webp",
        "name": "Birthday Celebration",
        "series": "Playful Birthday",
        "href": "candles-little-joys.html?product=assets%2Fcandles%2Fpaired%2Fb053837f042853978ab8.webp&scent=caramel-cream"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Faa4efc0a88d60dfb26a0.webp&scent=caramel-cream"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
        "name": "Smiling Gingerbread Candle",
        "series": "Playful Christmas",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F1383bf46ac80e1d62944.webp&scent=caramel-cream"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "candles-a-moment-of-quiet-4.html?product=assets%2Fcandles%2Fpaired%2Fb09baac75da0893acee3.webp&scent=caramel-cream"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Cream \u00b7 baked notes",
    "collectionHref": "fragrance-caramel-cream.html"
  },
  {
    "id": "pumpkin-spice",
    "name": "Pumpkin & Spice",
    "themes": [
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Pumpkin accord",
      "orange peel"
    ],
    "heart": [
      "Cinnamon",
      "nutmeg",
      "clove"
    ],
    "base": [
      "Vanilla",
      "brown sugar",
      "soft woods"
    ],
    "description": "A warm pumpkin-pie atmosphere; autumn evenings and Halloween.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/257c6ea41af465989ab3.webp",
        "name": "Pumpkin & Ghost",
        "series": "Halloween",
        "href": "candles-little-joys-2.html?product=assets%2Fcandles%2Fpaired%2F257c6ea41af465989ab3.webp&scent=pumpkin-spice"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Cinnamon \u00b7 nutmeg \u00b7 clove",
    "collectionHref": "fragrance-pumpkin-spice.html"
  },
  {
    "id": "apple-cinnamon",
    "name": "Apple & Cinnamon",
    "themes": [
      "Floral & Fruity",
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Apple",
      "orange peel"
    ],
    "heart": [
      "Cinnamon",
      "clove"
    ],
    "base": [
      "Vanilla",
      "woods"
    ],
    "description": "Warm baked fruit and spice; autumn and winter gatherings.",
    "matches": [
      {
        "category": "christmas",
        "image": "assets/candles/candles-073.webp",
        "name": "Christmas \u2014 02",
        "series": "Christmas",
        "href": "christmas-collection-2.html?product=assets%2Fcandles%2Fcandles-073.webp&scent=apple-cinnamon"
      },
      {
        "category": "christmas",
        "image": "assets/candles/candles-072.webp",
        "name": "Christmas \u2014 01",
        "series": "Christmas",
        "href": "christmas-collection-2.html?product=assets%2Fcandles%2Fcandles-072.webp&scent=apple-cinnamon"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d9feede215a30484aa79.webp",
        "name": "Baltic Amber",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fd9feede215a30484aa79.webp&scent=apple-cinnamon"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
        "name": "Amber Orange Duo",
        "series": "Colourful Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Fffb8c60ea39c5109148a.webp&scent=apple-cinnamon"
      },
      {
        "category": "reed",
        "image": "assets/companions/33ac66bd00830bdaa036.webp",
        "name": "Fireside Wishes",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2F33ac66bd00830bdaa036.webp&scent=apple-cinnamon"
      }
    ],
    "family": "Floral & Fruity",
    "notes": "Cinnamon \u00b7 clove",
    "collectionHref": "fragrance-apple-cinnamon.html"
  },
  {
    "id": "fir-cedarwood",
    "name": "Fir & Cedarwood",
    "themes": [
      "Warm & Woody",
      "Fresh & Natural"
    ],
    "top": [
      "Pine needles",
      "juniper",
      "a little eucalyptus"
    ],
    "heart": [
      "Fir",
      "balsamic resin"
    ],
    "base": [
      "Cedarwood",
      "moss accord",
      "amber"
    ],
    "description": "Evergreen trees and forest air; winter interiors and Christmas.",
    "matches": [
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7244c0a1884379c3fc46.webp",
        "name": "Silver Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F7244c0a1884379c3fc46.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/437b85b84ad977d9adc1.webp",
        "name": "Ivory Silver Trees",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F437b85b84ad977d9adc1.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
        "name": "Champagne Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F39e039fb54a6b60d7eeb.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7964d0a4e143e4c26426.webp",
        "name": "Ruby Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F7964d0a4e143e4c26426.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
        "name": "Blue Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fe40a6c47b33c64f54ee4.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
        "name": "Forest Green Silver Trees",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fa8a04f250be1545aa1c3.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
        "name": "Ivory Botanical Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fb22e9bf1bb681718f5a4.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/208837f07b39c307c4fe.webp",
        "name": "Olive Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2F208837f07b39c307c4fe.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a59a1441e620ff595494.webp",
        "name": "Forest Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fa59a1441e620ff595494.webp&scent=fir-cedarwood"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2Fa35269a079593416887d.webp&scent=fir-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-056.webp",
        "name": "Forest Poetry \u2014 02",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-056.webp&scent=fir-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-055.webp",
        "name": "Forest Poetry \u2014 01",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-055.webp&scent=fir-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fb2b8111bb9e29b42d8ed.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/c082e2bf728f7ad74860.webp",
        "name": "Pinecone Candle",
        "series": "Woodland Christmas",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fc082e2bf728f7ad74860.webp&scent=fir-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Fpaired%2Fbf42dc79d33a16875f58.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
        "name": "Forest Green Candle Trio",
        "series": "Christmas Pillars",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fb654bd843ac4c8041f8c.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
        "name": "Forest Green Cone Candle",
        "series": "Botanical Christmas Trees",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F7f1e156495b0a459e0d6.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
        "name": "Snowy Tree Glass Candle",
        "series": "Winter Botanicals",
        "href": "christmas-collection-4.html?product=assets%2Fchristmas%2Fpaired%2Fba0c524d4b0c2f4e9680.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
        "name": "Christmas Tree Sand Candle",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Fd9c6cf216c67a77a99fd.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Ffa0a43337a95d05c5727.webp&scent=fir-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/61253e2d71812a5a6496.webp",
        "name": "Christmas Tree Candle",
        "series": "Christmas Characters",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F61253e2d71812a5a6496.webp&scent=fir-cedarwood"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Fir \u00b7 balsamic resin",
    "collectionHref": "fragrance-fir-cedarwood.html"
  },
  {
    "id": "orange-clove",
    "name": "Orange & Clove",
    "themes": [
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Sweet orange",
      "orange peel"
    ],
    "heart": [
      "Clove",
      "cinnamon"
    ],
    "base": [
      "Benzoin",
      "vanilla",
      "woods"
    ],
    "description": "Bright citrus wrapped in warm spice; Christmas gatherings.",
    "matches": [
      {
        "category": "christmas",
        "image": "assets/candles/candles-073.webp",
        "name": "Christmas \u2014 02",
        "series": "Christmas",
        "href": "christmas-collection-2.html?product=assets%2Fcandles%2Fcandles-073.webp&scent=orange-clove"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-095.webp",
        "name": "Fresh Moments \u2014 02",
        "series": "Fresh Moments",
        "href": "reeds-a-breath-of-fresh-air.html?product=assets%2Freeds%2Freeds-095.webp&scent=orange-clove"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
        "name": "Amber Orange Duo",
        "series": "Colourful Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Fffb8c60ea39c5109148a.webp&scent=orange-clove"
      },
      {
        "category": "reed",
        "image": "assets/companions/cc0696772d15e3acdb9d.webp",
        "name": "Christmas Amber",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fcc0696772d15e3acdb9d.webp&scent=orange-clove"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d6e65e02000c1649cfca.webp",
        "name": "Blood Orange",
        "series": "Lace Glass",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fpaired%2Fd6e65e02000c1649cfca.webp&scent=orange-clove"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "christmas-collection-4.html?product=assets%2Fchristmas%2Fpaired%2F6d52f0817361816118b7.webp&scent=orange-clove"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Clove \u00b7 cinnamon",
    "collectionHref": "fragrance-orange-clove.html"
  },
  {
    "id": "gingerbread-vanilla",
    "name": "Gingerbread & Vanilla",
    "themes": [
      "Warm & Woody",
      "Oriental Mystery"
    ],
    "top": [
      "Ginger",
      "orange peel"
    ],
    "heart": [
      "Cinnamon",
      "clove",
      "biscuit accord"
    ],
    "base": [
      "Vanilla",
      "molasses accord",
      "tonka bean"
    ],
    "description": "Freshly baked gingerbread; Christmas gifting and festive candlelight.",
    "matches": [
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
        "name": "Smiling Gingerbread Candle",
        "series": "Playful Christmas",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F1383bf46ac80e1d62944.webp&scent=gingerbread-vanilla"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Faa4efc0a88d60dfb26a0.webp&scent=gingerbread-vanilla"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fc5ea0dccfc61f30e459.webp",
        "name": "Gingerbread, Tree & Reindeer",
        "series": "Festive Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Ffc5ea0dccfc61f30e459.webp&scent=gingerbread-vanilla"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "christmas-collection-4.html?product=assets%2Fchristmas%2Fpaired%2F6d52f0817361816118b7.webp&scent=gingerbread-vanilla"
      }
    ],
    "family": "Warm & Woody",
    "notes": "Cinnamon \u00b7 clove \u00b7 biscuit accord",
    "collectionHref": "fragrance-gingerbread-vanilla.html"
  },
  {
    "id": "mugwort-incense",
    "name": "Mugwort & Incense",
    "themes": [
      "Oriental Mystery",
      "Fresh & Natural"
    ],
    "top": [
      "Mugwort",
      "bergamot"
    ],
    "heart": [
      "Sage",
      "incense"
    ],
    "base": [
      "Cedarwood",
      "musk",
      "soft resin"
    ],
    "description": "Bitter-green herbs and quiet incense; reflective studies and evening rituals.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/e6a379ea95e7f1408253.webp",
        "name": "Iced Patchouli",
        "series": "Organic Glass",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2Fe6a379ea95e7f1408253.webp&scent=mugwort-incense"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-024.webp",
        "name": "Nature Poetry \u2014 01",
        "series": "Nature Poetry",
        "href": "candles-morning-light.html?product=assets%2Fcandles%2Fcandles-024.webp&scent=mugwort-incense"
      },
      {
        "category": "reed",
        "image": "assets/companions/d254438f943ca1177135.webp",
        "name": "Botanical \u2014 01",
        "series": "Botanical",
        "href": "reeds-in-bloom-2.html?product=assets%2Fcompanions%2Fd254438f943ca1177135.webp&scent=mugwort-incense"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "products-crystal-2.html?product=assets%2Fcompanions%2Fc135302863be554b69df.webp&scent=mugwort-incense"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
        "name": "Botanical Sage Duo",
        "series": "Botanical Gifts",
        "href": "gift-collection-2.html?product=assets%2Fgifts%2Fpaired%2F79dda4dedcfa715ec1d1.webp&scent=mugwort-incense"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/9317be016ed63d39b67c.webp",
        "name": "Sage Daisy",
        "series": "Sculpted Floral",
        "href": "reeds-a-breath-of-fresh-air-2.html?product=assets%2Freeds%2Fpaired%2F9317be016ed63d39b67c.webp&scent=mugwort-incense"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F148cecd4fd72c958a34c.webp&scent=mugwort-incense"
      }
    ],
    "family": "Oriental Mystery",
    "notes": "Sage \u00b7 incense",
    "collectionHref": "fragrance-mugwort-incense.html"
  },
  {
    "id": "green-tea-cedarwood",
    "name": "Green Tea & Cedarwood",
    "themes": [
      "Oriental Mystery",
      "Tea & Tranquility",
      "Fresh & Natural"
    ],
    "top": [
      "Fresh tea leaves",
      "bergamot"
    ],
    "heart": [
      "Green tea accord",
      "jasmine"
    ],
    "base": [
      "Cedarwood",
      "white musk"
    ],
    "description": "Restrained green tea with a dry woody finish; tranquil reading corners.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/candles-024.webp",
        "name": "Nature Poetry \u2014 01",
        "series": "Nature Poetry",
        "href": "candles-morning-light.html?product=assets%2Fcandles%2Fcandles-024.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-097.webp",
        "name": "Fresh Moments \u2014 04",
        "series": "Fresh Moments",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-097.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
        "name": "Jasmine Green Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-640affaca6c8bc7e.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-b2f6d6a6d3e67553.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-f82a3208f64026bc.webp",
        "name": "Osmanthus & Longjing",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-f82a3208f64026bc.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-1883f549fd4393dd.webp",
        "name": "Plum & Sencha",
        "series": "Floral Tea",
        "href": "reeds-a-quiet-pause-2.html?product=assets%2Freeds%2Freed-1883f549fd4393dd.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reeds-090.webp",
        "name": "Tea Rituals \u2014 01",
        "series": "Tea Rituals",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Freeds-090.webp&scent=green-tea-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "reeds-a-quiet-pause.html?product=assets%2Freeds%2Fpaired%2F201427d60f110f84530c.webp&scent=green-tea-cedarwood"
      }
    ],
    "family": "Oriental Mystery",
    "notes": "Green tea accord \u00b7 jasmine",
    "collectionHref": "fragrance-green-tea-cedarwood.html"
  },
  {
    "id": "oud-saffron",
    "name": "Oud & Saffron",
    "themes": [
      "Oriental Mystery",
      "Warm & Woody"
    ],
    "top": [
      "Saffron",
      "cardamom"
    ],
    "heart": [
      "Oud",
      "rose"
    ],
    "base": [
      "Amber",
      "sandalwood",
      "musk"
    ],
    "description": "Deep resinous woods and warm spice; intimate evening interiors.",
    "matches": [
      {
        "category": "candle",
        "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
        "name": "Dark Woods",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fb1a337722ec53404ae09.webp&scent=oud-saffron"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/e6a379ea95e7f1408253.webp",
        "name": "Iced Patchouli",
        "series": "Organic Glass",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2Fe6a379ea95e7f1408253.webp&scent=oud-saffron"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F0cfedbd356005d4c2754.webp&scent=oud-saffron"
      },
      {
        "category": "reed",
        "image": "assets/companions/47d5d503511846e0926c.webp",
        "name": "Square Glass \u2014 01",
        "series": "Square Glass",
        "href": "reeds-at-home-at-ease.html?product=assets%2Fcompanions%2F47d5d503511846e0926c.webp&scent=oud-saffron"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2Ff316b932be71fe3aaf88.webp&scent=oud-saffron"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/cea8db64b1b62b86670e.webp",
        "name": "Ebony & Rose Infusion",
        "series": "Botanical Glass",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Fpaired%2Fcea8db64b1b62b86670e.webp&scent=oud-saffron"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F148cecd4fd72c958a34c.webp&scent=oud-saffron"
      }
    ],
    "family": "Oriental Mystery",
    "notes": "Oud \u00b7 rose",
    "collectionHref": "fragrance-oud-saffron.html"
  },
  {
    "id": "incense-myrrh",
    "name": "Incense & Myrrh",
    "themes": [
      "Oriental Mystery",
      "Warm & Woody"
    ],
    "top": [
      "Black pepper",
      "bergamot"
    ],
    "heart": [
      "Incense",
      "myrrh"
    ],
    "base": [
      "Benzoin",
      "amber",
      "cedarwood"
    ],
    "description": "Smoky resin with a golden warmth; contemplative spaces and winter rituals.",
    "matches": [
      {
        "category": "reed",
        "image": "assets/reeds/paired/f66c22d087051b33f32d.webp",
        "name": "Deep Brown Oval",
        "series": "Oval Diffuser",
        "href": "reeds-at-home-at-ease.html?product=assets%2Freeds%2Fpaired%2Ff66c22d087051b33f32d.webp&scent=incense-myrrh"
      },
      {
        "category": "crystal",
        "image": "assets/companions/480e8ea00e1b76202c86.webp",
        "name": "Cedar Relief",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F480e8ea00e1b76202c86.webp&scent=incense-myrrh"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2F0cfedbd356005d4c2754.webp&scent=incense-myrrh"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
        "name": "Dark Woods",
        "series": "Lace Glass",
        "href": "candles-a-moment-of-quiet-2.html?product=assets%2Fcandles%2Fpaired%2Fb1a337722ec53404ae09.webp&scent=incense-myrrh"
      },
      {
        "category": "reed",
        "image": "assets/companions/47d5d503511846e0926c.webp",
        "name": "Square Glass \u2014 01",
        "series": "Square Glass",
        "href": "reeds-at-home-at-ease.html?product=assets%2Fcompanions%2F47d5d503511846e0926c.webp&scent=incense-myrrh"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/947cbc1d98dee6da5d51.webp",
        "name": "Obsidian",
        "series": "Iridescent",
        "href": "candles-a-moment-of-quiet.html?product=assets%2Fcandles%2Fpaired%2F947cbc1d98dee6da5d51.webp&scent=incense-myrrh"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "gift-collection.html?product=assets%2Fgifts%2Fpaired%2F148cecd4fd72c958a34c.webp&scent=incense-myrrh"
      }
    ],
    "family": "Oriental Mystery",
    "notes": "Incense \u00b7 myrrh",
    "collectionHref": "fragrance-incense-myrrh.html"
  },
  {
    "id": "pine-cedarwood",
    "name": "Pine & Cedarwood",
    "themes": [
      "Warm & Woody",
      "Fresh & Natural"
    ],
    "top": [
      "Pine needles",
      "juniper",
      "bergamot"
    ],
    "heart": [
      "Pine",
      "cypress",
      "fir balsam"
    ],
    "base": [
      "Cedarwood",
      "moss accord",
      "soft amber"
    ],
    "description": "Crisp evergreen needles and dry forest woods; woodland interiors, winter evenings and Christmas gifting.",
    "matches": [
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7244c0a1884379c3fc46.webp",
        "name": "Silver Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F7244c0a1884379c3fc46.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/437b85b84ad977d9adc1.webp",
        "name": "Ivory Silver Trees",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F437b85b84ad977d9adc1.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
        "name": "Champagne Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F39e039fb54a6b60d7eeb.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7964d0a4e143e4c26426.webp",
        "name": "Ruby Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2F7964d0a4e143e4c26426.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
        "name": "Blue Winter Forest",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fe40a6c47b33c64f54ee4.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
        "name": "Forest Green Silver Trees",
        "series": "Winter Glass",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fa8a04f250be1545aa1c3.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
        "name": "Ivory Botanical Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fb22e9bf1bb681718f5a4.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/208837f07b39c307c4fe.webp",
        "name": "Olive Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2F208837f07b39c307c4fe.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a59a1441e620ff595494.webp",
        "name": "Forest Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fa59a1441e620ff595494.webp&scent=pine-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-056.webp",
        "name": "Forest Poetry \u2014 02",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-056.webp&scent=pine-cedarwood"
      },
      {
        "category": "candle",
        "image": "assets/candles/candles-055.webp",
        "name": "Forest Poetry \u2014 01",
        "series": "Forest Poetry",
        "href": "candles-morning-light-2.html?product=assets%2Fcandles%2Fcandles-055.webp&scent=pine-cedarwood"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "products-crystal-1.html?product=assets%2Fcompanions%2Fa35269a079593416887d.webp&scent=pine-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Fcompanions%2Fb2b8111bb9e29b42d8ed.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/c082e2bf728f7ad74860.webp",
        "name": "Pinecone Candle",
        "series": "Woodland Christmas",
        "href": "christmas-collection.html?product=assets%2Fchristmas%2Fpaired%2Fc082e2bf728f7ad74860.webp&scent=pine-cedarwood"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "reeds-at-home-at-ease-2.html?product=assets%2Freeds%2Fpaired%2Fbf42dc79d33a16875f58.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
        "name": "Forest Green Candle Trio",
        "series": "Christmas Pillars",
        "href": "christmas-collection-2.html?product=assets%2Fchristmas%2Fpaired%2Fb654bd843ac4c8041f8c.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
        "name": "Forest Green Cone Candle",
        "series": "Botanical Christmas Trees",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F7f1e156495b0a459e0d6.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
        "name": "Snowy Tree Glass Candle",
        "series": "Winter Botanicals",
        "href": "christmas-collection-4.html?product=assets%2Fchristmas%2Fpaired%2Fba0c524d4b0c2f4e9680.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
        "name": "Christmas Tree Sand Candle",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Fd9c6cf216c67a77a99fd.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2Ffa0a43337a95d05c5727.webp&scent=pine-cedarwood"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/61253e2d71812a5a6496.webp",
        "name": "Christmas Tree Candle",
        "series": "Christmas Characters",
        "href": "christmas-collection-3.html?product=assets%2Fchristmas%2Fpaired%2F61253e2d71812a5a6496.webp&scent=pine-cedarwood"
      }
    ],
    "collectionHref": "fragrance-pine-cedarwood.html",
    "family": "Warm & Woody",
    "notes": "Pine \u00b7 cypress \u00b7 fir balsam"
  }
];

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
    "series": "Woven",
    "packagingImage": "assets/candles/candles-009.webp",
    "images": [
      "assets/candles/candles-008.webp",
      "assets/candles/candles-009.webp"
    ],
    "alternateView": true,
    "viewLabels": [
      "WOVEN CANDLE",
      "GLASS CANDLE & WOVEN COVER"
    ]
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
    "name": "Jellyfish Egg Candle",
    "image": "assets/candles/candles-033.webp",
    "series": "Jellyfish",
    "packagingImage": "assets/candles/candles-035.webp",
    "alternateView": true,
    "viewLabels": [
      "OPEN EGG CANDLE",
      "CLOSED EGG CANDLE"
    ],
    "images": [
      "assets/candles/candles-033.webp",
      "assets/candles/candles-035.webp"
    ]
  },
  {
    "name": "Jellyfish Glass Candle",
    "image": "assets/candles/candles-089.webp",
    "series": "Jellyfish"
  },
  {
    "name": "Birthday — 02",
    "image": "assets/candles/candles-034.webp",
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
  }
];
const reedProducts = [
  {
    "id": "reed-pair-8e262fb59fe0",
    "name": "First Encounter",
    "series": "Ribbon Glass",
    "image": "assets/reeds/paired/8e262fb59fe070149987.webp",
    "packagingImage": "assets/reeds/paired/482e60d0c69c7e8eca3b.webp",
    "images": [
      "assets/reeds/paired/8e262fb59fe070149987.webp",
      "assets/reeds/paired/482e60d0c69c7e8eca3b.webp"
    ]
  },
  {
    "id": "reed-pair-0a8c637f10e3",
    "name": "French Neighbourhood",
    "series": "Ribbon Glass",
    "image": "assets/reeds/paired/0a8c637f10e3e435ded4.webp",
    "packagingImage": "assets/reeds/paired/20d374242f1f4c7932d3.webp",
    "images": [
      "assets/reeds/paired/0a8c637f10e3e435ded4.webp",
      "assets/reeds/paired/20d374242f1f4c7932d3.webp"
    ]
  },
  {
    "id": "reed-pair-784f4e7e2722",
    "name": "Brilliant Love",
    "series": "Ribbon Glass",
    "image": "assets/reeds/paired/784f4e7e2722b90cad34.webp",
    "packagingImage": "assets/reeds/paired/9ff179c641b679e79eea.webp",
    "images": [
      "assets/reeds/paired/784f4e7e2722b90cad34.webp",
      "assets/reeds/paired/9ff179c641b679e79eea.webp"
    ]
  },
  {
    "id": "reed-pair-201427d60f11",
    "name": "Zen Tea",
    "series": "Ribbon Glass",
    "image": "assets/reeds/paired/201427d60f110f84530c.webp",
    "packagingImage": "assets/reeds/paired/861e4e43ef4f70861da9.webp",
    "images": [
      "assets/reeds/paired/201427d60f110f84530c.webp",
      "assets/reeds/paired/861e4e43ef4f70861da9.webp"
    ]
  },
  {
    "id": "reed-pair-5f3d2fbfc68b",
    "name": "Moonlit Gardenia — Tall",
    "series": "Ribbed Ceramic",
    "image": "assets/reeds/paired/5f3d2fbfc68b486eeb50.webp",
    "packagingImage": "assets/reeds/paired/eb34d6dd86acdef30636.webp",
    "images": [
      "assets/reeds/paired/5f3d2fbfc68b486eeb50.webp",
      "assets/reeds/paired/eb34d6dd86acdef30636.webp"
    ]
  },
  {
    "id": "reed-pair-89098584f61f",
    "name": "Moonlit Gardenia — Rounded",
    "series": "Ribbed Ceramic",
    "image": "assets/reeds/paired/89098584f61f10212aea.webp",
    "packagingImage": "assets/reeds/paired/c7311dae17ba9cda276d.webp",
    "images": [
      "assets/reeds/paired/89098584f61f10212aea.webp",
      "assets/reeds/paired/c7311dae17ba9cda276d.webp"
    ]
  },
  {
    "id": "reed-pair-0cd03e5f4aa3",
    "name": "Sage & Sandalwood — Rounded",
    "series": "Ribbed Ceramic",
    "image": "assets/reeds/paired/0cd03e5f4aa361a2de7f.webp",
    "packagingImage": "assets/reeds/paired/0b1040bd3c53c99b3b5a.webp",
    "images": [
      "assets/reeds/paired/0cd03e5f4aa361a2de7f.webp",
      "assets/reeds/paired/0b1040bd3c53c99b3b5a.webp"
    ]
  },
  {
    "id": "reed-pair-add3d2fe6427",
    "name": "Sage & Sandalwood — Tall",
    "series": "Ribbed Ceramic",
    "image": "assets/reeds/paired/add3d2fe642716e15fb5.webp",
    "packagingImage": "assets/reeds/paired/4706d4375b32d06ae7bf.webp",
    "images": [
      "assets/reeds/paired/add3d2fe642716e15fb5.webp",
      "assets/reeds/paired/4706d4375b32d06ae7bf.webp"
    ]
  },
  {
    "id": "reed-pair-cea8db64b1b6",
    "name": "Ebony & Rose Infusion",
    "series": "Botanical Glass",
    "image": "assets/reeds/paired/cea8db64b1b62b86670e.webp",
    "packagingImage": "assets/reeds/paired/8fb53670ee21b6b43428.webp",
    "images": [
      "assets/reeds/paired/cea8db64b1b62b86670e.webp",
      "assets/reeds/paired/8fb53670ee21b6b43428.webp"
    ]
  },
  {
    "id": "reed-pair-4d646c939a3b",
    "name": "Graphite Jasmine",
    "series": "Matte Glass",
    "image": "assets/reeds/paired/4d646c939a3be7d88aef.webp",
    "packagingImage": "assets/reeds/paired/5c95d937f824322c45ba.webp",
    "images": [
      "assets/reeds/paired/4d646c939a3be7d88aef.webp",
      "assets/reeds/paired/5c95d937f824322c45ba.webp"
    ]
  },
  {
    "id": "reed-pair-64d6d060ce25",
    "name": "Mountain Rain",
    "series": "Colour Glass",
    "image": "assets/reeds/paired/64d6d060ce2595ff9070.webp",
    "packagingImage": "assets/reeds/paired/526eb2448933f14c6a3b.webp",
    "images": [
      "assets/reeds/paired/64d6d060ce2595ff9070.webp",
      "assets/reeds/paired/526eb2448933f14c6a3b.webp"
    ]
  },
  {
    "id": "reed-pair-bf42dc79d33a",
    "name": "Cloud Pine",
    "series": "Colour Glass",
    "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
    "packagingImage": "assets/reeds/paired/8c4248ccbd09393b1535.webp",
    "images": [
      "assets/reeds/paired/bf42dc79d33a16875f58.webp",
      "assets/reeds/paired/8c4248ccbd09393b1535.webp"
    ]
  },
  {
    "id": "reed-pair-3c06b51cf59c",
    "name": "Golden Osmanthus",
    "series": "Colour Glass",
    "image": "assets/reeds/paired/3c06b51cf59cbf4d481d.webp",
    "packagingImage": "assets/reeds/paired/9569a214eae3d7e31c6b.webp",
    "images": [
      "assets/reeds/paired/3c06b51cf59cbf4d481d.webp",
      "assets/reeds/paired/9569a214eae3d7e31c6b.webp"
    ]
  },
  {
    "id": "reed-pair-31d02f3668b7",
    "name": "Osmanthus Blossom",
    "series": "Floral Glass",
    "image": "assets/reeds/paired/31d02f3668b75883be89.webp",
    "packagingImage": "assets/reeds/paired/8afe77f6b1fb43997c12.webp",
    "images": [
      "assets/reeds/paired/31d02f3668b75883be89.webp",
      "assets/reeds/paired/8afe77f6b1fb43997c12.webp"
    ]
  },
  {
    "id": "reed-pair-811b4bb9a24f",
    "name": "Peach Blossom — Branches",
    "series": "Floral Glass",
    "image": "assets/reeds/paired/811b4bb9a24f8006326a.webp",
    "packagingImage": "assets/reeds/paired/6373398f71aa6e313bfd.webp",
    "images": [
      "assets/reeds/paired/811b4bb9a24f8006326a.webp",
      "assets/reeds/paired/6373398f71aa6e313bfd.webp"
    ]
  },
  {
    "id": "reed-pair-42174ebd1ef8",
    "name": "Peach Blossom — Petals",
    "series": "Floral Glass",
    "image": "assets/reeds/paired/42174ebd1ef8f2421c12.webp",
    "packagingImage": "assets/reeds/paired/2f4c041b8722e5412fb6.webp",
    "images": [
      "assets/reeds/paired/42174ebd1ef8f2421c12.webp",
      "assets/reeds/paired/2f4c041b8722e5412fb6.webp"
    ]
  },
  {
    "id": "reed-pair-7cd70493905e",
    "name": "Black Daisy",
    "series": "Sculpted Floral",
    "image": "assets/reeds/paired/7cd70493905ebfe2764c.webp",
    "packagingImage": "assets/reeds/paired/cffe497738ab11179dc2.webp",
    "images": [
      "assets/reeds/paired/7cd70493905ebfe2764c.webp",
      "assets/reeds/paired/cffe497738ab11179dc2.webp"
    ]
  },
  {
    "id": "reed-pair-9317be016ed6",
    "name": "Sage Daisy",
    "series": "Sculpted Floral",
    "image": "assets/reeds/paired/9317be016ed63d39b67c.webp",
    "packagingImage": "assets/reeds/paired/48694731de4994d1c5b8.webp",
    "images": [
      "assets/reeds/paired/9317be016ed63d39b67c.webp",
      "assets/reeds/paired/48694731de4994d1c5b8.webp"
    ]
  },
  {
    "id": "reed-pair-7bd1f3d29f5f",
    "name": "Ivory Daisy",
    "series": "Sculpted Floral",
    "image": "assets/reeds/paired/7bd1f3d29f5f641ddd3d.webp",
    "packagingImage": "assets/reeds/paired/4bd8595e06d4c4f7b1ec.webp",
    "images": [
      "assets/reeds/paired/7bd1f3d29f5f641ddd3d.webp",
      "assets/reeds/paired/4bd8595e06d4c4f7b1ec.webp"
    ]
  },
  {
    "id": "reed-pair-7e95a9fee680",
    "name": "White Musk Stone",
    "series": "Stone Diffuser",
    "image": "assets/reeds/paired/7e95a9fee680e36d69cf.webp",
    "packagingImage": "assets/reeds/paired/bfa0a2be7901451d185e.webp",
    "images": [
      "assets/reeds/paired/7e95a9fee680e36d69cf.webp",
      "assets/reeds/paired/bfa0a2be7901451d185e.webp"
    ]
  },
  {
    "id": "reed-pair-f66c22d08705",
    "name": "Deep Brown Oval",
    "series": "Oval Diffuser",
    "image": "assets/reeds/paired/f66c22d087051b33f32d.webp",
    "packagingImage": "assets/reeds/paired/89738c79044d1ac638a4.webp",
    "images": [
      "assets/reeds/paired/f66c22d087051b33f32d.webp",
      "assets/reeds/paired/89738c79044d1ac638a4.webp"
    ]
  },
  {
    "id": "reed-pair-0506f93bffb5",
    "name": "Warm Brown Oval",
    "series": "Oval Diffuser",
    "image": "assets/reeds/paired/0506f93bffb5a0774f90.webp",
    "packagingImage": "assets/reeds/paired/3736c6ed944007effe1e.webp",
    "images": [
      "assets/reeds/paired/0506f93bffb5a0774f90.webp",
      "assets/reeds/paired/3736c6ed944007effe1e.webp"
    ]
  },
  {
    "id": "reed-pair-87f8057288c6",
    "name": "Curved Reeds",
    "series": "Double Glass",
    "image": "assets/reeds/paired/87f8057288c690b4cb2b.webp",
    "packagingImage": "assets/reeds/paired/88edd9f073f5354e31ff.webp",
    "images": [
      "assets/reeds/paired/87f8057288c690b4cb2b.webp",
      "assets/reeds/paired/88edd9f073f5354e31ff.webp"
    ]
  },
  {
    "id": "reed-pair-27cc25f4936d",
    "name": "Peony Blossom",
    "series": "Triangular Glass",
    "image": "assets/reeds/paired/27cc25f4936db9e927d9.webp",
    "packagingImage": "assets/reeds/paired/a3348261c13a5e72c11f.webp",
    "images": [
      "assets/reeds/paired/27cc25f4936db9e927d9.webp",
      "assets/reeds/paired/a3348261c13a5e72c11f.webp"
    ]
  },
  {
    "id": "reed-pair-3d49e14d13a5",
    "name": "English Pear & Freesia",
    "series": "Triangular Glass",
    "image": "assets/reeds/paired/3d49e14d13a50bc979c6.webp",
    "packagingImage": "assets/reeds/paired/5ef174681d462db23b5f.webp",
    "images": [
      "assets/reeds/paired/3d49e14d13a50bc979c6.webp",
      "assets/reeds/paired/5ef174681d462db23b5f.webp"
    ]
  },
  {
    "name": "Seven-Colour Gift Set",
    "image": "assets/reeds/reed-01.webp",
    "series": "Colour Collection",
    "packagingImage": "assets/reeds/reed-02.webp",
    "images": [
      "assets/reeds/reed-01.webp",
      "assets/reeds/reed-02.webp"
    ]
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
    "image": "assets/companions/d254438f943ca1177135.webp",
    "series": "Botanical",
    "packagingImage": "assets/reeds/reeds-103.webp",
    "images": [
      "assets/companions/d254438f943ca1177135.webp",
      "assets/reeds/reeds-103.webp"
    ]
  },
  {
    "name": "Cylindrical — 01",
    "image": "assets/companions/7f5bb0b72c302656cc3e.webp",
    "series": "Cylindrical",
    "packagingImage": "assets/reeds/reeds-104.webp",
    "images": [
      "assets/companions/7f5bb0b72c302656cc3e.webp",
      "assets/reeds/reeds-104.webp"
    ]
  },
  {
    "name": "Cylindrical — 02",
    "image": "assets/companions/57fc12ec0de57fe4822f.webp",
    "series": "Cylindrical",
    "packagingImage": "assets/reeds/reeds-105.webp",
    "images": [
      "assets/companions/57fc12ec0de57fe4822f.webp",
      "assets/reeds/reeds-105.webp"
    ]
  },
  {
    "name": "Cylindrical — 03",
    "image": "assets/companions/eb66283958ad1067c60b.webp",
    "series": "Cylindrical",
    "packagingImage": "assets/reeds/reeds-106.webp",
    "images": [
      "assets/companions/eb66283958ad1067c60b.webp",
      "assets/reeds/reeds-106.webp"
    ]
  },
  {
    "name": "Cylindrical — 04",
    "image": "assets/companions/7ca9a742e8adc548081d.webp",
    "series": "Cylindrical",
    "packagingImage": "assets/reeds/reeds-107.webp",
    "images": [
      "assets/companions/7ca9a742e8adc548081d.webp",
      "assets/reeds/reeds-107.webp"
    ]
  },
  {
    "name": "Square Glass — 01",
    "image": "assets/companions/47d5d503511846e0926c.webp",
    "series": "Square Glass",
    "packagingImage": "assets/reeds/reeds-108.webp",
    "images": [
      "assets/companions/47d5d503511846e0926c.webp",
      "assets/reeds/reeds-108.webp"
    ]
  },
  {
    "name": "Square Glass — 02",
    "image": "assets/reeds/reeds-109.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 03",
    "image": "assets/companions/1b5ead3137dec1267c9b.webp",
    "series": "Square Glass",
    "packagingImage": "assets/reeds/reeds-110.webp",
    "images": [
      "assets/companions/1b5ead3137dec1267c9b.webp",
      "assets/reeds/reeds-110.webp"
    ]
  },
  {
    "name": "Square Glass — 04",
    "image": "assets/reeds/reeds-111.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 05",
    "image": "assets/companions/f034578ed7703c8e8eda.webp",
    "series": "Square Glass",
    "packagingImage": "assets/reeds/reeds-112.webp",
    "images": [
      "assets/companions/f034578ed7703c8e8eda.webp",
      "assets/reeds/reeds-112.webp"
    ]
  },
  {
    "name": "Square Glass — 06",
    "image": "assets/reeds/reeds-113.webp",
    "series": "Square Glass"
  },
  {
    "name": "Square Glass — 07",
    "image": "assets/companions/97b297ac3d3b797368fa.webp",
    "series": "Square Glass",
    "packagingImage": "assets/reeds/reeds-114.webp",
    "images": [
      "assets/companions/97b297ac3d3b797368fa.webp",
      "assets/reeds/reeds-114.webp"
    ]
  },
  {
    "name": "Square Glass — 08",
    "image": "assets/reeds/reeds-115.webp",
    "series": "Square Glass"
  },
  {
    "name": "Botanical Infusion — 01",
    "image": "assets/companions/231a21cbbc3f7b033780.webp",
    "series": "Botanical Infusion",
    "packagingImage": "assets/reeds/reeds-116.webp",
    "images": [
      "assets/companions/231a21cbbc3f7b033780.webp",
      "assets/reeds/reeds-116.webp"
    ]
  },
  {
    "name": "Botanical Infusion — 02",
    "image": "assets/reeds/reeds-117.webp",
    "series": "Botanical Infusion"
  },
  {
    "name": "Botanical Infusion — 03",
    "image": "assets/companions/9a2ccca3988e0e6b8bbb.webp",
    "series": "Botanical Infusion",
    "packagingImage": "assets/reeds/reeds-118.webp",
    "images": [
      "assets/companions/9a2ccca3988e0e6b8bbb.webp",
      "assets/reeds/reeds-118.webp"
    ]
  },
  {
    "name": "Minimal — 01",
    "image": "assets/companions/27e4b122a9b559ae799d.webp",
    "series": "Minimal",
    "packagingImage": "assets/reeds/reeds-119.webp",
    "images": [
      "assets/companions/27e4b122a9b559ae799d.webp",
      "assets/reeds/reeds-119.webp"
    ]
  },
  {
    "name": "Minimal — 02",
    "image": "assets/companions/d83b888e65240d5a7203.webp",
    "series": "Minimal",
    "packagingImage": "assets/reeds/reeds-120.webp",
    "images": [
      "assets/companions/d83b888e65240d5a7203.webp",
      "assets/reeds/reeds-120.webp"
    ]
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
    "series": "Floral Bouquet",
    "packagingImage": "assets/companions/0b2b75949c773fdd63c9.webp",
    "images": [
      "assets/reeds/reed-c188d2780401e54a.webp",
      "assets/companions/0b2b75949c773fdd63c9.webp"
    ]
  },
  {
    "name": "Amber Tea",
    "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
    "series": "Floral Bouquet",
    "packagingImage": "assets/companions/3b2785fbc15d460a3cb8.webp",
    "images": [
      "assets/reeds/reed-08fc7a8f9eb9370f.webp",
      "assets/companions/3b2785fbc15d460a3cb8.webp"
    ]
  },
  {
    "name": "White Tea Blossom",
    "image": "assets/reeds/reed-374f9f3b71955935.webp",
    "series": "Floral Bouquet",
    "packagingImage": "assets/companions/1dfece1a6696b4db558e.webp",
    "images": [
      "assets/reeds/reed-374f9f3b71955935.webp",
      "assets/companions/1dfece1a6696b4db558e.webp"
    ]
  },
  {
    "name": "Amber Floral Arrangement",
    "image": "assets/reeds/reed-61ad69a502bd3498.webp",
    "series": "Floral Bouquet",
    "packagingImage": "assets/companions/d24690d967a11265e0f1.webp",
    "images": [
      "assets/reeds/reed-61ad69a502bd3498.webp",
      "assets/companions/d24690d967a11265e0f1.webp"
    ]
  },
  {
    "name": "White Gardenia",
    "image": "assets/reeds/reed-3646bcf197e2090c.webp",
    "series": "Floral Bouquet",
    "packagingImage": "assets/companions/e89ef935f20eed455e72.webp",
    "images": [
      "assets/reeds/reed-3646bcf197e2090c.webp",
      "assets/companions/e89ef935f20eed455e72.webp"
    ]
  },
  {
    "name": "Four Seasons Tea",
    "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/cb1ffa93cfdffdb49bef.webp",
    "images": [
      "assets/reeds/reed-b2f6d6a6d3e67553.webp",
      "assets/companions/cb1ffa93cfdffdb49bef.webp"
    ]
  },
  {
    "name": "Gardenia & White Tea",
    "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/89effacce8fe75a0b949.webp",
    "images": [
      "assets/reeds/reed-db41da38fbfc9eb9.webp",
      "assets/companions/89effacce8fe75a0b949.webp"
    ]
  },
  {
    "name": "Osmanthus & Longjing",
    "image": "assets/reeds/reed-f82a3208f64026bc.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/8b1b06e2bb959e756507.webp",
    "images": [
      "assets/reeds/reed-f82a3208f64026bc.webp",
      "assets/companions/8b1b06e2bb959e756507.webp"
    ]
  },
  {
    "name": "Plum & Sencha",
    "image": "assets/reeds/reed-1883f549fd4393dd.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/b5ad16c966009065c302.webp",
    "images": [
      "assets/reeds/reed-1883f549fd4393dd.webp",
      "assets/companions/b5ad16c966009065c302.webp"
    ]
  },
  {
    "name": "Olive Magnolia",
    "image": "assets/reeds/reed-0d3f3a982460ae6d.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/4b62e0de0833c546d196.webp",
    "images": [
      "assets/reeds/reed-0d3f3a982460ae6d.webp",
      "assets/companions/4b62e0de0833c546d196.webp"
    ]
  },
  {
    "name": "White Peach & Oolong",
    "image": "assets/reeds/reed-6ffc48159c0055e0.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/60070777153ce638f37d.webp",
    "images": [
      "assets/reeds/reed-6ffc48159c0055e0.webp",
      "assets/companions/60070777153ce638f37d.webp"
    ]
  },
  {
    "name": "Jasmine Green Tea",
    "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
    "series": "Floral Tea",
    "packagingImage": "assets/companions/6e17b7bbc1d4383c96e5.webp",
    "images": [
      "assets/reeds/reed-640affaca6c8bc7e.webp",
      "assets/companions/6e17b7bbc1d4383c96e5.webp"
    ]
  },
  {
    "name": "Seven-Day Fragrance Gift Set",
    "image": "assets/reeds/reed-6760c2cb73451078.webp",
    "series": "Seven-Day Rituals"
  },
  {
    "name": "Refresh",
    "image": "assets/companions/6bb45b8d3cadf69b519f.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-e216d9fbfb361cfc.webp",
    "images": [
      "assets/companions/6bb45b8d3cadf69b519f.webp",
      "assets/reeds/reed-e216d9fbfb361cfc.webp"
    ]
  },
  {
    "name": "Joy",
    "image": "assets/companions/e1974e206548b944acc1.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-ab4ba29f23a51f7f.webp",
    "images": [
      "assets/companions/e1974e206548b944acc1.webp",
      "assets/reeds/reed-ab4ba29f23a51f7f.webp"
    ]
  },
  {
    "name": "Focus",
    "image": "assets/companions/5ad03d9fc0154ad26216.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-fb8173ad10d76faa.webp",
    "images": [
      "assets/companions/5ad03d9fc0154ad26216.webp",
      "assets/reeds/reed-fb8173ad10d76faa.webp"
    ]
  },
  {
    "name": "Spark",
    "image": "assets/companions/c7a31362439fcd8e52cd.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-baddad1b04ff467e.webp",
    "images": [
      "assets/companions/c7a31362439fcd8e52cd.webp",
      "assets/reeds/reed-baddad1b04ff467e.webp"
    ]
  },
  {
    "name": "Wander",
    "image": "assets/companions/143ea721b89f464528da.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-7a574f3e4a4ab4e6.webp",
    "images": [
      "assets/companions/143ea721b89f464528da.webp",
      "assets/reeds/reed-7a574f3e4a4ab4e6.webp"
    ]
  },
  {
    "name": "Glow",
    "image": "assets/companions/776c5824d6f8c3e348a0.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-8d477d2ae4137382.webp",
    "images": [
      "assets/companions/776c5824d6f8c3e348a0.webp",
      "assets/reeds/reed-8d477d2ae4137382.webp"
    ]
  },
  {
    "name": "Rest",
    "image": "assets/companions/20aea59b3de55988cfcb.webp",
    "series": "Seven-Day Rituals",
    "packagingImage": "assets/reeds/reed-167e5464ca5d6fc7.webp",
    "images": [
      "assets/companions/20aea59b3de55988cfcb.webp",
      "assets/reeds/reed-167e5464ca5d6fc7.webp"
    ]
  },
  {
    "name": "Winter Bonfire",
    "image": "assets/companions/78919717797a963dc844.webp",
    "series": "Festive",
    "packagingImage": "assets/reeds/reed-56e38210a5f9a26d.webp",
    "images": [
      "assets/companions/78919717797a963dc844.webp",
      "assets/reeds/reed-56e38210a5f9a26d.webp"
    ]
  },
  {
    "name": "Christmas Amber",
    "image": "assets/companions/cc0696772d15e3acdb9d.webp",
    "series": "Festive",
    "packagingImage": "assets/reeds/reed-b695597b0dabb53c.webp",
    "images": [
      "assets/companions/cc0696772d15e3acdb9d.webp",
      "assets/reeds/reed-b695597b0dabb53c.webp"
    ]
  },
  {
    "name": "Fireside Wishes",
    "image": "assets/companions/33ac66bd00830bdaa036.webp",
    "series": "Festive",
    "packagingImage": "assets/reeds/reed-b96dc85d16ee173c.webp",
    "images": [
      "assets/companions/33ac66bd00830bdaa036.webp",
      "assets/reeds/reed-b96dc85d16ee173c.webp"
    ]
  },
  {
    "name": "Cedar Cabin",
    "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
    "series": "Festive",
    "packagingImage": "assets/reeds/reed-5e8b9aaf6c03a6a0.webp",
    "images": [
      "assets/companions/b2b8111bb9e29b42d8ed.webp",
      "assets/reeds/reed-5e8b9aaf6c03a6a0.webp"
    ]
  }
];
const crystalProducts = [
  {
    "name": "Peach Whisper",
    "image": "assets/companions/040856927401c5aa9fe5.webp",
    "series": "Glass dome",
    "packagingImage": "assets/crystals/crystal-01.webp",
    "images": [
      "assets/companions/040856927401c5aa9fe5.webp",
      "assets/crystals/crystal-01.webp"
    ]
  },
  {
    "name": "Lavender Reverie",
    "image": "assets/companions/475614e9e2d215c64a93.webp",
    "series": "Glass dome",
    "packagingImage": "assets/crystals/crystal-02.webp",
    "images": [
      "assets/companions/475614e9e2d215c64a93.webp",
      "assets/crystals/crystal-02.webp"
    ]
  },
  {
    "name": "Morning Mist",
    "image": "assets/companions/6ee1d58cc46162d5a542.webp",
    "series": "Glass dome",
    "packagingImage": "assets/crystals/crystal-03.webp",
    "images": [
      "assets/companions/6ee1d58cc46162d5a542.webp",
      "assets/crystals/crystal-03.webp"
    ]
  },
  {
    "name": "Verdant Calm",
    "image": "assets/companions/c135302863be554b69df.webp",
    "series": "Glass dome",
    "packagingImage": "assets/crystals/crystal-04.webp",
    "images": [
      "assets/companions/c135302863be554b69df.webp",
      "assets/crystals/crystal-04.webp"
    ]
  },
  {
    "name": "Cedar Relief",
    "image": "assets/companions/480e8ea00e1b76202c86.webp",
    "series": "Sculpted bowl",
    "packagingImage": "assets/crystals/crystal-05.webp",
    "images": [
      "assets/companions/480e8ea00e1b76202c86.webp",
      "assets/crystals/crystal-05.webp"
    ]
  },
  {
    "name": "Ivory Texture",
    "image": "assets/companions/39ead58bc6ca45512276.webp",
    "series": "Sculpted bowl",
    "packagingImage": "assets/crystals/crystal-06.webp",
    "images": [
      "assets/companions/39ead58bc6ca45512276.webp",
      "assets/crystals/crystal-06.webp"
    ]
  },
  {
    "name": "Ivory Relief",
    "image": "assets/companions/725149dff6d9af2e3e50.webp",
    "series": "Sculpted bowl",
    "packagingImage": "assets/crystals/crystal-07.webp",
    "images": [
      "assets/companions/725149dff6d9af2e3e50.webp",
      "assets/crystals/crystal-07.webp"
    ]
  },
  {
    "name": "Amber Dusk",
    "image": "assets/companions/0cfedbd356005d4c2754.webp",
    "series": "Sculpted bowl",
    "packagingImage": "assets/crystals/crystal-08.webp",
    "images": [
      "assets/companions/0cfedbd356005d4c2754.webp",
      "assets/crystals/crystal-08.webp"
    ]
  },
  {
    "name": "Blue Serenity",
    "image": "assets/companions/64e857d6f3b7717040c8.webp",
    "series": "Botanical glass",
    "packagingImage": "assets/crystals/crystal-09.webp",
    "images": [
      "assets/companions/64e857d6f3b7717040c8.webp",
      "assets/crystals/crystal-09.webp"
    ]
  },
  {
    "name": "Purple Mist",
    "image": "assets/companions/a59b5af2bc9cfd7b724a.webp",
    "series": "Botanical glass",
    "packagingImage": "assets/crystals/crystal-10.webp",
    "images": [
      "assets/companions/a59b5af2bc9cfd7b724a.webp",
      "assets/crystals/crystal-10.webp"
    ]
  },
  {
    "name": "Rose Mist",
    "image": "assets/companions/7f866c903bcf75344101.webp",
    "series": "Botanical glass",
    "packagingImage": "assets/crystals/crystal-11.webp",
    "images": [
      "assets/companions/7f866c903bcf75344101.webp",
      "assets/crystals/crystal-11.webp"
    ]
  },
  {
    "name": "Botanical Light",
    "image": "assets/companions/7d04b24755dabebec6e7.webp",
    "series": "Botanical glass",
    "packagingImage": "assets/crystals/crystal-12.webp",
    "images": [
      "assets/companions/7d04b24755dabebec6e7.webp",
      "assets/crystals/crystal-12.webp"
    ]
  },
  {
    "name": "Forest Reverie",
    "image": "assets/companions/a35269a079593416887d.webp",
    "series": "Botanical glass",
    "packagingImage": "assets/crystals/crystal-13.webp",
    "images": [
      "assets/companions/a35269a079593416887d.webp",
      "assets/crystals/crystal-13.webp"
    ]
  }
];

const giftProducts = [
  {
    "id": "gift-pair-f6a3b3425eee",
    "name": "Emerald Duo",
    "series": "Colourful Rituals",
    "image": "assets/gifts/paired/f6a3b3425eee85def0c0.webp",
    "packagingImage": "assets/gifts/paired/abd979b1f248e6237729.webp",
    "images": [
      "assets/gifts/paired/f6a3b3425eee85def0c0.webp",
      "assets/gifts/paired/abd979b1f248e6237729.webp"
    ]
  },
  {
    "id": "gift-pair-fdf9a8279d9f",
    "name": "Cobalt Duo",
    "series": "Colourful Rituals",
    "image": "assets/gifts/paired/fdf9a8279d9f87f3df91.webp",
    "packagingImage": "assets/gifts/paired/c5ced5e21f4654b241a9.webp",
    "images": [
      "assets/gifts/paired/fdf9a8279d9f87f3df91.webp",
      "assets/gifts/paired/c5ced5e21f4654b241a9.webp"
    ]
  },
  {
    "id": "gift-pair-905159d5184c",
    "name": "Sunshine Duo",
    "series": "Colourful Rituals",
    "image": "assets/gifts/paired/905159d5184ce017c1a2.webp",
    "packagingImage": "assets/gifts/paired/7ed1989a46c5c62daa9d.webp",
    "images": [
      "assets/gifts/paired/905159d5184ce017c1a2.webp",
      "assets/gifts/paired/7ed1989a46c5c62daa9d.webp"
    ]
  },
  {
    "id": "gift-pair-ffb8c60ea39c",
    "name": "Amber Orange Duo",
    "series": "Colourful Rituals",
    "image": "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
    "packagingImage": "assets/gifts/paired/9f04a45af00601d93e48.webp",
    "images": [
      "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
      "assets/gifts/paired/9f04a45af00601d93e48.webp"
    ]
  },
  {
    "id": "gift-pair-90b1f7205529",
    "name": "Five Colour Fragrance Set",
    "series": "Colourful Rituals",
    "image": "assets/gifts/paired/90b1f7205529d6c92bf0.webp",
    "packagingImage": "assets/gifts/paired/578f9b3efd7eb88cbc34.webp",
    "images": [
      "assets/gifts/paired/90b1f7205529d6c92bf0.webp",
      "assets/gifts/paired/578f9b3efd7eb88cbc34.webp"
    ]
  },
  {
    "id": "gift-pair-148cecd4fd72",
    "name": "Mystical Woods Duo",
    "series": "Quiet Rituals",
    "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
    "packagingImage": "assets/gifts/paired/956fb52f0db7a138c33e.webp",
    "images": [
      "assets/gifts/paired/148cecd4fd72c958a34c.webp",
      "assets/gifts/paired/956fb52f0db7a138c33e.webp"
    ]
  },
  {
    "id": "gift-pair-b782592d4051",
    "name": "Red Wine & Rose Duo",
    "series": "Quiet Rituals",
    "image": "assets/gifts/paired/b782592d405151c5df31.webp",
    "packagingImage": "assets/gifts/paired/f5d1598539cf48dcdd5f.webp",
    "images": [
      "assets/gifts/paired/b782592d405151c5df31.webp",
      "assets/gifts/paired/f5d1598539cf48dcdd5f.webp"
    ]
  },
  {
    "id": "gift-pair-66dc6cb05488",
    "name": "Sage Green Duo",
    "series": "Quiet Rituals",
    "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
    "packagingImage": "assets/gifts/paired/a5c85039efd394dbd1f9.webp",
    "images": [
      "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
      "assets/gifts/paired/a5c85039efd394dbd1f9.webp"
    ]
  },
  {
    "id": "gift-pair-5cd23250a05e",
    "name": "Fragrance Ritual Trio",
    "series": "Fragrance & Lifestyle",
    "image": "assets/gifts/paired/5cd23250a05e889b2fc5.webp",
    "packagingImage": "assets/gifts/paired/458ed4a3559580ec3449.webp",
    "images": [
      "assets/gifts/paired/5cd23250a05e889b2fc5.webp",
      "assets/gifts/paired/458ed4a3559580ec3449.webp"
    ]
  },
  {
    "id": "gift-pair-71eb10fb2f75",
    "name": "Ruby Fragrance Trio",
    "series": "Fragrance & Lifestyle",
    "image": "assets/gifts/paired/71eb10fb2f75421ad40a.webp",
    "packagingImage": "assets/gifts/paired/f12a59596201a8ee1a66.webp",
    "images": [
      "assets/gifts/paired/71eb10fb2f75421ad40a.webp",
      "assets/gifts/paired/f12a59596201a8ee1a66.webp"
    ]
  },
  {
    "id": "gift-pair-20fd1335cbc9",
    "name": "Amber Tray Collection",
    "series": "Warm Living",
    "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
    "packagingImage": "assets/gifts/paired/7d461f3544b7c54058cc.webp",
    "images": [
      "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
      "assets/gifts/paired/7d461f3544b7c54058cc.webp"
    ]
  },
  {
    "id": "gift-pair-79dda4dedcfa",
    "name": "Botanical Sage Duo",
    "series": "Botanical Gifts",
    "image": "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
    "packagingImage": "assets/gifts/paired/202c0b7361219a32ce02.webp",
    "images": [
      "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
      "assets/gifts/paired/202c0b7361219a32ce02.webp"
    ]
  },
  {
    "id": "gift-pair-a7da1073bd57",
    "name": "Blush Glass Dome Duo",
    "series": "Blush Moments",
    "image": "assets/gifts/paired/a7da1073bd57b2db2336.webp",
    "packagingImage": "assets/gifts/paired/079043d5bf2a142d6734.webp",
    "images": [
      "assets/gifts/paired/a7da1073bd57b2db2336.webp",
      "assets/gifts/paired/079043d5bf2a142d6734.webp"
    ]
  },
  {
    "id": "gift-pair-7d038471456f",
    "name": "Midnight Blue Duo",
    "series": "Quiet Rituals",
    "image": "assets/gifts/paired/7d038471456f5c892207.webp",
    "packagingImage": "assets/gifts/paired/8bcda3a798604bb5f046.webp",
    "images": [
      "assets/gifts/paired/7d038471456f5c892207.webp",
      "assets/gifts/paired/8bcda3a798604bb5f046.webp"
    ]
  },
  {
    "id": "gift-pair-8efb79e6978a",
    "name": "Soft Blush Duo",
    "series": "Quiet Rituals",
    "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
    "packagingImage": "assets/gifts/paired/71c00d9780c9a4654cbf.webp",
    "images": [
      "assets/gifts/paired/8efb79e6978aa255e72c.webp",
      "assets/gifts/paired/71c00d9780c9a4654cbf.webp"
    ]
  },
  {
    "id": "gift-pair-f316b932be71",
    "name": "Wild Rose & Oud Duo",
    "series": "Square Glass",
    "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
    "packagingImage": "assets/gifts/paired/b5f5268a95926288466b.webp",
    "images": [
      "assets/gifts/paired/f316b932be71fe3aaf88.webp",
      "assets/gifts/paired/b5f5268a95926288466b.webp"
    ]
  }
];

const christmasProducts = [
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
    "id": "christmas-pair-fa0a43337a95",
    "name": "Cedar Kiss",
    "series": "Christmas Sand Art",
    "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
    "packagingImage": "assets/christmas/paired/71e714253c89c7e7786c.webp",
    "images": [
      "assets/christmas/paired/fa0a43337a95d05c5727.webp",
      "assets/christmas/paired/71e714253c89c7e7786c.webp"
    ]
  },
  {
    "id": "christmas-pair-d9c6cf216c67",
    "name": "Christmas Tree Sand Candle",
    "series": "Christmas Sand Art",
    "image": "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
    "packagingImage": "assets/christmas/paired/2fed47734ee44c6c4ec0.webp",
    "images": [
      "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
      "assets/christmas/paired/2fed47734ee44c6c4ec0.webp"
    ]
  },
  {
    "id": "christmas-pair-1480094b012d",
    "name": "Coastal Lime",
    "series": "Christmas Sand Art",
    "image": "assets/christmas/paired/1480094b012dbf961dae.webp",
    "packagingImage": "assets/christmas/paired/eccf2ee341cb83306b83.webp",
    "images": [
      "assets/christmas/paired/1480094b012dbf961dae.webp",
      "assets/christmas/paired/eccf2ee341cb83306b83.webp"
    ]
  },
  {
    "id": "christmas-pair-f77399a59a07",
    "name": "Sea Salt & Sage",
    "series": "Christmas Sand Art",
    "image": "assets/christmas/paired/f77399a59a07a9b8e1ad.webp",
    "packagingImage": "assets/christmas/paired/570f4e135e6b0a6c6132.webp",
    "images": [
      "assets/christmas/paired/f77399a59a07a9b8e1ad.webp",
      "assets/christmas/paired/570f4e135e6b0a6c6132.webp"
    ]
  },
  {
    "id": "christmas-pair-e710e9777530",
    "name": "English Pear & Freesia",
    "series": "Christmas Sand Art",
    "image": "assets/christmas/paired/e710e9777530e1a2f07e.webp",
    "packagingImage": "assets/christmas/paired/7b492072712538049b17.webp",
    "images": [
      "assets/christmas/paired/e710e9777530e1a2f07e.webp",
      "assets/christmas/paired/7b492072712538049b17.webp"
    ]
  },
  {
    "id": "christmas-pair-7f1e156495b0",
    "name": "Forest Green Cone Candle",
    "series": "Botanical Christmas Trees",
    "image": "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
    "packagingImage": "assets/christmas/paired/c7f611f49551bafe6829.webp",
    "images": [
      "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
      "assets/christmas/paired/c7f611f49551bafe6829.webp"
    ]
  },
  {
    "id": "christmas-pair-9df584ca1e16",
    "name": "Rose Pink Cone Candle",
    "series": "Botanical Christmas Trees",
    "image": "assets/christmas/paired/9df584ca1e1685589d46.webp",
    "packagingImage": "assets/christmas/paired/d836a7179e1d09085b45.webp",
    "images": [
      "assets/christmas/paired/9df584ca1e1685589d46.webp",
      "assets/christmas/paired/d836a7179e1d09085b45.webp"
    ]
  },
  {
    "id": "christmas-pair-437b85b84ad9",
    "name": "Ivory Silver Trees",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/437b85b84ad977d9adc1.webp",
    "packagingImage": "assets/christmas/paired/c7069927399f75f519c7.webp",
    "images": [
      "assets/christmas/paired/437b85b84ad977d9adc1.webp",
      "assets/christmas/paired/c7069927399f75f519c7.webp"
    ]
  },
  {
    "id": "christmas-pair-a8a04f250be1",
    "name": "Forest Green Silver Trees",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
    "packagingImage": "assets/christmas/paired/4eac7b5adced66f7218d.webp",
    "images": [
      "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
      "assets/christmas/paired/4eac7b5adced66f7218d.webp"
    ]
  },
  {
    "id": "christmas-pair-35a8205a0dcc",
    "name": "Charcoal Golden Reindeer",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/35a8205a0dcc5801c828.webp",
    "packagingImage": "assets/christmas/paired/01ff7b30cf151c744439.webp",
    "images": [
      "assets/christmas/paired/35a8205a0dcc5801c828.webp",
      "assets/christmas/paired/01ff7b30cf151c744439.webp"
    ]
  },
  {
    "id": "christmas-pair-39e039fb54a6",
    "name": "Champagne Winter Forest",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
    "packagingImage": "assets/christmas/paired/1fb11fc0f0deb0e5b3ba.webp",
    "images": [
      "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
      "assets/christmas/paired/1fb11fc0f0deb0e5b3ba.webp"
    ]
  },
  {
    "id": "christmas-pair-aa4efc0a88d6",
    "name": "Amber Christmas Cookies",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
    "packagingImage": "assets/christmas/paired/ff24fbf384c827e30e87.webp",
    "images": [
      "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
      "assets/christmas/paired/ff24fbf384c827e30e87.webp"
    ]
  },
  {
    "id": "christmas-pair-7244c0a18843",
    "name": "Silver Winter Forest",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/7244c0a1884379c3fc46.webp",
    "packagingImage": "assets/christmas/paired/0590b957fcac7787961f.webp",
    "images": [
      "assets/christmas/paired/7244c0a1884379c3fc46.webp",
      "assets/christmas/paired/0590b957fcac7787961f.webp"
    ]
  },
  {
    "id": "christmas-pair-6db267b28066",
    "name": "Silver Snowflakes",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/6db267b2806699718c15.webp",
    "packagingImage": "assets/christmas/paired/b77d8ff89e08a5d3a392.webp",
    "images": [
      "assets/christmas/paired/6db267b2806699718c15.webp",
      "assets/christmas/paired/b77d8ff89e08a5d3a392.webp"
    ]
  },
  {
    "id": "christmas-pair-ff765036bc45",
    "name": "Olive Christmas Wishes",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/ff765036bc45dff2513b.webp",
    "packagingImage": "assets/christmas/paired/d7c2dd20c1d30c0e9a83.webp",
    "images": [
      "assets/christmas/paired/ff765036bc45dff2513b.webp",
      "assets/christmas/paired/d7c2dd20c1d30c0e9a83.webp"
    ]
  },
  {
    "id": "christmas-pair-e5c69a3391c3",
    "name": "Violet Christmas Village",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/e5c69a3391c36ae30d80.webp",
    "packagingImage": "assets/christmas/paired/3416f8f9dea2ddf6d051.webp",
    "images": [
      "assets/christmas/paired/e5c69a3391c36ae30d80.webp",
      "assets/christmas/paired/3416f8f9dea2ddf6d051.webp"
    ]
  },
  {
    "id": "christmas-pair-7964d0a4e143",
    "name": "Ruby Winter Forest",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/7964d0a4e143e4c26426.webp",
    "packagingImage": "assets/christmas/paired/29ef8160006bc8f69d6c.webp",
    "images": [
      "assets/christmas/paired/7964d0a4e143e4c26426.webp",
      "assets/christmas/paired/29ef8160006bc8f69d6c.webp"
    ]
  },
  {
    "id": "christmas-pair-e40a6c47b33c",
    "name": "Blue Winter Forest",
    "series": "Winter Glass",
    "image": "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
    "packagingImage": "assets/christmas/paired/2be6dc35c5d7a05bd4ca.webp",
    "images": [
      "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
      "assets/christmas/paired/2be6dc35c5d7a05bd4ca.webp"
    ]
  },
  {
    "id": "christmas-pair-b22e9bf1bb68",
    "name": "Ivory Botanical Tree Ornament",
    "series": "Botanical Wax Ornaments",
    "image": "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
    "packagingImage": "assets/christmas/paired/f7d749aae4ffebc569af.webp",
    "images": [
      "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
      "assets/christmas/paired/f7d749aae4ffebc569af.webp"
    ]
  },
  {
    "id": "christmas-pair-a59a1441e620",
    "name": "Forest Tree Ornament",
    "series": "Botanical Wax Ornaments",
    "image": "assets/christmas/paired/a59a1441e620ff595494.webp",
    "packagingImage": "assets/christmas/paired/1d48b94cdff9ca0cdd61.webp",
    "images": [
      "assets/christmas/paired/a59a1441e620ff595494.webp",
      "assets/christmas/paired/1d48b94cdff9ca0cdd61.webp"
    ]
  },
  {
    "id": "christmas-pair-208837f07b39",
    "name": "Olive Tree Ornament",
    "series": "Botanical Wax Ornaments",
    "image": "assets/christmas/paired/208837f07b39c307c4fe.webp",
    "packagingImage": "assets/christmas/paired/b34cd3c23b4c69dfe18f.webp",
    "images": [
      "assets/christmas/paired/208837f07b39c307c4fe.webp",
      "assets/christmas/paired/b34cd3c23b4c69dfe18f.webp"
    ]
  },
  {
    "id": "christmas-pair-58479c85aca5",
    "name": "Burgundy Botanical Ornament",
    "series": "Botanical Wax Ornaments",
    "image": "assets/christmas/paired/58479c85aca5612cf8f4.webp",
    "packagingImage": "assets/christmas/paired/fab30f74e004d31e288b.webp",
    "images": [
      "assets/christmas/paired/58479c85aca5612cf8f4.webp",
      "assets/christmas/paired/fab30f74e004d31e288b.webp"
    ]
  },
  {
    "id": "christmas-pair-d2035366cd0d",
    "name": "Warm Ivory Candle Trio",
    "series": "Christmas Pillars",
    "image": "assets/christmas/paired/d2035366cd0dcfcc2393.webp",
    "packagingImage": "assets/christmas/paired/113ea729af5640e36c0d.webp",
    "images": [
      "assets/christmas/paired/d2035366cd0dcfcc2393.webp",
      "assets/christmas/paired/113ea729af5640e36c0d.webp"
    ]
  },
  {
    "id": "christmas-pair-b654bd843ac4",
    "name": "Forest Green Candle Trio",
    "series": "Christmas Pillars",
    "image": "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
    "packagingImage": "assets/christmas/paired/0dfb0aa19196bf6ad02a.webp",
    "images": [
      "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
      "assets/christmas/paired/0dfb0aa19196bf6ad02a.webp"
    ]
  },
  {
    "id": "christmas-pair-fc5ea0dccfc6",
    "name": "Gingerbread, Tree & Reindeer",
    "series": "Festive Wax Ornaments",
    "image": "assets/christmas/paired/fc5ea0dccfc61f30e459.webp",
    "packagingImage": "assets/christmas/paired/ddf1f06202e6a2919f7b.webp",
    "images": [
      "assets/christmas/paired/fc5ea0dccfc61f30e459.webp",
      "assets/christmas/paired/ddf1f06202e6a2919f7b.webp"
    ]
  },
  {
    "id": "christmas-pair-538f9f0b02ba",
    "name": "Ivory Tree, Snowflake & Reindeer",
    "series": "Festive Wax Ornaments",
    "image": "assets/christmas/paired/538f9f0b02ba68c5c5dd.webp",
    "packagingImage": "assets/christmas/paired/c595d29f8d790a231f2f.webp",
    "images": [
      "assets/christmas/paired/538f9f0b02ba68c5c5dd.webp",
      "assets/christmas/paired/c595d29f8d790a231f2f.webp"
    ]
  },
  {
    "id": "christmas-pair-4a7ace3c9ca9",
    "name": "Snowflake, Cottage & Reindeer",
    "series": "Festive Wax Ornaments",
    "image": "assets/christmas/paired/4a7ace3c9ca9f11e146c.webp",
    "packagingImage": "assets/christmas/paired/a221a0de6774b755901e.webp",
    "images": [
      "assets/christmas/paired/4a7ace3c9ca9f11e146c.webp",
      "assets/christmas/paired/a221a0de6774b755901e.webp"
    ]
  },
  {
    "id": "christmas-pair-c082e2bf728f",
    "name": "Pinecone Candle",
    "series": "Woodland Christmas",
    "image": "assets/christmas/paired/c082e2bf728f7ad74860.webp",
    "packagingImage": "assets/christmas/paired/daa8dffa171d0c19dd8f.webp",
    "images": [
      "assets/christmas/paired/c082e2bf728f7ad74860.webp",
      "assets/christmas/paired/daa8dffa171d0c19dd8f.webp"
    ]
  },
  {
    "id": "christmas-pair-61253e2d7181",
    "name": "Christmas Tree Candle",
    "series": "Christmas Characters",
    "image": "assets/christmas/paired/61253e2d71812a5a6496.webp",
    "packagingImage": "assets/christmas/paired/4fc8f29479f378a5e823.webp",
    "images": [
      "assets/christmas/paired/61253e2d71812a5a6496.webp",
      "assets/christmas/paired/4fc8f29479f378a5e823.webp"
    ]
  },
  {
    "id": "christmas-pair-6bd0508a71ef",
    "name": "Santa Candle",
    "series": "Christmas Characters",
    "image": "assets/christmas/paired/6bd0508a71ef54288424.webp",
    "packagingImage": "assets/christmas/paired/b97e961bdf8a096b4593.webp",
    "images": [
      "assets/christmas/paired/6bd0508a71ef54288424.webp",
      "assets/christmas/paired/b97e961bdf8a096b4593.webp"
    ]
  },
  {
    "id": "christmas-pair-df14c67cacea",
    "name": "Santa & Tree Candle Duo",
    "series": "Christmas Characters",
    "image": "assets/christmas/paired/df14c67cacea5845b494.webp",
    "packagingImage": "assets/christmas/paired/e96e80dae51260e4efe1.webp",
    "images": [
      "assets/christmas/paired/df14c67cacea5845b494.webp",
      "assets/christmas/paired/e96e80dae51260e4efe1.webp"
    ]
  },
  {
    "id": "christmas-pair-ba0c524d4b0c",
    "name": "Snowy Tree Glass Candle",
    "series": "Winter Botanicals",
    "image": "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
    "packagingImage": "assets/christmas/paired/e1e1554ca40fdfa700b9.webp",
    "images": [
      "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
      "assets/christmas/paired/e1e1554ca40fdfa700b9.webp"
    ]
  },
  {
    "id": "christmas-pair-6d52f0817361",
    "name": "Gingerbread Fragrance Gift Set",
    "series": "Christmas Rituals",
    "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
    "packagingImage": "assets/christmas/paired/ffee49b7c9998d38d95c.webp",
    "images": [
      "assets/christmas/paired/6d52f0817361816118b7.webp",
      "assets/christmas/paired/ffee49b7c9998d38d95c.webp"
    ]
  },
  {
    "id": "christmas-pair-1383bf46ac80",
    "name": "Smiling Gingerbread Candle",
    "series": "Playful Christmas",
    "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
    "packagingImage": "assets/christmas/paired/6c30d8c34d7599d57406.webp",
    "images": [
      "assets/christmas/paired/1383bf46ac80e1d62944.webp",
      "assets/christmas/paired/6c30d8c34d7599d57406.webp"
    ]
  },
  {
    "id": "christmas-pair-5702fcfafd21",
    "name": "Christmas Pets Candle",
    "series": "Playful Christmas",
    "image": "assets/christmas/paired/5702fcfafd2123c3f93e.webp",
    "packagingImage": "assets/christmas/paired/5ffa3721c1c014ddae15.webp",
    "images": [
      "assets/christmas/paired/5702fcfafd2123c3f93e.webp",
      "assets/christmas/paired/5ffa3721c1c014ddae15.webp"
    ]
  }
];

const sachetsProducts = [
  {
    "id": "sachets-pair-2e09dbec67e3",
    "name": "Moonlit Gardenia",
    "series": "Botanical Wax Tablets",
    "image": "assets/sachets/paired/2e09dbec67e3048635e7.webp",
    "packagingImage": "assets/sachets/paired/8ba9e6aa6446d6d57d11.webp",
    "images": [
      "assets/sachets/paired/2e09dbec67e3048635e7.webp",
      "assets/sachets/paired/8ba9e6aa6446d6d57d11.webp"
    ]
  },
  {
    "id": "sachets-pair-301de746753e",
    "name": "Citrus Fern",
    "series": "Botanical Wax Tablets",
    "image": "assets/sachets/paired/301de746753e02d728ce.webp",
    "packagingImage": "assets/sachets/paired/3447bc3222ac7083b64a.webp",
    "images": [
      "assets/sachets/paired/301de746753e02d728ce.webp",
      "assets/sachets/paired/3447bc3222ac7083b64a.webp"
    ]
  },
  {
    "id": "sachets-pair-5ee9cd54d8b6",
    "name": "Plum Blossoms",
    "series": "Botanical Wax Tablets",
    "image": "assets/sachets/paired/5ee9cd54d8b68955fb00.webp",
    "packagingImage": "assets/sachets/paired/2a7f2f7c3e8dadd879b8.webp",
    "images": [
      "assets/sachets/paired/5ee9cd54d8b68955fb00.webp",
      "assets/sachets/paired/2a7f2f7c3e8dadd879b8.webp"
    ]
  },
  {
    "id": "sachets-pair-14eefcbb28cb",
    "name": "Ivory Floral Wreath",
    "series": "Floral Wax Tablets",
    "image": "assets/sachets/paired/14eefcbb28cb40378e95.webp",
    "packagingImage": "assets/sachets/paired/fcfd75d55dc941d49dad.webp",
    "images": [
      "assets/sachets/paired/14eefcbb28cb40378e95.webp",
      "assets/sachets/paired/fcfd75d55dc941d49dad.webp"
    ]
  },
  {
    "id": "sachets-pair-b232e0c6ef6a",
    "name": "Apricot Floral Wreath",
    "series": "Floral Wax Tablets",
    "image": "assets/sachets/paired/b232e0c6ef6a01e2730e.webp",
    "packagingImage": "assets/sachets/paired/281ba272038aedad420d.webp",
    "images": [
      "assets/sachets/paired/b232e0c6ef6a01e2730e.webp",
      "assets/sachets/paired/281ba272038aedad420d.webp"
    ]
  },
  {
    "id": "sachets-pair-d2a2c13cb519",
    "name": "Moss Sachet",
    "series": "Fabric Fragrance Sachets",
    "image": "assets/sachets/paired/d2a2c13cb519e3a3e386.webp",
    "packagingImage": "assets/sachets/paired/805005b2cedf8842b51b.webp",
    "images": [
      "assets/sachets/paired/d2a2c13cb519e3a3e386.webp",
      "assets/sachets/paired/805005b2cedf8842b51b.webp"
    ]
  },
  {
    "id": "sachets-pair-ead03b28dd75",
    "name": "Peach Moments Sachet",
    "series": "Fabric Fragrance Sachets",
    "image": "assets/sachets/paired/ead03b28dd75d66e5fbc.webp",
    "packagingImage": "assets/sachets/paired/bc657b807d7bfe5c03f2.webp",
    "images": [
      "assets/sachets/paired/ead03b28dd75d66e5fbc.webp",
      "assets/sachets/paired/bc657b807d7bfe5c03f2.webp"
    ]
  },
  {
    "id": "sachets-pair-b70e7617bf5f",
    "name": "Bergamot Sachet",
    "series": "Fabric Fragrance Sachets",
    "image": "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
    "packagingImage": "assets/sachets/paired/923646f8a534ac3bf884.webp",
    "images": [
      "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
      "assets/sachets/paired/923646f8a534ac3bf884.webp"
    ]
  },
  {
    "id": "sachets-pair-c9f48cb1e168",
    "name": "Iris Sachet",
    "series": "Fabric Fragrance Sachets",
    "image": "assets/sachets/paired/c9f48cb1e1688995b7f5.webp",
    "packagingImage": "assets/sachets/paired/baf0805f158dba163e80.webp",
    "images": [
      "assets/sachets/paired/c9f48cb1e1688995b7f5.webp",
      "assets/sachets/paired/baf0805f158dba163e80.webp"
    ]
  },
  {
    "id": "sachets-pair-799aa3dbeae7",
    "name": "Pink Rose Tablet",
    "series": "Rose Fragrance Tablets",
    "image": "assets/sachets/paired/799aa3dbeae7975a972b.webp",
    "packagingImage": "assets/sachets/paired/7762e18f4bb097fa455d.webp",
    "images": [
      "assets/sachets/paired/799aa3dbeae7975a972b.webp",
      "assets/sachets/paired/7762e18f4bb097fa455d.webp"
    ]
  }
];
