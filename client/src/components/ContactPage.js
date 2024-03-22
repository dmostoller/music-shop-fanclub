import React from "react";
import ContactForm from "./ContactForm";


export default function ContactPage () {

return (
    <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
    <div className="ui container">
    </div>
    <div className="ui centered text container">      
    <h1 className="header" style={{color: "white", textAlign: "center"}}><br></br>Get In Touch</h1>
        <h3 style={{color: "white", textAlign: "center"}}>Please use this form to send us an email.</h3>    
            <p style={{textAlign: "center", color: "white"}}>
                For all inquiries please fill out and submit the form below with as much detail as possible, and we will get back to you as soon as we can. Thank you very much!
            </p> 
        <ContactForm />
    </div>
    </div>
)
}