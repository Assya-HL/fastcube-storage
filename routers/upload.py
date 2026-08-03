from fastapi import APIRouter, UploadFile, File
from services.github_service import upload_to_github
from services.crypto_service import encrypt_filename, add_file

router = APIRouter()


@router.post("/upload")
async def upload(file: UploadFile = File(...)):

    content = await file.read()


    encrypted_name = encrypt_filename(file.filename)

   
    add_file(file.filename, encrypted_name)

    
    result = upload_to_github(f"objects/{encrypted_name}", content)

    return {
        "message": "File uploaded successfully",
        "original_name": file.filename,
        "encrypted_name": encrypted_name,
        "github": result
    }