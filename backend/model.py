import datetime

from sqlalchemy import Integer,String,Column,ForeignKey,DateTime
from dbconnection import base
from sqlalchemy.orm import relationship


class Member(base):
    __tablename__='memberstable'

    id= Column(Integer,primary_key=True,autoincrement=True)
    firstname=Column(String)
    middlename = Column(String)
    lastname=Column(String)
    email=Column(String, unique=True)
    major=Column(String)
    phone_number=Column(Integer)
    person_id=Column(Integer,ForeignKey("roledetails.prsn_id"))
    college_id=Column(Integer,ForeignKey("membercollege.clz_id"))
    address_id=Column(Integer,ForeignKey("addressdetails.address_id"))

class College(base):
    __tablename__='membercollege'

    clz_id=Column(Integer, primary_key=True,autoincrement=True)
    clz_name=Column(String, unique=True)
    clz_address=Column(String)
    clz_website=Column(String)

class Person(base):
    __tablename__='roledetails'

    prsn_id=Column(Integer,primary_key=True)
    prsn_position=Column(String)
    prsn_joined_date = Column(DateTime)

class Address(base):
    __tablename__='addressdetails'

    address_id=Column(Integer,primary_key=True,autoincrement=True)
    city=Column(String)
    province=Column(String)
    postal_code=Column(Integer)

