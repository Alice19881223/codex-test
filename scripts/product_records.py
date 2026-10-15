"""Stable public product references shared by catalogue and product-page builders."""
import hashlib,json
from pathlib import Path
_identity_path=Path(__file__).resolve().parents[1]/'assets/product-identities.json'
_identities=json.loads(_identity_path.read_text()) if _identity_path.exists() else {}
def item_no(category,image):
 if image in _identities.get(category,{}):return _identities[category][image]
 prefix={'candle':'CND','reed':'RD','crystal':'CRY','gift':'GFT','christmas':'XMS','sachets':'SCH'}[category]
 return 'LNV-'+prefix+'-'+hashlib.sha256((category+':'+image).encode()).hexdigest()[:8].upper()
def product_url(category,image):return 'product-'+item_no(category,image).lower()+'.html'
