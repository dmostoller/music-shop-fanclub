import React from "react";
import { useUser } from "../context/user";


function Comment({username, comment, id, date_added, comment_user_id, onDeleteComment}){

    const {user} = useUser()

    const handleDeleteComment = (e) => {
        fetch(`/comments/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteComment(id)
        })
    }

    return (
        <div id={id} style={{margin: "25px"}}className="ui inverted comments">
            <div className="comment CARD">
                <div className="content">
                <div className="author">{username}<div className="metadata"><span className="date">{date_added}</span></div></div>
                <div className="text">{comment}</div>

            {user && user.id === comment_user_id ? 
                <div className="actions">
                <a onClick={handleDeleteComment} className="delete">Delete</a>
            </div>
            : <></>
            }
   
            </div>
        </div>
        </div>
    )
}

export default Comment