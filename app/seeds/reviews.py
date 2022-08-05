from app.models import db, Review

def seed_reviews():
  one = Review(
    reviewer_id='1',
    reviewee_id='2',
    rating='2',
    review="Very mediocre"
  )
  two = Review(
    reviewer_id='2',
    reviewee_id='3',
    rating='5',
    review="Awesome!"
  )
  three = Review(
    reviewer_id='3',
    reviewee_id='1',
    rating='1',
    review="The worst"
  )

  db.session.add(one)
  db.session.add(two)
  db.session.add(three)

  db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
