from app.models import db, AnswerComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_answer_comments():
    demo = AnswerComment(
        comment='This is a great answer!', user_id=2, answer_id=1
    )
    demo2 = AnswerComment(
        comment='This answer works', user_id=3, answer_id=2
    )
    demo3 = AnswerComment(
        comment='Your answer is wrong', user_id=1, answer_id=3
    )
    
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


def undo_answer_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answer_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM answer_comments"))
        
    db.session.commit()