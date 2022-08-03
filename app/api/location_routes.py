from app.forms.location_form import LocationForm
from flask import Blueprint, request
from app.models import Location, db
from .auth_routes import validation_errors_to_error_messages

location_routes = Blueprint('locations', __name__)

@location_routes.route('')
def locations():
  locations = Location.query.all()
  return {'locations': [location.to_dict() for location in locations]}

@location_routes.route('/new', methods=["POST"])
def new_location():
  form = LocationForm()
  form['crsf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    location = Location(
      organizer_id=form.data['organizer_id'],
      name=form.data['name'],
      description=form.data['description'],
      address=form.data['address'],
      city=form.data['city'],
      state=form.data['state'],
      zip_code=form.data['zip_code']
    )
    db.session.add(location)
    db.session.commit()
    return location.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
