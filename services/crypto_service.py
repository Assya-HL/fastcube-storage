import hashlib
import json
import os

METADATA_DIR = "metadata"
METADATA_FILE = os.path.join(METADATA_DIR, "metadata.json")


def encrypt_filename(filename: str):

    _, ext = os.path.splitext(filename)
    hashed = hashlib.sha256(filename.encode("utf-8")).hexdigest()
    return hashed + ext


def load_metadata():

    os.makedirs(METADATA_DIR, exist_ok=True)

    if not os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "w", encoding="utf-8") as f:
            json.dump({}, f, indent=4)

    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_metadata(data):

    os.makedirs(METADATA_DIR, exist_ok=True)

    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def add_file(real_name, encrypted_name):

    data = load_metadata()
    data[real_name] = encrypted_name
    save_metadata(data)


    try:
        from services.github_service import upload_to_github

        with open(METADATA_FILE, "rb") as f:
            upload_to_github("metadata/metadata.json", f.read())

    except Exception as e:
        print("GitHub metadata upload error:", e)


def get_encrypted_name(real_name):

    data = load_metadata()
    return data.get(real_name)


def remove_file(real_name):

    data = load_metadata()

    if real_name in data:
        del data[real_name]
        save_metadata(data)

        try:
            from services.github_service import upload_to_github

            with open(METADATA_FILE, "rb") as f:
                upload_to_github("metadata/metadata.json", f.read())

        except Exception as e:
            print("GitHub metadata upload error:", e)