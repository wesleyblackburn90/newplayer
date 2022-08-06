from sqlalchemy import ForeignKey, PrimaryKeyConstraint
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    # relationships
    session = db.relationship('Session', back_populates='organizer')
    player = db.relationship('Player', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'hashed_password': self.hashed_password,
            'created_at': self.created_at
        }

# class Game(db.Model):
#     __tablename__ = 'games'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(200), nullable=False)
#     description = db.Column(db.String(2000))

#     #relationship
#     session = db.relationship('Session', back_populates='game')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'description': self.description
#         }

# class Location(db.Model):
#     __tablename__ = 'locations'

#     id = db.Column(db.Integer, primary_key=True)
#     organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
#     name = db.Column(db.String, nullable=False)
#     description = db.Column(db.String, nullable=False)
#     address = db.Column(db.String, nullable=False)
#     city = db.Column(db.String, nullable=False)
#     state = db.Column(db.String, nullable=False)
#     zip_code = db.Column(db.Integer, nullable=False)

#     #relationship
    # organizer = db.relationship('User', back_populates='location')
#     session = db.relationship('Session', back_populates='location')

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'organizer': self.organizer,
#             'name': self.name,
#             'description': self.description,
#             'address': self.address,
#             'city': self.city,
#             'state': self.state,
#             'zip_code': self.zip_code
#         }

class Session(db.Model):
    __tablename__ = 'sessions'

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    location_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    zip_code = db.Column(db.Integer, nullable=False)
    game = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    pic_url = db.Column(db.String)
    players_num = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    #relationships
    # game = db.relationship('Game', back_populates='session')
    organizer = db.relationship('User', back_populates='session')
    player = db.relationship('Player', back_populates='session')
    # location = db.relationship('Location', back_populates='session')

    def to_dict(self):
        return {
            'id': self.id,
            'organizer_id': self.organizer_id,
            'location_name': self.location_name,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'game': self.game,
            'description': self.description,
            'pic_url': self.pic_url,
            'players_num': self.players_num,
            'created_at': self.created_at
        }

class Player(db.Model):
    __tablename__ = 'players'

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    #relationships
    session = db.relationship('Session', back_populates='player')
    user = db.relationship('User', back_populates='player')

    def to_dict(self):
        return {
            'id': self.id,
            'session_id' : self.session_id,
            'user_id': self.user_id
        }



class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    reviewee_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String)

    reviewer = db.relationship('User', foreign_keys=[reviewer_id])
    reviewee = db.relationship('User', foreign_keys=[reviewee_id])

    def to_dict(self):
        return {
            'id': self.id,
            'reviewer_id': self.reviewer_id,
            'reviewee_id': self.reviewee_id,
            'rating': self.rating,
            'comment': self.comment
        }
