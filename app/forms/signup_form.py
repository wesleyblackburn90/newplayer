from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Please make a username"), Length(min=4, max=18, message="Username must be between 4 and 18 characters long"), username_exists])
    first_name = StringField('first_name', validators=[DataRequired("Please give your first name"), Length(min=2, max=15, message="First name must be between 2 and 15 characters long")])
    last_name = StringField('last_name', validators=[DataRequired("Please give your last name"), Length(min=4, max=25, message="Last Name must be between 4 and 25 characters long")])
    email = StringField('email', validators=[DataRequired("Please provide an email address"), Email(),user_exists])
    password = StringField('password', validators=[DataRequired()])
