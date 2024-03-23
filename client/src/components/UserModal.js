import React from "react"


export default function UserModal({user}) {


return (

<div className="ui centered grid">
    <div className="ui inverted card" style={{margin: "10px"}}>
        <div style={{padding: "10px"}}>
            <img className="ui circular small image centered" src={user.avatar} alt="user avatar"></img>
        </div>
        <div className="content" style={{ padding: "25px"}}>
                <div className="header">{user.username}</div>
                <div className="meta">{user.city}, {user.country}</div>
        </div>  
    </div>
</div> 

)
}