"""Embed the existing HOME energy glyphs as self-contained SVG paths."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
symbols = {}
for element in ['Fire', 'Electric', 'Fighting', 'Dark', 'Psychic', 'Grass', 'Normal', 'Dragon', 'Steel', 'Water']:
    image = Image.open(root / 'Type Icons' / f'{element}_icon_HOME3.png').convert('RGBA')
    points = {(x, y) for y in range(image.height) for x in range(image.width)
              if min(image.getpixel((x, y))[:3]) >= 225 and image.getpixel((x, y))[3] > 0}
    left, top = min(x for x, y in points), min(y for x, y in points)
    right, bottom = max(x for x, y in points), max(y for x, y in points)
    runs = []
    for y in range(top, bottom + 1):
        x = left
        while x <= right:
            if (x, y) not in points:
                x += 1
                continue
            start = x
            while x <= right and (x, y) in points:
                x += 1
            length = x - start
            runs.append(f'M{start-left} {y-top}h{length}v1h-{length}z')
    symbols[element] = [right-left+1, bottom-top+1, ''.join(runs)]

target = root / 'milo-cards.js'
source = target.read_text(encoding='utf-8')
start_marker = '  // BEGIN GENERATED ENERGY SYMBOLS'
end_marker = '  // END GENERATED ENERGY SYMBOLS'
start = source.index(start_marker)
end = source.index(end_marker) + len(end_marker)
block = start_marker + '\n  const energySymbols = ' + json.dumps(symbols, separators=(',', ':')) + ';\n' + end_marker
target.write_text(source[:start] + block + source[end:], encoding='utf-8')
print(f'Embedded {len(symbols)} energy glyphs; no runtime image or canvas dependency.')
