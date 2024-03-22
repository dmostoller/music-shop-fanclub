import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget.js"


function EditEvent() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const {id} = useParams();
    const [event, setEvent] = useState({});
    const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
      fetch(`/events/${id}`)
      .then((res) => res.json())
      .then((event) => {
        setEvent(event)
        setImageUrl(event.image_url)
  })}, [id]);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a title"),
        venue: yup.string().required("Must enter a venue"),
        location: yup.string().required("Must enter a location"),
        details: yup.string().required("Must enter event details"),
        image_url: yup.string().required("You must upload an image"),
        event_date: yup.date().required("Must enter a date"),
        event_link: yup.string().required("Must enter an event link"),
    })
    const initValues = event 
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
          name:`${event.name}`,
          venue:`${event.venue}`,
          location:`${event.location}`,
          details:`${event.details}`,
          image_url: `${imageUrl}`,
          event_date:`${event.event_date}`,
          event_link:`${event.event_link}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/events/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(event => {
                navigate(`/events/${id}`)
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
        <div className="ui text container" style={{marginTop: "80px"}}>
        <h4  className="ui horizontal inverted divider">Edit Event</h4>
            <form style={{marginBottom: "25px"}} className="ui inverted form" onSubmit={formik.handleSubmit}>
            <div className="field">
                    <label>Image<Link style={{float:"right"}} to={`/events/${id}`}>  Back to Event</Link></label>
                    <UploadWidget onSetImageUrl={setImageUrl}/>
                    <input type="text"  style={{visibility: "hidden"}} name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image_url}</p>}
                    <img className="ui circular centered image small" src={imageUrl} alt=""></img>
                </div>    
                <div className="field">
                    <label>Name</label>
                    <input type="text"  name="name" value={formik.values.name} placeholder="Event Name..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.name}</p>}
                </div>
                <div className="field">
                    <label>Venue</label>
                    <input type="text"  name="venue" value={formik.values.venue} placeholder="Venue..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.venue}</p>}
                </div>    
                <div className="field">
                    <label>Location</label>
                    <input type="text" name="location" value={formik.values.location} placeholder="Location address..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.location}</p>}
                </div>    

                <div className="field">
                    <label>Date</label>
                    <input type="date"  name="event_date" value={formik.values.event_date} placeholder="Event Date (MM/DD/YYYY)..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.event_date}</p>}
                </div>  
                <div className="field">
                    <label>Event Link</label> 
                    <input type="text"  name="event_link" value={formik.values.event_link} placeholder="Link to Event..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.event_link}</p>}
                </div>      
                <div className="field">
                    <label>Details</label>
                    <textarea type="text" rows="6" name="details" value={formik.values.details} placeholder="Event Details..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.details}</p>}
                </div>
                <div className="field">
                
                <button className="ui button violet fluid" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </div>
        </>
    )
}

export default EditEvent
