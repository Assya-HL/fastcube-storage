import base64
import requests
from config.settings import GITHUB_TOKEN, OWNER, REPO, BRANCH

API_URL = f"https://api.github.com/repos/{OWNER}/{REPO}/contents"

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}

# =========================
# UPLOAD
# =========================
def upload_to_github(file_name: str, content: bytes):
    encoded = base64.b64encode(content).decode("utf-8")

    url = f"{API_URL}/{file_name}"

    data = {
        "message": f"upload {file_name}",
        "content": encoded,
        "branch": BRANCH
    }

    return requests.put(url, json=data, headers=headers).json()


# =========================
# DOWNLOAD
# =========================
def download_from_github(file_name: str):
    url = f"{API_URL}/{file_name}"

    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        return {"error": "file not found"}

    data = res.json()
    content = base64.b64decode(data["content"]).decode("utf-8")

    return {"file_name": file_name, "content": content}


# =========================
# DELETE
# =========================
def delete_from_github(file_name: str):
    url = f"{API_URL}/{file_name}"

    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        return {"error": "file not found"}

    sha = res.json()["sha"]

    data = {
        "message": f"delete {file_name}",
        "sha": sha,
        "branch": BRANCH
    }

    return requests.delete(url, json=data, headers=headers).json()


# =========================
# LIST FILES
# =========================
def list_files():
    res = requests.get(API_URL, headers=headers)

    if res.status_code != 200:
        return {"error": "cannot fetch files"}

    return [
        {
            "name": f["name"],
            "path": f["path"],
            "type": f["type"]
        }
        for f in res.json()
    ]