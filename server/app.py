#!/usr/bin/env python3

# Standard library imports
# Remote library imports
from flask import request, abort, make_response, jsonify, request, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError


# Local imports
from config import app, db, api
# Add your model imports
from models import User, Post, Event, Release, Track, Saved, Comment

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
            response = make_response({'errors': ['validation errors']}, 422)
        
        return response

class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(rules = ('-_password_hash', )), 200
        return make_response({'errors': 'You must be logged in'}, 401)

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']
        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return make_response(user.to_dict(rules = ('-_password_hash', )), 200)
        return make_response({'errors': 'Invalid username or password'}, 401)

class Logout(Resource):
    def delete(self):
        if session['user_id'] == None:
            return {'error': 'No user found'}, 401
        session['user_id'] = None
        return {}, 204

api.add_resource(Users, '/users', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

class Posts(Resource):
    def get(self):
        posts = [post.to_dict() for post in Post.query.all()]
        reponse = make_response(posts, 200)
        return reponse
    
    def post(self):
        try:
            form_json = request.get_json()
            new_post = Post(
                title=form_json['title'],
                content=form_json['content'],
                image_url=form_json['image_url'],
                date_added=form_json['date_added'],
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
        if post:
            response = make_response(post.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response
    
    def patch(self, id):
        post = Post.query.filter_by(id=id).first()
        if post:
            try:
                for attr in request.get_json():
                    setattr(post, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(post.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Post not found"}, 404) 
        return response
    
    def delete(self, id):
        post = Post.query.filter_by(id=id).first()
        if not post:
            abort(404, "The post you were looking for was not found")
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
        if event:
            response = make_response(event.to_dict(), 200)
        else:
            response = make_response({"error": "Post not found"}, 404)
        return response
    
    def patch(self, id):
        event = Event.query.filter_by(id=id).first()
        if event:
            try:
                for attr in request.get_json():
                    setattr(event, attr, request.get_json()[attr])
                    db.session.commit()
                    response = make_response(event.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Event not found"}, 404) 
        return response

    def delete(self, id):
        event = Event.query.filter_by(id=id).first()
        if not event:
            abort(404, "The event you were looking for was not found")
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
        if release:
            response = make_response(release.to_dict(), 200)
        else:
            response = make_response({"error": "Release not found"}, 404)
        return response
    
    def patch(self, id):
        release = Release.query.filter_by(id=id).first()
        if release:
            try:
                for attr in request.get_json():
                    if not request.get_json()['tracks']:
                        setattr(release, attr, request.get_json()[attr])
                db.session.commit()
                response = make_response(release.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Release not found"}, 404) 
        return response
    
    def delete(self, id):
        release = Release.query.filter_by(id=id).first()
        if not release:
            abort(404, "The release you were looking for was not found")
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
        if track:
            response = make_response(track.to_dict(), 200)
        else:
            response = make_response({"error": "Track not found"}, 404)
        return response
    
    def patch(self, id):
        track = Track.query.filter_by(id=id).first()
        if track:
            try:
                setattr(track, 'title', request.get_json()['title'])
                setattr(track, 'bpm', request.get_json()['bpm'])
                setattr(track, 'audio', request.get_json()['audio'])
                setattr(track, 'artist_names', request.get_json()['artist_names'])
                db.session.commit()
                response = make_response(track.to_dict(), 200)
            except ValueError:
                response = make_response({"errors": ["validation errors"]}, 400)
        else:
            response = make_response({"error": "Release not found"}, 404) 
        return response
    
    def delete(self, id):
        track = Track.query.filter_by(id=id).first()
        if not track:
            abort(404, "The track you were looking for was not found")
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

class SavedItemsById(Resource):
    def delete(self,id):
        pass
#   def post(self, id):
#         try:
#             user_id = session.get('user_id')
#             new_saved_release = SavedItem(
#                 user_id=user_id,
#                 release_id=id,
#             )
#             db.session.add(new_saved_release)
#             db.session.commit()
#             response = make_response(new_saved_release.to_dict(), 201)
#         except ValueError:
#             response = make_response({"errors" : ["validation errors"]}, 422)
        
#         return response

api.add_resource(SavedItemsById, '/saved_items/<int:id>')

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
            abort(404, "The comment was not found")
        db.session.delete(comment)
        db.session.commit()
        response = make_response("", 204)
        return response
    
api.add_resource(Comments, '/comments')
api.add_resource(CommentsById, '/comments/<int:id>')




if __name__ == '__main__':
    app.run(port=5555, debug=True)
