import React from "react";
import {Link } from "react-router-dom";



export default function Post ({id, title, content, image_url, date_added}) {
    return (
        <div className="five wide column">
            <div className="ui inverted rounded card fluid" style={{marginBottom: "15px"}}>
                <div >
                    <img className="ui fluid image"src={image_url} alt={title}></img>
                    {/* <img src={url_for('serve_image', filename={image_url})}/> */}
                </div>
                <div className="content" style={{padding: "25px"}}>
                    <div className="header">{title}</div>
                    <div className="meta">{date_added}</div> 
                    <div className="description">{content}</div>
                    <div style={{paddingTop: "25px", float: "right"}}> 
                        <Link to={`/posts/${id}`}  className="ui inverted button grey small">Read More</Link>
                    </div>
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
            </div>
        </div>
    );
}
