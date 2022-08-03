from flask import Blueprint, request, session
from sqlalchemy import desc
from app.models import Session, db
from app.forms import SessionForm
from .auth_routes import validation_errors_to_error_messages

session_routes = Blueprint('sessions', __name__)

@session_routes.route('')
def all_sessions():
  sessions = Session.query.all()

  return {'sessions': [session.to_dict() for session in sessions]}

@session_routes.route('/new', methods=["GET", "POST"])
def create_session():
  form = SessionForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    session = Session(
      location_id = form.data['location_id'],
      game_id = form.data['game_id'],
      description = form.data['description'],
      pic_url = form.data['pic_url'],
      players_num = form.data['players_num']
    )
    db.session.add(session)
    db.session.commit()
    return session.to_dict()

  return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400

@session_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_session(id):
  session = Session.query.get(id)
  form = SessionForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    location_id = form.data['location_id'],
    game_id = form.data['game_id'],
    description = form.data['description'],
    pic_url = form.data['pic_url'],
    players_num = form.data['players_num']

    session.location_id = location_id
    session.game_id =game_id
    session.description = description
    session.pic_url = pic_url
    session.players_num =players_num

    db.session.commit()
    return session.to_dict()
  return { 'errors' : validation_errors_to_error_messages(form.errors) }, 400

@session_routes.route('/<int:id>', methods=['DELETE'])
def delete_session(id):
  session = Session.query.get(id)
  db.session.delete(session)
  db.session.commit()
  return session.to_dict()
