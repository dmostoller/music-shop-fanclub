import React from "react";
import ContactForm from "./ContactForm";


export default function ContactPage () {

return (
    <div>
    <div className="ui container" style={{width: "60%", margin: "auto", marginTop:"40px", textAlign: "center"}}>
        <h1 className="header"><br></br>Get In Touch</h1>
        <h3>Please use this form to send us an email.</h3>    
            <p>
                If you are interested in booking us for your event or for any other inquiries please fill out and submit the form below with as much detail as possible and we will get back to you as soon as we can. Thanks!
            </p>
    </div>
    <div className="ui container" style={{width: "60%", margin: "auto"}} >        
        <ContactForm />
    </div>
    </div>
)
}