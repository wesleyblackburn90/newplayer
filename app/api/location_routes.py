from app.forms.location_form import LocationForm
from flask import Blueprint, request
from app.models import Location
from .auth_routes import validation_errors_to_error_messages

location_routes = Blueprint('locations', __name__)

@location_routes.route('')
def locations():
  locations = Location.query.all()
  return {'locations': [location.to_dict() for location in locations]}
