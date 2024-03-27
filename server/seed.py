#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import datetime
from datetime import date

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Post, Release, Track, Comment, Saved, ForumThread

if __name__ == "__main__":
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        print("Clearing tables...")
        User.query.delete()
        Event.query.delete()
        Post.query.delete()
        Saved.query.delete()
        ForumThread.query.delete()
        Release.query.delete()
        Track.query.delete()
        Saved.query.delete()

        print("Seeding users...")
        users = [
            User(
                username="Dave",
                email="dmostoller@gmail.com",
                password_hash="bass",
                is_admin=True,
            ),
            User(
                username="Yasi",
                email="yasmin.nunsy@gmail.com",
                password_hash="bass",
                is_admin=True,
            ),
            User(
                username="Site-Admin",
                email="kabayun@gmail.com",
                password_hash="bass",
                is_admin=True,
            ),
        ]

        db.session.add_all(users)

        print("Seeding posts")
        posts = [
            Post(
                title="My first post",
                content=fake.text(),
                image_url="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/353014270_277887588082988_4775235938568675269_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=RGFCUb-1e3QAX-UpIpQ&_nc_ht=scontent-lga3-2.xx&oh=00_AfAgF9kgAii9WZ6dTww9ISBLRw1P4B7MsUlQEIg7QIWfEw&oe=65FC6F79",
                date_added=datetime.datetime.now(),
            ),
            Post(
                title="My second post",
                content=fake.text(),
                image_url="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/376287121_626115529634882_5325082624161048051_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HMhWxQV4RHwAX8KjcS7&_nc_ht=scontent-lga3-2.xx&oh=00_AfBLLZGBvbC0TTyMfBEIXxXrkg8J6v6GC4pq6FkPADlNwg&oe=65FB319E",
                date_added=datetime.datetime.now(),
            ),
            Post(
                title="My third post",
                content=fake.text(),
                image_url="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/311420317_429627785950325_1819133913269018390_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=SASHTBR-1a8AX81ljqq&_nc_ht=scontent-lga3-1.xx&oh=00_AfB2dEw1kj43lpb_ap13IDVuQCVJeFyJwrzMla2swdC9Aw&oe=65FBFA9D",
                date_added=datetime.datetime.now(),
            ),
        ]

        db.session.add_all(posts)

        print("Seeding events")
        events = [
            Event(
                name="Space Safari",
                venue="Masserne Campground",
                location="Belgium",
                details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                image_url="./images/illuminate-1.jpeg",
                event_date="08/30/2024",
                event_link="https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-6/426367388_18011962184323267_7846340863121787273_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=wL9agd3X1q0AX9R9T_p&_nc_ht=scontent-lga3-2.xx&oh=00_AfApj59zxU7DfCg8ftxjdYFwvZWQ6fNZBVblLOqQie8bLg&oe=65FC60BA",
            ),
            Event(
                name="Cosmic Mood",
                venue="Open Air",
                location="Czech Republic",
                details="!Special Announcement Coming in Hot! Excited to announce our road to lucid dream festival “Dream Gallery” first Friday weekend event! We will be featuring artists involved with lucid dream festival directly supporting and from the Philadelphia area! Come check out so amazing art installations and a special interactive gallery show with special musical guests followed by a intimate music show on Saturday featuring some of Philadelphia's staples in the dance music community!",
                image_url="./images/illuminate-2.jpeg",
                event_date="06/27/2024",
                event_link="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/426240937_18011758655323267_6908331172839379970_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=EyXi2tz3X8oAX94i34m&_nc_ht=scontent-lga3-1.xx&oh=00_AfDCvdsexSpgzvhQed3ZueGLF55Rd7BN4EcfhCnGHY2yqA&oe=65FB70F0",
            ),
        ]

        db.session.add_all(events)

        print("Seeding releases")
        release1 = Release(
            title="Infinity Prolonged",
            artist="Superluminal",
            description="Superluminal (Kabayun & Yasmin) are back with their second EP on Sangoma Records. A common theme in science fiction deals with contact between humanity and life from other star systems, often enabled by spaceships that can travel at superluminal speeds. Here on earth, music is something that has the power to transcend cultural and linguistic differences and bring people from all walks of life together in a shared experience. This EP builds on this theme of bridging the divide between people through music and through the trance dance experience. Featuring two solo tracks as well as collaborations with Argonik, Daksinamurti & Eritas, this EP aims to take the listener on a journey towards a future that recognizes our shared humanity, towards a world-based on compassion and rationality. ",
            record_label="Sangoma Records",
            date_released="01/17/2022",
            image="https://f4.bcbits.com/img/a3999377451_10.jpg",
        )

        db.session.add(release1)

        print("Seeding tracks")
        tracks = [
            Track(
                title="Improbablility Drive",
                audio="none",
                bpm=153,
                artist_names="Superluminal, Daksinamurti, Eritas",
                release_id=1,
            ),
            Track(
                title="Time Dilation",
                audio="none",
                bpm=154,
                artist_names="Superluminal",
                release_id=1,
            ),
            Track(
                title="Asimov's Dream",
                audio="none",
                bpm=154,
                artist_names="Superluminal",
                release_id=1,
            ),
            Track(
                title="Infinity Prolonged",
                audio="none",
                bpm=154,
                artist_names="Superluminal, Argonik",
                release_id=1,
            ),
        ]

        db.session.add_all(tracks)

        print("Seeding comments")
        comments = [
            Comment(
                comment="Amazing!",
                date_added=datetime.datetime.now(),
                release_id=1,
                user_id=1,
            ),
            Comment(
                comment="Love it!",
                date_added=datetime.datetime.now(),
                release_id=1,
                user_id=1,
            ),
            Comment(
                comment="my favorite!",
                date_added=datetime.datetime.now(),
                release_id=1,
                user_id=2,
            ),
        ]

        db.session.add_all(comments)

        print("Seeding threads")
        threads = [
            ForumThread(name="forum-rules"),
            ForumThread(name="general-chat"),
            ForumThread(name="music-production"),
            ForumThread(name="upcoming-events"),
        ]

        db.session.add_all(threads)

        #   now = datetime.datetime.now()

        db.session.commit()
        #   print(now.date())
        print("Done seeding.")
