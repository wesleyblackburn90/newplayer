from logging.config import valid_ident
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class LocationForm(FlaskForm):
  organizer_id = IntegerField('organizer_id', validators=[DataRequired()])
  name = StringField('Name', validators=[DataRequired(), Length(min=2, max=30, message='Must be between 2 and 30')])
  description = TextAreaField('Description', validators=[DataRequired(), Length(min=5, max=2000, message='Description must be between 5 and 2000')])
  address = StringField('Address', validators=[DataRequired(), Length(min=5, message='Must be at least 5 letters long')])
  city = StringField('City', validators=[DataRequired(), Length(max=30)])
  state = StringField('State', validators=[DataRequired(), Length(max=15)])
  zip_code = IntegerField("Zip Code", validators=[DataRequired(), Length(max=5)])
