import datetime

from structure import Member, College, Person, load_membersdb, load_collegedb,load_persondb,save_members,save_person,save_college,InputMember,InputPerson
from fastapi import FastAPI, APIRouter
from datetime import date
from sqlmodel import SQLModel
import json

router=APIRouter()
mdb=load_membersdb()
cdb=load_collegedb()
pdb=load_persondb()

@router.get("/")
def welcome():
    return {'message': "Welcome to SEDS API"}


@router.get("/api/members")
def members()->list[Member]:
    return mdb


@router.get("/api/colleges")
def colleges():
    return cdb


@router.get("/api/person")
def person():
    return pdb

@router.post("/api/register")
def new_register(member:InputMember,college:College,personnel:InputPerson):
    mem=Member(id=member.id,firstname=member.firstname,lastname=member.lastname,M_name=member.M_name,email=member.email,major=member.major,address=member.address,phone_number=member.phone_number, person_id=personnel.prsn_id,college_id=college.clz_id)
    mdb.append(mem)
    save_members(mdb)

    cdb.append(college)
    save_college(cdb)

    prsn=Person(prsn_id=personnel.prsn_id,prsn_position=personnel.prsn_position,prsn_joined_date=f'{date.today()}')
    pdb.append(prsn)
    save_person(pdb)


