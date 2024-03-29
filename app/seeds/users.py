from app.models import db, User, SCHEMA, environment


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='DemoLition',
        first_name='Demo',
        last_name='Lition',
        email='demo@aa.io',
        password='password')
    marnie = User(
        username='marnie',
        first_name='Marnie',
        last_name='Mumford',
        email='marnie@aa.io',
        password='password')
    bobbie = User(
        username='bobbie',
        first_name='Bobbie',
        last_name='Boucher',
        email='bobbie@aa.io',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
      db.session.execute(f'TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;')
    else:
      db.session.execute("DELETE FROM users")
    db.session.commit()
