import React from "react";
import { useUser } from "../context/user";


export default function ThreadMessage({messageObj, onDeleteMessage}) {
    const {user} = useUser();

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
        <div className="comment" style={{padding:"10px"}}>
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
                { (user.id == messageObj.user_id) ? ( 
                <div className="actions">
                    <a onClick={handleDeleteMessage} className="delete">Delete</a>
                </div>
                ):
                <></>
                }
            </div>
        </div>
        </>
    )



}