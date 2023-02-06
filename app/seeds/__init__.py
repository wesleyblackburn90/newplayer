from flask.cli import AppGroup
from .users import seed_users, undo_users
from .reviews import seed_reviews, undo_reviews
from .sessions import seed_sessions, undo_sessions
from ..db import environment
# from .games import seed_games, undo_games

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        undo_users()
        undo_reviews()
        undo_sessions()
    seed_users()
    seed_reviews()
    seed_sessions()
    # seed_games()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_reviews()
    undo_sessions()
    # undo_games()
    # Add other undo functions here
