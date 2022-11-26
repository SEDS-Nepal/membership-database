from typing import Optional

from sqlmodel import SQLModel
import datetime


class InputMember(SQLModel):
    first_name: str
    middle_name: str | None = None
    last_name: str
    email: str
    education_level: str
    major: str
    number: str


class InputCollege(SQLModel):
    college_name: str
    college_address: str
    college_website: str


class College(InputCollege):
    college_id: int | None

    class Config:
        orm_mode: True


class InputPerson(SQLModel):
    personsid: str
    position: str


class Person(InputPerson):
    prsn_joined_date = f'{datetime.datetime.now()}'

    class Config:
        orm_mode: True


class InputAddress(SQLModel):
    city: str
    province: str
    postal_code: str


class Address(InputAddress):
    address_id: int

    class Config:
        orm_mode: True


class InputSchool(SQLModel):
    school_name: str
    school_address: str
    school_website: str | None


class School(InputSchool):
    school_id: int

    class config:
        orm_mode: True


class InputJob(SQLModel):
    title: str
    company_name: str
    company_address: str


class Job(InputJob):
    job_id: int

    class config:
        orm_mode: True


class Member(InputMember):
    id: int
    personid: Optional[int]
    college_id: Optional[int]
    school_id: Optional[int]
    job_id: Optional[int]
    address_id: Optional[int]

    class Config:
        orm_mode: True


class Updatemember(SQLModel):
    first_name: str | None = None
    last_name: str | None = None
    middle_name: str | None = None
    email: str | None = None
    major: str | None = None
    number: str | None = None


class Updatecollege(SQLModel):
    college_name: str | None = None
    college_address: str | None = None
    college_website: str | None = None


class Updateroledetails(SQLModel):
    personsid: int | None = None
    position: str | None = None


class Updateaddress(SQLModel):
    city: str | None = None
    province: str | None = None
    postal_code: int | None = None


class Memberdetails(InputAddress, InputCollege, InputSchool, InputJob, InputPerson, InputMember):
    form: Optional[str]
