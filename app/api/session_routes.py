from distutils.command.upload import upload
from flask import Blueprint, request, session
from sqlalchemy import desc
from app.config import Config
from app.models import Session, db
from app.forms import SessionForm
from .auth_routes import validation_errors_to_error_messages
from app.AWS import upload_file_to_s3, allowed_file, get_unique_filename

session_routes = Blueprint('sessions', __name__)

@session_routes.route('')
def all_sessions():
  sessions = Session.query.all()

  return {'sessions': [session.to_dict() for session in sessions]}

@session_routes.route('/new', methods=["GET", "POST"])
def create_session():
  form = SessionForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if "pic_url" not in request.files:
    return {"errors": "image required"}, 400

  image = request.files["pic_url"]

  if not allowed_file(image.filename):
    return {"errors":"file type not permitted"}, 400

  image.filename = get_unique_filename(image.filename)

  upload = upload_file_to_s3(image)

  if "url" not in upload:
    return upload, 401

  if form.validate_on_submit():
    session = Session(
      organizer_id = form.data['organizer_id'],
      location_name=form.data['location_name'],
      address=form.data['address'],
      city=form.data['city'],
      state=form.data['state'],
      zip_code=form.data['zip_code'],
      date_time=form.data['date_time'],
      game=form.data['game'],
      description = form.data['description'],
      pic_url = upload["url"],
      players_num = form.data['players_num']
    )
    db.session.add(session)
    db.session.commit()
    return session.to_dict()
  return {validation_errors_to_error_messages(form.errors) }, 400

@session_routes.route('/<int:id>/edit', methods=['PUT'])
def edit_session(id):
  session = Session.query.get(id)
  form = SessionForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    organizer_id = form.data['organizer_id'],
    location_name = form.data['location_name'],
    address = form.data['address'],
    city = form.data['city'],
    state = form.data['state'],
    zip_code = form.data['zip_code'],
    date_time = form.data['date_time'],
    game = form.data['game'],
    description = form.data['description']
    pic_url = form.data['pic_url'],
    players_num = form.data['players_num']

    session.organizer_id = organizer_id
    session.location_name = location_name
    session.address = address
    session.city = city
    session.state = state
    session.zip_code = zip_code
    session.date_time = date_time
    session.game = game
    session.description = description
    session.pic_url = pic_url
    session.players_num =players_num

    db.session.commit()
    return session.to_dict()
  return {validation_errors_to_error_messages(form.errors) }, 400

@session_routes.route('/<int:id>', methods=['DELETE'])
def delete_session(id):
  session = Session.query.get(id)
  db.session.delete(session)
  db.session.commit()
  return session.to_dict()

@session_routes.route('/apikey', methods=['GET'])
def get_key():
  key = Config.REACT_APP_GOOGLE_MAPS_API
  return {"key": key}
