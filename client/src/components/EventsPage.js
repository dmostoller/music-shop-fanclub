import React, {useState, useEffect} from "react";
import EventsList from "./EventsList"
import { Link } from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";

function EventsPage () {
    const [events, setEvents] = useState([])
    const { user } = useUser()
    const {isAdmin} = useAdmin()

    useEffect(() => {
      fetch(`/events`)
      .then((res) => res.json())
      .then((events) => {setEvents(events)})
    }, []);

    const sortedEvents = events.sort((a, b) => (a.event_date) < (b.event_date) ? -1 :1)
    const deleteEvent = (deleted_event) => setEvents(events => events.filter((event) => event.id !== deleted_event.id))

    return (
        <div className="ui container" style={{backgroundColor: "#303030"}} >
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh", marginTop: "40px"}}>
        {/* <h4  style={{marginTop: "100px"}} class="ui horizontal inverted divider">Events</h4> */}
                <EventsList events={sortedEvents} isAdmin={isAdmin} deleteEvent={deleteEvent}/>
            </div>
            { user && isAdmin ?
            <div className="ui grid container centered">
            <Link to={`/events/new`} style={{marginTop: "15px", marginBottom: "15px"}} className="ui circular icon secondary button"><i className="plus icon"></i></Link>
            </div>
            : <></>
            }
        </div>
    )
}

export default EventsPage