from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import settings


#dbbase_url="postgresql://postgres:s8r2j123@localhost/sedsnepalmembers.db"
#engine = create_engine(dbbase_url)

engine = create_engine(settings.db_url)
sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
base = declarative_base()
