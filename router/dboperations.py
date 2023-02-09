import datetime

from structure import Person, Member, Address, College, InputCollege, InputPerson, InputMember, InputAddress, \
    Updatemember, Updateroledetails, Updatecollege, Updateaddress, Memberdetails, Chapterdetails
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
    return db.query(model.Member.id,model.Member.first_name,model.Member.middle_name,model.Member.last_name,model.Member.email,model.Member.number,model.Member.major,model.Member.education_level).all()


@router.get("/api/members/{id}")
def get_members_by_id(id: int, db: Session = Depends(get_db)):
    try:
        return db.query(model.Member.id,model.Member.first_name,model.Member.middle_name,model.Member.last_name,model.Member.email,model.Member.number,model.Member.major,model.Member.education_level).filter(model.Member.id==f"{id}").one()
    except:
        raise HTTPException(status_code=404,detail=f"No member with id = {id} found")

@router.get("/api/colleges/")
def get_colleges(db: Session = Depends(get_db)):
    return db.query(model.College.college_name,model.College.college_website,model.College.college_address).all()


@router.get("/api/roledetails/")
def get_role_details(db: Session = Depends(get_db)):
    return db.query(model.Person).all()


@router.get("/api/address/")
def get_address(db: Session = Depends(get_db)):
    return db.query(model.Address.city,model.Address.province,model.Address.postal_code).all()


@router.get("/api/alldetails/")
def get_all_details(db: Session = Depends(get_db)):
    return db.query(model.Member.id, model.Member.first_name, model.Member.middle_name, model.Member.last_name,
                    model.Member.email, model.Member.major, model.Member.number, model.Member.education_level,
                    model.College.college_name,model.College.college_address,model.College.college_website,
                    model.Person.personsid,model.Person.position,model.Person.prsn_joined_date,
                    model.School.school_name,model.School.school_address,model.School.school_website,
                    model.Job.title,model.Job.company_name,model.Job.company_address).filter(model.Member.college_id==model.College.college_id).filter(model.Member.person_id==model.Person.personsid).filter(
                    model.Member.school_id==model.School.school_id).filter(model.Member.job_id==model.Job.job_id).all()



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
    if (college.college_name=="string" or college.college_website==""):
            update_clz=college.dict(exclude_unset=True)
            for key,value in update_clz.items():
                if(value!="string"):
                    if(value!=""):
                        setattr(update_college,key,value)
    else:
        clz = db.execute(
            f"SELECT COUNT(college_name) FROM collegeinfo WHERE college_website='{college.college_website}'").one()
        clz_count = int(''.join(map(str, clz)))
        if(clz_count==0):
            update_clz = college.dict(exclude_unset=True)
            for key, value in update_clz.items():
                if (value != "string"):
                    if (value != ""):
                        setattr(update_college, key, value)
    db.add(update_college)
    db.commit()
    db.refresh(update_college)



