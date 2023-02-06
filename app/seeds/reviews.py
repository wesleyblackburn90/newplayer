from app.models import db, Review, environment, SCHEMA

def seed_reviews():
  one = Review(
    reviewer_id='1',
    reviewee_id='2',
    rating='2',
    comment="Very mediocre"
  )
  two = Review(
    reviewer_id='2',
    reviewee_id='3',
    rating='5',
    comment="Awesome!"
  )
  three = Review(
    reviewer_id='3',
    reviewee_id='1',
    rating='1',
    comment="The worst"
  )

  db.session.add(one)
  db.session.add(two)
  db.session.add(three)

  db.session.commit()

def undo_reviews():
    if environment == "production":
      db.session.execute(f'TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;')
    else:
      db.session.execute("DELETE FROM reviews")

    db.session.commit()
