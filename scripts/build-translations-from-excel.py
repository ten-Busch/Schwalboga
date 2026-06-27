import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import openpyxl


ROOT = Path(__file__).resolve().parents[1]
WORKBOOK_PATH = ROOT / "files" / "International List of Pokémon Names.xlsx"
OUTPUT_PATH = ROOT / "data" / "translations.json"

NAME_CORRECTIONS = {
    "pokemon": {
        "Houndoor": "Houndour",
        "Tailow": "Taillow",
        "Minum": "Minun",
        "Scoliopede": "Scolipede",
        "Amoongus": "Amoonguss",
        "Gumchoos": "Gumshoos",
        "Palosand": "Palossand",
        "Thwakey": "Thwackey",
        "Skowvet": "Skwovet",
        "Zamazanta": "Zamazenta",
        "Meowscarda": "Meowscarada",
        "Toadscruel": "Toedscruel",
    },
    "moves": {
        "Pin Missle": "Pin Missile",
        "Bonemarang": "Bonemerang",
        "X-Scissors": "X-Scissor",
        "Psyshield Smash": "Psyshield Bash",
        "Matcha Gatcha": "Matcha Gotcha",
    },
    "abilities": {
        "Compund Eyes": "Compound Eyes",
        "Tint Lens": "Tinted Lens",
        "Hunder Switch": "Hunger Switch",
    },
}

GERMAN_VALUE_CORRECTIONS = {
    "pokemon": {
        "Ampharos": "Ampharos",
        "Banette": "Banette",
        "Carvanha": "Kanivanha",
        "Dusclops": "Zwirrklop",
        "Fletchinder": "Fletiamo",
        "Glalie": "Firnontor",
        "Gorebyss": "Saganabyss",
        "Luvdisc": "Liebiskus",
        "Mantine": "Mantax",
    },
}

MANUAL_TRANSLATIONS = {
    "pokemon": {
        "banette": {"de": "Banette"},
        "taurospaldeacombat": {"de": "Tauros-Paldea-Gefecht"},
        "taurospaldeablaze": {"de": "Tauros-Paldea-Flammen"},
        "taurospaldeaaqua": {"de": "Tauros-Paldea-Fluten"},
    },
}


def to_id(value):
    normalized = unicodedata.normalize("NFKD", str(value))
    normalized = "".join(character for character in normalized if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", "", normalized.lower().replace("’", "").replace("'", ""))


def decode_source_string(value):
    return json.loads(f'"{value}"')


def parse_named_entries(path):
    text = path.read_text(encoding="utf-8")
    entries = {}
    current_id = None
    current_lines = []
    brace_depth = 0

    for line in text.splitlines():
        if current_id is None:
            match = re.match(r'^\t(?:"([^"]+)"|([a-z0-9]+)):\s*\{$', line)
            if not match:
                continue
            current_id = match.group(1) or match.group(2)
            current_lines = [line]
            brace_depth = line.count("{") - line.count("}")
            continue

        current_lines.append(line)
        brace_depth += line.count("{") - line.count("}")

        if brace_depth == 0:
            body = "\n".join(current_lines)
            name_match = re.search(r'\n\t\tname:\s*"([^"]+)"', body)
            entries[current_id] = decode_source_string(name_match.group(1)) if name_match else current_id
            current_id = None
            current_lines = []

    return entries


def build_lookup(entries):
    lookup = defaultdict(list)
    for entry_id, name in entries.items():
        lookup[name].append(entry_id)
        lookup[to_id(name)].append(entry_id)
    return lookup


def add_sheet_translations(kind, workbook, sheet_name, lookup, source_entries):
    sheet = workbook[sheet_name]
    translations = {}
    unmatched = []
    ambiguous = []

    for row in sheet.iter_rows(values_only=True):
        english = row[1] if len(row) > 1 else None
        german = row[4] if len(row) > 4 else None
        if not english or not german or english == "en" or german == "de":
            continue

        raw_english = str(english)
        corrected_english = NAME_CORRECTIONS.get(kind, {}).get(raw_english, raw_english)
        corrected_german = GERMAN_VALUE_CORRECTIONS.get(kind, {}).get(raw_english, str(german))
        entry_ids = sorted(set(lookup.get(corrected_english, []) or lookup.get(to_id(corrected_english), [])))
        if len(entry_ids) == 1:
            entry_id = entry_ids[0]
            if corrected_german != source_entries[entry_id]:
                translations[entry_id] = {"de": corrected_german}
        elif len(entry_ids) > 1:
            ambiguous.append({"en": str(english), "de": str(german), "ids": entry_ids})
        else:
            unmatched.append({"en": str(english), "de": str(german)})

    return dict(sorted(translations.items())), unmatched, ambiguous


def main():
    sources = {
        "pokemon": parse_named_entries(ROOT / "pokedex.ts"),
        "moves": parse_named_entries(ROOT / "moves.ts"),
        "abilities": parse_named_entries(ROOT / "abilities_text.ts"),
    }
    lookups = {kind: build_lookup(entries) for kind, entries in sources.items()}
    workbook = openpyxl.load_workbook(WORKBOOK_PATH, read_only=True, data_only=True)

    sheet_names = {
        "pokemon": "Pokemon",
        "moves": "Moves",
        "abilities": "Abilities",
    }
    output = {"locales": ["de"]}
    unmatched = {}
    ambiguous = {}

    for kind, sheet_name in sheet_names.items():
        translations, unmatched[kind], ambiguous[kind] = add_sheet_translations(
            kind,
            workbook,
            sheet_name,
            lookups[kind],
            sources[kind],
        )
        translations.update(MANUAL_TRANSLATIONS.get(kind, {}))
        translations = dict(sorted(translations.items()))
        output[kind] = translations

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(output, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    summary = {
        kind: {
            "written": len(output[kind]),
            "sourceIds": len(sources[kind]),
            "unmatched": len(unmatched[kind]),
            "ambiguous": len(ambiguous[kind]),
        }
        for kind in sheet_names
    }
    print(json.dumps({"summary": summary, "unmatched": unmatched, "ambiguous": ambiguous}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
