from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class SessionForm(FlaskForm):
  location_name = StringField('Location Name', validators=[DataRequired()])
  description = TextAreaField('Description', validators=[DataRequired()])
  address = StringField('Address', validators=[DataRequired()])
  city = StringField('City', validators=[DataRequired(), Length(max=30)])
  state = StringField('State', validators=[DataRequired(), Length(max=15)])
  zip_code = IntegerField("Zip Code", validators=[DataRequired(), Length(max=5)])
  game = StringField('Game', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  pic_url = StringField('pic_url')
  players_num = IntegerField('players_num', validators=[DataRequired()])
