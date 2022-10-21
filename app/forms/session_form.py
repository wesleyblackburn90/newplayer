from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import IntegerField, StringField, TextAreaField, DateTimeField
from wtforms.validators import DataRequired, Length, NumberRange

class SessionForm(FlaskForm):
  organizer_id = IntegerField('organizer_id', validators=[DataRequired()])
  location_name = StringField('Location Name', validators=[DataRequired("Must provide a location"), Length(min=3, max=50, message='Location name must be between 3 and 50 characters')])
  description = TextAreaField('Description', validators=[DataRequired("Please provide a brief description"), Length(max=2000, message="Please leave a shorter description")])
  address = StringField('Address', validators=[DataRequired("Please provide an address"), Length(min=3, max=75, message='Address must be longer than 3 characters and less than 75')])
  city = StringField('City', validators=[DataRequired("Please provide a city"), Length(min=3, max=30, message='City name must be between 3 and 30 characters')])
  state = StringField('State', validators=[DataRequired("Please provide a state"), Length(min=4, max=14)])
  zip_code = IntegerField("Zip Code", validators=[DataRequired("Please provide a zip code"), NumberRange(min=9999, max=100000, message="Please enter your 5 digit zip code")])
  date_time = DateTimeField("Date Time", format="%Y-%m-%d %H:%M:%S")
  game = StringField('Game', validators=[DataRequired("Please provide a game"), Length(min=2, max=100, message='Game name must be between 2 and 50 characters')])
  pic_url = StringField('pic_url')
  players_num = IntegerField('players_num', validators=[DataRequired("Please choose how many players you need"), NumberRange(min=2, max=200, message="Please choose number of players needed between 2 and 200")])
