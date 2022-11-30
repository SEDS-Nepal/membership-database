from fastapi import FastAPI
from routers import members

from starlette.middleware.cors import CORSMiddleware

app = FastAPI(title="SEDS-Nepal Membership Database")
app.include_router(members.router)

origins = [
    "http://147.182.209.148:8000",
    "http://147.182.209.148:8080",
    "http://localhost:8000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

