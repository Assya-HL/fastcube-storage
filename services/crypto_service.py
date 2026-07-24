import hashlib
import json
import os

METADATA_DIR = "metadata"
METADATA_FILE = os.path.join(METADATA_DIR, "metadata.json")


def encrypt_filename(filename: str):
    """
    تشفير اسم الملف مع الاحتفاظ بالامتداد
    """
    _, ext = os.path.splitext(filename)
    hashed = hashlib.sha256(filename.encode("utf-8")).hexdigest()
    return hashed + ext


def load_metadata():
    """
    قراءة metadata.json
    """
    os.makedirs(METADATA_DIR, exist_ok=True)

    if not os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "w", encoding="utf-8") as f:
            json.dump({}, f, indent=4)

    with open(METADATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)


def save_metadata(data):
    """
    حفظ metadata.json محلياً
    """
    os.makedirs(METADATA_DIR, exist_ok=True)

    with open(METADATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)


def add_file(real_name, encrypted_name):
    """
    إضافة ملف جديد إلى metadata
    """
    data = load_metadata()
    data[real_name] = encrypted_name
    save_metadata(data)

    # رفع metadata.json إلى GitHub
    try:
        from services.github_service import upload_to_github

        with open(METADATA_FILE, "rb") as f:
            upload_to_github("metadata/metadata.json", f.read())

    except Exception as e:
        print("GitHub metadata upload error:", e)


def get_encrypted_name(real_name):
    """
    الحصول على الاسم المشفر انطلاقاً من الاسم الحقيقي
    """
    data = load_metadata()
    return data.get(real_name)


def remove_file(real_name):
    """
    حذف ملف من metadata
    """
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