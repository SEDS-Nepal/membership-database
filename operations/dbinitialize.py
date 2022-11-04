from fastapi import FastAPI,Depends
from router import dboperations


app = FastAPI()
app.include_router(dboperations.router)


