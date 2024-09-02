from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

Base = declarative_base()



class Owner(Base):
    __tablename__ = 'questions'

    id = Column(Integer, primary_key=True)
    question = Column(String(5000))
    subject = Column(String(250))
    user_id = Column(Integer)


# CREATE TABLE ponies (
#   id SERIAL PRIMARY KEY,
#   name VARCHAR(255) NOT NULL,
#   birth_year INTEGER NOT NULL,
#   breed VARCHAR(255),
#   owner_id INTEGER NOT NULL,
#   FOREIGN KEY (owner_id) REFERENCES owners(id)
# );
class Pony(Base):
    __tablename__ = 'ponies'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))
