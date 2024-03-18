import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";

function EventDetail(){
    const [event, setEvent] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    const { user } = useUser()
    const {isAdmin} = useAdmin()
    

    useEffect(() => {
        fetch(`/events/${id}`)
        .then((res) => res.json())
        .then((event) => setEvent(event))
    }, [id]);

    const handleDeleteEvent = (event) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        fetch(`/events/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                navigate('/events') 
            })
        }
    }    
    const imageUrl = `https://res.cloudinary.com/ddp2xfpyb/image/upload/v1710733429/superluminal/${event.image_url}`

    return (
        <div className="ui container" style={{paddingTop:"5px", marginTop: "40px"}}>
        <div style={{marginTop: "10px"}} className="ui inverted horizontal card fluid">
            <div className="item">
                <img className="ui big image" src={imageUrl} alt={event.name}></img>
            </div>
            <div className="content">
                <div className="header">
                    {event.name}
                </div>
                <div className="meta">
                    <span className="category">{event.event_date}</span>
                </div>
                <div className="description">
                    <p>{event.venue}</p>
                </div>
                <div className="description">
                    <p>{event.location}</p>
                </div>
                <div className="description">
                    <p>{event.details}</p>
                </div>
                <div style={{padding: "10px"}}> 
                    <Link to="/events" className="circular ui icon inverted grey button"><i className="undo icon"></i></Link>
                    { user && isAdmin ? (
                        <>
                            <Link to={`/events/${id}/edit`} className="circular ui icon inverted grey button">
                                <i className="edit icon" style={{visibility: "visible"}}></i>
                            </Link>
                            <button className="circular ui icon inverted grey button" onClick={handleDeleteEvent}>
                                <i className="trash icon" style={{visibility: "visible"}}></i>
                            </button>


                         </>
                        )
                        : <></>    
                    } 
                        <a href={event.event_link} style={{float: "right"}} className="ui button inverted button grey small" target="_blank" rel="noopener noreferrer">Buy Tickets</a>

                </div>
            </div>
    </div>
    </div>
    
    );
}

export default EventDetail