import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import PostCommentsList from "./PostCommentsList";

function PostDetail(){
    const [post, setPost] = useState({})
    const {id} = useParams();
    const navigate = useNavigate();
    const { user } = useUser()
    const {isAdmin} = useAdmin()

    useEffect(() => {
        fetch(`/posts/${id}`)
        .then((res) => res.json())
        .then((post) => setPost(post))
    }, [id]);

    const handleDeletePost = (e) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
        fetch(`/posts/${id}`, {
            method: "DELETE"
            })
            .then(() => {
                // deletePost(post)
                navigate('/') 
            })
        }
    }    
    const linkForFB = `https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.kabayun.com%2Fsuperluminal&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore`
    
    return (
        <div className="ui container" style={{paddingTop:"5px", marginTop: "40px", minHeight:"100vh"}}>
        <div style={{marginTop: "10px"}} className="ui inverted horizontal card fluid">
                    <div className="item" >
                        <img className="ui big image" src={post.image_url} alt={post.title}></img>
                    </div>
                    <div className="content">
                        <div className="header">
                            {post.title}
                        </div>
                        <div className="meta">
                            <span className="category">{post.date_added}</span>
                        </div>
                        <div className="description">
                            <p>{post.content}</p>
                        </div>
                        <div style={{padding: "10px"}}> 
                            <Link to="/" className="circular ui icon violet button"><i className="undo icon"></i></Link>
                            <Link to={linkForFB}
                            target="_blank"
                            class="circular ui icon facebook button"  
                            data-inverted="" 
                            data-tooltip="Share to Facebook" 
                            data-position="bottom center">
                                    <i class="facebook icon"></i>
                            </Link>
                  
                            { user && isAdmin ? ( 
                            <>
                                <Link to={`/posts/${id}/edit`} className="circular ui icon secondary button">
                                    <i className="edit icon" style={{visibility: "visible"}}></i>
                                </Link>
                                <button className="circular ui icon secondary button" onClick={handleDeletePost}>
                                    <i className="trash icon" style={{visibility: "visible"}}></i>
                                </button>

                            </>
                                )
                                : <></>    
                            } 
                        </div>
                    </div>
                </div>
            <div className="ui bottom attached inverted segment">
            <h4 className="ui horizontal inverted divider">Comments</h4>
            <div>
                <PostCommentsList postId={id}/>
            
                { !user ?
            <div className="ui centered grid" style={{padding: "5px"}}>
                <div className="ui inverted message">
                <span className="ui medium violet text">
                    Please <Link to='/login'>Login</Link> or <Link to='/signup'>Create an Account</Link> to leave a comment
                </span>
                </div>
            </div>
            :
            <></>
            }</div> 

            </div>
        </div>
    
    );
}

export default PostDetail