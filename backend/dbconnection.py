from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import settings


engine = create_engine(settings.db_url)
sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
base = declarative_base()
