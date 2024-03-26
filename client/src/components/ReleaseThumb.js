import React from "react"
import { Link } from "react-router-dom"

export default function ReleaseThumb({id, title, artist, record_label, description, date_released, image, onDeleteRelease, savedItems, buyLink}) {
    return (
        <>

            <Link to={`/releases/${id}`}  className="ui centered card">
                <div className="image">
                    <img src={image}></img>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="meta">
                        <a>{artist}</a>
                    </div>
                    <div className="meta">
                        <a>{record_label}</a>
                    </div>
                    <div className="description">
                        {description.substring(0,100)}....
                    </div>
                </div>
                <div className="extra content">
                <div className="meta">
                        <a>{date_released}</a>
                    </div>
                        {/* <Link to={`/releases/${id}`} className="ui circular violet icon button mini"><i className="arrows alternate icon"></i></Link> */}
                </div>
            </Link>
        </>

    )





}
