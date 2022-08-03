from flask_wtf import FlaskForm
from sqlalchemy import Integer
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class PlayerForm(FlaskForm):
  location_id = IntegerField('location_id', validators=[DataRequired()])
  game_id = IntegerField('game_id', validators=[DataRequired()])
  description = StringField('Description', validators=[DataRequired()])
  pic_url = StringField('pic_url')
  players_num = IntegerField('players_num', validators=[DataRequired()])
