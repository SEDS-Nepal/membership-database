from fastapi import FastAPI, Depends
from sqlmodel import SQLModel,Session, create_engine

from schemas import PersonDetails

app=FastAPI()

engine=create_engine("sqlite:///sedsmembers.db",
                     connect_args={"check_same_thread":False},
                     echo=False)

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session

@app.post("/api/get/details")
def get_details(new_detail:PersonDetails,session:Session=Depends(get_session)):
    new_detail_data=PersonDetails.from_orm(new_detail)
    if new_detail_data.middle_name=="string":
        new_detail_data.middle_name=""
    session.add(new_detail_data)
    session.commit()
    session.refresh(new_detail_data)
