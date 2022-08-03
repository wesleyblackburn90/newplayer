from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class PlayerForm(FlaskForm):
  session_id = IntegerField('session_id', validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])
