import datetime

from structure import Person, Member, Address, College, InputCollege, InputPerson, InputMember, InputAddress, Updatemember,Updateroledetails,Updatecollege,Updateaddress, Memberdetails
from fastapi import FastAPI, APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import model
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


@router.get("/api/members/")
def get_all_members(db: Session = Depends(get_db)) -> list:
    return db.execute(
        f"SELECT mem.id, mem.first_name,mem.middle_name,mem.last_name,mem.email,mem.education_level,mem.major,mem.number FROM memberinfo mem").all()


@router.get("/api/members/{id}")
def get_members_by_id(id: int, db: Session = Depends(get_db)):
    return db.execute(f"SELECT mem.id, mem.first_name,mem.middle_name,mem.last_name,mem.email,mem.education_level,mem.major,mem.number FROM memberinfo mem WHERE mem.id='{id}'").one()


@router.get("/api/colleges/")
def get_colleges(db: Session = Depends(get_db)):
    return db.execute(f"SELECT clz.college_name,clz.college_address,clz.college_website FROM collegeinfo clz").all()


@router.get("/api/roledetails/")
def get_role_details(db: Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.get("/api/address/")
def get_address(db: Session = Depends(get_db)):
    return db.execute(f"SELECT city,province,postal_code FROM addressinfo").all()


@router.get("/api/alldetails/")
def get_all_details(db: Session = Depends(get_db)):
    return db.execute(f"SELECT mem.id,mem.first_name,mem.middle_name,mem.last_name,mem.email,mem.major,mem.number,"
                      f"clz.college_name,clz.college_address,clz.college_website,prsn.personsid, prsn.position, "
                      f"prsn.prsn_joined_date,adrs.city,adrs.province,adrs.postal_code, "
                      f"scl.school_name,scl.school_address,scl.school_website,"
                      f"jb.title,jb.company_name,jb.company_address "
                      f"FROM memberinfo mem "
                      f"INNER JOIN collegeinfo clz ON clz.college_id=mem.college_id "
                      f"INNER JOIN roleinfo prsn ON prsn.personsid=mem.person_id "
                      f"INNER JOIN addressinfo adrs ON adrs.address_id=mem.address_id "
                      f"INNER JOIN schoolinfo scl ON scl.school_id=mem.school_id "
                      f"INNER JOIN jobinfo jb ON jb.job_id=mem.job_id").all()



@router.patch("/api/update/member/")
def update_member(id:int, member:Updatemember,college:Updatecollege,address:Updateaddress,role:Updateroledetails, db:Session=Depends(get_db)):
    update_member=db.get(model.Member,id)
    update_mem=member.dict(exclude_unset=True)
    for key,value in update_mem.items():
        if(value!="string"):
            if(value!=""):
                setattr(update_member,key,value)
    db.add(update_member)
    db.commit()
    db.refresh(update_member)

    # For updating college

    clz_id = update_member.college_id
    update_college = db.get(model.College, clz_id)
    if (college.clz_website=="string" or college.clz_website==""):
            update_clz=college.dict(exclude_unset=True)
            for key,value in update_clz.items():
                if(value!="string"):
                    if(value!=""):
                        setattr(update_college,key,value)
    else:
        clz = db.execute(
            f"SELECT COUNT(clz_name) FROM membercollege WHERE clz_website='{college.clz_website}'").one()
        clz_count = int(''.join(map(str, clz)))
        if(clz_count==0):
            update_clz = college.dict(exclude_unset=True)
            for key, value in update_clz.items():
                if (value != "string"):
                    if (value != ""):
                        setattr(update_college, key, value)
        # else:

    db.add(update_college)
    db.commit()
    db.refresh(update_college)



@router.post("/api/members/")
def add_new_members(member:Memberdetails,db:Session=Depends(get_db)):
    # For inserting the address in addressinfo
    id = db.execute(
        f"SELECT COUNT(address_id) FROM addressinfo WHERE postal_code='{member.postal_code}' AND city='{member.city}'").one()
    addressId = int(''.join(map(str, id)))
    if (addressId == 0):
        db.execute(
            f"INSERT INTO addressinfo(city,province,postal_code) VALUES('{member.city}','{member.province}','{member.postal_code}')")
        db.commit()
        id = db.execute(
            f"SELECT address_id FROM addressinfo WHERE postal_code='{member.postal_code}' AND city='{member.city}'").one()
        addressId = int(''.join(map(str, id)))
    else:
        id = db.execute(
            f"SELECT address_id FROM addressinfo WHERE postal_code='{member.postal_code}' AND city='{member.city}'").one()
        addressId = int(''.join(map(str, id)))


        #  For inserting and checking the person with the id is already registered as the  member in roleinfo

    cnt = db.execute(f"SELECT COUNT(personsid) FROM roleinfo WHERE personsid='{member.personsid}'").one()
    count = int(''.join(map(str, cnt)))
    if (count == 0):
        db.execute(
            f"INSERT INTO roleinfo(personsid,position,prsn_joined_date) VALUES('{member.personsid}','{member.position}','{datetime.datetime.now()}')")
        db.commit()
    else:
        raise HTTPException(status_code=404, detail=f"Person with id = '{member.personsid}' already exist")

        #    For inserting and checking the entered college is already present in database or not in collegeinfo

    clz = db.execute(
        f"SELECT COUNT(college_name) FROM collegeinfo WHERE college_name='{member.college_name}' AND college_website='{member.college_website}'").one()
    clz_id = int(''.join(map(str, clz)))
    if (clz_id == 0):
            db.execute(
                f"INSERT INTO collegeinfo(college_name,college_address,college_website) VALUES ('{member.college_name}','{member.college_address}','{member.college_website}')")
            db.commit()
            clz = db.execute(f"SELECT college_id FROM collegeinfo WHERE college_website='{member.college_website}' AND college_name='{member.college_name}'").one()
            clz_id = int(''.join(map(str, clz)))
    else:
            clz = db.execute(f"SELECT college_id FROM collegeinfo WHERE college_website='{member.college_website}'").one()
            clz_id = int(''.join(map(str, clz)))


    # For inserting and checking if the school is previously registered or not in schoolinfo
    scl = db.execute(
        f"SELECT COUNT(school_name) FROM schoolinfo WHERE school_name='{member.school_name}' AND school_website='{member.school_website}'").one()
    schoolId = int(''.join(map(str, scl)))
    if (schoolId == 0):
        db.execute(
            f"INSERT INTO schoolinfo(school_name,school_address,school_website) VALUES ('{member.school_name}','{member.school_address}','{member.school_website}')")
        db.commit()
        scl = db.execute(
            f"SELECT school_id FROM schoolinfo WHERE school_website='{member.school_website}' AND school_name='{member.school_name}'").one()
        schoolId = int(''.join(map(str, scl)))
    else:
        clz = db.execute(f"SELECT school_id FROM schoolinfo WHERE school_website='{member.school_website}'").one()
        schoolId= int(''.join(map(str, clz)))


    # For inserting the current job of the persons if they are working

    job= db.execute(
        f"INSERT INTO jobinfo(title,company_name,company_address) VALUES('{member.title}','{member.company_name}','{member.company_address}')"
    )
    db.commit()
    job= db.execute(f"SELECT job_id FROM jobinfo ORDER BY job_id DESC LIMIT 1").one()
    jobId=int(''.join(map(str,job)))

    # For inserting the member information into membersinfo

    db.execute(
        f"INSERT INTO memberinfo(first_name,middle_name,last_name,email,education_level,major,number,person_id,college_id,school_id,job_id,address_id) VALUES ('{member.first_name}','{member.middle_name}','{member.last_name}','{member.email}','{member.education_level}','{member.major}','{member.number}','{member.personsid}','{clz_id}','{schoolId}','{jobId}','{addressId}')"
    )
    db.commit()