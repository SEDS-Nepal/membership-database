from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


dbbase_url="postgresql://postgres:s8r2j123@localhost/sedsnepalmembers.db"

engine= create_engine(dbbase_url)
sessionlocal= sessionmaker(autocommit=False,autoflush=False,bind=engine)
base= declarative_base()

