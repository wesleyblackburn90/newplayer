from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
  reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
  reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
  rating = IntegerField('rating', validators=[DataRequired()])
  comment = StringField('comment', validators=[DataRequired()])
