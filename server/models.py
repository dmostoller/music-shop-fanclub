from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates

from config import db, bcrypt
# Models go here!


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String, nullable=False)
    email = db.Column(db.String)
    is_admin = db.Column(db.Boolean)

    # comments = db.relationship('Comment', back_populates='user', cascade='all, delete')

    # serialize_rules = ('-comments.user', )
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    @validates
    def validate_username(self, key, username):
        if not username:
            raise ('You must enter a username')
        return username

    def __repr__(self):
        return f'User {self.username}, ID {self.id}'
    

class Post(db.Model, SerializerMixin):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    image_url = db.Column(db.String)
    date_added = db.Column(db.String)

    def __repr__(self):
        return f'<Post {self.id}>'
    
class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    venue = db.Column(db.String)
    location = db.Column(db.String)
    details = db.Column(db.String)
    image_url = db.Column(db.String)
    event_date = db.Column(db.String)
    event_link = db.Column(db.String)

    def __repr__(self):
        return f'<Event {self.id}>'
    
    