@router.post("/api/members/")
def add_new_members(member:Memberdetails,db:Session=Depends(get_db)):
    # For inserting the address in addressinfo
    addressId=db.query(model.Address.address_id).filter(model.Address.postal_code==member.postal_code).filter(model.Address.city==member.city).count()
    if (addressId == 0):
        address=model.Address()
        address.city=member.city
        address.postal_code=member.postal_code
        address.province=member.province
        db.add(address)
        db.commit()
        db.refresh(address)
        addressId = db.query(model.Address.address_id).filter(model.Address.postal_code == member.postal_code).filter(
            model.Address.city == member.city).one()
    else:
        addressId = db.query(model.Address.address_id).filter(model.Address.postal_code==member.postal_code).filter(model.Address.city==member.city).one()

        #  For inserting and checking the person with the id is already registered as the  member in roleinfo

    cnt = db.execute(f"SELECT COUNT(personsid) FROM roleinfo WHERE personsid='{member.personsid}'").one()
    unqprsnid=db.query(model.Person.personsid).filter(model.Person.personsid==member.personsid).count()
    if (unqprsnid == 0):
        person=model.Person()
        person.personsid=member.personsid
        person.position=member.position
        person.prsn_joined_date=datetime.datetime.now()
        db.add(person)
        db.commit()
        db.refresh(person)
    else:
        raise HTTPException(status_code=404, detail=f"Person with id = '{member.personsid}' already exist")

    #     #    For inserting and checking the entered college is already present in database or not in collegeinfo
    #
    # clz = db.execute(
    #         f"SELECT COUNT(college_name) FROM collegeinfo WHERE college_name='{member.college_name}' AND college_website='{member.college_website}'").one()
    # clz_id = int(''.join(map(str, clz)))
    # if (clz_id == 0):
    #             db.execute(
    #                 f"INSERT INTO collegeinfo(college_name,college_address,college_website) VALUES ('{member.college_name}','{member.college_address}','{member.college_website}')")
    #             db.commit()
    #             clz = db.execute(f"SELECT college_id FROM collegeinfo WHERE college_website='{member.college_website}' AND college_name='{member.college_name}'").one()
    #             clz_id = int(''.join(map(str, clz)))
    # else:
    #             clz = db.execute(f"SELECT college_id FROM collegeinfo WHERE college_website='{member.college_website}'").one()
    #             clz_id = int(''.join(map(str, clz)))
    #
    #
    # # For inserting and checking if the school is previously registered or not in schoolinfo
    #
    # scl = db.execute(
    #         f"SELECT COUNT(school_name) FROM schoolinfo WHERE school_name='{member.school_name}' AND school_website='{member.school_website}'").one()
    # schoolId = int(''.join(map(str, scl)))
    # if (schoolId == 0):
    #         db.execute(
    #             f"INSERT INTO schoolinfo(school_name,school_address,school_website) VALUES ('{member.school_name}','{member.school_address}','{member.school_website}')")
    #         db.commit()
    #         scl = db.execute(
    #             f"SELECT school_id FROM schoolinfo WHERE school_website='{member.school_website}' AND school_name='{member.school_name}'").one()
    #         schoolId = int(''.join(map(str, scl)))
    # else:
    #         clz = db.execute(f"SELECT school_id FROM schoolinfo WHERE school_website='{member.school_website}'").one()
    #         schoolId= int(''.join(map(str, clz)))
    #
    #
    # # For inserting the current job of the persons if they are working
    #
    # job= db.execute(
    #         f"INSERT INTO jobinfo(title,company_name,company_address) VALUES('{member.title}','{member.company_name}','{member.company_address}')"
    #     )
    # db.commit()
    # job= db.execute(f"SELECT job_id FROM jobinfo ORDER BY job_id DESC LIMIT 1").one()
    # jobId=int(''.join(map(str,job)))
    #
    # # For inserting the member information into membersinfo
    #
    # db.execute(
    #     f"INSERT INTO memberinfo(first_name,middle_name,last_name,email,education_level,major,number,person_id,college_id,school_id,job_id,address_id) VALUES ('{member.first_name}','{member.middle_name}','{member.last_name}','{member.email}','{member.education_level}','{member.major}','{member.number}','{member.personsid}','{clz_id}','{schoolId}','{jobId}','{addressId}')"
    # )
    # db.commit()




@router.get("/api/chapters/")
def get_all_chapters(db: Session = Depends(get_db)) -> list:
    return db.execute(
        f"SELECT chapter.id, chapter.chapter_name, chapter.chapter_location, chapter.chapter_head,"
        f"chapter.chapter_members,chapter.email,chapter.college_name,chapter.college_address,chapter.college_website ,chapter.college_estd "
        f"FROM chapterinfo chapter").all()


@router.get("/api/chapters/{id}")
def get_chapters_by_id(id: int, db: Session = Depends(get_db)):
    return db.execute(f"SELECT chapter.id, chapter.chapter_name, chapter.chapter_location, chapter.chapter_head,"
                      f"chapter.chapter_members,chapter.email,chapter.college_name,chapter.college_address,chapter.college_website, chapter.college_estd"
                      f"FROM chapterinfo chapter WHERE chapter.id='{id}'").one()


@router.post("/api/chapters/")
def add_new_chapters(chapter: Chapterdetails, db: Session = Depends(get_db)):

    #    For inserting and checking the entered college is already present in database or not in collegeinfo

    college = db.execute(
        f"SELECT COUNT(college_name) FROM collegeinfo WHERE college_name='{chapter.college_name}' AND college_website='{chapter.college_website}'").one()
    college_id = int(''.join(map(str, college)))
    if (college_id == 0):
        db.execute(
            f"INSERT INTO collegeinfo(college_name,college_address,college_website) VALUES ('{chapter.college_name}','{chapter.college_address}','{chapter.college_website}')")
        db.commit()
        college = db.execute(
            f"SELECT college_id FROM collegeinfo WHERE college_website='{chapter.college_website}' AND college_name='{chapter.college_name}'").one()
        college_id = int(''.join(map(str, college)))
    else:
        college = db.execute(f"SELECT college_id FROM collegeinfo WHERE college_website='{chapter.college_website}'").one()
        college_id = int(''.join(map(str, college)))

    # For inserting the chapter information into chaptersinfo

    db.execute(
        f"INSERT INTO chapterinfo( chapter_name, chapter_location, chapter_head,chapter_members,email, college_id, college_estd )  VALUES ('{chapter.chapter_name}','{chapter.chapter_location}','{chapter.chapter_head}','{chapter.chapter_members}','{chapter.email}','{college_id}','{chapter.college_estd}')"
    )
    db.commit()