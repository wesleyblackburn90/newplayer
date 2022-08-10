from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange

class SessionForm(FlaskForm):
  organizer_id = IntegerField('organizer_id', validators=[DataRequired()])
  location_name = StringField('Location Name', validators=[DataRequired(), Length(min=3, max=50, message='Must be between 3 and 50 characters')])
  description = TextAreaField('Description', validators=[DataRequired(), Length(max=2000, message="Please leave a shorter description")])
  address = StringField('Address', validators=[DataRequired(), Length(min=3, max=75, message='Address must be longer than 3 characters and less than 75')])
  city = StringField('City', validators=[DataRequired(), Length(min=1, max=30, message='City name must be less than 30 characters')])
  state = StringField('State', validators=[DataRequired(), Length(min=4, max=14)])
  zip_code = IntegerField("Zip Code", validators=[DataRequired(), NumberRange(min=9999, max=100000, message="Please enter your 5 digit zip code")])
  game = StringField('Game', validators=[DataRequired(), Length(min=2, max=100, message='Game name must be between 2 and 50 characters  ')])
  pic_url = StringField('pic_url')
  players_num = IntegerField('players_num', validators=[DataRequired(), NumberRange(min=2, max=2000, message="Please enter a valid number")])
