from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired



class AnswerForm(FlaskForm):
    answer = StringField('answer', validators=[DataRequired()])