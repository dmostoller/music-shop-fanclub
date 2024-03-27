import React, { useState, useEffect } from "react";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";


function Comment({username, comment, id, date_added, comment_user_id, onDeleteComment}){

    const {user} = useUser();
    const {isAdmin} = useAdmin();
    const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        fetch(`/users/${comment_user_id}`)
        .then((res) => res.json())
        .then((commentUser) => {setCommentUser(commentUser)})
      }, [comment_user_id]);

    const handleDeleteComment = (e) => {
        fetch(`/comments/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteComment(id)
        })
    }

    return (
        <div id={id} className="comment">
                <div className="avatar">
                    <a className="ui circular image">
                    <img src={commentUser.avatar}></img>
                    </a>
                </div>
                <div className="content">
                <div className="author">{username}<div className="metadata"><span className="date">{date_added}</span></div></div>
                <div className="text">{comment}</div>

            {user && user.id === comment_user_id || isAdmin ? 
                <div className="actions">
                <a onClick={handleDeleteComment} className="delete">Delete</a>
            </div>
            : <></>
            }
   
            </div>
        </div>
    )
}

export default Comment