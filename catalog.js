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
        "href": "product-lnv-rd-4002904b.html?scent=pear-freesia",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-9fc935aa.html?scent=pear-freesia",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/14b03567b9e1d531039d.webp",
        "name": "Blush Bow",
        "series": "Lolita",
        "href": "product-lnv-cnd-da2db99f.html?scent=pear-freesia",
        "catalogueHref": "candles-close-to-you-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e710e9777530e1a2f07e.webp",
        "name": "English Pear & Freesia",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-5a010473.html?scent=pear-freesia",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/eb66283958ad1067c60b.webp",
        "name": "Pear & Freesia Atelier",
        "series": "Atelier Glass",
        "href": "product-lnv-rd-91404dad.html?scent=pear-freesia",
        "catalogueHref": "reeds-in-bloom-3.html"
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
        "image": "assets/candles/standalone/fe428fed40d350de6a12.png",
        "name": "His Quiet Moment",
        "series": "Moments Together",
        "href": "product-lnv-cnd-2c0fa029.html?scent=rose-green-leaves",
        "catalogueHref": "candles-close-to-you.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/c8492d4ed292f4f84eed.png",
        "name": "Damask Rose Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-d2e2464d.html?scent=rose-green-leaves",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-e617449d.html?scent=rose-green-leaves",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/7be1aa85d0170c284922.webp",
        "name": "Ruby Bow",
        "series": "Lolita",
        "href": "product-lnv-cnd-ac6ebb9c.html?scent=rose-green-leaves",
        "catalogueHref": "candles-close-to-you-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "product-lnv-gft-bb1d12af.html?scent=rose-green-leaves",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
        "name": "Desert Rose",
        "series": "Organic Glass",
        "href": "product-lnv-cnd-f2bcaa94.html?scent=rose-green-leaves",
        "catalogueHref": "candles-close-to-you-2.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/799aa3dbeae7975a972b.webp",
        "name": "Pink Rose Tablet",
        "series": "Rose Fragrance Tablets",
        "href": "product-lnv-sch-db9888ec.html?scent=rose-green-leaves",
        "catalogueHref": "sachets.html"
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
        "href": "product-lnv-rd-b24cd88f.html?scent=peony-lychee",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/3e6c7d3bd32ae38d8a92.png",
        "name": "Vanilla Grove",
        "series": "Botanical Warmth",
        "href": "product-lnv-cnd-1f173fc3.html?scent=peony-lychee",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/29e83e528bd9cf8994c1.png",
        "name": "Peony Ember",
        "series": "Botanical Warmth",
        "href": "product-lnv-cnd-a552eae4.html?scent=peony-lychee",
        "catalogueHref": "candles-close-to-you.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/cee0adc2a34b97a7c9ce.png",
        "name": "Peony Soft Matte",
        "series": "Soft Matte",
        "href": "product-lnv-rd-50f22eff.html?scent=peony-lychee",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-9fc935aa.html?scent=peony-lychee",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/a7da1073bd57b2db2336.webp",
        "name": "Blush Glass Dome Duo",
        "series": "Blush Moments",
        "href": "product-lnv-gft-197f5aaa.html?scent=peony-lychee",
        "catalogueHref": "gift-collection-2.html"
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
        "href": "product-lnv-sch-9b26abdb.html?scent=jasmine-orange-blossom",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
        "name": "White Florals",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-5d6e0589.html?scent=jasmine-orange-blossom",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
        "name": "Jasmine Green Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-3a9c0a7a.html?scent=jasmine-orange-blossom",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/aab336d571bb3ae38f55.png",
        "name": "Jasmine Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-87093553.html?scent=jasmine-orange-blossom",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/4d646c939a3be7d88aef.webp",
        "name": "Graphite Jasmine",
        "series": "Matte Glass",
        "href": "product-lnv-rd-d6081e73.html?scent=jasmine-orange-blossom",
        "catalogueHref": "reeds-in-bloom-3.html"
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
        "name": "Gardenia Botanica",
        "series": "Vintage Florals",
        "href": "product-lnv-cnd-02454833.html?scent=gardenia-tuberose",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/5f3d2fbfc68b486eeb50.webp",
        "name": "Moonlit Gardenia \u2014 Tall",
        "series": "Ribbed Ceramic",
        "href": "product-lnv-rd-cec2eb69.html?scent=gardenia-tuberose",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/89098584f61f10212aea.webp",
        "name": "Moonlit Gardenia \u2014 Rounded",
        "series": "Ribbed Ceramic",
        "href": "product-lnv-rd-04bd538d.html?scent=gardenia-tuberose",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/28e887d886b1ed314e66.png",
        "name": "Moonlit Mountain",
        "series": "Mountain Light",
        "href": "product-lnv-rd-641aff27.html?scent=gardenia-tuberose",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-c330164b.html?scent=gardenia-tuberose",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/5489f55a80565a8ad3b2.webp",
        "name": "Golden Gardenia",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-a10a6d55.html?scent=gardenia-tuberose",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-3646bcf197e2090c.webp",
        "name": "White Gardenia",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-3e726bd9.html?scent=gardenia-tuberose",
        "catalogueHref": "reeds-in-bloom-3.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/2e09dbec67e3048635e7.webp",
        "name": "Moonlit Gardenia",
        "series": "Botanical Wax Tablets",
        "href": "product-lnv-sch-c9143779.html?scent=gardenia-tuberose",
        "catalogueHref": "sachets.html"
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
        "href": "product-lnv-rd-8f0d50e9.html?scent=lime-basil",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/e2419ac62b562d3b0520.webp",
        "name": "Lime Basil",
        "series": "Postbox",
        "href": "product-lnv-cnd-59542ee6.html?scent=lime-basil",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/301de746753e02d728ce.webp",
        "name": "Citrus Fern",
        "series": "Botanical Wax Tablets",
        "href": "product-lnv-sch-7fcfbb10.html?scent=lime-basil",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1480094b012dbf961dae.webp",
        "name": "Coastal Lime",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-a8811e93.html?scent=lime-basil",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/bd51761dacecefe18b8e.png",
        "name": "Lime Mountain",
        "series": "Mountain Light",
        "href": "product-lnv-rd-063e34fb.html?scent=lime-basil",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/7ca9a742e8adc548081d.webp",
        "name": "Lime & Chamomile Atelier",
        "series": "Atelier Glass",
        "href": "product-lnv-rd-4810afdd.html?scent=lime-basil",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
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
        "image": "assets/candles/standalone/59438cdb4ca8be4d69d6.png",
        "name": "Peony Keepsake",
        "series": "Botanical Keepsakes",
        "href": "product-lnv-cnd-0506d5e1.html?scent=grapefruit-bergamot",
        "catalogueHref": "candles-close-to-you.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/bc19c6f7e0c9652bedc2.png",
        "name": "Orange Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-fa20a879.html?scent=grapefruit-bergamot",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
        "name": "Bergamot Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "product-lnv-sch-8a37ff04.html?scent=grapefruit-bergamot",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/c7a31362439fcd8e52cd.webp",
        "name": "Spark",
        "series": "Seven-Day Rituals",
        "href": "product-lnv-rd-d67549e7.html?scent=grapefruit-bergamot",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/bd51761dacecefe18b8e.png",
        "name": "Lime Mountain",
        "series": "Mountain Light",
        "href": "product-lnv-rd-063e34fb.html?scent=grapefruit-bergamot",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
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
        "image": "assets/candles/standalone/dfc3ae74dada1434df0a.png",
        "name": "Golden Bamboo Ripple",
        "series": "Bamboo Grove",
        "href": "product-lnv-cnd-870785b5.html?scent=lemon-verbena",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/24ee05d2fc0410a7edf9.png",
        "name": "Sage Bamboo Ripple",
        "series": "Bamboo Grove",
        "href": "product-lnv-cnd-f9db0840.html?scent=lemon-verbena",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/301de746753e02d728ce.webp",
        "name": "Citrus Fern",
        "series": "Botanical Wax Tablets",
        "href": "product-lnv-sch-7fcfbb10.html?scent=lemon-verbena",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/27e4b122a9b559ae799d.webp",
        "name": "Noir Silhouette",
        "series": "Fluid Silhouettes",
        "href": "product-lnv-rd-63cb0545.html?scent=lemon-verbena",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/7ca9a742e8adc548081d.webp",
        "name": "Lime & Chamomile Atelier",
        "series": "Atelier Glass",
        "href": "product-lnv-rd-4810afdd.html?scent=lemon-verbena",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
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
        "href": "product-lnv-rd-19010aa9.html?scent=bergamot-neroli",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "product-lnv-cnd-cffb4ddd.html?scent=bergamot-neroli",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp",
        "name": "White Florals",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-5d6e0589.html?scent=bergamot-neroli",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/6ee1d58cc46162d5a542.webp",
        "name": "Morning Mist",
        "series": "Glass dome",
        "href": "product-lnv-cry-f888698d.html?scent=bergamot-neroli",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-f4d10fef.html?scent=bergamot-neroli",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/27e4b122a9b559ae799d.webp",
        "name": "Noir Silhouette",
        "series": "Fluid Silhouettes",
        "href": "product-lnv-rd-63cb0545.html?scent=bergamot-neroli",
        "catalogueHref": "reeds-a-breath-of-fresh-air-2.html"
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
        "name": "Woven Hearth",
        "series": "Woven Hearth",
        "href": "product-lnv-cnd-86a1b64b.html?scent=fig-green-leaves",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/79b6663ac0152009cd81.png",
        "name": "Fig Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-8e5c34e4.html?scent=fig-green-leaves",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/dfc3ae74dada1434df0a.png",
        "name": "Golden Bamboo Ripple",
        "series": "Bamboo Grove",
        "href": "product-lnv-cnd-870785b5.html?scent=fig-green-leaves",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "product-lnv-cry-0bd180f0.html?scent=fig-green-leaves",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
        "name": "Botanical Sage Duo",
        "series": "Botanical Gifts",
        "href": "product-lnv-gft-72fc6994.html?scent=fig-green-leaves",
        "catalogueHref": "gift-collection-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-f4d10fef.html?scent=fig-green-leaves",
        "catalogueHref": "gift-collection.html"
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
        "image": "assets/candles/standalone/fe428fed40d350de6a12.png",
        "name": "His Quiet Moment",
        "series": "Moments Together",
        "href": "product-lnv-cnd-2c0fa029.html?scent=blackcurrant-rose",
        "catalogueHref": "candles-close-to-you.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-e617449d.html?scent=blackcurrant-rose",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/c8492d4ed292f4f84eed.png",
        "name": "Damask Rose Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-d2e2464d.html?scent=blackcurrant-rose",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "product-lnv-gft-bb1d12af.html?scent=blackcurrant-rose",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/799aa3dbeae7975a972b.webp",
        "name": "Pink Rose Tablet",
        "series": "Rose Fragrance Tablets",
        "href": "product-lnv-sch-db9888ec.html?scent=blackcurrant-rose",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/1f1fd2e0ca388db40ca3.webp",
        "name": "Desert Rose",
        "series": "Organic Glass",
        "href": "product-lnv-cnd-f2bcaa94.html?scent=blackcurrant-rose",
        "catalogueHref": "candles-close-to-you-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/cea8db64b1b62b86670e.webp",
        "name": "Ebony & Rose Infusion",
        "series": "Botanical Glass",
        "href": "product-lnv-rd-c7a6e24b.html?scent=blackcurrant-rose",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
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
        "href": "product-lnv-cnd-c0404e25.html?scent=pomegranate-amber",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "product-lnv-gft-84b2dc39.html?scent=pomegranate-amber",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-59900d7d.html?scent=pomegranate-amber",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/9bc380e0630d04eb7ce7.png",
        "name": "Deep Amber Classic",
        "series": "Amber Classics",
        "href": "product-lnv-rd-ad3c36be.html?scent=pomegranate-amber",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-c188d2780401e54a.webp",
        "name": "Amber Bouquet",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-e540053d.html?scent=pomegranate-amber",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/b782592d405151c5df31.webp",
        "name": "Red Wine & Rose Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-e617449d.html?scent=pomegranate-amber",
        "catalogueHref": "gift-collection.html"
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
        "href": "product-lnv-rd-ad55dcfe.html?scent=lavender-cedarwood",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/6f0311ca29677942dd5f.png",
        "name": "Amber Lavender Heirloom",
        "series": "Amber Heirloom",
        "href": "product-lnv-cnd-6e161c20.html?scent=lavender-cedarwood",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/287d23366d4c063f04f9.webp",
        "name": "Provence Lavender",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-39d72fdd.html?scent=lavender-cedarwood",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/f62beb39ab1806d66782.webp",
        "name": "Lavender Ombre",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-c36ae2d3.html?scent=lavender-cedarwood",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/475614e9e2d215c64a93.webp",
        "name": "Lavender Reverie",
        "series": "Glass dome",
        "href": "product-lnv-cry-9c60ac39.html?scent=lavender-cedarwood",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/20c64492ea431b4ad239.webp",
        "name": "Lavender Postbox",
        "series": "Postbox",
        "href": "product-lnv-cnd-5828053e.html?scent=lavender-cedarwood",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
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
        "href": "product-lnv-rd-8f0d50e9.html?scent=eucalyptus-mint",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/143ea721b89f464528da.webp",
        "name": "Wander",
        "series": "Seven-Day Rituals",
        "href": "product-lnv-rd-90115eba.html?scent=eucalyptus-mint",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/6ee1d58cc46162d5a542.webp",
        "name": "Morning Mist",
        "series": "Glass dome",
        "href": "product-lnv-cry-f888698d.html?scent=eucalyptus-mint",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/64d6d060ce2595ff9070.webp",
        "name": "Mountain Rain",
        "series": "Colour Glass",
        "href": "product-lnv-rd-d926017c.html?scent=eucalyptus-mint",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/d2a2c13cb519e3a3e386.webp",
        "name": "Moss Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "product-lnv-sch-8df631a3.html?scent=eucalyptus-mint",
        "catalogueHref": "sachets.html"
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
        "image": "assets/reeds/standalone/1897a7c919cef24794ab.png",
        "name": "Green Tea Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-47ba0b4a.html?scent=lemon-lavender",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b70e7617bf5fafac62ee.webp",
        "name": "Bergamot Sachet",
        "series": "Fabric Fragrance Sachets",
        "href": "product-lnv-sch-8a37ff04.html?scent=lemon-lavender",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/6f0311ca29677942dd5f.png",
        "name": "Amber Lavender Heirloom",
        "series": "Amber Heirloom",
        "href": "product-lnv-cnd-6e161c20.html?scent=lemon-lavender",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/287d23366d4c063f04f9.webp",
        "name": "Provence Lavender",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-39d72fdd.html?scent=lemon-lavender",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/20c64492ea431b4ad239.webp",
        "name": "Lavender Postbox",
        "series": "Postbox",
        "href": "product-lnv-cnd-5828053e.html?scent=lemon-lavender",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/475614e9e2d215c64a93.webp",
        "name": "Lavender Reverie",
        "series": "Glass dome",
        "href": "product-lnv-cry-9c60ac39.html?scent=lemon-lavender",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/f62beb39ab1806d66782.webp",
        "name": "Lavender Ombre",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-c36ae2d3.html?scent=lemon-lavender",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
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
        "image": "assets/reeds/standalone/da7b6c81e1b5ec96c52f.png",
        "name": "White Tea Soft Matte",
        "series": "Soft Matte",
        "href": "product-lnv-rd-a5c91961.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/0fe827a233c27a862be3.png",
        "name": "White Tea Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-be66c5be.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/97b297ac3d3b797368fa.webp",
        "name": "White Tea Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-b0c8dd88.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-c330164b.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "product-lnv-rd-67b172c8.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-374f9f3b71955935.webp",
        "name": "White Tea Blossom",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-8d53a083.html?scent=white-tea-bergamot",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/66dc6cb0548823f9cb12.webp",
        "name": "Sage Green Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-f4d10fef.html?scent=white-tea-bergamot",
        "catalogueHref": "gift-collection.html"
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
        "image": "assets/reeds/standalone/da7b6c81e1b5ec96c52f.png",
        "name": "White Tea Soft Matte",
        "series": "Soft Matte",
        "href": "product-lnv-rd-a5c91961.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/97b297ac3d3b797368fa.webp",
        "name": "White Tea Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-b0c8dd88.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/0fe827a233c27a862be3.png",
        "name": "White Tea Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-be66c5be.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-2b6c8254.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-db41da38fbfc9eb9.webp",
        "name": "Gardenia & White Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-c330164b.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-374f9f3b71955935.webp",
        "name": "White Tea Blossom",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-8d53a083.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/5ad03d9fc0154ad26216.webp",
        "name": "Focus",
        "series": "Seven-Day Rituals",
        "href": "product-lnv-rd-191c0733.html?scent=white-tea-rosemary",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "product-lnv-cry-0bd180f0.html?scent=white-tea-rosemary",
        "catalogueHref": "products-crystal-2.html"
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
        "image": "assets/reeds/standalone/d3982648db5a7b0b97b2.png",
        "name": "Smoked Tea Classic",
        "series": "Amber Classics",
        "href": "product-lnv-rd-9fb7b57f.html?scent=black-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/0ce20953b7f31b486366.png",
        "name": "Cold Brew Retreat",
        "series": "Ribbed Retreat",
        "href": "product-lnv-rd-2ad91044.html?scent=black-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/1bcfcddeea70ed693d4c.png",
        "name": "Black Tea Ritual",
        "series": "Ribbed Retreat",
        "href": "product-lnv-rd-4d8d9cc7.html?scent=black-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "product-lnv-rd-67b172c8.html?scent=black-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
        "name": "Amber Tea",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-c5b6870c.html?scent=black-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/7d038471456f5c892207.webp",
        "name": "Midnight Blue Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-835f754d.html?scent=black-tea-cedarwood",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/947cbc1d98dee6da5d51.webp",
        "name": "Obsidian",
        "series": "Iridescent",
        "href": "product-lnv-cnd-1305faf1.html?scent=black-tea-cedarwood",
        "catalogueHref": "candles-a-moment-of-quiet.html"
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
        "href": "product-lnv-rd-4ea340e2.html?scent=osmanthus-green-tea",
        "catalogueHref": "reeds-in-bloom.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-f82a3208f64026bc.webp",
        "name": "Osmanthus & Longjing",
        "series": "Floral Tea",
        "href": "product-lnv-rd-e5de9f0c.html?scent=osmanthus-green-tea",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-2b6c8254.html?scent=osmanthus-green-tea",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/7af4fa22a012b5c0ef40.webp",
        "name": "Osmanthus",
        "series": "Postbox",
        "href": "product-lnv-cnd-a78f1065.html?scent=osmanthus-green-tea",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "sachets",
        "image": "assets/sachets/paired/b232e0c6ef6a01e2730e.webp",
        "name": "Apricot Floral Wreath",
        "series": "Floral Wax Tablets",
        "href": "product-lnv-sch-53ca8006.html?scent=osmanthus-green-tea",
        "catalogueHref": "sachets.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/3c06b51cf59cbf4d481d.webp",
        "name": "Golden Osmanthus",
        "series": "Colour Glass",
        "href": "product-lnv-rd-a5dfa481.html?scent=osmanthus-green-tea",
        "catalogueHref": "reeds-in-bloom-3.html"
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
        "href": "product-lnv-rd-5d4580f6.html?scent=clean-cotton",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/522eb2b410541447b0fc.webp",
        "name": "Ivory Oval",
        "series": "Oval Relief",
        "href": "product-lnv-cnd-e7e0db65.html?scent=clean-cotton",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "product-lnv-cnd-cffb4ddd.html?scent=clean-cotton",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/159db9e5fab778fb8824.png",
        "name": "Ivory Pebble",
        "series": "Pebble Forms",
        "href": "product-lnv-cnd-cffb251f.html?scent=clean-cotton",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-9fc935aa.html?scent=clean-cotton",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/9dbd2373b514ef18213d.webp",
        "name": "Island Cotton",
        "series": "Postbox",
        "href": "product-lnv-cnd-2aa9759f.html?scent=clean-cotton",
        "catalogueHref": "candles-morning-light.html"
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
        "href": "product-lnv-rd-5d4580f6.html?scent=soft-linen",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/4fbc33c9500b11ca9a9b.webp",
        "name": "Ivory Porcelain",
        "series": "Minimal Relief",
        "href": "product-lnv-cnd-cffb4ddd.html?scent=soft-linen",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/522eb2b410541447b0fc.webp",
        "name": "Ivory Oval",
        "series": "Oval Relief",
        "href": "product-lnv-cnd-e7e0db65.html?scent=soft-linen",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/ef573ef4b49c1af85848.webp",
        "name": "Pearl Ivory",
        "series": "Iridescent",
        "href": "product-lnv-cnd-12b2372b.html?scent=soft-linen",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/159db9e5fab778fb8824.png",
        "name": "Ivory Pebble",
        "series": "Pebble Forms",
        "href": "product-lnv-cnd-cffb251f.html?scent=soft-linen",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/39ead58bc6ca45512276.webp",
        "name": "Ivory Texture",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-b8702584.html?scent=soft-linen",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/8efb79e6978aa255e72c.webp",
        "name": "Soft Blush Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-9fc935aa.html?scent=soft-linen",
        "catalogueHref": "gift-collection.html"
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
        "href": "product-lnv-rd-45957f71.html?scent=sea-salt-driftwood",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/1b5ead3137dec1267c9b.webp",
        "name": "Ocean Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-db3ec78c.html?scent=sea-salt-driftwood",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/6492af01cbbb6169e661.png",
        "name": "Sea Glass Glow",
        "series": "Sea Glass",
        "href": "product-lnv-cnd-1587bb24.html?scent=sea-salt-driftwood",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/64e857d6f3b7717040c8.webp",
        "name": "Blue Serenity",
        "series": "Botanical glass",
        "href": "product-lnv-cry-43382446.html?scent=sea-salt-driftwood",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/64d6d060ce2595ff9070.webp",
        "name": "Mountain Rain",
        "series": "Colour Glass",
        "href": "product-lnv-rd-d926017c.html?scent=sea-salt-driftwood",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/f77399a59a07a9b8e1ad.webp",
        "name": "Sea Salt & Sage",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-bed2d989.html?scent=sea-salt-driftwood",
        "catalogueHref": "christmas-collection-3.html"
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
        "href": "product-lnv-rd-45957f71.html?scent=bamboo-white-florals",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "product-lnv-cry-f77ca7b1.html?scent=bamboo-white-florals",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/dfc3ae74dada1434df0a.png",
        "name": "Golden Bamboo Ripple",
        "series": "Bamboo Grove",
        "href": "product-lnv-cnd-870785b5.html?scent=bamboo-white-florals",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/24ee05d2fc0410a7edf9.png",
        "name": "Sage Bamboo Ripple",
        "series": "Bamboo Grove",
        "href": "product-lnv-cnd-f9db0840.html?scent=bamboo-white-florals",
        "catalogueHref": "candles-morning-light.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/d254438f943ca1177135.webp",
        "name": "Amber Botanical",
        "series": "Amber Botanicals",
        "href": "product-lnv-rd-b937e0e2.html?scent=bamboo-white-florals",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "product-lnv-cry-0bd180f0.html?scent=bamboo-white-florals",
        "catalogueHref": "products-crystal-2.html"
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
        "href": "product-lnv-cnd-5ab33d07.html?scent=sandalwood-cashmere",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/f034578ed7703c8e8eda.webp",
        "name": "Sandalwood Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-10bb8c1a.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/2075772fabe318f6ee41.png",
        "name": "Sandalwood Hearth",
        "series": "Woodland Amber",
        "href": "product-lnv-rd-15aa5d48.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/5e510e2a781106064090.png",
        "name": "Sandalwood Retreat",
        "series": "Ribbed Retreat",
        "href": "product-lnv-rd-d0554588.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/0cd03e5f4aa361a2de7f.webp",
        "name": "Sage & Sandalwood \u2014 Rounded",
        "series": "Ribbed Ceramic",
        "href": "product-lnv-rd-993e0953.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease-3.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/add3d2fe642716e15fb5.webp",
        "name": "Sage & Sandalwood \u2014 Tall",
        "series": "Ribbed Ceramic",
        "href": "product-lnv-rd-fd8a188c.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease-3.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/57fc12ec0de57fe4822f.webp",
        "name": "Sandalwood Atelier",
        "series": "Atelier Glass",
        "href": "product-lnv-rd-ae6b521f.html?scent=sandalwood-cashmere",
        "catalogueHref": "reeds-at-home-at-ease-3.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-459bb48d.html?scent=sandalwood-cashmere",
        "catalogueHref": "gift-collection.html"
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
        "image": "assets/candles/standalone/ca78f49f63c3984fe232.png",
        "name": "Woodland Tale",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-c0f0aacf.html?scent=cedarwood-vetiver",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/b35477ecc4b3afa62445.png",
        "name": "Sunlit Grove",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-7bd30b48.html?scent=cedarwood-vetiver",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/480e8ea00e1b76202c86.webp",
        "name": "Cedar Relief",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-c397cb21.html?scent=cedarwood-vetiver",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "product-lnv-cry-f77ca7b1.html?scent=cedarwood-vetiver",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "product-lnv-rd-8fe44f17.html?scent=cedarwood-vetiver",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "product-lnv-rd-396c287d.html?scent=cedarwood-vetiver",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/fdcf769b8f506d79add7.png",
        "name": "Midnight Cedar",
        "series": "Ribbed Retreat",
        "href": "product-lnv-rd-b52d22d7.html?scent=cedarwood-vetiver",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-3adc7f14.html?scent=cedarwood-vetiver",
        "catalogueHref": "christmas-collection-3.html"
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
        "href": "product-lnv-cnd-5ab33d07.html?scent=fireside-smoked-woods",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "product-lnv-gft-84b2dc39.html?scent=fireside-smoked-woods",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/78919717797a963dc844.webp",
        "name": "Winter Bonfire",
        "series": "Festive",
        "href": "product-lnv-rd-b0ce534d.html?scent=fireside-smoked-woods",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/33ac66bd00830bdaa036.webp",
        "name": "Fireside Wishes",
        "series": "Festive",
        "href": "product-lnv-rd-f3b14975.html?scent=fireside-smoked-woods",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "product-lnv-rd-8fe44f17.html?scent=fireside-smoked-woods",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/6557fed21b15dacbccfa.webp",
        "name": "Smoky Deer",
        "series": "Deer Collection",
        "href": "product-lnv-cnd-914a648a.html?scent=fireside-smoked-woods",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-459bb48d.html?scent=fireside-smoked-woods",
        "catalogueHref": "gift-collection.html"
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
        "href": "product-lnv-cnd-c39f49c3.html?scent=amber-vanilla",
        "catalogueHref": "candles-a-moment-of-quiet-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d9feede215a30484aa79.webp",
        "name": "Baltic Amber",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-c0404e25.html?scent=amber-vanilla",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-59900d7d.html?scent=amber-vanilla",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/9bc380e0630d04eb7ce7.png",
        "name": "Deep Amber Classic",
        "series": "Amber Classics",
        "href": "product-lnv-rd-ad3c36be.html?scent=amber-vanilla",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/cc0696772d15e3acdb9d.webp",
        "name": "Christmas Amber",
        "series": "Festive",
        "href": "product-lnv-rd-9b526e19.html?scent=amber-vanilla",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-c188d2780401e54a.webp",
        "name": "Amber Bouquet",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-e540053d.html?scent=amber-vanilla",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-08fc7a8f9eb9370f.webp",
        "name": "Amber Tea",
        "series": "Floral Bouquet",
        "href": "product-lnv-rd-c5b6870c.html?scent=amber-vanilla",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "product-lnv-xms-2222a11f.html?scent=amber-vanilla",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-9c6ce7c7.html?scent=amber-vanilla",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
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
        "image": "assets/candles/standalone/3e6c7d3bd32ae38d8a92.png",
        "name": "Vanilla Grove",
        "series": "Botanical Warmth",
        "href": "product-lnv-cnd-1f173fc3.html?scent=vanilla-tonka",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/29e83e528bd9cf8994c1.png",
        "name": "Peony Ember",
        "series": "Botanical Warmth",
        "href": "product-lnv-cnd-a552eae4.html?scent=vanilla-tonka",
        "catalogueHref": "candles-close-to-you.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/20fd1335cbc93f2e83a3.webp",
        "name": "Amber Tray Collection",
        "series": "Warm Living",
        "href": "product-lnv-gft-84b2dc39.html?scent=vanilla-tonka",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "product-lnv-xms-2222a11f.html?scent=vanilla-tonka",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
        "name": "Smiling Gingerbread Candle",
        "series": "Playful Christmas",
        "href": "product-lnv-xms-e392fac4.html?scent=vanilla-tonka",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-9c6ce7c7.html?scent=vanilla-tonka",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "product-lnv-xms-d5956a72.html?scent=vanilla-tonka",
        "catalogueHref": "christmas-collection-2.html"
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
        "href": "product-lnv-cnd-0a9da5e2.html?scent=caramel-cream",
        "catalogueHref": "candles-little-joys.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "product-lnv-xms-2222a11f.html?scent=caramel-cream",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/1383bf46ac80e1d62944.webp",
        "name": "Smiling Gingerbread Candle",
        "series": "Playful Christmas",
        "href": "product-lnv-xms-e392fac4.html?scent=caramel-cream",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b09baac75da0893acee3.webp",
        "name": "Vanilla",
        "series": "Gradient Glass",
        "href": "product-lnv-cnd-9c6ce7c7.html?scent=caramel-cream",
        "catalogueHref": "candles-a-moment-of-quiet-4.html"
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
        "href": "product-lnv-cnd-28f66704.html?scent=pumpkin-spice",
        "catalogueHref": "candles-little-joys-2.html"
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
        "image": "assets/christmas/standalone/d562217af6c6dcb7d806.png",
        "name": "Cinnamon Orange Dome",
        "series": "Festive Glass Domes",
        "href": "product-lnv-xms-499cc25c.html?scent=apple-cinnamon",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/standalone/4fee0c8b694b3a6cac99.png",
        "name": "Winter Berry Dome",
        "series": "Festive Glass Domes",
        "href": "product-lnv-xms-80c34b43.html?scent=apple-cinnamon",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d9feede215a30484aa79.webp",
        "name": "Baltic Amber",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-c0404e25.html?scent=apple-cinnamon",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
        "name": "Amber Orange Duo",
        "series": "Colourful Rituals",
        "href": "product-lnv-gft-c1205685.html?scent=apple-cinnamon",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/33ac66bd00830bdaa036.webp",
        "name": "Fireside Wishes",
        "series": "Festive",
        "href": "product-lnv-rd-f3b14975.html?scent=apple-cinnamon",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
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
        "href": "product-lnv-xms-2ba5d180.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/437b85b84ad977d9adc1.webp",
        "name": "Ivory Silver Trees",
        "series": "Winter Glass",
        "href": "product-lnv-xms-a71be608.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
        "name": "Champagne Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-c969e77f.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7964d0a4e143e4c26426.webp",
        "name": "Ruby Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-74d2ef75.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
        "name": "Blue Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-7c89fb28.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
        "name": "Forest Green Silver Trees",
        "series": "Winter Glass",
        "href": "product-lnv-xms-650aea95.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
        "name": "Ivory Botanical Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-b8221ee8.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/208837f07b39c307c4fe.webp",
        "name": "Olive Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-57d648b6.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-4.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a59a1441e620ff595494.webp",
        "name": "Forest Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-0f67d8cb.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "product-lnv-cry-f77ca7b1.html?scent=fir-cedarwood",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/ca78f49f63c3984fe232.png",
        "name": "Woodland Tale",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-c0f0aacf.html?scent=fir-cedarwood",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/b35477ecc4b3afa62445.png",
        "name": "Sunlit Grove",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-7bd30b48.html?scent=fir-cedarwood",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "product-lnv-rd-8fe44f17.html?scent=fir-cedarwood",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/c082e2bf728f7ad74860.webp",
        "name": "Pinecone Candle",
        "series": "Woodland Christmas",
        "href": "product-lnv-xms-ec3e85a9.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "product-lnv-rd-396c287d.html?scent=fir-cedarwood",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
        "name": "Forest Green Candle Trio",
        "series": "Christmas Pillars",
        "href": "product-lnv-xms-af62e8de.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
        "name": "Forest Green Cone Candle",
        "series": "Botanical Christmas Trees",
        "href": "product-lnv-xms-3765d8f2.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
        "name": "Snowy Tree Glass Candle",
        "series": "Winter Botanicals",
        "href": "product-lnv-xms-68ef4327.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
        "name": "Christmas Tree Sand Candle",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-f7070bc9.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-3adc7f14.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/61253e2d71812a5a6496.webp",
        "name": "Christmas Tree Candle",
        "series": "Christmas Characters",
        "href": "product-lnv-xms-793b2f36.html?scent=fir-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
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
        "image": "assets/christmas/standalone/d562217af6c6dcb7d806.png",
        "name": "Cinnamon Orange Dome",
        "series": "Festive Glass Domes",
        "href": "product-lnv-xms-499cc25c.html?scent=orange-clove",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/bc19c6f7e0c9652bedc2.png",
        "name": "Orange Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-fa20a879.html?scent=orange-clove",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/ffb8c60ea39c5109148a.webp",
        "name": "Amber Orange Duo",
        "series": "Colourful Rituals",
        "href": "product-lnv-gft-c1205685.html?scent=orange-clove",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/cc0696772d15e3acdb9d.webp",
        "name": "Christmas Amber",
        "series": "Festive",
        "href": "product-lnv-rd-9b526e19.html?scent=orange-clove",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/d6e65e02000c1649cfca.webp",
        "name": "Blood Orange",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-1f01ed91.html?scent=orange-clove",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "product-lnv-xms-d5956a72.html?scent=orange-clove",
        "catalogueHref": "christmas-collection-2.html"
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
        "href": "product-lnv-xms-e392fac4.html?scent=gingerbread-vanilla",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp",
        "name": "Amber Christmas Cookies",
        "series": "Winter Glass",
        "href": "product-lnv-xms-2222a11f.html?scent=gingerbread-vanilla",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fc5ea0dccfc61f30e459.webp",
        "name": "Gingerbread, Tree & Reindeer",
        "series": "Festive Wax Ornaments",
        "href": "product-lnv-xms-ddeeefd6.html?scent=gingerbread-vanilla",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/6d52f0817361816118b7.webp",
        "name": "Gingerbread Fragrance Gift Set",
        "series": "Christmas Rituals",
        "href": "product-lnv-xms-d5956a72.html?scent=gingerbread-vanilla",
        "catalogueHref": "christmas-collection-2.html"
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
        "href": "product-lnv-cnd-6cce11c4.html?scent=mugwort-incense",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/18e0a2baf489e98f7b5c.png",
        "name": "Green Tea Poetry",
        "series": "Everyday Botanicals",
        "href": "product-lnv-cnd-d63b27c8.html?scent=mugwort-incense",
        "catalogueHref": "candles-morning-light-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/d254438f943ca1177135.webp",
        "name": "Amber Botanical",
        "series": "Amber Botanicals",
        "href": "product-lnv-rd-b937e0e2.html?scent=mugwort-incense",
        "catalogueHref": "reeds-in-bloom-2.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/c135302863be554b69df.webp",
        "name": "Verdant Calm",
        "series": "Glass dome",
        "href": "product-lnv-cry-0bd180f0.html?scent=mugwort-incense",
        "catalogueHref": "products-crystal-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/79dda4dedcfa715ec1d1.webp",
        "name": "Botanical Sage Duo",
        "series": "Botanical Gifts",
        "href": "product-lnv-gft-72fc6994.html?scent=mugwort-incense",
        "catalogueHref": "gift-collection-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/9317be016ed63d39b67c.webp",
        "name": "Sage Daisy",
        "series": "Sculpted Floral",
        "href": "product-lnv-rd-121c22b0.html?scent=mugwort-incense",
        "catalogueHref": "reeds-a-breath-of-fresh-air.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-459bb48d.html?scent=mugwort-incense",
        "catalogueHref": "gift-collection.html"
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
        "image": "assets/candles/standalone/18e0a2baf489e98f7b5c.png",
        "name": "Green Tea Poetry",
        "series": "Everyday Botanicals",
        "href": "product-lnv-cnd-d63b27c8.html?scent=green-tea-cedarwood",
        "catalogueHref": "candles-morning-light-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/1897a7c919cef24794ab.png",
        "name": "Green Tea Clarity",
        "series": "Quiet Clarity",
        "href": "product-lnv-rd-47ba0b4a.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-640affaca6c8bc7e.webp",
        "name": "Jasmine Green Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-3a9c0a7a.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-b2f6d6a6d3e67553.webp",
        "name": "Four Seasons Tea",
        "series": "Floral Tea",
        "href": "product-lnv-rd-2b6c8254.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-f82a3208f64026bc.webp",
        "name": "Osmanthus & Longjing",
        "series": "Floral Tea",
        "href": "product-lnv-rd-e5de9f0c.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/reed-1883f549fd4393dd.webp",
        "name": "Plum & Sencha",
        "series": "Floral Tea",
        "href": "product-lnv-rd-d1f9ec10.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/standalone/0ce20953b7f31b486366.png",
        "name": "Cold Brew Retreat",
        "series": "Ribbed Retreat",
        "href": "product-lnv-rd-2ad91044.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/201427d60f110f84530c.webp",
        "name": "Zen Tea",
        "series": "Ribbon Glass",
        "href": "product-lnv-rd-67b172c8.html?scent=green-tea-cedarwood",
        "catalogueHref": "reeds-a-quiet-pause-2.html"
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
        "href": "product-lnv-cnd-5ab33d07.html?scent=oud-saffron",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/e6a379ea95e7f1408253.webp",
        "name": "Iced Patchouli",
        "series": "Organic Glass",
        "href": "product-lnv-cnd-6cce11c4.html?scent=oud-saffron",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-59900d7d.html?scent=oud-saffron",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/47d5d503511846e0926c.webp",
        "name": "Ebony Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-65e320ea.html?scent=oud-saffron",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/f316b932be71fe3aaf88.webp",
        "name": "Wild Rose & Oud Duo",
        "series": "Square Glass",
        "href": "product-lnv-gft-bb1d12af.html?scent=oud-saffron",
        "catalogueHref": "gift-collection.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/cea8db64b1b62b86670e.webp",
        "name": "Ebony & Rose Infusion",
        "series": "Botanical Glass",
        "href": "product-lnv-rd-c7a6e24b.html?scent=oud-saffron",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-459bb48d.html?scent=oud-saffron",
        "catalogueHref": "gift-collection.html"
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
        "href": "product-lnv-rd-012cdda7.html?scent=incense-myrrh",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/480e8ea00e1b76202c86.webp",
        "name": "Cedar Relief",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-c397cb21.html?scent=incense-myrrh",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/0cfedbd356005d4c2754.webp",
        "name": "Amber Dusk",
        "series": "Sculpted bowl",
        "href": "product-lnv-cry-59900d7d.html?scent=incense-myrrh",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/b1a337722ec53404ae09.webp",
        "name": "Dark Woods",
        "series": "Lace Glass",
        "href": "product-lnv-cnd-5ab33d07.html?scent=incense-myrrh",
        "catalogueHref": "candles-a-moment-of-quiet-2.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/47d5d503511846e0926c.webp",
        "name": "Ebony Reserve",
        "series": "Reserve Glass",
        "href": "product-lnv-rd-65e320ea.html?scent=incense-myrrh",
        "catalogueHref": "reeds-at-home-at-ease.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/paired/947cbc1d98dee6da5d51.webp",
        "name": "Obsidian",
        "series": "Iridescent",
        "href": "product-lnv-cnd-1305faf1.html?scent=incense-myrrh",
        "catalogueHref": "candles-a-moment-of-quiet.html"
      },
      {
        "category": "gift",
        "image": "assets/gifts/paired/148cecd4fd72c958a34c.webp",
        "name": "Mystical Woods Duo",
        "series": "Quiet Rituals",
        "href": "product-lnv-gft-459bb48d.html?scent=incense-myrrh",
        "catalogueHref": "gift-collection.html"
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
        "href": "product-lnv-xms-2ba5d180.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/437b85b84ad977d9adc1.webp",
        "name": "Ivory Silver Trees",
        "series": "Winter Glass",
        "href": "product-lnv-xms-a71be608.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/39e039fb54a6b60d7eeb.webp",
        "name": "Champagne Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-c969e77f.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7964d0a4e143e4c26426.webp",
        "name": "Ruby Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-74d2ef75.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/e40a6c47b33c64f54ee4.webp",
        "name": "Blue Winter Forest",
        "series": "Winter Glass",
        "href": "product-lnv-xms-7c89fb28.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a8a04f250be1545aa1c3.webp",
        "name": "Forest Green Silver Trees",
        "series": "Winter Glass",
        "href": "product-lnv-xms-650aea95.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b22e9bf1bb681718f5a4.webp",
        "name": "Ivory Botanical Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-b8221ee8.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/208837f07b39c307c4fe.webp",
        "name": "Olive Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-57d648b6.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-4.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/a59a1441e620ff595494.webp",
        "name": "Forest Tree Ornament",
        "series": "Botanical Wax Ornaments",
        "href": "product-lnv-xms-0f67d8cb.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/ca78f49f63c3984fe232.png",
        "name": "Woodland Tale",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-c0f0aacf.html?scent=pine-cedarwood",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "candle",
        "image": "assets/candles/standalone/b35477ecc4b3afa62445.png",
        "name": "Sunlit Grove",
        "series": "Woodland Stories",
        "href": "product-lnv-cnd-7bd30b48.html?scent=pine-cedarwood",
        "catalogueHref": "candles-morning-light-3.html"
      },
      {
        "category": "crystal",
        "image": "assets/companions/a35269a079593416887d.webp",
        "name": "Forest Reverie",
        "series": "Botanical glass",
        "href": "product-lnv-cry-f77ca7b1.html?scent=pine-cedarwood",
        "catalogueHref": "products-crystal-1.html"
      },
      {
        "category": "reed",
        "image": "assets/companions/b2b8111bb9e29b42d8ed.webp",
        "name": "Cedar Cabin",
        "series": "Festive",
        "href": "product-lnv-rd-8fe44f17.html?scent=pine-cedarwood",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/c082e2bf728f7ad74860.webp",
        "name": "Pinecone Candle",
        "series": "Woodland Christmas",
        "href": "product-lnv-xms-ec3e85a9.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "reed",
        "image": "assets/reeds/paired/bf42dc79d33a16875f58.webp",
        "name": "Cloud Pine",
        "series": "Colour Glass",
        "href": "product-lnv-rd-396c287d.html?scent=pine-cedarwood",
        "catalogueHref": "reeds-at-home-at-ease-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/b654bd843ac4c8041f8c.webp",
        "name": "Forest Green Candle Trio",
        "series": "Christmas Pillars",
        "href": "product-lnv-xms-af62e8de.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/7f1e156495b0a459e0d6.webp",
        "name": "Forest Green Cone Candle",
        "series": "Botanical Christmas Trees",
        "href": "product-lnv-xms-3765d8f2.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp",
        "name": "Snowy Tree Glass Candle",
        "series": "Winter Botanicals",
        "href": "product-lnv-xms-68ef4327.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/d9c6cf216c67a77a99fd.webp",
        "name": "Christmas Tree Sand Candle",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-f7070bc9.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/fa0a43337a95d05c5727.webp",
        "name": "Cedar Kiss",
        "series": "Christmas Sand Art",
        "href": "product-lnv-xms-3adc7f14.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-3.html"
      },
      {
        "category": "christmas",
        "image": "assets/christmas/paired/61253e2d71812a5a6496.webp",
        "name": "Christmas Tree Candle",
        "series": "Christmas Characters",
        "href": "product-lnv-xms-793b2f36.html?scent=pine-cedarwood",
        "catalogueHref": "christmas-collection-2.html"
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
    "name": "Gardenia Botanica",
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
    "name": "Sunny Six",
    "series": "Lucky Charms",
    "image": "assets/candles/paired/3ae397f5d9f617bbf348.webp",
    "packagingImage": "assets/candles/paired/d3b115bb2804bfbd8b3b.webp",
    "images": [
      "assets/candles/paired/3ae397f5d9f617bbf348.webp",
      "assets/candles/paired/d3b115bb2804bfbd8b3b.webp"
    ]
  },
  {
    "id": "candle-pair-07944550f1fc",
    "name": "Blush Two",
    "series": "Lucky Charms",
    "image": "assets/candles/paired/07944550f1fc2592d815.webp",
    "packagingImage": "assets/candles/paired/1110e2e926713baf03d6.webp",
    "images": [
      "assets/candles/paired/07944550f1fc2592d815.webp",
      "assets/candles/paired/1110e2e926713baf03d6.webp"
    ]
  },
  {
    "id": "candle-pair-c1025ec341c6",
    "name": "Violet Eight",
    "series": "Lucky Charms",
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
    "name": "Golden Gardenia",
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
    "name": "Lavender Ombre",
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
    "name": "Lavender Postbox",
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
    "name": "Sage Stillness",
    "image": "assets/candles/standalone/701c10bbdc77fc3599c0.png",
    "series": "Stone & Stillness",
    "legacyImages": [
      "assets/candles/candles-001.webp"
    ],
    "packagingImage": "assets/candles/candles-001.webp",
    "images": [
      "assets/candles/standalone/701c10bbdc77fc3599c0.png",
      "assets/candles/candles-001.webp"
    ]
  },
  {
    "name": "Ivory Stillness",
    "image": "assets/candles/standalone/98484ea0daa2ca7437d6.png",
    "series": "Stone & Stillness",
    "legacyImages": [
      "assets/candles/candles-002.webp"
    ],
    "packagingImage": "assets/candles/candles-002.webp",
    "images": [
      "assets/candles/standalone/98484ea0daa2ca7437d6.png",
      "assets/candles/candles-002.webp"
    ]
  },
  {
    "name": "Olive Botanical Keepsake",
    "image": "assets/candles/standalone/8617f461c1f2ffa6df10.png",
    "series": "Botanical Cylinder",
    "legacyImages": [
      "assets/candles/candles-003.webp"
    ],
    "packagingImage": "assets/candles/candles-003.webp",
    "images": [
      "assets/candles/standalone/8617f461c1f2ffa6df10.png",
      "assets/candles/candles-003.webp"
    ]
  },
  {
    "name": "Blush Hour",
    "image": "assets/candles/standalone/d5ec5c9baca023c3e62b.png",
    "series": "Passing Hours",
    "legacyImages": [
      "assets/candles/candles-004.webp"
    ],
    "packagingImage": "assets/candles/candles-004.webp",
    "images": [
      "assets/candles/standalone/d5ec5c9baca023c3e62b.png",
      "assets/candles/candles-004.webp"
    ]
  },
  {
    "name": "Sky Hour",
    "image": "assets/candles/standalone/2a96946b435ed6a9554c.png",
    "series": "Passing Hours",
    "legacyImages": [
      "assets/candles/candles-005.webp"
    ],
    "packagingImage": "assets/candles/candles-005.webp",
    "images": [
      "assets/candles/standalone/2a96946b435ed6a9554c.png",
      "assets/candles/candles-005.webp"
    ]
  },
  {
    "name": "Champagne Lustre",
    "image": "assets/candles/standalone/0aa8c97412903d87ae90.png",
    "series": "Lustre",
    "legacyImages": [
      "assets/candles/candles-006.webp"
    ],
    "packagingImage": "assets/candles/candles-006.webp",
    "images": [
      "assets/candles/standalone/0aa8c97412903d87ae90.png",
      "assets/candles/candles-006.webp"
    ]
  },
  {
    "name": "Graphite Lustre",
    "image": "assets/candles/standalone/5bf2a69080deb25af267.png",
    "series": "Lustre",
    "legacyImages": [
      "assets/candles/candles-007.webp"
    ],
    "packagingImage": "assets/candles/candles-007.webp",
    "images": [
      "assets/candles/standalone/5bf2a69080deb25af267.png",
      "assets/candles/candles-007.webp"
    ]
  },
  {
    "name": "Woven Hearth",
    "image": "assets/candles/candles-008.webp",
    "series": "Woven Hearth",
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
    "name": "Peony Keepsake",
    "image": "assets/candles/standalone/59438cdb4ca8be4d69d6.png",
    "series": "Botanical Keepsakes",
    "legacyImages": [
      "assets/candles/candles-011.webp"
    ],
    "packagingImage": "assets/candles/candles-011.webp",
    "images": [
      "assets/candles/standalone/59438cdb4ca8be4d69d6.png",
      "assets/candles/candles-011.webp"
    ]
  },
  {
    "name": "Botanical Keepsake",
    "image": "assets/candles/standalone/c18ee38fb251983b7e3b.png",
    "series": "Botanical Keepsakes",
    "legacyImages": [
      "assets/candles/candles-012.webp"
    ],
    "packagingImage": "assets/candles/candles-012.webp",
    "images": [
      "assets/candles/standalone/c18ee38fb251983b7e3b.png",
      "assets/candles/candles-012.webp"
    ]
  },
  {
    "name": "Bronze Pedestal",
    "image": "assets/candles/standalone/9fb96031b17769f96861.png",
    "series": "Pedestal Glow",
    "legacyImages": [
      "assets/candles/candles-013.webp"
    ],
    "packagingImage": "assets/candles/candles-013.webp",
    "images": [
      "assets/candles/standalone/9fb96031b17769f96861.png",
      "assets/candles/candles-013.webp"
    ]
  },
  {
    "name": "Charcoal Pedestal",
    "image": "assets/candles/standalone/b748b263fd62654282c8.png",
    "series": "Pedestal Glow",
    "legacyImages": [
      "assets/candles/candles-014.webp"
    ],
    "packagingImage": "assets/candles/candles-014.webp",
    "images": [
      "assets/candles/standalone/b748b263fd62654282c8.png",
      "assets/candles/candles-014.webp"
    ]
  },
  {
    "name": "Golden Companion",
    "image": "assets/candles/standalone/44620cdda8657d5cbbbe.png",
    "series": "Little Companions",
    "legacyImages": [
      "assets/candles/candles-015.webp"
    ],
    "packagingImage": "assets/candles/candles-015.webp",
    "images": [
      "assets/candles/standalone/44620cdda8657d5cbbbe.png",
      "assets/candles/candles-015.webp"
    ]
  },
  {
    "name": "Corgi Cuddles",
    "image": "assets/candles/standalone/f11dbf0fa13d06e2dcfe.png",
    "series": "Little Companions",
    "legacyImages": [
      "assets/candles/candles-016.webp"
    ],
    "packagingImage": "assets/candles/candles-016.webp",
    "images": [
      "assets/candles/standalone/f11dbf0fa13d06e2dcfe.png",
      "assets/candles/candles-016.webp"
    ]
  },
  {
    "name": "Ginger Kitten",
    "image": "assets/candles/standalone/2d152b28c01d04671021.png",
    "series": "Little Companions",
    "legacyImages": [
      "assets/candles/candles-017.webp"
    ],
    "packagingImage": "assets/candles/candles-017.webp",
    "images": [
      "assets/candles/standalone/2d152b28c01d04671021.png",
      "assets/candles/candles-017.webp"
    ]
  },
  {
    "name": "Silver Kitten",
    "image": "assets/candles/standalone/43582c41f2669d4f7495.png",
    "series": "Little Companions",
    "legacyImages": [
      "assets/candles/candles-018.webp"
    ],
    "packagingImage": "assets/candles/candles-018.webp",
    "images": [
      "assets/candles/standalone/43582c41f2669d4f7495.png",
      "assets/candles/candles-018.webp"
    ]
  },
  {
    "name": "Ochre Wild",
    "image": "assets/candles/standalone/c0a082d97a20f207e6ce.png",
    "series": "Earth Tones",
    "legacyImages": [
      "assets/candles/candles-019.webp"
    ],
    "packagingImage": "assets/candles/candles-019.webp",
    "images": [
      "assets/candles/standalone/c0a082d97a20f207e6ce.png",
      "assets/candles/candles-019.webp"
    ]
  },
  {
    "name": "Mauve Wild",
    "image": "assets/candles/standalone/99abaed16aca13894dc1.png",
    "series": "Earth Tones",
    "legacyImages": [
      "assets/candles/candles-020.webp"
    ],
    "packagingImage": "assets/candles/candles-020.webp",
    "images": [
      "assets/candles/standalone/99abaed16aca13894dc1.png",
      "assets/candles/candles-020.webp"
    ]
  },
  {
    "name": "Cocoa Wild",
    "image": "assets/candles/standalone/e7d024f3f8ff3706bcee.png",
    "series": "Earth Tones",
    "legacyImages": [
      "assets/candles/candles-021.webp"
    ],
    "packagingImage": "assets/candles/candles-021.webp",
    "images": [
      "assets/candles/standalone/e7d024f3f8ff3706bcee.png",
      "assets/candles/candles-021.webp"
    ]
  },
  {
    "name": "Peony Ember",
    "image": "assets/candles/standalone/29e83e528bd9cf8994c1.png",
    "series": "Botanical Warmth",
    "legacyImages": [
      "assets/candles/candles-022.webp"
    ],
    "packagingImage": "assets/candles/candles-022.webp",
    "images": [
      "assets/candles/standalone/29e83e528bd9cf8994c1.png",
      "assets/candles/candles-022.webp"
    ]
  },
  {
    "name": "Vanilla Grove",
    "image": "assets/candles/standalone/3e6c7d3bd32ae38d8a92.png",
    "series": "Botanical Warmth",
    "legacyImages": [
      "assets/candles/candles-023.webp"
    ],
    "packagingImage": "assets/candles/candles-023.webp",
    "images": [
      "assets/candles/standalone/3e6c7d3bd32ae38d8a92.png",
      "assets/candles/candles-023.webp"
    ]
  },
  {
    "name": "Green Tea Poetry",
    "image": "assets/candles/standalone/18e0a2baf489e98f7b5c.png",
    "series": "Everyday Botanicals",
    "legacyImages": [
      "assets/candles/candles-024.webp"
    ],
    "packagingImage": "assets/candles/candles-024.webp",
    "images": [
      "assets/candles/standalone/18e0a2baf489e98f7b5c.png",
      "assets/candles/candles-024.webp"
    ]
  },
  {
    "name": "Ocean Poetry",
    "image": "assets/candles/standalone/48975371a77ec68b8df5.png",
    "series": "Everyday Botanicals",
    "legacyImages": [
      "assets/candles/candles-025.webp"
    ],
    "packagingImage": "assets/candles/candles-025.webp",
    "images": [
      "assets/candles/standalone/48975371a77ec68b8df5.png",
      "assets/candles/candles-025.webp"
    ]
  },
  {
    "name": "Rose Poetry",
    "image": "assets/candles/standalone/df082b833c999a07cd26.png",
    "series": "Everyday Botanicals",
    "legacyImages": [
      "assets/candles/candles-026.webp"
    ],
    "packagingImage": "assets/candles/candles-026.webp",
    "images": [
      "assets/candles/standalone/df082b833c999a07cd26.png",
      "assets/candles/candles-026.webp"
    ]
  },
  {
    "name": "Vanilla Poetry",
    "image": "assets/candles/standalone/3165b9331fe5bf173ecc.png",
    "series": "Everyday Botanicals",
    "legacyImages": [
      "assets/candles/candles-027.webp"
    ],
    "packagingImage": "assets/candles/candles-027.webp",
    "images": [
      "assets/candles/standalone/3165b9331fe5bf173ecc.png",
      "assets/candles/candles-027.webp"
    ]
  },
  {
    "name": "Sunlit Petals",
    "image": "assets/candles/standalone/f9fa2d8a3fb0810dae3f.png",
    "series": "Botanical Sketches",
    "legacyImages": [
      "assets/candles/candles-028.webp"
    ],
    "packagingImage": "assets/candles/candles-028.webp",
    "images": [
      "assets/candles/standalone/f9fa2d8a3fb0810dae3f.png",
      "assets/candles/candles-028.webp"
    ]
  },
  {
    "name": "Sea Salt Sketch",
    "image": "assets/candles/standalone/bbb7c7beab06bb5d6239.png",
    "series": "Botanical Sketches",
    "legacyImages": [
      "assets/candles/candles-029.webp"
    ],
    "packagingImage": "assets/candles/candles-029.webp",
    "images": [
      "assets/candles/standalone/bbb7c7beab06bb5d6239.png",
      "assets/candles/candles-029.webp"
    ]
  },
  {
    "name": "White Tea Sketch",
    "image": "assets/candles/standalone/5f5b6808d37fdf2d0f13.png",
    "series": "Botanical Sketches",
    "legacyImages": [
      "assets/candles/candles-030.webp"
    ],
    "packagingImage": "assets/candles/candles-030.webp",
    "images": [
      "assets/candles/standalone/5f5b6808d37fdf2d0f13.png",
      "assets/candles/candles-030.webp"
    ]
  },
  {
    "name": "Gilded Azure",
    "image": "assets/candles/standalone/1d3004493e9cb3cbcf21.png",
    "series": "Gilded Skies",
    "legacyImages": [
      "assets/candles/candles-031.webp"
    ],
    "packagingImage": "assets/candles/candles-031.webp",
    "images": [
      "assets/candles/standalone/1d3004493e9cb3cbcf21.png",
      "assets/candles/candles-031.webp"
    ]
  },
  {
    "name": "Sea Glass Glow",
    "image": "assets/candles/standalone/6492af01cbbb6169e661.png",
    "series": "Sea Glass",
    "legacyImages": [
      "assets/candles/candles-032.webp"
    ],
    "packagingImage": "assets/candles/candles-032.webp",
    "images": [
      "assets/candles/standalone/6492af01cbbb6169e661.png",
      "assets/candles/candles-032.webp"
    ]
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
    "image": "assets/candles/standalone/af548d5ba9a0251bccb1.png",
    "series": "Jellyfish",
    "legacyImages": [
      "assets/candles/candles-089.webp"
    ],
    "packagingImage": "assets/candles/candles-089.webp",
    "images": [
      "assets/candles/standalone/af548d5ba9a0251bccb1.png",
      "assets/candles/candles-089.webp"
    ]
  },
  {
    "name": "Birthday Surprise Egg",
    "image": "assets/candles/candles-034.webp",
    "series": "Birthday Wishes"
  },
  {
    "name": "Mocha Serenity",
    "image": "assets/candles/standalone/a4b969666dce519b8354.png",
    "series": "Quiet Domes",
    "legacyImages": [
      "assets/candles/candles-036.webp"
    ],
    "packagingImage": "assets/candles/candles-036.webp",
    "images": [
      "assets/candles/standalone/a4b969666dce519b8354.png",
      "assets/candles/candles-036.webp"
    ]
  },
  {
    "name": "Blush Daydream",
    "image": "assets/candles/standalone/1955de468656656e5d1c.png",
    "series": "Quiet Domes",
    "legacyImages": [
      "assets/candles/candles-037.webp"
    ],
    "packagingImage": "assets/candles/candles-037.webp",
    "images": [
      "assets/candles/standalone/1955de468656656e5d1c.png",
      "assets/candles/candles-037.webp"
    ]
  },
  {
    "name": "Ivory Rice Blossom",
    "image": "assets/candles/standalone/c16e84d4b08163a71109.png",
    "series": "Quiet Domes",
    "legacyImages": [
      "assets/candles/candles-038.webp",
      "assets/candles/standalone/81478e2cf39fa14ce385.png"
    ],
    "packagingImage": "assets/candles/candles-038.webp",
    "images": [
      "assets/candles/standalone/c16e84d4b08163a71109.png",
      "assets/candles/candles-038.webp"
    ]
  },
  {
    "name": "Cashmere Mist",
    "image": "assets/candles/standalone/5e849d0d38808ac70402.png",
    "series": "Quiet Domes",
    "legacyImages": [
      "assets/candles/candles-039.webp"
    ],
    "packagingImage": "assets/candles/candles-039.webp",
    "images": [
      "assets/candles/standalone/5e849d0d38808ac70402.png",
      "assets/candles/candles-039.webp"
    ]
  },
  {
    "name": "Sage Oolong",
    "image": "assets/candles/standalone/d5d690296e053af7d4f1.png",
    "series": "Quiet Domes",
    "legacyImages": [
      "assets/candles/candles-040.webp"
    ],
    "packagingImage": "assets/candles/candles-040.webp",
    "images": [
      "assets/candles/standalone/d5d690296e053af7d4f1.png",
      "assets/candles/candles-040.webp"
    ]
  },
  {
    "name": "His Quiet Moment",
    "image": "assets/candles/standalone/fe428fed40d350de6a12.png",
    "series": "Moments Together",
    "legacyImages": [
      "assets/candles/candles-041.webp"
    ],
    "packagingImage": "assets/candles/candles-041.webp",
    "images": [
      "assets/candles/standalone/fe428fed40d350de6a12.png",
      "assets/candles/candles-041.webp"
    ]
  },
  {
    "name": "Her Soft Glow",
    "image": "assets/candles/standalone/9d32db279b0d48a889ca.png",
    "series": "Moments Together",
    "legacyImages": [
      "assets/candles/candles-042.webp"
    ],
    "packagingImage": "assets/candles/candles-042.webp",
    "images": [
      "assets/candles/standalone/9d32db279b0d48a889ca.png",
      "assets/candles/candles-042.webp"
    ]
  },
  {
    "name": "Our Shared Light",
    "image": "assets/candles/standalone/f790a90770604f869504.png",
    "series": "Moments Together",
    "legacyImages": [
      "assets/candles/candles-043.webp"
    ],
    "packagingImage": "assets/candles/candles-043.webp",
    "images": [
      "assets/candles/standalone/f790a90770604f869504.png",
      "assets/candles/candles-043.webp"
    ]
  },
  {
    "name": "Plum Blossom Teacup",
    "image": "assets/candles/standalone/0d8e7c66e2de2314e052.png",
    "series": "Botanical Teacups",
    "legacyImages": [
      "assets/candles/candles-044.webp"
    ],
    "packagingImage": "assets/candles/candles-044.webp",
    "images": [
      "assets/candles/standalone/0d8e7c66e2de2314e052.png",
      "assets/candles/candles-044.webp"
    ]
  },
  {
    "name": "Orchid Teacup",
    "image": "assets/candles/standalone/0abab97241dfa7d3dcc3.png",
    "series": "Botanical Teacups",
    "legacyImages": [
      "assets/candles/candles-045.webp"
    ],
    "packagingImage": "assets/candles/candles-045.webp",
    "images": [
      "assets/candles/standalone/0abab97241dfa7d3dcc3.png",
      "assets/candles/candles-045.webp"
    ]
  },
  {
    "name": "Bamboo Teacup",
    "image": "assets/candles/standalone/540de41607775da6cc17.png",
    "series": "Botanical Teacups",
    "legacyImages": [
      "assets/candles/candles-046.webp"
    ],
    "packagingImage": "assets/candles/candles-046.webp",
    "images": [
      "assets/candles/standalone/540de41607775da6cc17.png",
      "assets/candles/candles-046.webp"
    ]
  },
  {
    "name": "Chrysanthemum Teacup",
    "image": "assets/candles/standalone/b2082322ade0e92da2d5.png",
    "series": "Botanical Teacups",
    "legacyImages": [
      "assets/candles/candles-047.webp"
    ],
    "packagingImage": "assets/candles/candles-047.webp",
    "images": [
      "assets/candles/standalone/b2082322ade0e92da2d5.png",
      "assets/candles/candles-047.webp"
    ]
  },
  {
    "name": "Lavender Ribbon",
    "image": "assets/candles/standalone/e0d8ad358028f3def806.png",
    "series": "Ribbon & Glow",
    "legacyImages": [
      "assets/candles/candles-048.webp"
    ],
    "packagingImage": "assets/candles/candles-048.webp",
    "images": [
      "assets/candles/standalone/e0d8ad358028f3def806.png",
      "assets/candles/candles-048.webp"
    ]
  },
  {
    "name": "Amber Ribbon",
    "image": "assets/candles/standalone/82ae20f3c3594477d4c6.png",
    "series": "Ribbon & Glow",
    "legacyImages": [
      "assets/candles/candles-049.webp"
    ],
    "packagingImage": "assets/candles/candles-049.webp",
    "images": [
      "assets/candles/standalone/82ae20f3c3594477d4c6.png",
      "assets/candles/candles-049.webp"
    ]
  },
  {
    "name": "Sky Ribbon",
    "image": "assets/candles/standalone/791bce03c4b84ac8fd06.png",
    "series": "Ribbon & Glow",
    "legacyImages": [
      "assets/candles/candles-050.webp"
    ],
    "packagingImage": "assets/candles/candles-050.webp",
    "images": [
      "assets/candles/standalone/791bce03c4b84ac8fd06.png",
      "assets/candles/candles-050.webp"
    ]
  },
  {
    "name": "Morning Garden",
    "image": "assets/candles/standalone/8d7fa88418b35d23ad59.png",
    "series": "Garden Jars",
    "legacyImages": [
      "assets/candles/candles-051.webp"
    ],
    "packagingImage": "assets/candles/candles-051.webp",
    "images": [
      "assets/candles/standalone/8d7fa88418b35d23ad59.png",
      "assets/candles/candles-051.webp"
    ]
  },
  {
    "name": "Gardenia Tea Garden",
    "image": "assets/candles/standalone/d720f327268f510a4340.png",
    "series": "Garden Jars",
    "legacyImages": [
      "assets/candles/candles-052.webp"
    ],
    "packagingImage": "assets/candles/candles-052.webp",
    "images": [
      "assets/candles/standalone/d720f327268f510a4340.png",
      "assets/candles/candles-052.webp"
    ]
  },
  {
    "name": "Peony Garden",
    "image": "assets/candles/standalone/1bd4a0da8613e6df8a30.png",
    "series": "Garden Jars",
    "legacyImages": [
      "assets/candles/candles-053.webp"
    ],
    "packagingImage": "assets/candles/candles-053.webp",
    "images": [
      "assets/candles/standalone/1bd4a0da8613e6df8a30.png",
      "assets/candles/candles-053.webp"
    ]
  },
  {
    "name": "Lavender Garden",
    "image": "assets/candles/standalone/5c9feb70d50ca3f8c5d6.png",
    "series": "Garden Jars",
    "legacyImages": [
      "assets/candles/candles-054.webp"
    ],
    "packagingImage": "assets/candles/candles-054.webp",
    "images": [
      "assets/candles/standalone/5c9feb70d50ca3f8c5d6.png",
      "assets/candles/candles-054.webp"
    ]
  },
  {
    "name": "Sunlit Grove",
    "image": "assets/candles/standalone/b35477ecc4b3afa62445.png",
    "series": "Woodland Stories",
    "legacyImages": [
      "assets/candles/candles-055.webp"
    ],
    "packagingImage": "assets/candles/candles-055.webp",
    "images": [
      "assets/candles/standalone/b35477ecc4b3afa62445.png",
      "assets/candles/candles-055.webp"
    ]
  },
  {
    "name": "Woodland Tale",
    "image": "assets/candles/standalone/ca78f49f63c3984fe232.png",
    "series": "Woodland Stories",
    "legacyImages": [
      "assets/candles/candles-056.webp"
    ],
    "packagingImage": "assets/candles/candles-056.webp",
    "images": [
      "assets/candles/standalone/ca78f49f63c3984fe232.png",
      "assets/candles/candles-056.webp"
    ]
  },
  {
    "name": "Morning Citrus Garden",
    "image": "assets/candles/standalone/ce5925a4e4cce0c3a0be.png",
    "series": "Painted Gardens",
    "legacyImages": [
      "assets/candles/candles-057.webp"
    ],
    "packagingImage": "assets/candles/candles-057.webp",
    "images": [
      "assets/candles/standalone/ce5925a4e4cce0c3a0be.png",
      "assets/candles/candles-057.webp"
    ]
  },
  {
    "name": "Rose Breeze Garden",
    "image": "assets/candles/standalone/019a491870bb30c2f313.png",
    "series": "Painted Gardens",
    "legacyImages": [
      "assets/candles/candles-058.webp"
    ],
    "packagingImage": "assets/candles/candles-058.webp",
    "images": [
      "assets/candles/standalone/019a491870bb30c2f313.png",
      "assets/candles/candles-058.webp"
    ]
  },
  {
    "name": "Verdant Garden",
    "image": "assets/candles/standalone/c1e38dedb39addfa9091.png",
    "series": "Painted Gardens",
    "legacyImages": [
      "assets/candles/candles-059.webp"
    ],
    "packagingImage": "assets/candles/candles-059.webp",
    "images": [
      "assets/candles/standalone/c1e38dedb39addfa9091.png",
      "assets/candles/candles-059.webp"
    ]
  },
  {
    "name": "Teal Floral Trio",
    "image": "assets/candles/standalone/01a1c253c9626b5ee0fc.png",
    "series": "Floral Trio",
    "legacyImages": [
      "assets/candles/candles-060.webp"
    ],
    "packagingImage": "assets/candles/candles-060.webp",
    "images": [
      "assets/candles/standalone/01a1c253c9626b5ee0fc.png",
      "assets/candles/candles-060.webp"
    ]
  },
  {
    "name": "Ivory Floral Trio",
    "image": "assets/candles/standalone/b802d8b0a302fa106390.png",
    "series": "Floral Trio",
    "legacyImages": [
      "assets/candles/candles-061.webp"
    ],
    "packagingImage": "assets/candles/candles-061.webp",
    "images": [
      "assets/candles/standalone/b802d8b0a302fa106390.png",
      "assets/candles/candles-061.webp"
    ]
  },
  {
    "name": "Orange Blossom Script",
    "image": "assets/candles/standalone/a6ef06112e83b1565aaf.png",
    "series": "Botanical Script",
    "legacyImages": [
      "assets/candles/candles-062.webp"
    ],
    "packagingImage": "assets/candles/candles-062.webp",
    "images": [
      "assets/candles/standalone/a6ef06112e83b1565aaf.png",
      "assets/candles/candles-062.webp"
    ]
  },
  {
    "name": "Sandalwood Script",
    "image": "assets/candles/standalone/e6663bcb37430197de2d.png",
    "series": "Botanical Script",
    "legacyImages": [
      "assets/candles/candles-063.webp"
    ],
    "packagingImage": "assets/candles/candles-063.webp",
    "images": [
      "assets/candles/standalone/e6663bcb37430197de2d.png",
      "assets/candles/candles-063.webp"
    ]
  },
  {
    "name": "Jasmine Script",
    "image": "assets/candles/standalone/2eeacd649f141b2be29e.png",
    "series": "Botanical Script",
    "legacyImages": [
      "assets/candles/candles-064.webp"
    ],
    "packagingImage": "assets/candles/candles-064.webp",
    "images": [
      "assets/candles/standalone/2eeacd649f141b2be29e.png",
      "assets/candles/candles-064.webp"
    ]
  },
  {
    "name": "Lavender Script",
    "image": "assets/candles/standalone/9d79b7f4105f2367b2ef.png",
    "series": "Botanical Script",
    "legacyImages": [
      "assets/candles/candles-065.webp"
    ],
    "packagingImage": "assets/candles/candles-065.webp",
    "images": [
      "assets/candles/standalone/9d79b7f4105f2367b2ef.png",
      "assets/candles/candles-065.webp"
    ]
  },
  {
    "name": "Smoke & Glass",
    "image": "assets/candles/standalone/f6b477f0c3b990fbeb88.png",
    "series": "Essential Glass",
    "legacyImages": [
      "assets/candles/candles-066.webp"
    ],
    "packagingImage": "assets/candles/candles-066.webp",
    "images": [
      "assets/candles/standalone/f6b477f0c3b990fbeb88.png",
      "assets/candles/candles-066.webp"
    ]
  },
  {
    "name": "Amber & Glass",
    "image": "assets/candles/standalone/91bb101caae6a5c2663e.png",
    "series": "Essential Glass",
    "legacyImages": [
      "assets/candles/candles-067.webp"
    ],
    "packagingImage": "assets/candles/candles-067.webp",
    "images": [
      "assets/candles/standalone/91bb101caae6a5c2663e.png",
      "assets/candles/candles-067.webp"
    ]
  },
  {
    "name": "Amber Lavender Heirloom",
    "image": "assets/candles/standalone/6f0311ca29677942dd5f.png",
    "series": "Amber Heirloom",
    "legacyImages": [
      "assets/candles/candles-068.webp"
    ],
    "packagingImage": "assets/candles/candles-068.webp",
    "images": [
      "assets/candles/standalone/6f0311ca29677942dd5f.png",
      "assets/candles/candles-068.webp"
    ]
  },
  {
    "name": "Golden Blossom",
    "image": "assets/candles/standalone/9d23779d7859e33e8715.png",
    "series": "Chromatic Bloom",
    "legacyImages": [
      "assets/candles/candles-069.webp"
    ],
    "packagingImage": "assets/candles/candles-069.webp",
    "images": [
      "assets/candles/standalone/9d23779d7859e33e8715.png",
      "assets/candles/candles-069.webp"
    ]
  },
  {
    "name": "Blue Blossom",
    "image": "assets/candles/standalone/23dc77e24ddcda7b94b3.png",
    "series": "Chromatic Bloom",
    "legacyImages": [
      "assets/candles/candles-070.webp"
    ],
    "packagingImage": "assets/candles/candles-070.webp",
    "images": [
      "assets/candles/standalone/23dc77e24ddcda7b94b3.png",
      "assets/candles/candles-070.webp"
    ]
  },
  {
    "name": "Blush Blossom",
    "image": "assets/candles/standalone/db617a3b004dd8b0deb3.png",
    "series": "Chromatic Bloom",
    "legacyImages": [
      "assets/candles/candles-071.webp"
    ],
    "packagingImage": "assets/candles/candles-071.webp",
    "images": [
      "assets/candles/standalone/db617a3b004dd8b0deb3.png",
      "assets/candles/candles-071.webp"
    ]
  },
  {
    "name": "Golden Bamboo Ripple",
    "image": "assets/candles/standalone/dfc3ae74dada1434df0a.png",
    "series": "Bamboo Grove",
    "legacyImages": [
      "assets/candles/candles-075.webp"
    ],
    "packagingImage": "assets/candles/candles-075.webp",
    "images": [
      "assets/candles/standalone/dfc3ae74dada1434df0a.png",
      "assets/candles/candles-075.webp"
    ]
  },
  {
    "name": "Sage Bamboo Ripple",
    "image": "assets/candles/standalone/24ee05d2fc0410a7edf9.png",
    "series": "Bamboo Grove",
    "legacyImages": [
      "assets/candles/candles-076.webp"
    ],
    "packagingImage": "assets/candles/candles-076.webp",
    "images": [
      "assets/candles/standalone/24ee05d2fc0410a7edf9.png",
      "assets/candles/candles-076.webp"
    ]
  },
  {
    "name": "Slate Speckle",
    "image": "assets/candles/standalone/556717fc8969681d3e0a.png",
    "series": "Speckled Forms",
    "legacyImages": [
      "assets/candles/candles-077.webp"
    ],
    "packagingImage": "assets/candles/candles-077.webp",
    "images": [
      "assets/candles/standalone/556717fc8969681d3e0a.png",
      "assets/candles/candles-077.webp"
    ]
  },
  {
    "name": "Ivory Speckle",
    "image": "assets/candles/standalone/af36ed53c560a3fdcc5d.png",
    "series": "Speckled Forms",
    "legacyImages": [
      "assets/candles/candles-078.webp"
    ],
    "packagingImage": "assets/candles/candles-078.webp",
    "images": [
      "assets/candles/standalone/af36ed53c560a3fdcc5d.png",
      "assets/candles/candles-078.webp"
    ]
  },
  {
    "name": "Ivory Soft Square",
    "image": "assets/candles/standalone/770c18767b941a79a4e7.png",
    "series": "Soft Squares",
    "legacyImages": [
      "assets/candles/candles-079.webp"
    ],
    "packagingImage": "assets/candles/candles-079.webp",
    "images": [
      "assets/candles/standalone/770c18767b941a79a4e7.png",
      "assets/candles/candles-079.webp"
    ]
  },
  {
    "name": "Noir Soft Square",
    "image": "assets/candles/standalone/4349a13679c7cfb1a734.png",
    "series": "Soft Squares",
    "legacyImages": [
      "assets/candles/candles-080.webp"
    ],
    "packagingImage": "assets/candles/candles-080.webp",
    "images": [
      "assets/candles/standalone/4349a13679c7cfb1a734.png",
      "assets/candles/candles-080.webp"
    ]
  },
  {
    "name": "Terracotta Muse",
    "image": "assets/candles/standalone/31b214292532aa437ef8.png",
    "series": "Classical Relief",
    "legacyImages": [
      "assets/candles/candles-081.webp"
    ],
    "packagingImage": "assets/candles/candles-081.webp",
    "images": [
      "assets/candles/standalone/31b214292532aa437ef8.png",
      "assets/candles/candles-081.webp"
    ]
  },
  {
    "name": "Ivory Muse",
    "image": "assets/candles/standalone/f027f73d9bd7ffa078a9.png",
    "series": "Classical Relief",
    "legacyImages": [
      "assets/candles/candles-082.webp"
    ],
    "packagingImage": "assets/candles/candles-082.webp",
    "images": [
      "assets/candles/standalone/f027f73d9bd7ffa078a9.png",
      "assets/candles/candles-082.webp"
    ]
  },
  {
    "name": "Snow Muse",
    "image": "assets/candles/standalone/c7bb37286a562de02e63.png",
    "series": "Classical Relief",
    "legacyImages": [
      "assets/candles/candles-083.webp"
    ],
    "packagingImage": "assets/candles/candles-083.webp",
    "images": [
      "assets/candles/standalone/c7bb37286a562de02e63.png",
      "assets/candles/candles-083.webp"
    ]
  },
  {
    "name": "Puppy Dreams",
    "image": "assets/candles/standalone/efbe8eaba2ba33ed22f4.png",
    "series": "Little Dreamers",
    "legacyImages": [
      "assets/candles/candles-084.webp"
    ],
    "packagingImage": "assets/candles/paired/f7043e9f6a3b212501a1.png",
    "images": [
      "assets/candles/standalone/efbe8eaba2ba33ed22f4.png",
      "assets/candles/paired/f7043e9f6a3b212501a1.png"
    ]
  },
  {
    "name": "Panda Slumber",
    "image": "assets/candles/standalone/d160e808ad7656acaeef.png",
    "series": "Little Dreamers",
    "legacyImages": [
      "assets/candles/candles-085.webp"
    ],
    "packagingImage": "assets/candles/paired/5b236214a19d352a5565.png",
    "images": [
      "assets/candles/standalone/d160e808ad7656acaeef.png",
      "assets/candles/paired/5b236214a19d352a5565.png"
    ]
  },
  {
    "name": "Little Pumpkin Ghost",
    "image": "assets/candles/standalone/dde508f3788aea3c327f.png",
    "series": "Little Dreamers",
    "legacyImages": [
      "assets/candles/candles-086.webp"
    ],
    "packagingImage": "assets/candles/paired/1fef6394f15230e857c4.png",
    "images": [
      "assets/candles/standalone/dde508f3788aea3c327f.png",
      "assets/candles/paired/1fef6394f15230e857c4.png"
    ]
  },
  {
    "name": "Kitten Daydream",
    "image": "assets/candles/standalone/d7fead12effc63071c64.png",
    "series": "Little Dreamers",
    "legacyImages": [
      "assets/candles/candles-087.webp"
    ],
    "packagingImage": "assets/candles/paired/93a77b5015a7c3857dd5.png",
    "images": [
      "assets/candles/standalone/d7fead12effc63071c64.png",
      "assets/candles/paired/93a77b5015a7c3857dd5.png"
    ]
  },
  {
    "name": "Ivory Pebble",
    "image": "assets/candles/standalone/159db9e5fab778fb8824.png",
    "series": "Pebble Forms",
    "legacyImages": [
      "assets/candles/candles-088.webp"
    ],
    "packagingImage": "assets/candles/candles-088.webp",
    "images": [
      "assets/candles/standalone/159db9e5fab778fb8824.png",
      "assets/candles/candles-088.webp"
    ]
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
    "series": "Reed diffuser",
    "packagingImage": "assets/reeds/reed-04.webp",
    "images": [
      "assets/reeds/reed-03.webp",
      "assets/reeds/reed-04.webp"
    ],
    "legacyImages": [
      "assets/reeds/reed-04.webp"
    ],
    "alternateView": true
  },
  {
    "name": "Cold Brew Retreat",
    "image": "assets/reeds/standalone/0ce20953b7f31b486366.png",
    "series": "Ribbed Retreat",
    "legacyImages": [
      "assets/reeds/reeds-090.webp"
    ],
    "packagingImage": "assets/reeds/reeds-090.webp",
    "images": [
      "assets/reeds/standalone/0ce20953b7f31b486366.png",
      "assets/reeds/reeds-090.webp"
    ]
  },
  {
    "name": "Sandalwood Retreat",
    "image": "assets/reeds/standalone/5e510e2a781106064090.png",
    "series": "Ribbed Retreat",
    "legacyImages": [
      "assets/reeds/reeds-091.webp"
    ],
    "packagingImage": "assets/reeds/reeds-091.webp",
    "images": [
      "assets/reeds/standalone/5e510e2a781106064090.png",
      "assets/reeds/reeds-091.webp"
    ]
  },
  {
    "name": "Midnight Cedar",
    "image": "assets/reeds/standalone/fdcf769b8f506d79add7.png",
    "series": "Ribbed Retreat",
    "legacyImages": [
      "assets/reeds/reeds-092.webp"
    ],
    "packagingImage": "assets/reeds/reeds-092.webp",
    "images": [
      "assets/reeds/standalone/fdcf769b8f506d79add7.png",
      "assets/reeds/reeds-092.webp"
    ]
  },
  {
    "name": "Black Tea Ritual",
    "image": "assets/reeds/standalone/1bcfcddeea70ed693d4c.png",
    "series": "Ribbed Retreat",
    "legacyImages": [
      "assets/reeds/reeds-093.webp"
    ],
    "packagingImage": "assets/reeds/reeds-093.webp",
    "images": [
      "assets/reeds/standalone/1bcfcddeea70ed693d4c.png",
      "assets/reeds/reeds-093.webp"
    ]
  },
  {
    "name": "Ebony & Bergamot Clarity",
    "image": "assets/reeds/standalone/43fe0d5983ae27208291.png",
    "series": "Quiet Clarity",
    "legacyImages": [
      "assets/reeds/reeds-094.webp"
    ],
    "packagingImage": "assets/reeds/reeds-094.webp",
    "images": [
      "assets/reeds/standalone/43fe0d5983ae27208291.png",
      "assets/reeds/reeds-094.webp"
    ]
  },
  {
    "name": "Orange Clarity",
    "image": "assets/reeds/standalone/bc19c6f7e0c9652bedc2.png",
    "series": "Quiet Clarity",
    "legacyImages": [
      "assets/reeds/reeds-095.webp"
    ],
    "packagingImage": "assets/reeds/reeds-095.webp",
    "images": [
      "assets/reeds/standalone/bc19c6f7e0c9652bedc2.png",
      "assets/reeds/reeds-095.webp"
    ]
  },
  {
    "name": "White Tea Clarity",
    "image": "assets/reeds/standalone/0fe827a233c27a862be3.png",
    "series": "Quiet Clarity",
    "legacyImages": [
      "assets/reeds/reeds-096.webp"
    ],
    "packagingImage": "assets/reeds/reeds-096.webp",
    "images": [
      "assets/reeds/standalone/0fe827a233c27a862be3.png",
      "assets/reeds/reeds-096.webp"
    ]
  },
  {
    "name": "Green Tea Clarity",
    "image": "assets/reeds/standalone/1897a7c919cef24794ab.png",
    "series": "Quiet Clarity",
    "legacyImages": [
      "assets/reeds/reeds-097.webp"
    ],
    "packagingImage": "assets/reeds/reeds-097.webp",
    "images": [
      "assets/reeds/standalone/1897a7c919cef24794ab.png",
      "assets/reeds/reeds-097.webp"
    ]
  },
  {
    "name": "Peony Soft Matte",
    "image": "assets/reeds/standalone/cee0adc2a34b97a7c9ce.png",
    "series": "Soft Matte",
    "legacyImages": [
      "assets/reeds/reeds-098.webp"
    ],
    "packagingImage": "assets/reeds/reeds-098.webp",
    "images": [
      "assets/reeds/standalone/cee0adc2a34b97a7c9ce.png",
      "assets/reeds/reeds-098.webp"
    ]
  },
  {
    "name": "White Tea Soft Matte",
    "image": "assets/reeds/standalone/da7b6c81e1b5ec96c52f.png",
    "series": "Soft Matte",
    "legacyImages": [
      "assets/reeds/reeds-099.webp"
    ],
    "packagingImage": "assets/reeds/reeds-099.webp",
    "images": [
      "assets/reeds/standalone/da7b6c81e1b5ec96c52f.png",
      "assets/reeds/reeds-099.webp"
    ]
  },
  {
    "name": "Blush Mountain",
    "image": "assets/reeds/standalone/82c60d22feb4032d52e4.png",
    "series": "Mountain Light",
    "legacyImages": [
      "assets/reeds/reeds-100.webp"
    ],
    "packagingImage": "assets/reeds/reeds-100.webp",
    "images": [
      "assets/reeds/standalone/82c60d22feb4032d52e4.png",
      "assets/reeds/reeds-100.webp"
    ]
  },
  {
    "name": "Moonlit Mountain",
    "image": "assets/reeds/standalone/28e887d886b1ed314e66.png",
    "series": "Mountain Light",
    "legacyImages": [
      "assets/reeds/reeds-101.webp"
    ],
    "packagingImage": "assets/reeds/reeds-101.webp",
    "images": [
      "assets/reeds/standalone/28e887d886b1ed314e66.png",
      "assets/reeds/reeds-101.webp"
    ]
  },
  {
    "name": "Lime Mountain",
    "image": "assets/reeds/standalone/bd51761dacecefe18b8e.png",
    "series": "Mountain Light",
    "legacyImages": [
      "assets/reeds/reeds-102.webp"
    ],
    "packagingImage": "assets/reeds/reeds-102.webp",
    "images": [
      "assets/reeds/standalone/bd51761dacecefe18b8e.png",
      "assets/reeds/reeds-102.webp"
    ]
  },
  {
    "name": "Amber Botanical",
    "image": "assets/companions/d254438f943ca1177135.webp",
    "series": "Amber Botanicals",
    "packagingImage": "assets/reeds/reeds-103.webp",
    "images": [
      "assets/companions/d254438f943ca1177135.webp",
      "assets/reeds/reeds-103.webp"
    ]
  },
  {
    "name": "Bluebell Atelier",
    "image": "assets/companions/7f5bb0b72c302656cc3e.webp",
    "series": "Atelier Glass",
    "packagingImage": "assets/reeds/reeds-104.webp",
    "images": [
      "assets/companions/7f5bb0b72c302656cc3e.webp",
      "assets/reeds/reeds-104.webp"
    ]
  },
  {
    "name": "Sandalwood Atelier",
    "image": "assets/companions/57fc12ec0de57fe4822f.webp",
    "series": "Atelier Glass",
    "packagingImage": "assets/reeds/reeds-105.webp",
    "images": [
      "assets/companions/57fc12ec0de57fe4822f.webp",
      "assets/reeds/reeds-105.webp"
    ]
  },
  {
    "name": "Pear & Freesia Atelier",
    "image": "assets/companions/eb66283958ad1067c60b.webp",
    "series": "Atelier Glass",
    "packagingImage": "assets/reeds/reeds-106.webp",
    "images": [
      "assets/companions/eb66283958ad1067c60b.webp",
      "assets/reeds/reeds-106.webp"
    ]
  },
  {
    "name": "Lime & Chamomile Atelier",
    "image": "assets/companions/7ca9a742e8adc548081d.webp",
    "series": "Atelier Glass",
    "packagingImage": "assets/reeds/reeds-107.webp",
    "images": [
      "assets/companions/7ca9a742e8adc548081d.webp",
      "assets/reeds/reeds-107.webp"
    ]
  },
  {
    "name": "Ebony Reserve",
    "image": "assets/companions/47d5d503511846e0926c.webp",
    "series": "Reserve Glass",
    "packagingImage": "assets/reeds/reeds-108.webp",
    "images": [
      "assets/companions/47d5d503511846e0926c.webp",
      "assets/reeds/reeds-108.webp"
    ]
  },
  {
    "name": "Fig Reserve",
    "image": "assets/reeds/standalone/79b6663ac0152009cd81.png",
    "series": "Reserve Glass",
    "legacyImages": [
      "assets/reeds/reeds-109.webp"
    ],
    "packagingImage": "assets/reeds/reeds-109.webp",
    "images": [
      "assets/reeds/standalone/79b6663ac0152009cd81.png",
      "assets/reeds/reeds-109.webp"
    ]
  },
  {
    "name": "Ocean Reserve",
    "image": "assets/companions/1b5ead3137dec1267c9b.webp",
    "series": "Reserve Glass",
    "packagingImage": "assets/reeds/reeds-110.webp",
    "images": [
      "assets/companions/1b5ead3137dec1267c9b.webp",
      "assets/reeds/reeds-110.webp"
    ]
  },
  {
    "name": "Damask Rose Reserve",
    "image": "assets/reeds/standalone/c8492d4ed292f4f84eed.png",
    "series": "Reserve Glass",
    "legacyImages": [
      "assets/reeds/reeds-111.webp"
    ],
    "packagingImage": "assets/reeds/reeds-111.webp",
    "images": [
      "assets/reeds/standalone/c8492d4ed292f4f84eed.png",
      "assets/reeds/reeds-111.webp"
    ]
  },
  {
    "name": "Sandalwood Reserve",
    "image": "assets/companions/f034578ed7703c8e8eda.webp",
    "series": "Reserve Glass",
    "packagingImage": "assets/reeds/reeds-112.webp",
    "images": [
      "assets/companions/f034578ed7703c8e8eda.webp",
      "assets/reeds/reeds-112.webp"
    ]
  },
  {
    "name": "Peony Reserve",
    "image": "assets/reeds/standalone/c592a458daf5a9c2c574.png",
    "series": "Reserve Glass",
    "legacyImages": [
      "assets/reeds/reeds-113.webp"
    ],
    "packagingImage": "assets/reeds/reeds-113.webp",
    "images": [
      "assets/reeds/standalone/c592a458daf5a9c2c574.png",
      "assets/reeds/reeds-113.webp"
    ]
  },
  {
    "name": "White Tea Reserve",
    "image": "assets/companions/97b297ac3d3b797368fa.webp",
    "series": "Reserve Glass",
    "packagingImage": "assets/reeds/reeds-114.webp",
    "images": [
      "assets/companions/97b297ac3d3b797368fa.webp",
      "assets/reeds/reeds-114.webp"
    ]
  },
  {
    "name": "Jasmine Reserve",
    "image": "assets/reeds/standalone/aab336d571bb3ae38f55.png",
    "series": "Reserve Glass",
    "legacyImages": [
      "assets/reeds/reeds-115.webp"
    ],
    "packagingImage": "assets/reeds/reeds-115.webp",
    "images": [
      "assets/reeds/standalone/aab336d571bb3ae38f55.png",
      "assets/reeds/reeds-115.webp"
    ]
  },
  {
    "name": "Botanical Branch",
    "image": "assets/reeds/standalone/df81d60110cf03605d3b.png",
    "series": "Botanical Infusions",
    "packagingImage": "assets/reeds/reeds-116.webp",
    "images": [
      "assets/reeds/standalone/df81d60110cf03605d3b.png",
      "assets/reeds/reeds-116.webp"
    ],
    "legacyImages": [
      "assets/companions/231a21cbbc3f7b033780.webp"
    ]
  },
  {
    "name": "Botanical Leaf",
    "image": "assets/reeds/standalone/c821eba660237cc578b0.png",
    "series": "Botanical Infusions",
    "legacyImages": [
      "assets/reeds/reeds-117.webp"
    ],
    "packagingImage": "assets/reeds/reeds-117.webp",
    "images": [
      "assets/reeds/standalone/c821eba660237cc578b0.png",
      "assets/reeds/reeds-117.webp"
    ]
  },
  {
    "name": "Botanical Citrus",
    "image": "assets/companions/9a2ccca3988e0e6b8bbb.webp",
    "series": "Botanical Infusions",
    "packagingImage": "assets/reeds/reeds-118.webp",
    "images": [
      "assets/companions/9a2ccca3988e0e6b8bbb.webp",
      "assets/reeds/reeds-118.webp"
    ]
  },
  {
    "name": "Noir Silhouette",
    "image": "assets/companions/27e4b122a9b559ae799d.webp",
    "series": "Fluid Silhouettes",
    "packagingImage": "assets/reeds/reeds-119.webp",
    "images": [
      "assets/companions/27e4b122a9b559ae799d.webp",
      "assets/reeds/reeds-119.webp"
    ]
  },
  {
    "name": "Olive Silhouette",
    "image": "assets/companions/d83b888e65240d5a7203.webp",
    "series": "Fluid Silhouettes",
    "packagingImage": "assets/reeds/reeds-120.webp",
    "images": [
      "assets/companions/d83b888e65240d5a7203.webp",
      "assets/reeds/reeds-120.webp"
    ]
  },
  {
    "name": "Golden Curve",
    "image": "assets/reeds/standalone/b1d286b3aff7d72c474b.png",
    "series": "Golden Curves",
    "legacyImages": [
      "assets/reeds/reeds-121.webp"
    ],
    "packagingImage": "assets/reeds/reeds-121.webp",
    "images": [
      "assets/reeds/standalone/b1d286b3aff7d72c474b.png",
      "assets/reeds/reeds-121.webp"
    ]
  },
  {
    "name": "Golden Botanist",
    "image": "assets/reeds/standalone/4ed06c28b01356516de0.png",
    "series": "Botanical Gleam",
    "legacyImages": [
      "assets/reeds/reeds-122.webp"
    ],
    "packagingImage": "assets/reeds/reeds-122.webp",
    "images": [
      "assets/reeds/standalone/4ed06c28b01356516de0.png",
      "assets/reeds/reeds-122.webp"
    ]
  },
  {
    "name": "Pearl Botanist",
    "image": "assets/reeds/standalone/67f19d6a74a1dd52ebe3.png",
    "series": "Botanical Gleam",
    "legacyImages": [
      "assets/reeds/reeds-123.webp"
    ],
    "packagingImage": "assets/reeds/reeds-123.webp",
    "images": [
      "assets/reeds/standalone/67f19d6a74a1dd52ebe3.png",
      "assets/reeds/reeds-123.webp"
    ]
  },
  {
    "name": "Blush Arch",
    "image": "assets/reeds/standalone/4d34d18499bce0ec0d09.png",
    "series": "Blush Arch",
    "legacyImages": [
      "assets/reeds/reeds-124.webp"
    ],
    "packagingImage": "assets/reeds/reeds-124.webp",
    "images": [
      "assets/reeds/standalone/4d34d18499bce0ec0d09.png",
      "assets/reeds/reeds-124.webp"
    ]
  },
  {
    "name": "Rose Orb",
    "image": "assets/reeds/standalone/34ed97c6e6aa3cb799af.png",
    "series": "Glass Orbs",
    "legacyImages": [
      "assets/reeds/reeds-125.webp"
    ],
    "packagingImage": "assets/reeds/reeds-125.webp",
    "images": [
      "assets/reeds/standalone/34ed97c6e6aa3cb799af.png",
      "assets/reeds/reeds-125.webp"
    ]
  },
  {
    "name": "Honey Orb",
    "image": "assets/reeds/standalone/0918174ebdbf24e5e7ed.png",
    "series": "Glass Orbs",
    "legacyImages": [
      "assets/reeds/reeds-126.webp"
    ],
    "packagingImage": "assets/reeds/reeds-126.webp",
    "images": [
      "assets/reeds/standalone/0918174ebdbf24e5e7ed.png",
      "assets/reeds/reeds-126.webp"
    ]
  },
  {
    "name": "Sage Orb",
    "image": "assets/reeds/standalone/c87a5b505b2784ad4b89.png",
    "series": "Glass Orbs",
    "legacyImages": [
      "assets/reeds/reeds-127.webp"
    ],
    "packagingImage": "assets/reeds/reeds-127.webp",
    "images": [
      "assets/reeds/standalone/c87a5b505b2784ad4b89.png",
      "assets/reeds/reeds-127.webp"
    ]
  },
  {
    "name": "Deep Amber Classic",
    "image": "assets/reeds/standalone/9bc380e0630d04eb7ce7.png",
    "series": "Amber Classics",
    "legacyImages": [
      "assets/reeds/reeds-128.webp"
    ],
    "packagingImage": "assets/reeds/reeds-128.webp",
    "images": [
      "assets/reeds/standalone/9bc380e0630d04eb7ce7.png",
      "assets/reeds/reeds-128.webp"
    ]
  },
  {
    "name": "Smoked Tea Classic",
    "image": "assets/reeds/standalone/d3982648db5a7b0b97b2.png",
    "series": "Amber Classics",
    "legacyImages": [
      "assets/reeds/reeds-129.webp"
    ],
    "packagingImage": "assets/reeds/reeds-129.webp",
    "images": [
      "assets/reeds/standalone/d3982648db5a7b0b97b2.png",
      "assets/reeds/reeds-129.webp"
    ]
  },
  {
    "name": "Sandalwood Hearth",
    "image": "assets/reeds/standalone/2075772fabe318f6ee41.png",
    "series": "Woodland Amber",
    "legacyImages": [
      "assets/reeds/reeds-130.webp"
    ],
    "packagingImage": "assets/reeds/reeds-130.webp",
    "images": [
      "assets/reeds/standalone/2075772fabe318f6ee41.png",
      "assets/reeds/reeds-130.webp"
    ]
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
    "name": "Winter Berry Dome",
    "image": "assets/christmas/standalone/4fee0c8b694b3a6cac99.png",
    "series": "Festive Glass Domes",
    "legacyImages": [
      "assets/candles/candles-072.webp"
    ],
    "packagingImage": "assets/candles/candles-072.webp",
    "images": [
      "assets/christmas/standalone/4fee0c8b694b3a6cac99.png",
      "assets/candles/candles-072.webp"
    ]
  },
  {
    "name": "Cinnamon Orange Dome",
    "image": "assets/christmas/standalone/d562217af6c6dcb7d806.png",
    "series": "Festive Glass Domes",
    "legacyImages": [
      "assets/candles/candles-073.webp"
    ],
    "packagingImage": "assets/candles/candles-073.webp",
    "images": [
      "assets/christmas/standalone/d562217af6c6dcb7d806.png",
      "assets/candles/candles-073.webp"
    ]
  },
  {
    "name": "Forest Garland Dome",
    "image": "assets/christmas/standalone/b7c2f963b441ad3ea550.png",
    "series": "Festive Glass Domes",
    "legacyImages": [
      "assets/candles/candles-074.webp"
    ],
    "packagingImage": "assets/candles/candles-074.webp",
    "images": [
      "assets/christmas/standalone/b7c2f963b441ad3ea550.png",
      "assets/candles/candles-074.webp"
    ]
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

const productPages = {
  "candle": {
    "assets/candles/paired/706a9cb934df23f1ce96.webp": "product-lnv-cnd-02454833.html",
    "assets/candles/paired/10d7297ec4e2e39c4df6.webp": "product-lnv-cnd-fb53a439.html",
    "assets/candles/paired/73e3d5c1bd304f9fbfb5.webp": "product-lnv-cnd-c39f49c3.html",
    "assets/candles/paired/3ae397f5d9f617bbf348.webp": "product-lnv-cnd-7ec0fa8f.html",
    "assets/candles/paired/07944550f1fc2592d815.webp": "product-lnv-cnd-f3bcacc4.html",
    "assets/candles/paired/c1025ec341c6a7b60413.webp": "product-lnv-cnd-b0af05ea.html",
    "assets/candles/paired/7be1aa85d0170c284922.webp": "product-lnv-cnd-ac6ebb9c.html",
    "assets/candles/paired/14b03567b9e1d531039d.webp": "product-lnv-cnd-da2db99f.html",
    "assets/candles/paired/b1a337722ec53404ae09.webp": "product-lnv-cnd-5ab33d07.html",
    "assets/candles/paired/d9feede215a30484aa79.webp": "product-lnv-cnd-c0404e25.html",
    "assets/candles/paired/cdc473daed5f344ade64.webp": "product-lnv-cnd-592d7690.html",
    "assets/candles/paired/d6e65e02000c1649cfca.webp": "product-lnv-cnd-1f01ed91.html",
    "assets/candles/paired/b2a6e2ce97db70ea6f8a.webp": "product-lnv-cnd-5d6e0589.html",
    "assets/candles/paired/287d23366d4c063f04f9.webp": "product-lnv-cnd-39d72fdd.html",
    "assets/candles/paired/4fbc33c9500b11ca9a9b.webp": "product-lnv-cnd-cffb4ddd.html",
    "assets/candles/paired/5489f55a80565a8ad3b2.webp": "product-lnv-cnd-a10a6d55.html",
    "assets/candles/paired/f62beb39ab1806d66782.webp": "product-lnv-cnd-c36ae2d3.html",
    "assets/candles/paired/b09baac75da0893acee3.webp": "product-lnv-cnd-9c6ce7c7.html",
    "assets/candles/paired/7af4fa22a012b5c0ef40.webp": "product-lnv-cnd-a78f1065.html",
    "assets/candles/paired/20c64492ea431b4ad239.webp": "product-lnv-cnd-5828053e.html",
    "assets/candles/paired/986d2edec0865818a739.webp": "product-lnv-cnd-f0ac78c1.html",
    "assets/candles/paired/e2419ac62b562d3b0520.webp": "product-lnv-cnd-59542ee6.html",
    "assets/candles/paired/9dbd2373b514ef18213d.webp": "product-lnv-cnd-2aa9759f.html",
    "assets/candles/paired/522eb2b410541447b0fc.webp": "product-lnv-cnd-e7e0db65.html",
    "assets/candles/paired/ef573ef4b49c1af85848.webp": "product-lnv-cnd-12b2372b.html",
    "assets/candles/paired/947cbc1d98dee6da5d51.webp": "product-lnv-cnd-1305faf1.html",
    "assets/candles/paired/a890e2a4dac981243da3.webp": "product-lnv-cnd-ce7cfa4a.html",
    "assets/candles/paired/2d960ad5048dc6d12875.webp": "product-lnv-cnd-1200010f.html",
    "assets/candles/paired/e6a379ea95e7f1408253.webp": "product-lnv-cnd-6cce11c4.html",
    "assets/candles/paired/1f1fd2e0ca388db40ca3.webp": "product-lnv-cnd-f2bcaa94.html",
    "assets/candles/paired/e9583a062cd69e708bb4.webp": "product-lnv-cnd-61c6b148.html",
    "assets/candles/paired/6557fed21b15dacbccfa.webp": "product-lnv-cnd-914a648a.html",
    "assets/candles/paired/b053837f042853978ab8.webp": "product-lnv-cnd-0a9da5e2.html",
    "assets/candles/paired/257c6ea41af465989ab3.webp": "product-lnv-cnd-28f66704.html",
    "assets/candles/standalone/701c10bbdc77fc3599c0.png": "product-lnv-cnd-51ebce22.html",
    "assets/candles/standalone/98484ea0daa2ca7437d6.png": "product-lnv-cnd-4529f2c7.html",
    "assets/candles/standalone/8617f461c1f2ffa6df10.png": "product-lnv-cnd-e96d2f2b.html",
    "assets/candles/standalone/d5ec5c9baca023c3e62b.png": "product-lnv-cnd-d99ddd5d.html",
    "assets/candles/standalone/2a96946b435ed6a9554c.png": "product-lnv-cnd-85838a61.html",
    "assets/candles/standalone/0aa8c97412903d87ae90.png": "product-lnv-cnd-f4feaf59.html",
    "assets/candles/standalone/5bf2a69080deb25af267.png": "product-lnv-cnd-da0dfdb4.html",
    "assets/candles/candles-008.webp": "product-lnv-cnd-86a1b64b.html",
    "assets/candles/standalone/59438cdb4ca8be4d69d6.png": "product-lnv-cnd-0506d5e1.html",
    "assets/candles/standalone/c18ee38fb251983b7e3b.png": "product-lnv-cnd-b43852d7.html",
    "assets/candles/standalone/9fb96031b17769f96861.png": "product-lnv-cnd-9faadc5b.html",
    "assets/candles/standalone/b748b263fd62654282c8.png": "product-lnv-cnd-893a9cb2.html",
    "assets/candles/standalone/44620cdda8657d5cbbbe.png": "product-lnv-cnd-6fa4bcd6.html",
    "assets/candles/standalone/f11dbf0fa13d06e2dcfe.png": "product-lnv-cnd-6187e5a2.html",
    "assets/candles/standalone/2d152b28c01d04671021.png": "product-lnv-cnd-83444550.html",
    "assets/candles/standalone/43582c41f2669d4f7495.png": "product-lnv-cnd-73fa34b8.html",
    "assets/candles/standalone/c0a082d97a20f207e6ce.png": "product-lnv-cnd-024abdb4.html",
    "assets/candles/standalone/99abaed16aca13894dc1.png": "product-lnv-cnd-401266a5.html",
    "assets/candles/standalone/e7d024f3f8ff3706bcee.png": "product-lnv-cnd-54c26556.html",
    "assets/candles/standalone/29e83e528bd9cf8994c1.png": "product-lnv-cnd-a552eae4.html",
    "assets/candles/standalone/3e6c7d3bd32ae38d8a92.png": "product-lnv-cnd-1f173fc3.html",
    "assets/candles/standalone/18e0a2baf489e98f7b5c.png": "product-lnv-cnd-d63b27c8.html",
    "assets/candles/standalone/48975371a77ec68b8df5.png": "product-lnv-cnd-26103f10.html",
    "assets/candles/standalone/df082b833c999a07cd26.png": "product-lnv-cnd-d9b4ee7c.html",
    "assets/candles/standalone/3165b9331fe5bf173ecc.png": "product-lnv-cnd-46ce9dcd.html",
    "assets/candles/standalone/f9fa2d8a3fb0810dae3f.png": "product-lnv-cnd-62d9dffc.html",
    "assets/candles/standalone/bbb7c7beab06bb5d6239.png": "product-lnv-cnd-d2a9322a.html",
    "assets/candles/standalone/5f5b6808d37fdf2d0f13.png": "product-lnv-cnd-1c58c28d.html",
    "assets/candles/standalone/1d3004493e9cb3cbcf21.png": "product-lnv-cnd-6039213d.html",
    "assets/candles/standalone/6492af01cbbb6169e661.png": "product-lnv-cnd-1587bb24.html",
    "assets/candles/candles-033.webp": "product-lnv-cnd-3f1053f9.html",
    "assets/candles/standalone/af548d5ba9a0251bccb1.png": "product-lnv-cnd-0b1420a3.html",
    "assets/candles/candles-034.webp": "product-lnv-cnd-ee6d247e.html",
    "assets/candles/standalone/a4b969666dce519b8354.png": "product-lnv-cnd-03d3255d.html",
    "assets/candles/standalone/1955de468656656e5d1c.png": "product-lnv-cnd-908bb9eb.html",
    "assets/candles/standalone/c16e84d4b08163a71109.png": "product-lnv-cnd-a94e8956.html",
    "assets/candles/standalone/5e849d0d38808ac70402.png": "product-lnv-cnd-b870c50a.html",
    "assets/candles/standalone/d5d690296e053af7d4f1.png": "product-lnv-cnd-6872f2be.html",
    "assets/candles/standalone/fe428fed40d350de6a12.png": "product-lnv-cnd-2c0fa029.html",
    "assets/candles/standalone/9d32db279b0d48a889ca.png": "product-lnv-cnd-29e722e6.html",
    "assets/candles/standalone/f790a90770604f869504.png": "product-lnv-cnd-34c29725.html",
    "assets/candles/standalone/0d8e7c66e2de2314e052.png": "product-lnv-cnd-fe56a1c8.html",
    "assets/candles/standalone/0abab97241dfa7d3dcc3.png": "product-lnv-cnd-126c54c6.html",
    "assets/candles/standalone/540de41607775da6cc17.png": "product-lnv-cnd-69918d3a.html",
    "assets/candles/standalone/b2082322ade0e92da2d5.png": "product-lnv-cnd-1e624f9c.html",
    "assets/candles/standalone/e0d8ad358028f3def806.png": "product-lnv-cnd-719f4e3b.html",
    "assets/candles/standalone/82ae20f3c3594477d4c6.png": "product-lnv-cnd-fb2cbeb1.html",
    "assets/candles/standalone/791bce03c4b84ac8fd06.png": "product-lnv-cnd-34110715.html",
    "assets/candles/standalone/8d7fa88418b35d23ad59.png": "product-lnv-cnd-52d64837.html",
    "assets/candles/standalone/d720f327268f510a4340.png": "product-lnv-cnd-802bbf00.html",
    "assets/candles/standalone/1bd4a0da8613e6df8a30.png": "product-lnv-cnd-6b435c93.html",
    "assets/candles/standalone/5c9feb70d50ca3f8c5d6.png": "product-lnv-cnd-56bf11bf.html",
    "assets/candles/standalone/b35477ecc4b3afa62445.png": "product-lnv-cnd-7bd30b48.html",
    "assets/candles/standalone/ca78f49f63c3984fe232.png": "product-lnv-cnd-c0f0aacf.html",
    "assets/candles/standalone/ce5925a4e4cce0c3a0be.png": "product-lnv-cnd-7ace2c64.html",
    "assets/candles/standalone/019a491870bb30c2f313.png": "product-lnv-cnd-52a81cc5.html",
    "assets/candles/standalone/c1e38dedb39addfa9091.png": "product-lnv-cnd-d6aba3d2.html",
    "assets/candles/standalone/01a1c253c9626b5ee0fc.png": "product-lnv-cnd-67e8533c.html",
    "assets/candles/standalone/b802d8b0a302fa106390.png": "product-lnv-cnd-40b74b94.html",
    "assets/candles/standalone/a6ef06112e83b1565aaf.png": "product-lnv-cnd-9c8e9b59.html",
    "assets/candles/standalone/e6663bcb37430197de2d.png": "product-lnv-cnd-8086ed4c.html",
    "assets/candles/standalone/2eeacd649f141b2be29e.png": "product-lnv-cnd-f46875b2.html",
    "assets/candles/standalone/9d79b7f4105f2367b2ef.png": "product-lnv-cnd-6914f87e.html",
    "assets/candles/standalone/f6b477f0c3b990fbeb88.png": "product-lnv-cnd-20d9446e.html",
    "assets/candles/standalone/91bb101caae6a5c2663e.png": "product-lnv-cnd-4918ca83.html",
    "assets/candles/standalone/6f0311ca29677942dd5f.png": "product-lnv-cnd-6e161c20.html",
    "assets/candles/standalone/9d23779d7859e33e8715.png": "product-lnv-cnd-799210c7.html",
    "assets/candles/standalone/23dc77e24ddcda7b94b3.png": "product-lnv-cnd-8a77bff7.html",
    "assets/candles/standalone/db617a3b004dd8b0deb3.png": "product-lnv-cnd-e05bcc53.html",
    "assets/candles/standalone/dfc3ae74dada1434df0a.png": "product-lnv-cnd-870785b5.html",
    "assets/candles/standalone/24ee05d2fc0410a7edf9.png": "product-lnv-cnd-f9db0840.html",
    "assets/candles/standalone/556717fc8969681d3e0a.png": "product-lnv-cnd-2b6e0ffe.html",
    "assets/candles/standalone/af36ed53c560a3fdcc5d.png": "product-lnv-cnd-f1f08177.html",
    "assets/candles/standalone/770c18767b941a79a4e7.png": "product-lnv-cnd-c8706653.html",
    "assets/candles/standalone/4349a13679c7cfb1a734.png": "product-lnv-cnd-1abbb5e4.html",
    "assets/candles/standalone/31b214292532aa437ef8.png": "product-lnv-cnd-51e684b9.html",
    "assets/candles/standalone/f027f73d9bd7ffa078a9.png": "product-lnv-cnd-681133a8.html",
    "assets/candles/standalone/c7bb37286a562de02e63.png": "product-lnv-cnd-fc69a435.html",
    "assets/candles/standalone/efbe8eaba2ba33ed22f4.png": "product-lnv-cnd-9533bddb.html",
    "assets/candles/standalone/d160e808ad7656acaeef.png": "product-lnv-cnd-382db110.html",
    "assets/candles/standalone/dde508f3788aea3c327f.png": "product-lnv-cnd-d0f5e24f.html",
    "assets/candles/standalone/d7fead12effc63071c64.png": "product-lnv-cnd-13297d04.html",
    "assets/candles/standalone/159db9e5fab778fb8824.png": "product-lnv-cnd-cffb251f.html"
  },
  "reed": {
    "assets/reeds/paired/8e262fb59fe070149987.webp": "product-lnv-rd-b55b5f35.html",
    "assets/reeds/paired/0a8c637f10e3e435ded4.webp": "product-lnv-rd-3288af00.html",
    "assets/reeds/paired/784f4e7e2722b90cad34.webp": "product-lnv-rd-8bea2a7e.html",
    "assets/reeds/paired/201427d60f110f84530c.webp": "product-lnv-rd-67b172c8.html",
    "assets/reeds/paired/5f3d2fbfc68b486eeb50.webp": "product-lnv-rd-cec2eb69.html",
    "assets/reeds/paired/89098584f61f10212aea.webp": "product-lnv-rd-04bd538d.html",
    "assets/reeds/paired/0cd03e5f4aa361a2de7f.webp": "product-lnv-rd-993e0953.html",
    "assets/reeds/paired/add3d2fe642716e15fb5.webp": "product-lnv-rd-fd8a188c.html",
    "assets/reeds/paired/cea8db64b1b62b86670e.webp": "product-lnv-rd-c7a6e24b.html",
    "assets/reeds/paired/4d646c939a3be7d88aef.webp": "product-lnv-rd-d6081e73.html",
    "assets/reeds/paired/64d6d060ce2595ff9070.webp": "product-lnv-rd-d926017c.html",
    "assets/reeds/paired/bf42dc79d33a16875f58.webp": "product-lnv-rd-396c287d.html",
    "assets/reeds/paired/3c06b51cf59cbf4d481d.webp": "product-lnv-rd-a5dfa481.html",
    "assets/reeds/paired/31d02f3668b75883be89.webp": "product-lnv-rd-4ea340e2.html",
    "assets/reeds/paired/811b4bb9a24f8006326a.webp": "product-lnv-rd-677d5d60.html",
    "assets/reeds/paired/42174ebd1ef8f2421c12.webp": "product-lnv-rd-7fcac57a.html",
    "assets/reeds/paired/7cd70493905ebfe2764c.webp": "product-lnv-rd-127912eb.html",
    "assets/reeds/paired/9317be016ed63d39b67c.webp": "product-lnv-rd-121c22b0.html",
    "assets/reeds/paired/7bd1f3d29f5f641ddd3d.webp": "product-lnv-rd-19010aa9.html",
    "assets/reeds/paired/7e95a9fee680e36d69cf.webp": "product-lnv-rd-5d4580f6.html",
    "assets/reeds/paired/f66c22d087051b33f32d.webp": "product-lnv-rd-012cdda7.html",
    "assets/reeds/paired/0506f93bffb5a0774f90.webp": "product-lnv-rd-d5ece8b9.html",
    "assets/reeds/paired/87f8057288c690b4cb2b.webp": "product-lnv-rd-11e9b3e4.html",
    "assets/reeds/paired/27cc25f4936db9e927d9.webp": "product-lnv-rd-b24cd88f.html",
    "assets/reeds/paired/3d49e14d13a50bc979c6.webp": "product-lnv-rd-4002904b.html",
    "assets/reeds/reed-01.webp": "product-lnv-rd-9b94a2ab.html",
    "assets/reeds/reed-03.webp": "product-lnv-rd-45957f71.html",
    "assets/reeds/standalone/0ce20953b7f31b486366.png": "product-lnv-rd-2ad91044.html",
    "assets/reeds/standalone/5e510e2a781106064090.png": "product-lnv-rd-d0554588.html",
    "assets/reeds/standalone/fdcf769b8f506d79add7.png": "product-lnv-rd-b52d22d7.html",
    "assets/reeds/standalone/1bcfcddeea70ed693d4c.png": "product-lnv-rd-4d8d9cc7.html",
    "assets/reeds/standalone/43fe0d5983ae27208291.png": "product-lnv-rd-e8f6ed02.html",
    "assets/reeds/standalone/bc19c6f7e0c9652bedc2.png": "product-lnv-rd-fa20a879.html",
    "assets/reeds/standalone/0fe827a233c27a862be3.png": "product-lnv-rd-be66c5be.html",
    "assets/reeds/standalone/1897a7c919cef24794ab.png": "product-lnv-rd-47ba0b4a.html",
    "assets/reeds/standalone/cee0adc2a34b97a7c9ce.png": "product-lnv-rd-50f22eff.html",
    "assets/reeds/standalone/da7b6c81e1b5ec96c52f.png": "product-lnv-rd-a5c91961.html",
    "assets/reeds/standalone/82c60d22feb4032d52e4.png": "product-lnv-rd-fb6595ab.html",
    "assets/reeds/standalone/28e887d886b1ed314e66.png": "product-lnv-rd-641aff27.html",
    "assets/reeds/standalone/bd51761dacecefe18b8e.png": "product-lnv-rd-063e34fb.html",
    "assets/companions/d254438f943ca1177135.webp": "product-lnv-rd-b937e0e2.html",
    "assets/companions/7f5bb0b72c302656cc3e.webp": "product-lnv-rd-f15f15be.html",
    "assets/companions/57fc12ec0de57fe4822f.webp": "product-lnv-rd-ae6b521f.html",
    "assets/companions/eb66283958ad1067c60b.webp": "product-lnv-rd-91404dad.html",
    "assets/companions/7ca9a742e8adc548081d.webp": "product-lnv-rd-4810afdd.html",
    "assets/companions/47d5d503511846e0926c.webp": "product-lnv-rd-65e320ea.html",
    "assets/reeds/standalone/79b6663ac0152009cd81.png": "product-lnv-rd-8e5c34e4.html",
    "assets/companions/1b5ead3137dec1267c9b.webp": "product-lnv-rd-db3ec78c.html",
    "assets/reeds/standalone/c8492d4ed292f4f84eed.png": "product-lnv-rd-d2e2464d.html",
    "assets/companions/f034578ed7703c8e8eda.webp": "product-lnv-rd-10bb8c1a.html",
    "assets/reeds/standalone/c592a458daf5a9c2c574.png": "product-lnv-rd-8f40c037.html",
    "assets/companions/97b297ac3d3b797368fa.webp": "product-lnv-rd-b0c8dd88.html",
    "assets/reeds/standalone/aab336d571bb3ae38f55.png": "product-lnv-rd-87093553.html",
    "assets/reeds/standalone/df81d60110cf03605d3b.png": "product-lnv-rd-ac44abb7.html",
    "assets/reeds/standalone/c821eba660237cc578b0.png": "product-lnv-rd-38069535.html",
    "assets/companions/9a2ccca3988e0e6b8bbb.webp": "product-lnv-rd-94b28ee9.html",
    "assets/companions/27e4b122a9b559ae799d.webp": "product-lnv-rd-63cb0545.html",
    "assets/companions/d83b888e65240d5a7203.webp": "product-lnv-rd-8620180a.html",
    "assets/reeds/standalone/b1d286b3aff7d72c474b.png": "product-lnv-rd-c112c38f.html",
    "assets/reeds/standalone/4ed06c28b01356516de0.png": "product-lnv-rd-2ac8192f.html",
    "assets/reeds/standalone/67f19d6a74a1dd52ebe3.png": "product-lnv-rd-31409345.html",
    "assets/reeds/standalone/4d34d18499bce0ec0d09.png": "product-lnv-rd-6213bdae.html",
    "assets/reeds/standalone/34ed97c6e6aa3cb799af.png": "product-lnv-rd-d39737a5.html",
    "assets/reeds/standalone/0918174ebdbf24e5e7ed.png": "product-lnv-rd-510e8ca9.html",
    "assets/reeds/standalone/c87a5b505b2784ad4b89.png": "product-lnv-rd-40e91f57.html",
    "assets/reeds/standalone/9bc380e0630d04eb7ce7.png": "product-lnv-rd-ad3c36be.html",
    "assets/reeds/standalone/d3982648db5a7b0b97b2.png": "product-lnv-rd-9fb7b57f.html",
    "assets/reeds/standalone/2075772fabe318f6ee41.png": "product-lnv-rd-15aa5d48.html",
    "assets/reeds/reed-c188d2780401e54a.webp": "product-lnv-rd-e540053d.html",
    "assets/reeds/reed-08fc7a8f9eb9370f.webp": "product-lnv-rd-c5b6870c.html",
    "assets/reeds/reed-374f9f3b71955935.webp": "product-lnv-rd-8d53a083.html",
    "assets/reeds/reed-61ad69a502bd3498.webp": "product-lnv-rd-69cdb32e.html",
    "assets/reeds/reed-3646bcf197e2090c.webp": "product-lnv-rd-3e726bd9.html",
    "assets/reeds/reed-b2f6d6a6d3e67553.webp": "product-lnv-rd-2b6c8254.html",
    "assets/reeds/reed-db41da38fbfc9eb9.webp": "product-lnv-rd-c330164b.html",
    "assets/reeds/reed-f82a3208f64026bc.webp": "product-lnv-rd-e5de9f0c.html",
    "assets/reeds/reed-1883f549fd4393dd.webp": "product-lnv-rd-d1f9ec10.html",
    "assets/reeds/reed-0d3f3a982460ae6d.webp": "product-lnv-rd-e80bc643.html",
    "assets/reeds/reed-6ffc48159c0055e0.webp": "product-lnv-rd-66d0ed88.html",
    "assets/reeds/reed-640affaca6c8bc7e.webp": "product-lnv-rd-3a9c0a7a.html",
    "assets/reeds/reed-6760c2cb73451078.webp": "product-lnv-rd-36a9abaa.html",
    "assets/companions/6bb45b8d3cadf69b519f.webp": "product-lnv-rd-8f0d50e9.html",
    "assets/companions/e1974e206548b944acc1.webp": "product-lnv-rd-61e26c32.html",
    "assets/companions/5ad03d9fc0154ad26216.webp": "product-lnv-rd-191c0733.html",
    "assets/companions/c7a31362439fcd8e52cd.webp": "product-lnv-rd-d67549e7.html",
    "assets/companions/143ea721b89f464528da.webp": "product-lnv-rd-90115eba.html",
    "assets/companions/776c5824d6f8c3e348a0.webp": "product-lnv-rd-4f549a5e.html",
    "assets/companions/20aea59b3de55988cfcb.webp": "product-lnv-rd-ad55dcfe.html",
    "assets/companions/78919717797a963dc844.webp": "product-lnv-rd-b0ce534d.html",
    "assets/companions/cc0696772d15e3acdb9d.webp": "product-lnv-rd-9b526e19.html",
    "assets/companions/33ac66bd00830bdaa036.webp": "product-lnv-rd-f3b14975.html",
    "assets/companions/b2b8111bb9e29b42d8ed.webp": "product-lnv-rd-8fe44f17.html"
  },
  "crystal": {
    "assets/companions/040856927401c5aa9fe5.webp": "product-lnv-cry-2961f11a.html",
    "assets/companions/475614e9e2d215c64a93.webp": "product-lnv-cry-9c60ac39.html",
    "assets/companions/6ee1d58cc46162d5a542.webp": "product-lnv-cry-f888698d.html",
    "assets/companions/c135302863be554b69df.webp": "product-lnv-cry-0bd180f0.html",
    "assets/companions/480e8ea00e1b76202c86.webp": "product-lnv-cry-c397cb21.html",
    "assets/companions/39ead58bc6ca45512276.webp": "product-lnv-cry-b8702584.html",
    "assets/companions/725149dff6d9af2e3e50.webp": "product-lnv-cry-c2bd378d.html",
    "assets/companions/0cfedbd356005d4c2754.webp": "product-lnv-cry-59900d7d.html",
    "assets/companions/64e857d6f3b7717040c8.webp": "product-lnv-cry-43382446.html",
    "assets/companions/a59b5af2bc9cfd7b724a.webp": "product-lnv-cry-1763bd05.html",
    "assets/companions/7f866c903bcf75344101.webp": "product-lnv-cry-2cadeb0a.html",
    "assets/companions/7d04b24755dabebec6e7.webp": "product-lnv-cry-f7668f47.html",
    "assets/companions/a35269a079593416887d.webp": "product-lnv-cry-f77ca7b1.html"
  },
  "gift": {
    "assets/gifts/paired/f6a3b3425eee85def0c0.webp": "product-lnv-gft-733dcf77.html",
    "assets/gifts/paired/fdf9a8279d9f87f3df91.webp": "product-lnv-gft-70b1081a.html",
    "assets/gifts/paired/905159d5184ce017c1a2.webp": "product-lnv-gft-f4a4aec9.html",
    "assets/gifts/paired/ffb8c60ea39c5109148a.webp": "product-lnv-gft-c1205685.html",
    "assets/gifts/paired/90b1f7205529d6c92bf0.webp": "product-lnv-gft-0c2c4d8d.html",
    "assets/gifts/paired/148cecd4fd72c958a34c.webp": "product-lnv-gft-459bb48d.html",
    "assets/gifts/paired/b782592d405151c5df31.webp": "product-lnv-gft-e617449d.html",
    "assets/gifts/paired/66dc6cb0548823f9cb12.webp": "product-lnv-gft-f4d10fef.html",
    "assets/gifts/paired/5cd23250a05e889b2fc5.webp": "product-lnv-gft-bfc43a79.html",
    "assets/gifts/paired/71eb10fb2f75421ad40a.webp": "product-lnv-gft-81ad47b1.html",
    "assets/gifts/paired/20fd1335cbc93f2e83a3.webp": "product-lnv-gft-84b2dc39.html",
    "assets/gifts/paired/79dda4dedcfa715ec1d1.webp": "product-lnv-gft-72fc6994.html",
    "assets/gifts/paired/a7da1073bd57b2db2336.webp": "product-lnv-gft-197f5aaa.html",
    "assets/gifts/paired/7d038471456f5c892207.webp": "product-lnv-gft-835f754d.html",
    "assets/gifts/paired/8efb79e6978aa255e72c.webp": "product-lnv-gft-9fc935aa.html",
    "assets/gifts/paired/f316b932be71fe3aaf88.webp": "product-lnv-gft-bb1d12af.html"
  },
  "christmas": {
    "assets/christmas/standalone/4fee0c8b694b3a6cac99.png": "product-lnv-xms-80c34b43.html",
    "assets/christmas/standalone/d562217af6c6dcb7d806.png": "product-lnv-xms-499cc25c.html",
    "assets/christmas/standalone/b7c2f963b441ad3ea550.png": "product-lnv-xms-b26959c2.html",
    "assets/christmas/paired/fa0a43337a95d05c5727.webp": "product-lnv-xms-3adc7f14.html",
    "assets/christmas/paired/d9c6cf216c67a77a99fd.webp": "product-lnv-xms-f7070bc9.html",
    "assets/christmas/paired/1480094b012dbf961dae.webp": "product-lnv-xms-a8811e93.html",
    "assets/christmas/paired/f77399a59a07a9b8e1ad.webp": "product-lnv-xms-bed2d989.html",
    "assets/christmas/paired/e710e9777530e1a2f07e.webp": "product-lnv-xms-5a010473.html",
    "assets/christmas/paired/7f1e156495b0a459e0d6.webp": "product-lnv-xms-3765d8f2.html",
    "assets/christmas/paired/9df584ca1e1685589d46.webp": "product-lnv-xms-5855d453.html",
    "assets/christmas/paired/437b85b84ad977d9adc1.webp": "product-lnv-xms-a71be608.html",
    "assets/christmas/paired/a8a04f250be1545aa1c3.webp": "product-lnv-xms-650aea95.html",
    "assets/christmas/paired/35a8205a0dcc5801c828.webp": "product-lnv-xms-00898c2e.html",
    "assets/christmas/paired/39e039fb54a6b60d7eeb.webp": "product-lnv-xms-c969e77f.html",
    "assets/christmas/paired/aa4efc0a88d60dfb26a0.webp": "product-lnv-xms-2222a11f.html",
    "assets/christmas/paired/7244c0a1884379c3fc46.webp": "product-lnv-xms-2ba5d180.html",
    "assets/christmas/paired/6db267b2806699718c15.webp": "product-lnv-xms-2d5f8d8e.html",
    "assets/christmas/paired/ff765036bc45dff2513b.webp": "product-lnv-xms-73fbf427.html",
    "assets/christmas/paired/e5c69a3391c36ae30d80.webp": "product-lnv-xms-3cc7b61f.html",
    "assets/christmas/paired/7964d0a4e143e4c26426.webp": "product-lnv-xms-74d2ef75.html",
    "assets/christmas/paired/e40a6c47b33c64f54ee4.webp": "product-lnv-xms-7c89fb28.html",
    "assets/christmas/paired/b22e9bf1bb681718f5a4.webp": "product-lnv-xms-b8221ee8.html",
    "assets/christmas/paired/a59a1441e620ff595494.webp": "product-lnv-xms-0f67d8cb.html",
    "assets/christmas/paired/208837f07b39c307c4fe.webp": "product-lnv-xms-57d648b6.html",
    "assets/christmas/paired/58479c85aca5612cf8f4.webp": "product-lnv-xms-33eac166.html",
    "assets/christmas/paired/d2035366cd0dcfcc2393.webp": "product-lnv-xms-b72c52be.html",
    "assets/christmas/paired/b654bd843ac4c8041f8c.webp": "product-lnv-xms-af62e8de.html",
    "assets/christmas/paired/fc5ea0dccfc61f30e459.webp": "product-lnv-xms-ddeeefd6.html",
    "assets/christmas/paired/538f9f0b02ba68c5c5dd.webp": "product-lnv-xms-15cdd6ab.html",
    "assets/christmas/paired/4a7ace3c9ca9f11e146c.webp": "product-lnv-xms-652d9fb2.html",
    "assets/christmas/paired/c082e2bf728f7ad74860.webp": "product-lnv-xms-ec3e85a9.html",
    "assets/christmas/paired/61253e2d71812a5a6496.webp": "product-lnv-xms-793b2f36.html",
    "assets/christmas/paired/6bd0508a71ef54288424.webp": "product-lnv-xms-eba3d095.html",
    "assets/christmas/paired/df14c67cacea5845b494.webp": "product-lnv-xms-00beb3be.html",
    "assets/christmas/paired/ba0c524d4b0c2f4e9680.webp": "product-lnv-xms-68ef4327.html",
    "assets/christmas/paired/6d52f0817361816118b7.webp": "product-lnv-xms-d5956a72.html",
    "assets/christmas/paired/1383bf46ac80e1d62944.webp": "product-lnv-xms-e392fac4.html",
    "assets/christmas/paired/5702fcfafd2123c3f93e.webp": "product-lnv-xms-7a217650.html"
  },
  "sachets": {
    "assets/sachets/paired/2e09dbec67e3048635e7.webp": "product-lnv-sch-c9143779.html",
    "assets/sachets/paired/301de746753e02d728ce.webp": "product-lnv-sch-7fcfbb10.html",
    "assets/sachets/paired/5ee9cd54d8b68955fb00.webp": "product-lnv-sch-5fad76db.html",
    "assets/sachets/paired/14eefcbb28cb40378e95.webp": "product-lnv-sch-9b26abdb.html",
    "assets/sachets/paired/b232e0c6ef6a01e2730e.webp": "product-lnv-sch-53ca8006.html",
    "assets/sachets/paired/d2a2c13cb519e3a3e386.webp": "product-lnv-sch-8df631a3.html",
    "assets/sachets/paired/ead03b28dd75d66e5fbc.webp": "product-lnv-sch-83093487.html",
    "assets/sachets/paired/b70e7617bf5fafac62ee.webp": "product-lnv-sch-8a37ff04.html",
    "assets/sachets/paired/c9f48cb1e1688995b7f5.webp": "product-lnv-sch-53535632.html",
    "assets/sachets/paired/799aa3dbeae7975a972b.webp": "product-lnv-sch-db9888ec.html"
  }
};
