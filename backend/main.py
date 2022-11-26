from fastapi import FastAPI
from .routers import members


app = FastAPI(title="SEDS-Nepal Membership Database")
app.include_router(members.router)



