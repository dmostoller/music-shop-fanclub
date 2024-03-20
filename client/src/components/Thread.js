import React, { useEffect, useState } from "react"
import { useAdmin } from "../context/admin";

export default function Thread({ id, onSelectThread, name, selectedThread, onDeleteThread}) {
    const [active, setActive] = useState(false);
    const [a, setA] = useState("item");
    const [spin, setSpin] = useState("galactic republic violet icon large");
    const {isAdmin} = useAdmin();


    useEffect(() => {
        if (selectedThread == id) {
            setA("active item")
            setSpin("galactic republic loading violet icon large")
        } else {
            setA("item")
            setSpin("galactic republic violet icon large")
        }
    }
    )

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
        
        <a className={a} onClick={handleClick}>
            <i style={{float: "left"}} className={spin}></i>
            <span className="ui violet large text">  | {name}</span>
            { isAdmin ?
            <button onClick={handleDeleteThread} style={{float: "right"}} className="ui circular black icon button mini">
                <i className="violet trash icon"></i>
            </button>
            :
            <></>
            }
        </a>
    )
}


