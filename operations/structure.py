import json
from sqlmodel import SQLModel
from fastapi import FastAPI
from datetime import date
import datetime
from json import JSONEncoder


class InputMember(SQLModel):
    id: int
    firstname: str
    lastname: str
    M_name: str|None=None
    email: str
    major: str
    address: str
    phone_number: int
class Member(InputMember):
        person_id:int
        college_id:int

class College(SQLModel):
        clz_id:int
        clz_name:str
        clz_address:str
        clz_website:str


class InputPerson(SQLModel):
    prsn_id: int
    prsn_position: str
class Person(InputPerson):
        prsn_joined_date=f'{date.today()}'

# Encoder class for Class Member
class MemberEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o,Member):
            return {'id': o.id,'firstname': o.firstname,'lastname': o.lastname,'M_name': o.M_name,'email': o.email,'major': o.major,'address': o.address,'phone_number': o.phone_number,'person_id': o.person_id,'college_id': o.college_id}
        return super().default(o)

# Encoder class for Class College
class CollegeEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o,College):
            return {'clz_id':o.clz_id,'clz_name':o.clz_name,'clz_address':o.clz_address,'clz_website':o.clz_website}
        return super().default(o)

# Encoder class for Class Person
class PersonEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o,Person):
            return {'prsn_id':o.prsn_id, 'prsn_joined_date':o.prsn_joined_date,'prsn_position':o.prsn_position}
        return super().default(o)

# For loading the data from json files
def load_membersdb()->list[Member]:
    f=open('db.members.json')
    data=json.load(f)
    return data

def load_collegedb()->list[College]:
    f=open('db.colleges.json')
    data=json.load(f)
    return data

def load_persondb()->list[Person]:
    f=open('db.person.json')
    data=json.load(f)
    return data


# For saving the data into json file
def save_members(member:list[Member]):
    with open("db.members.json",'w') as f:
        json.dump([membe for membe in member],f,cls=MemberEncoder,indent=4)

def save_college(college:list[College]):
    with open("db.colleges.json",'w') as f:
        json.dump([colleg for colleg in college],f,cls=CollegeEncoder, indent=4)

def save_person(personnel:list[Person]):
    with open("db.person.json",'w') as f:
        json.dump([personne for personne in personnel],f,cls=PersonEncoder, indent=4)