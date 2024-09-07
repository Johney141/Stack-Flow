from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError

def my_tag_check(form, field):
  if len(field.data) > 20:
    raise ValidationError('Tag name must be less than 20 characters')
  elif " " in field.data:
    raise ValidationError('Tag name must not have space')

class TagForm(FlaskForm):
  tagName = StringField('tagName', validators=[DataRequired(), my_tag_check])
