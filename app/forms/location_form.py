from logging.config import valid_ident
from wsgiref.validate import validator
from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length


class LocationForm(FlaskForm):
  organizer_id = IntegerField('organizer_id', validators=[DataRequired()])
  name = StringField('Name', validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  address = StringField('Address', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired(), Length(max=30)])
  state = StringField('State', validators=[DataRequired(), Length(max=15)])
  zip_code = Integer("Zip Code", validators=[DataRequired(), Length(max=5)])
