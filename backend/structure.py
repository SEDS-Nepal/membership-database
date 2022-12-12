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

class OutputCollege(SQLModel):
    pass


class InputPerson(SQLModel):
    personsid: str
    position: str


class Person(InputPerson):
    prsn_joined_date = f'{datetime.datetime.now()}'

    class Config:
        orm_mode: True

class OutputPerson(SQLModel):
    pass


class InputAddress(SQLModel):
    city: str
    province: str
    postal_code: str


class Address(InputAddress):
    address_id: int

    class Config:
        orm_mode: True

class OutputAddress(SQLModel):
    pass


class InputSchool(SQLModel):
    school_name: str
    school_address: str
    school_website: str | None


class School(InputSchool):
    school_id: int

    class config:
        orm_mode: True

class OutputSchool(SQLModel):
    pass


class InputJob(SQLModel):
    title: str
    company_name: str
    company_address: str


class Job(InputJob):
    job_id: int

    class config:
        orm_mode: True

class OutputJob(SQLModel):
    pass



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


class Memberdetails(SQLModel):
    form: Optional[str]
    address: InputAddress
    college: InputCollege | None
    school: InputSchool | None
    job: InputJob | None
    person: InputPerson
    member: InputMember

