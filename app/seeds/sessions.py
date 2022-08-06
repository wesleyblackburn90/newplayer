from app.models import db, Session

def seed_sessions():
  session_one = Session(
    organizer_id='1',
    location_name='On the lake',
    address='In the middle',
    city='On a boat',
    state='With me',
    zip_code='12345',
    game='Bailey"s Shoe',
    description='We drink Bailey"s from a shoe cause I"m Old Greg',
    pic_url='https://yt3.ggpht.com/-iVtjZ_WXTUo/AAAAAAAAAAI/AAAAAAAAAAA/T5tW3ZoVGWQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    players_num='2'
    )
  session_two = Session(
    organizer_id='1',
    location_name='My Grandma"s house',
    address='123 Easy Street',
    city='Louisville',
    state='Kentucky',
    zip_code='24332',
    game='Yu-Gi-Oh',
    description='The best game for duel masters!',
    pic_url='https://static1.thegamerimages.com/wordpress/wp-content/uploads/2019/07/YuGiOh-cards.jpg',
    players_num='2'
    )
  session_three = Session(
    organizer_id='2',
    location_name='Borderlands',
    address='5355 Laurens Rd',
    city='Greenville',
    state='South Carolina',
    zip_code='29456',
    game='Magic the Gathering',
    description='A game of EDH',
    pic_url='https://img.redbull.com/images/c_crop,x_31,y_0,h_1120,w_1400/c_fill,w_1500,h_1000/q_auto,f_auto/redbullcom/2017/07/05/a9713c80-0f5a-475b-bcc6-5d8ea19f0f20/magic-the-gathering.jpg.jpg',
    players_num='4'
    )
  session_four = Session(
    organizer_id='3',
    location_name='Tangled Web',
    address='123 Main Street',
    city='Spartanburg',
    state='South Carolina',
    zip_code='29345',
    game='Werewolves of Miller"s Hollow',
    description='A bunch of us gotta lie to each other that we aren"t werewolves!',
    pic_url='http://images10.newegg.com/ProductImage/A02L_1_20110421_7f4ec90f-06ae-43fe-92cc-ba74f10a4838890386.jpg',
    players_num='12'
    )

  db.session.add(session_one)
  db.session.add(session_two)
  db.session.add(session_three)
  db.session.add(session_four)

  db.session.commit()

def undo_sessions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
