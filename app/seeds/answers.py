from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answers():
    demo = Answer(
        answer='This is the answer to your problems', user_id=1, question_id=1
    )
    demo2 = Answer(
        answer='This is another answer', user_id=1, question_id=2
    )
    demo3 = Answer(
        answer='This is a wrong answer', user_id=2, question_id=3
    )
    
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answers"))
        
    db.session.commit()