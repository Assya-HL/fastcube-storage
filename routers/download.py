from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
import base64
import requests

from config.settings import GITHUB_TOKEN, OWNER, REPO
from services.crypto_service import load_metadata

router = APIRouter()

API_URL = f"https://api.github.com/repos/{OWNER}/{REPO}/contents"

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github+json"
}


@router.get("/download/{file_name}")
def download(file_name: str):

    # قراءة metadata
    metadata = load_metadata()

    if file_name not in metadata:
        raise HTTPException(
            status_code=404,
            detail="File not found in metadata"
        )

    encrypted_name = metadata[file_name]


    url = f"{API_URL}/objects/{encrypted_name}"

    res = requests.get(url, headers=headers)

    if res.status_code != 200:
        raise HTTPException(
            status_code=404,
            detail="File not found in GitHub"
        )

    data = res.json()

    file_content = base64.b64decode(data["content"])

    return Response(
        content=file_content,
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f'attachment; filename="{file_name}"'
        }
    )