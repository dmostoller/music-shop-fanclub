import React, {useEffect, useState} from "react";
import { useUser } from "../context/user";


function PostComment({username, comment, id, date_added, comment_user_id, onDeleteComment}){

    const {user} = useUser()
        const [commentUser, setCommentUser] = useState({});

    useEffect(() => {
        fetch(`/users/${comment_user_id}`)
        .then((res) => res.json())
        .then((commentUser) => {setCommentUser(commentUser)})
      }, [comment_user_id]);

    const handleDeleteComment = (e) => {
        fetch(`/post_comments/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteComment(id)
        })
    }

    return (
            <div id={id} className="comment card">
                <div className="avatar">
                <a className="ui circular image">
                    <img src={commentUser.avatar}></img>
                </a>
                </div>
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
    )
}

export default PostComment