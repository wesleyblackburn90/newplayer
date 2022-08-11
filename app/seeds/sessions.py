from app.models import db, Session

def seed_sessions():
  session_one = Session(
    organizer_id='1',
    location_name='On the lake',
    address='In the middle',
    city='On a boat',
    state='Wisconsin',
    zip_code='12345',
    game="Bailey's Shoe",
    description="We drink Bailey's from a shoe cause I'm Old Greg",
    pic_url='https://yt3.ggpht.com/-iVtjZ_WXTUo/AAAAAAAAAAI/AAAAAAAAAAA/T5tW3ZoVGWQ/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    players_num='2'
    )
  session_two = Session(
    organizer_id='1',
    location_name="Tangled Web",
    address='414 W Blackstock Rd',
    city='Spartanburg',
    state='South Carolina',
    zip_code='29301',
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
    description='A game of EDH. We are getting together at 12pm this Saturday',
    pic_url='https://img.redbull.com/images/c_crop,x_31,y_0,h_1120,w_1400/c_fill,w_1500,h_1000/q_auto,f_auto/redbullcom/2017/07/05/a9713c80-0f5a-475b-bcc6-5d8ea19f0f20/magic-the-gathering.jpg.jpg',
    players_num='4'
    )
  session_four = Session(
    organizer_id='3',
    location_name='Tangled Web',
    address='414 W Blackstock Rd',
    city='Spartanburg',
    state='South Carolina',
    zip_code='29301',
    game='Werewolves of Miller"s Hollow',
    description="A bunch of us gotta lie to each other that we aren't werewolves!",
    pic_url='http://images10.newegg.com/ProductImage/A02L_1_20110421_7f4ec90f-06ae-43fe-92cc-ba74f10a4838890386.jpg',
    players_num='12'
    )
  session_five = Session(
    organizer_id='2',
    location_name='Galactic Comics',
    address='6430 2nd St',
    city='Austin',
    state='Texas',
    zip_code='98573',
    game='Pandemic',
    description="Session start at 10am! A board game about surviving a global pandemic!",
    pic_url='https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Pandemic_game.jpg/220px-Pandemic_game.jpg',
    players_num='4'
    )
  session_five = Session(
    organizer_id='3',
    location_name='Gaming Emporium',
    address='98 Forest Hills Dr',
    city='Compton',
    state='New York',
    zip_code='42930',
    game='Warhammer',
    description="Gather your marines and fight for superiority! Game starts at 1pm",
    pic_url='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Warhammer_Fantasy_RedCraig.jpg/300px-Warhammer_Fantasy_RedCraig.jpg',
    players_num='6'
    )
  session_six = Session(
    organizer_id='1',
    location_name='Time Tunnel Comics',
    address='265 2nd Ave SE',
    city='Hickory',
    state='North Carolina',
    zip_code='28602',
    game='Pokemon',
    description="Gotta catch em all! Looking for someone to play with around 6pm for a few hours",
    pic_url='http://okgamers.com/wp-content/uploads/2017/05/Pokemon-TCG.jpg',
    players_num='2'
    )
  session_seven = Session(
    organizer_id='2',
    location_name='Boardwalk',
    address='1175 Woods Crossing Rd',
    city='Greenville',
    state='South Carolina',
    zip_code='29607',
    game='Dread',
    description="I'm a DM looking for players to run a campaign with me! Playing at noon until we are done.",
    pic_url='https://imgv2-1-f.scribdassets.com/img/document/294654204/original/9014e794c0/1587520600?v=1',
    players_num='5'
    )
  session_eight = Session(
    organizer_id='1',
    location_name='Game Kastle',
    address='2854A Wade Hampton Blvd',
    city='Taylors',
    state='South Carolina',
    zip_code='29687',
    game='Honey Heist',
    description="Looking for an extra player for this hilarious TTRPG. If you've ever wanted to role play a bear, this is the game for you. We are gonna be playing from 4pm to 7pm. No previous experience required",
    pic_url='https://static1.thegamerimages.com/wordpress/wp-content/uploads/2021/05/feature-image-honey-heist.jpg?q=50&fit=contain&w=750&h=375&dpr=1.5',
    players_num='1'
    )
  session_nine = Session(
    organizer_id='3',
    location_name='Tangled Web',
    address='123 Main Street',
    city='Spartanburg',
    state='South Carolina',
    zip_code='29345',
    game="Werewolves of Miller's Hollow",
    description="A bunch of us gotta lie to each other that we aren't werewolves!",
    pic_url='http://images10.newegg.com/ProductImage/A02L_1_20110421_7f4ec90f-06ae-43fe-92cc-ba74f10a4838890386.jpg',
    players_num='12'
    )
  session_ten = Session(
    organizer_id='3',
    location_name="Gamer's Haven",
    address='5730 N Academy Blvd',
    city='Colorado Springs',
    state='Colorado',
    zip_code='80918',
    game='Magic the Gathering',
    description="Pre-release is this Friday at midnight! Can comfortably sit up to 60 people!",
    pic_url='https://img.huffingtonpost.com/asset/5ee952de300000582d157ff8.jpeg?cache=6XQjlTla0Z&ops=1778_1000',
    players_num='60'
    )
  session_eleven = Session(
    organizer_id='3',
    location_name='Game Kastle',
    address='1350 Coleman Ave',
    city='Santa Clara',
    state='California',
    zip_code='95050',
    game='Settlers of Catan',
    description="I've been dying to play some Settlers so if you wanna play, I'll be at Game Kastle from 10am to 1pm, getting my Settlers on!",
    pic_url='https://miro.medium.com/max/4800/1*r_rq_fRLNliX91GSgMi38Q.jpeg',
    players_num='3'
    )

  db.session.add(session_one)
  db.session.add(session_two)
  db.session.add(session_three)
  db.session.add(session_four)
  db.session.add(session_five)
  db.session.add(session_six)
  db.session.add(session_seven)
  db.session.add(session_eight)
  db.session.add(session_nine)
  db.session.add(session_ten)
  db.session.add(session_eleven)

  db.session.commit()

def undo_sessions():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
