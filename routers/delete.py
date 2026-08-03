from fastapi import APIRouter, HTTPException
from services.github_service import delete_from_github
from services.crypto_service import load_metadata, save_metadata

router = APIRouter()


@router.delete("/delete/{file_name}")
def delete(file_name: str):

    metadata = load_metadata()

    if file_name not in metadata:
        raise HTTPException(
            status_code=404,
            detail="File not found"
        )

    encrypted_name = metadata[file_name]

    result = delete_from_github(
        f"objects/{encrypted_name}"
    )

    del metadata[file_name]
    save_metadata(metadata)

    return {
        "message": "File deleted successfully",
        "file": file_name,
        "github": result
    }