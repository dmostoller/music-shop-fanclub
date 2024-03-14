import React, {useState, useEffect} from "react";
import EventsList from "./EventsList"
import { Link } from "react-router-dom";

function EventsPage ({user, isAdmin}) {
    const [events, setEvents] = useState([])

    useEffect(() => {
      fetch(`/events`)
      .then((res) => res.json())
      .then((events) => {setEvents(events)})
    }, []);

    const sortedEvents = events.sort((a, b) => (a.event_date) > (b.event_date) ? -1 :1)
    const deleteEvent = (deleted_event) => setEvents(events => events.filter((event) => event.id !== deleted_event.id))

    return (
        <div className="ui container" style={{backgroundColor: "#303030", marginTop:"40px"}} >
            <div className="ui container" style={{paddingTop:"5px", marginTop: "40px"}}>
                <EventsList events={sortedEvents} isAdmin={isAdmin} deleteEvent={deleteEvent}/>
            </div>
            <div className="ui grid container centered">
            <Link to={`/events/new`} style={{margin: "20px"}} className="ui icon secondary button"><i className="plus icon"></i>  New Event</Link>
            </div>
        </div>
    )
}

export default EventsPage