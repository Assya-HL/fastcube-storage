from fastapi import FastAPI

from routers.upload import router as upload_router
from routers.download import router as download_router
from routers.delete import router as delete_router
from routers.list import router as list_router

app = FastAPI(title="Git Backend Storage API")

app.include_router(upload_router)
app.include_router(download_router)
app.include_router(delete_router)
app.include_router(list_router)

@app.get("/")
def home():
    return {"message": "API is running"}

@app.get("/health")
def health():
    return {"status": "OK"}