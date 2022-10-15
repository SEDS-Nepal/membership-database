
from sqlmodel import SQLModel, Field


class PersonDetails(SQLModel, table=True):
    first_name:str
    middle_name:str|None
    last_name: str
    email:str=Field(primary_key=True)
    phone_number:int
    address:str
    major:str
    college_name: str
    college_address:str
    college_website:str|None



