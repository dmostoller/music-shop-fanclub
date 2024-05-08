import React, { useEffect, useState } from "react"
import { useAdmin } from "../context/admin";
import { MenuItem } from "semantic-ui-react";

export default function MobileThread({ id, onSelectThread, name, selectedThread, onDeleteThread}) {
    const [a, setA] = useState("item");
    const [spin, setSpin] = useState("galactic republic violet icon large");
    const [color, setColor] = useState("ui teal large text")
    const {isAdmin} = useAdmin();


    useEffect(() => {
        if (selectedThread == id) {
            setA("active item")
            setSpin("galactic republic loading white icon large")
            setColor("ui white large text")
        } else {
            setA("item")
            setSpin("galactic republic violet icon large")
            setColor("ui violet large text")
        }
    }, [selectedThread, id])

    const handleClick = (e) => {
        onSelectThread(id)
    }

    const handleDeleteThread = (e) => {
        if (window.confirm("Are you sure you want to delete this thread? All messages in the thread will be lost.")) {
        fetch(`/forum_threads/${id}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteThread(id)
        })
    }}
    return (
        
        <MenuItem className={a} onClick={handleClick}>
            <i style={{float: "left"}} className={spin}></i>            
            <span className={color}>  | {name}</span>
            { isAdmin ?
            <button onClick={handleDeleteThread} style={{float: "right"}} className="ui circular black icon button mini">
                <i className="trash violet icon"></i>
            </button>
            :
            <></>
            }
        </MenuItem>
    )
}


