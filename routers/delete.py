from fastapi import APIRouter
from services.github_service import delete_from_github

router = APIRouter()

@router.delete("/delete/{file_name}")
def delete(file_name: str):
    return delete_from_github(file_name)