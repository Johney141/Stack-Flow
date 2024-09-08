from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Question, Answer, User


class QuestionForm(FlaskForm):
    question = StringField('question', validators=[DataRequired()])
    subject = StringField('subject', validators=[DataRequired()])
