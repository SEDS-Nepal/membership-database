from fastapi import FastAPI
from router import dboperations

app = FastAPI()
app.include_router(dboperations.router)
