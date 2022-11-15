from sqlmodel import SQLModel
from pydantic import BaseModel
from fastapi import FastAPI
from datetime import date
import datetime
from passlib.context import CryptContext

pwd_context= CryptContext(schemes=["bcrypt"])


class InputMember(SQLModel):
    firstname: str
    lastname: str
    M_name: str|None=None
    email: str
    major: str
    phone_number: int



class InputCollege(SQLModel):
    clz_name: str
    clz_address: str
    clz_website: str
class College(InputCollege):
        clz_id:int|None
        class Config:
            orm_mode: True


class InputPerson(SQLModel):
    prsn_id: int
    prsn_position: str


class Person(InputPerson):
        prsn_joined_date=f'{datetime.datetime.now()}'
        class Config:
            orm_mode: True

class InputAddress(SQLModel):
    city:str
    province:str
    postal_code:int

class Address(InputAddress):
    address_id:int|int
    class Config:
        orm_mode:True


class Member(InputMember):
    id:int|None
    person_id:int
    college_id:int
    address_id:int
    class Config:
        orm_mode:True

class Updatemember(SQLModel):
    firstname:str|None=None
    lastname: str|None=None
    M_name: str | None = None
    email: str|None=None
    major: str|None=None
    phone_number: int|None=None




class Updatecollege(SQLModel):
    clz_name: str | None = None
    clz_address: str | None = None
    clz_website: str | None = None

class Updateroledetails(SQLModel):
    prsn_id: int | None = None
    prsn_position: str | None = None

class Updateaddress(SQLModel):
    city: str | None = None
    province: str | None = None
    postal_code: int | None = None