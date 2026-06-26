from fastapi import APIRouter
from services.github_service import download_from_github

router = APIRouter()

@router.get("/download/{file_name}")
def download(file_name: str):
    return download_from_github(file_name)