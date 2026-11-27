import contextlib
import importlib.util
import io
import json
import tempfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location("translation_import", root / "scripts/build-translations-from-excel.py")
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
# Simulate a bad workbook/manual spelling. Audited names must still win.
module.MANUAL_TRANSLATIONS.setdefault("abilities", {})["synchronize"] = {"de": "Synchronization"}
module.MANUAL_TRANSLATIONS["pokemon"]["stufful"] = {"de": "Velirsi"}
with tempfile.TemporaryDirectory() as directory:
    module.OUTPUT_PATH = Path(directory) / "translations.json"
    with contextlib.redirect_stdout(io.StringIO()):
        module.main()
    result = json.loads(module.OUTPUT_PATH.read_text(encoding="utf-8"))
    verified = json.loads(module.VERIFIED_NAMES_PATH.read_text(encoding="utf-8"))
    forms = json.loads(module.FORM_NAMES_PATH.read_text(encoding="utf-8"))
    for kind, names in verified.items():
        for key, label in names.items():
            assert result[kind][key] == label, (kind, key)
    for key, label in forms.items():
        assert result["pokemon"][key] == label, key
    assert result["abilities"]["synchronize"]["de"] == "Synchro"
    assert result["pokemon"]["stufful"]["de"] == "Velursi"
print("Passed actual spreadsheet re-import: audited names and form labels override incorrect spreadsheet/manual values.")
