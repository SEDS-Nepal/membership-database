from sqlalchemy import Integer, String, Column, ForeignKey, DateTime
from ..dbconnection import base


class Member(base):
    __tablename__ = 'memberinfo'

    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String)
    middle_name = Column(String)
    last_name = Column(String)
    email = Column(String, unique=True)
    education_level = Column(String)
    major = Column(String)
    number = Column(String)
    person_id = Column(String, ForeignKey("roleinfo.personsid"))
    college_id = Column(Integer, ForeignKey("collegeinfo.college_id"))
    school_id = Column(Integer, ForeignKey("schoolinfo.school_id"))
    job_id = Column(Integer, ForeignKey("jobinfo.job_id"))
    address_id = Column(Integer, ForeignKey("addressinfo.address_id"))


class College(base):
    __tablename__ = 'collegeinfo'

    college_id = Column(Integer, primary_key=True, autoincrement=True)
    college_name = Column(String, unique=True)
    college_address = Column(String)
    college_website = Column(String)


class Person(base):
    __tablename__ = 'roleinfo'

    personsid = Column(String, primary_key=True)
    position = Column(String)
    prsn_joined_date = Column(DateTime)


class Address(base):
    __tablename__ = 'addressinfo'

    address_id = Column(Integer, primary_key=True, autoincrement=True)
    city = Column(String)
    province = Column(String)
    postal_code = Column(String)


class School(base):
    __tablename__ = 'schoolinfo'

    school_id = Column(Integer, autoincrement=True, primary_key=True)
    school_name = Column(String)
    school_address = Column(String)
    school_website = Column(String)


class Job(base):
    __tablename__ = 'jobinfo'

    job_id = Column(Integer, autoincrement=True, primary_key=True)
    title = Column(String)
    company_name = Column(String)
    company_address = Column(String)
