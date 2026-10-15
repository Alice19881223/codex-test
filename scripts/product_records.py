"""Stable public product references shared by catalogue and product-page builders."""
import hashlib
def item_no(category,image):
 prefix={'candle':'CND','reed':'RD','crystal':'CRY','gift':'GFT','christmas':'XMS','sachets':'SCH'}[category]
 return 'LNV-'+prefix+'-'+hashlib.sha256((category+':'+image).encode()).hexdigest()[:8].upper()
def product_url(category,image):return 'product-'+item_no(category,image).lower()+'.html'
