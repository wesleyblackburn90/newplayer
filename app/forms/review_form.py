from flask import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length

class ReviewForm(FlaskForm):
  reviewer_id = IntegerField('reviewer_id', validators=[DataRequired()])
  reviewee_id = IntegerField('reviewee_id', validators=[DataRequired()])
  rating = IntegerField('rating', validators=[DataRequired()])
  comment = StringField('comment', validators=[DataRequired("Please leave a provide a short comment"), Length(min=5, max=2000, message='Comment must be between 5 and 2000')])
