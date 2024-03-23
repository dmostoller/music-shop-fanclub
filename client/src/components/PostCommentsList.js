import React, {useEffect, useState} from "react";
import PostCommentForm from "./PostCommentForm";
import { useUser } from "../context/user";
import PostComment from "./PostComment";


function PostCommentsList({ postId }){
    const { user } = useUser()
    const [comments, setComments] = useState([])
    const [isComFormVis, setIsComFormVis] = useState(false)
    function changeIsComFormVis() {
        setIsComFormVis(!isComFormVis)
    }

    useEffect(() => {
        fetch(`/post_comments`)
       .then((res) => res.json())
       .then((comments) => setComments(comments))
    }, []);

    const deletePostComment = (deleted_comment_id) => {
        setComments(comments => comments.filter((comment) => comment.id !== deleted_comment_id))
        // console.log(deleted_comment_id)
    }
    // console.log(releaseId)
    const commentsSection = comments
    .filter(comment => comment.post_id == postId)
    .map(comment => (
        <PostComment 
            key={comment.id} 
            id={comment.id} 
            username={comment.user.username} 
            comment={comment.comment}
            date_added={comment.date_added} 
            comment_user_id={comment.user_id}
            onDeleteComment={deletePostComment}
        />
        ))

    const addPostComment = (newComment) =>{
        setComments([...comments, newComment])
        changeIsComFormVis()
    }
    
    return (
        <div className="ui text container">
            <div className="ui inverted comments">
            {commentsSection}
            </div>
            <div>
            {user ? 
            <div style={{paddingBottom: "25px", paddingTop: "10px"}}>
                {isComFormVis ? <PostCommentForm 
                onAddComment={addPostComment} 
                postId={postId} 
                onChangeIsComFormVis={changeIsComFormVis} /> 
                : 
                <div 
                    onClick={changeIsComFormVis} 
                    className="ui circular fluid animated fade button secondary tiny" tabindex="0">
                    <div className="visible content"><i className="plus icon"></i></div>
                    <div className="hidden content">
                        Add Comment
                    </div>   
                </div>}
            </div>
            : <></>
            }
            </div>
        </div>
    );
}

export default PostCommentsList