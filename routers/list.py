from fastapi import APIRouter
from services.github_service import list_files

router = APIRouter()

@router.get("/files")
def files():
    return list_files()