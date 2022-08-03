from app.models import db, Game


def seed_games():
  magic = Game(name='Magic: The Gathering', description='A tabletop TCG created by Richard Garfield in 1993. The largest TCG game of all time, it is a game between two players known as Planeswalkers, each one having a deck to battle each other til the other drops down to 0 Life Points!')

  dnd = Game(name="Dungeons & Dragons", description='A fantasy tabletop RPG. The king of all tabletop RPGs, it is the perfect game if you want to step into a world of fantasy where the possibilities are only limited by your imagination! Create a character and journey through a world full of dangerous locations, terrifying monsters and wonderous people!')

  warhammer = Game(name="Warhammer 40,000", description="The most popular miniture wargame in the world, the play area is comprised of buildings, hills, trees, and other terrain features. Set in the future, use your choice of humans, aliens or other supernatural monsters! Command your warriors around the battlefield, fight your opponent's warriors and claim victory!")

  yugioh = Game(name="Yu-Gi-Oh", description="A TCG based off of the hit manga series with the same name, Yu-Gi-Oh is one of the most popular TCGs in the world! Players take turns summoning powerful monsters and casting mighty spells to take down their opponent!")

  pokemon = Game(name="Pokemon", description="Based off the popular video game series, the largest IP in the world, Pokemon are recognized by people all over the world! This popular TCG lets you build a deck with these might monsters to battle your foes!")

  db.session.add(magic)
  db.session.add(dnd)
  db.session.add(yugioh)
  db.session.add(warhammer)
  db.session.add(pokemon)

  db.session.commit()

def undo_games():
  db.session.execute('TRUNCATE games RESTART IDENTITY CASCADE;')
  db.session.commit()
