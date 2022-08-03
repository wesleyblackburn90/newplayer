from app.forms.game_form import GameForm
from flask import Blueprint, request
from app.models import Game, db
from .auth_routes import validation_errors_to_error_messages

game_routes = Blueprint('games', __name__)

@game_routes.route('')
def games():
  games = Game.query.all()
  return {'games': [game.to_dict() for game in games]}

@game_routes.route('/new', methods=['POST'])
def new_game():
  form = GameForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    game = Game(
      name=form.data['name'],
      description=form.data['description']
    )
    db.session.add(game)
    db.session.commit()
    return game.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401
