#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime
# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Post

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Clearing tables...")
        User.query.delete()
        Event.query.delete()
        Post.query.delete()

        print("Seeding users...")
        users = [
            User(username="Dave", email="dmostoller@gmail.com", password_hash="bass", is_admin=True),
            User(username="Yasi", email="yasmin.nunsy@gmail.com", password_hash="lily", is_admin=True)
        ]

        db.session.add_all(users)

        print("Seeding posts")
        posts = [
            Post(title="My first post", 
                 content=fake.text(), 
                 image_url="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/425866192_993805545448402_5667355971764561822_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=7w7S9wfvvnIAX-xQzPm&_nc_ht=scontent-lga3-2.xx&oh=00_AfBJ_NN9IQEWIqII_NfLh2g7TrUEoYI4WiSPwyAl__9hNw&oe=65F7BC1C", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My second post", 
                 content=fake.text(), 
                 image_url="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/426179627_993805485448408_7928919027064931609_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=TsF0BoKpae0AX-nu94B&_nc_ht=scontent-lga3-2.xx&oh=00_AfBPSu0NGojbYAmlqGcFm0y1xhsVbWsrwunUTXO0yn-zPQ&oe=65F65341", 
                 date_added=datetime.datetime.now()
                 ),
            Post(title="My third post", 
                 content=fake.text(), 
                 image_url="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/425846890_993188788843411_5555216568028846730_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XCVC-mGWjxAAX8fI2rd&_nc_ht=scontent-lga3-2.xx&oh=00_AfDKIZslJ4h4HyjACWh45I-Hnf6SrdUVl9HuXBxr5QELOA&oe=65F662AC", 
                 date_added=datetime.datetime.now()
                 )
        ]
        
        db.session.add_all(posts)

        print("Seeding events")
        events = [
            Event(name="Dream Gallery",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-1.jpeg",
                  event_date="03/01/2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            ),
            Event(name="Dream Gallery 2",
                  venue="Illuminate Collective",
                  location="1714 N. Mascher St, Philadelphia, PA",
                  details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                  image_url = "./images/illuminate-2.jpeg",
                  event_date="03/02/2024",
                  event_link="https://www.instagram.com/illuminate_collective_phl/"
            )
        ]
        
        db.session.add_all(events)
        
        db.session.commit()

        print("Done seeding.")