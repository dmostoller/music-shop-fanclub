import React, { useState, useEffect } from "react";


export default function ThreadMessage({messageObj, onDeleteMessage}) {

    const handleDeleteMessage = (e) => {
        fetch(`/forum_messages/${messageObj.id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteMessage(messageObj.id)
        })
    }

    return (
        <>
        <div className="comment" style={{padding:"5px"}}>
            <div className="avatar">
                <img src={messageObj.user.avatar}></img>
            </div>
            <div className="content">
                <div className="author">{messageObj.user.username}
                    <div className="metadata"> 
                        <span className="date">{messageObj.date_added}</span>
                    </div>
                </div>
                <div className="text">{messageObj.message}
                </div>
                <div className="actions">
                    <a onClick={handleDeleteMessage} className="delete">Delete</a>
                </div>
            </div>
        </div>
        </>
    )



}