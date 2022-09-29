from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import Player, db
from app.forms import PlayerForm

player_routes = Blueprint('players', __name__)

@player_routes.route('')
def all_players():
  players = Player.query.all()
  return {'players': [player.to_dict() for player in players]}

@player_routes.route('/new', methods=["POST"])
def add_player():
  form = PlayerForm()

  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    player = Player(
      session_id=form.data['session_id'],
      user_id=form.data['user_id']
    )
    db.session.add(player)
    db.session.commit()
    return player.to_dict()
  return {validation_errors_to_error_messages(form.errors)}, 401
