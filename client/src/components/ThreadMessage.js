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
        <div className="comment" style={{margin:"10px"}}>
            <div className="avatar">
                <img src={messageObj.user.avatar}></img>
            </div>
            <div className="content">
                <div className="author">{messageObj.user.username}
                    <div className="metadata"> 
                        <span className="date">{messageObj.date_added}</span>
                    </div>
                </div>
                <div className="text">{messageObj.message}</div>

                <div className="actions">
                {/* <em data-emoji=":astonished:" class="small"></em> */}

                { (user.id == messageObj.user_id) ? ( 
                    <button onClick={handleDeleteMessage} className="ui circular delete inverted icon violet button mini"><i className="trash icon"></i></button>
                ):
                <></>
                }            
                </div>
            </div>
        </div>
        </>
    )



}