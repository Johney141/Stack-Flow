from .db import db, environment, SCHEMA, add_prefix_for_prod



class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(5000), nullable=False)
    subject = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)


    user = db.relationship('User', back_populates='questions')
    answers = db.relationship('Answer', back_populates='question', cascade="all, delete-orphan")
    # Uncomment When Quesion Comments is added
    question_comments = db.relationship('QuestionComment', back_populates='question', cascade="all, delete-orphan")
    question_following = db.relationship('QuestionFollowing', back_populates='question', cascade="all, delete-orphan")
    question_tags = db.relationship('QuestionTag', back_populates='question', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'question': self.question,
            'subject': self.subject,
            'user_id': self.user_id
        }
