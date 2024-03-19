#!/usr/bin/env python3

# Standard library imports
# Remote library imports
from flask import request, abort, make_response, jsonify, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from wtforms.validators import ValidationError
from datetime import datetime, date


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Post, Event, Release, Track, Saved, Comment, PostComment
from werkzeug.exceptions import NotFound, Unauthorized, UnprocessableEntity

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def post(self):
        try:
            form_json = request.get_json()
            if form_json['password'] == form_json['password_confirmation']:
                new_user = User(
                    username=form_json['username'],
                    password_hash=form_json['password'],
                    email=form_json['email'],
                    is_admin=False
                )
                db.session.add(new_user)
                db.session.commit()
                session['user_id'] = new_user.id 
                response = make_response(new_user.to_dict(rules = ('-_password_hash', )), 201)
            else:
                raise AttributeError("Passwords must match")
        except IntegrityError:
            raise UnprocessableEntity("Username is already in use")
        
        return response
    
class UsersById(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            response = make_response(user.to_dict(), 200)
        else:
            raise ValidationError
        return response 

class UpdateUser(Resource):
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                setattr(user, 'username', request.get_json()['username'])
                setattr(user, 'password_hash', request.get_json()['password'])
                setattr(user, 'email', request.get_json()['email'])
                db.session.commit()
                response = make_response(user.to_dict(rules = ('-_password_hash', )), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            raise Unauthorized
        return response 
    
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return make_response(user.to_dict(rules = ('-_password_hash', )), 200)
        else:
            raise Unauthorized

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules = ('-_password_hash', )), 200)
        else:
            raise Unauthorized("The username and/or password you have entered is incorrect. Please try again.")

class Logout(Resource):
    def delete(self):
        if session['user_id'] == None:
            return {'error': 'No user found'}, 401
        session['user_id'] = None
        return {}, 204
    
class CheckUsername(Resource):
    def get(self):
        username = request.get_json()['username']
        user = User.query.filter_by(username=username).first()
        if not user:
            raise UnprocessableEntity
        response = make_response(user.to_dict(), 200)
        return response

api.add_resource(CheckUsername, '/check_username', endpoint='check_username')
api.add_resource(Users, '/users', endpoint='signup')
api.add_resource(UsersById, '/users/<int:id>')
api.add_resource(UpdateUser, '/update_user/<int:id>', endpoint='update_user')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')


