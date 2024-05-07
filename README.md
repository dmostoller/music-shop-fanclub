# Musician's Base - The Social Fan Page for Independent Musicians

## Introduction

- A complete web portal for a musician that integrates a traditional artist website with features insiped by social media and other music application, with the goal of transforming one's fanbase into a true community!

The music industry has evolved a lot over the last few decades. Artist who were previously dependent on record labels to reach their audience now have a multitude of ways to build and interact with their fanbase. WHile that has led to an exlosion of indepenent artists and labels, it has also meant that artists have a lot more things to manage than just creating music. Artists today utilize many applications and platforms: social media apps like Instagram and Facebook, streaming platforms and music distributors such as Spotify and Bandcamp, messaging apps like Telegram and Discord, subcription apps like Patreon, video platforms such as Youtube, to name a few, as well as maintaining their own website.

This project tries to answer the question: WHat if we could do all of these things on the artist's website iteself? What if an artist's website could be more than just glorfied linktree, and instead be a place that fosters a sense of community betweeen the artist and their fanbase?

This application has two types of users, Artists and Fans.

Artists can use the application to create, edit, and delete Posts, Events, and music Releases which include Tracks.
They can interact with their fans through the forum and in the comment sections, as well as add forum threads, and moderate user comments and forum messages with the ability to delete any users comments or messages.

Fans can create an user profile and then interact with the artist's content by commenting on Posts and music Releases, interacting with other users in the forum, and save their favorite releases to their user profile, which will then show as badges in the foum.

Additionally, the site features a video section that integrates the artist's Youtube account through its API and a react-youtube-playlist, as well as a static page with the artist's bio and links to their pages on other platforms, and a contact page that utilizes EmailJS to send an email the the artist through a simple form.

The forum integrates an Emoji Picker from emoji-picker-react, and a Gif Picker from gif-picker-react, and features a map with markers for each user on the site.
The map was implemented using react-google-maps/api and the Google Maps API to plot the user markers.
The Maps API requires latitude and longitude in order to plot the markers and so we convert the users' city and country to latitude and longitude on our backend, utilizing GeoPy to geocode the coordinates before the user is saved to the database. That way we prevent unnecesary geocoding requests, only doing it when a user is created or updated, rather then on the front end when the map loads.

For the image and audio uploads, I integrated Cloudinary's Upload Widget and use WaveSurfer for the audio player.

---

## Technologies Used

React
Python w/ Flask
SQLAlchemy
Bcrypt
Cloudinary
Wavesurfer
GeoPy
Google API
Email.js
Fomantic-UI
