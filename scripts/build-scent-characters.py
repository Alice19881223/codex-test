"""Derive character labels from the actual notes in each fragrance layer."""
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
groups={
 'Floral':'freesia|rose|geranium|peony|jasmine|orange blossom|gardenia|tuberose|neroli|dried florals|osmanthus|lily of the valley|white florals|florals',
 'Fruity':'pear|lychee|fig|blackcurrant|pomegranate accord|plum|apricot|apple',
 'Citrus':'bergamot|citrus|lime|mandarin|grapefruit|lemon peel|citron|bitter orange|lemon|sweet orange|orange peel',
 'Green':'green leaves|green notes|fresh greens|fig leaf|bamboo accord|petitgrain',
 'Woody':'woods|cedarwood|sandalwood|cashmere wood accord|cypress|guaiac wood|driftwood accord|oud',
 'Musky':'white musk|musk',
 'Tea':'white tea accord|black tea accord|green tea accord|fresh tea leaves',
 'Herbal':'basil|thyme|rosemary|sage|lavender|eucalyptus|mint|lemon verbena|mugwort|juniper',
 'Spiced':'pink pepper|black pepper|cardamom|gentle spices|cinnamon|nutmeg|clove|ginger|saffron',
 'Resinous':'amber|amber accord|benzoin|resin|balsamic resin|incense|myrrh|fir balsam',
 'Sweet':'vanilla|tonka bean|caramel|baked notes|brown sugar accord|brown sugar|biscuit accord|molasses accord|almond accord|pumpkin accord',
 'Creamy':'coconut milk|milky notes|cream',
 'Fresh':'fresh air accord',
 'Marine':'sea breeze accord|sea salt accord',
 'Powdery':'iris|violet|aldehydes',
 'Earthy':'vetiver|moss accord|patchouli',
 'Smoky':'smoked wood accord',
 'Evergreen':'pine needles|pine|fir',
}
lookup={note:label for label,notes in groups.items() for note in notes.split('|')}
def normalize(note):return re.sub(r'^(?:a little |light |soft )','',note.lower())
def character_label(notes):
 labels=list(dict.fromkeys(lookup[normalize(note)] for note in notes))
 return ' & '.join(labels)
if __name__=='<run_path>' or __name__=='__main__':
 p=root/'assets/fragrances.json';scents=json.loads(p.read_text())
 for scent in scents:
  scent['character']=[dict(label=character_label(scent[key]),value=value,source=key,sourceNotes=scent[key]) for key,value in [('heart',60),('top',25),('base',15)]]
 p.write_text(json.dumps(scents,indent=2))
 print('Derived scent character from top, heart and base notes for',len(scents),'fragrances')
