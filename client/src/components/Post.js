import React from "react";
import {Link } from "react-router-dom";



export default function Post ({id, title, content, image_url, date_added}) {
    return (
            
            <Link to={`/posts/${id}`} className="ui centered card" style={{margin:"25px", marginBottom: "15px"}}>
                <div className="image">
                    <img className="ui fluid image" src={image_url} alt={title}></img>
                    {/* <img src={url_for('serve_image', filename={image_url})}/> */}
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{title}</div>
                    <div className="meta">{date_added}</div> 
                    <div className="description">{content}</div>
                    {/* <div style={{paddingTop: "25px"}}> 
                        <Link to={`/posts/${id}`}  className="ui inverted button grey small">Click to Read More</Link>
                    </div> */}
                    {/* { isAdmin ? (
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button className="ui icon button small teal" onClick={handleDeletePost}>
                            <i class="trash icon" style={{visibility: "visible"}}></i>
                            </button>
                        </div>
                    )
                    : <></>    
                } */}
                </div>
            </Link>
    );
}
