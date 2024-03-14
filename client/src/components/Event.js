import React from "react";
import { Link } from "react-router-dom";

export default function Event ({id, name, venue, location, details, image_url, event_date}) {
    return (
        <div className="ui container fluid" style={{marginTop: "25px"}}>
            <div className="ui horizontal inverted card fluid" style={{marginBottom: "15px"}}>
                <div className="image" style={{minWidth: "300px"}}>
                    <img src={image_url} alt={name} style={{minWidth: "300px"}}></img>
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{name}</div>
                    <div className="meta">{event_date}</div> 
                    <div className="description">{venue}</div>
                    <div className="description">{location}</div>                                   
                    <div className="description">{details}</div>
                    <div style={{paddingTop: "25px", float: "left"}}> 
                        <Link to={`/events/${id}`}  className="ui button inverted grey small">View Event</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