class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        reponse = make_response(posts, 200)
        return reponse
    
    def post(self):
        now = datetime.now()
        date = now.date()
        try:
            form_json = request.get_json()
            new_post = Post(
                title=form_json['title'],
                content=form_json['content'],
                image_url=form_json['image_url'],
                date_added=date,
            )
            db.session.add(new_post)
            db.session.commit()
            response = make_response(new_post.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class PostsById(Resource):
    def get(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound
        response = make_response(post.to_dict(), 200)
        return response
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound
        try:
            setattr(post, 'title', request.get_json()['title'])
            setattr(post, 'content', request.get_json()['content'])
            setattr(post, 'image_url', request.get_json()['image_url'])
            db.session.commit()
            response = make_response(post.to_dict(), 200)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

        return response
    
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            raise NotFound
        db.session.delete(post)
        db.session.commit()
        response = make_response("", 204)
        return response

api.add_resource(Posts, '/posts')
api.add_resource(PostsById, '/posts/<int:id>')

class Events(Resource):
    def get(self):
        events = [event.to_dict() for event in Event.query.all()]
        reponse = make_response(events, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_event = Event(
                name=form_json['name'],
                venue=form_json['venue'],
                location=form_json['location'],
                details=form_json['details'],
                image_url=form_json['image_url'],
                event_date=form_json['event_date'],
                event_link=form_json['event_link']
            )
            db.session.add(new_event)
            db.session.commit()
            response = make_response(new_event.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class EventsById(Resource):
    def get(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            raise NotFound
        response = make_response(event.to_dict(), 200)
        return response
    
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            raise NotFound
        try:
            for attr in request.get_json():
                setattr(event, attr, request.get_json()[attr])
                db.session.commit()
                response = make_response(event.to_dict(), 200)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

        return response

    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            raise NotFound
        db.session.delete(event)
        db.session.commit()
        response = make_response("", 204)
        return response


api.add_resource(Events, '/events')
api.add_resource(EventsById, '/events/<int:id>')


class Releases(Resource):
    def get(self):
        releases = [release.to_dict() for release in Release.query.all()]
        reponse = make_response(releases, 200)
        return reponse

    def post(self):
        try:
            form_json = request.get_json()
            new_release = Release(
                title=form_json['title'],
                artist=form_json['artist'],
                description=form_json['description'],
                record_label=form_json['record_label'],
                date_released=form_json['date_released'],
                image=form_json['image']
            )
            db.session.add(new_release)
            db.session.commit()
            response = make_response(new_release.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class ReleasesById(Resource):
    def get(self, id):
        release = Release.query.filter_by(id=id).first()
        if not release:
            raise NotFound
        response = make_response(release.to_dict(), 200)

        return response
    
    def patch(self, id):
        release = Release.query.filter_by(id=id).first()
        if not release:
            raise NotFound
        try:
            setattr(release, 'title', request.get_json()['title'])
            setattr(release, 'artist', request.get_json()['artist'])
            setattr(release, 'description', request.get_json()['description'])
            setattr(release, 'record_label', request.get_json()['record_label'])
            setattr(release, 'date_released', request.get_json()['date_released'])
            setattr(release, 'image', request.get_json()['image'])
            db.session.commit()
            response = make_response(release.to_dict(), 200)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

        return response
    
    def delete(self, id):
        release = Release.query.filter_by(id=id).first()
        if not release:
            raise NotFound
        db.session.delete(release)
        db.session.commit()
        response = make_response("", 204)
        return response
    
api.add_resource(Releases, '/releases')
api.add_resource(ReleasesById, '/releases/<int:id>')

class Tracks(Resource):
    def get(self):
        tracks = [track.to_dict() for track in Track.query.all()]
        reponse = make_response(tracks, 200)
        return reponse
    
    def post(self):
        try:
            form_json = request.get_json()
            new_track = Track(
                title=form_json['title'],
                artist_names=form_json['artist_names'],
                bpm=form_json['bpm'],
                audio=form_json['audio'],
                release_id=form_json['release_id'],
            )
            db.session.add(new_track)
            db.session.commit()
            response = make_response(new_track.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response
    
class TracksById(Resource):
    def get(self, id):
        track = Track.query.filter_by(id=id).first()
        if not track:
            raise NotFound
        response = make_response(track.to_dict(), 200)

        return response
    
    def patch(self, id):
        track = Track.query.filter_by(id=id).first()
        if not track:
            raise NotFound
        try:
            setattr(track, 'title', request.get_json()['title'])
            setattr(track, 'bpm', request.get_json()['bpm'])
            setattr(track, 'audio', request.get_json()['audio'])
            setattr(track, 'artist_names', request.get_json()['artist_names'])
            db.session.commit()
            response = make_response(track.to_dict(), 200)
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)

        return response
    
    def delete(self, id):
        track = Track.query.filter_by(id=id).first()
        if not track:
            raise NotFound
        db.session.delete(track)
        db.session.commit()
        response = make_response("", 204)
        return response

api.add_resource(Tracks, '/tracks')
api.add_resource(TracksById, '/tracks/<int:id>')

class TracksByReleaseId(Resource):
    def get(self, id):
        tracks = [track.to_dict() for track in Track.query.all() if track.release_id == id]
        response = make_response(tracks, 200)
        return response 
    
api.add_resource(TracksByReleaseId, '/tracks_by_release_id/<int:id>')


class SavedItems(Resource):
    def get(self):
        saved_items = [saved_item.to_dict() for saved_item in Saved.query.all()]
        response = make_response(saved_items, 200)
        return response
    
    def post(self):
        try:
            new_saved_item = Saved(
                user_id=request.get_json()['user_id'],
                release_id=request.get_json()['release_id'],
            )
            db.session.add(new_saved_item)
            db.session.commit()
            response = make_response(new_saved_item.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response
    
api.add_resource(SavedItems, '/saved')

class SavedItemsByUserId(Resource):
    def get(self, id):
        saved_items = [saved_item.to_dict() for saved_item in Saved.query.all() if saved_item.user_id == id]
        response = make_response(saved_items, 200)
        return response 
    
api.add_resource(SavedItemsByUserId, '/saved_by_user/<int:id>')

class SavedItemsByReleaseId(Resource):
    def get(self, id):
        user_id = session.get('user_id')
        saved_item = Saved.query.filter(Saved.release_id == id, Saved.user_id == user_id)
        if saved_item:
            response = make_response(saved_item.to_dict(), 200)
        else:
            raise NotFound
        return response 

api.add_resource(SavedItemsByReleaseId, '/saved_by_release/<int:id>')

class SavedItemsById(Resource):
    def delete(self, id):
        saved_item = Saved.query.filter_by(id=id).first()
        if not saved_item:
            raise NotFound
        db.session.delete(saved_item)
        db.session.commit()
        response = make_response("", 204)
        return response

api.add_resource(SavedItemsById, '/saved/<int:id>')

class Comments(Resource):
    def get(self):
        comments = [comment.to_dict() for comment in Comment.query.all()]
        reponse = make_response(comments, 200)
        return reponse
    
    def post(self):
        try:
            form_json = request.get_json()
            new_comment = Comment(
                comment=form_json['comment'],
                date_added=form_json['date_added'],
                release_id=form_json['release_id'],
                user_id=form_json['user_id'],
            )
            db.session.add(new_comment)
            db.session.commit()
            response = make_response(new_comment.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class CommentsById(Resource):
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if not comment:
            raise NotFound
        db.session.delete(comment)
        db.session.commit()
        response = make_response("", 204)
        return response
    
api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')


class PostComments(Resource):
    def get(self):
        post_comments = [post_comment.to_dict() for post_comment in PostComment.query.all()]
        reponse = make_response(post_comments, 200)
        return reponse
    
    def post(self):
        try:
            form_json = request.get_json()
            new_post_comment = PostComment(
                comment=form_json['comment'],
                date_added=form_json['date_added'],
                post_id=form_json['post_id'],
                user_id=form_json['user_id'],
            )
            db.session.add(new_post_comment)
            db.session.commit()
            response = make_response(new_post_comment.to_dict(), 201)
        except ValueError:
            response = make_response({"errors" : ["validation errors"]}, 422)
        
        return response

class PostCommentsById(Resource):
    def delete(self, id):
        post_comment = PostComment.query.filter_by(id=id).first()
        if not post_comment:
            raise NotFound
        db.session.delete(post_comment)
        db.session.commit()
        response = make_response("", 204)
        return response
    
api.add_resource(PostComments, '/post_comments')
api.add_resource(PostCommentsById, '/post_comments/<int:id>')


@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        {"message": "Not Found: Sorry the resource you are looking for does not exist"},
        404,
    )
    return response

@app.errorhandler(Unauthorized)
def handle_unauthorized(e):
    response = make_response(
        {"message": "Unauthorized: you must be logged in to make that request."},
        401,
    )
    return response

@app.errorhandler(UnprocessableEntity)
def handle_unprocessable_entity(e):
    response = make_response(
        {"message": "Unprocessable Entity: Username is already in use."},
        422,
    )
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)
