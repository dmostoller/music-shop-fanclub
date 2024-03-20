import React from "react"
import {NavLink} from "react-router-dom"

export default function Thread({ id, onSelectThread, name }) {


    const handleClick = (e) => {
        onSelectThread(id)
    }

    return (
        <a className="item" onClick={handleClick}><i style={{float: "left"}} className="galactic republic icon"></i>  <span className="ui grey text">  | {name}</span></a>
    )
}


    