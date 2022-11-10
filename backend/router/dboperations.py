import datetime

from MMSystem.structure import Person, Member, Address, College, InputCollege, InputPerson, InputMember, InputAddress
from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from MMSystem import model
from dbconnection import sessionlocal, engine

model.base.metadata.create_all(bind=engine)
router = APIRouter()


def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def welcome():
    return {'message': "Welcome to SEDS API"}


@router.get("/api/members")
def get_all_members(db: Session = Depends(get_db)) -> list:
    return db.execute(
        f"SELECT mem.id,mem.firstname,mem.middlename,mem.lastname,mem.email,mem.major,mem.phone_number FROM "
        f"memberstable mem").all()


@router.get("/api/members/{id}")
def get_members_by_id(id: int, db: Session = Depends(get_db)):
    return db.execute(f"SELECT mem.firstname,mem.middlename,mem.lastname,mem.email,mem.major,mem.phone_number FROM "
                      f"memberstable mem WHERE mem.id='{id}'").one()


@router.get("/api/colleges")
def get_colleges(db: Session = Depends(get_db)):
    return db.execute(f"SELECT clz.clz_name,clz.clz_address,clz.clz_website FROM membercollege clz").all()


@router.get("/api/roledetails")
def get_role_details(db: Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.get("/api/address")
def get_address(db: Session = Depends(get_db)):
    return db.execute(f"SELECT adrs.city,adrs.province,adrs.postal_code FROM addressdetails adrs").all()


@router.get("/api/alldetails")
def get_all_details(db: Session = Depends(get_db)):
    return db.execute(f"SELECT mem.id,mem.firstname,mem.middlename,mem.lastname,mem.email,mem.major,mem.phone_number,"
                      f"clz.clz_name,clz.clz_address,clz.clz_website,prsn.prsn_id, prsn.prsn_position, "
                      f"prsn.prsn_joined_date,adrs.city,adrs.province,adrs.postal_code "
                      f"FROM memberstable mem "
                      f"INNER JOIN membercollege clz ON clz.clz_id=mem.college_id "
                      f"INNER JOIN roledetails prsn ON prsn.prsn_id=mem.person_id "
                      f"INNER JOIN addressdetails adrs ON adrs.address_id=mem.address_id").all()


@router.post("/api/new_members")
def new_register(member: InputMember, college: InputCollege, personnel: InputPerson, address: InputAddress,
                 db: Session = Depends(get_db)):
    #  For inserting address and checking if the entered address is already present

    id = db.execute(
        f"SELECT COUNT(address_id) FROM addressdetails WHERE postal_code='{address.postal_code}' AND city='{address.city}'").one()
    id1 = int(''.join(map(str, id)))
    if (id1 == 0):
        db.execute(
            f"INSERT INTO addressdetails(city,province,postal_code) VALUES('{address.city}','{address.province}','{address.postal_code}')")
        db.commit()
        id = db.execute(
            f"SELECT address_id FROM addressdetails WHERE postal_code='{address.postal_code}' AND city='{address.city}'").one()
        id1 = int(''.join(map(str, id)))
    else:
        id = db.execute(
            f"SELECT address_id FROM addressdetails WHERE postal_code='{address.postal_code}' AND city='{address.city}'").one()
        id1 = int(''.join(map(str, id)))

    #  For inserting and checking the person with the id is already registered as the  member

    cnt = db.execute(f"SELECT COUNT(prsn_id) FROM roledetails WHERE prsn_id='{personnel.prsn_id}'").one()
    count = int(''.join(map(str, cnt)))
    if (count == 0):
        db.execute(
            f"INSERT INTO roledetails(prsn_id,prsn_position,prsn_joined_date) VALUES('{personnel.prsn_id}','{personnel.prsn_position}','{datetime.datetime.now()}')")
        db.commit()
    else:
        raise HTTPException(status_code=404, detail=f"Person with id = '{personnel.prsn_id}' already exist")

    #    For inserting and checking the entered college is already present in database or not

    clz = db.execute(
        f"SELECT COUNT(clz_name) FROM membercollege WHERE clz_name='{college.clz_name}' AND clz_website='{college.clz_website}'").one()
    clz_id = int(''.join(map(str, clz)))
    if (clz_id == 0):
        db.execute(
            f"INSERT INTO membercollege(clz_name,clz_address,clz_website) VALUES ('{college.clz_name}','{college.clz_address}','{college.clz_website}')")
        db.commit()
        clz = db.execute(f"SELECT clz_id FROM membercollege WHERE clz_website='{college.clz_website}'").one()
        clz_id = int(''.join(map(str, clz)))
    else:
        clz = db.execute(f"SELECT clz_id FROM membercollege WHERE clz_website='{college.clz_website}'").one()
        clz_id = int(''.join(map(str, clz)))

    #    For inserting and checking the details of the person if they are already registered as members of SEDS-Nepal

    db.execute(
        f"INSERT INTO memberstable(firstname,lastname,middlename,email,major,phone_number,college_id,address_id,person_id) VALUES ('{member.firstname}','{member.lastname}','{member.middlename}','{member.email}','{member.major}','{member.phone_number}','{clz_id}','{id1}','{personnel.prsn_id}')")
    db.commit()


@router.put("/api/member/{id}")
def update_members(id: int, new_member_data: InputMember, db: Session = Depends(get_db)):
    member = db.query(model.Member).filter(model.Member.id == id).first()
    if member:
        member.firstname = new_member_data.firstname
        member.lastname = new_member_data.lastname
        member.middlename = new_member_data.middlename
        member.email = new_member_data.email
        member.major = new_member_data.email
        member.phone_number = new_member_data.phone_number
        db.commit()
        return member
    else:
        raise HTTPException(status_code=404, detail=f"No member with id={id}.")


# @router.put("/api/college/{id}")
# def update_college(id: int, new_college_data: InputCollege, db: Session = Depends(get_db)):
#     college = db.query(model.Member).filter(model.Member.id == id).first()
#     if college:
#         college.clz_name = new_college_data.clz_name
#         college.clz_address = new_college_data.clz_address
#         college.clz_website = new_college_data.clz_website
#         db.commit()
#         return college
#     else:
#         raise HTTPException(status_code=404, detail=f"No member with id={id}.")
#
#
# @router.put("/api/address/{id}")
# def update_address(id: int, new_address_data: InputAddress, db: Session = Depends(get_db)):
#     address = db.query(model.Member).filter(model.Member.id == id).first()
#     if address:
#         address.city = new_address_data.city
#         address.province = new_address_data.province
#         address.postal_code = new_address_data.postal_code
#         db.commit()
#         return address
#     else:
#         raise HTTPException(status_code=404, detail=f"No member with id={id}.")
