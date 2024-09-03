from .db import db, environment, SCHEMA

question_following = db.Table(
    "question_following",
    db.Model.metadata,
    db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False),
    db.Column(db.Integer, db.ForeignKey("question.id"), nullable=False)
)

if environment == "production":
    question_following.schema = SCHEMA
