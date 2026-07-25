from pathlib import Path
import json, re

ROOT = Path(__file__).resolve().parent
GALLERY = ROOT / "assets" / "gallery"
OUTPUT = ROOT / "gallery.json"
EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}

def title_from_name(stem: str) -> str:
    text = re.sub(r"[_-]+", " ", stem)
    text = re.sub(r"\s+", " ", text).strip()
    return text.title() or "Bathroom Wizards Project"

photos = []
for path in sorted(GALLERY.iterdir(), key=lambda p: p.name.lower()):
    if path.is_file() and path.suffix.lower() in EXTENSIONS:
        title = title_from_name(path.stem)
        photos.append({
            "src": f"assets/gallery/{path.name}",
            "alt": f"Bathroom Wizards project: {title}",
            "caption": title
        })

OUTPUT.write_text(json.dumps({"photos": photos}, indent=2) + "\n", encoding="utf-8")
print(f"Updated gallery.json with {len(photos)} photo(s).")
