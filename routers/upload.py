from fastapi import APIRouter, UploadFile, File
from services.github_service import upload_to_github

router = APIRouter()

@router.post("/upload")
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    return upload_to_github(file.filename, content)