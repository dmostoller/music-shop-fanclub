import React, { useState } from "react";
import EditUser from "./EditUser";

export default function User ({user, setUser}) {
    const [showEdit, setShowEdit] = useState(false);

    function showEditForm() {
        setShowEdit(!showEdit)
    }


    return (
        <div className="ui container fluid">
            {/* {showEdit ?  */}
            
             {/* <EditUser id={user.id} setUser={setUser} showEdit={showEditForm}/> */}
            {/* :  */}
            <div className="ui card" style={{marginBottom: "15px"}}>
                <div className="content" style={{padding: "25px"}}>
                        <div className="header">{user.username}</div>
                        <div className="description">{user.email}</div>
                        <div style={{paddingTop: "25px", float: "left"}}> 
                            <button onClick={showEditForm} className="ui button small teal">Edit User</button>
                            <button className="ui button small teal">Change Password</button>
                        </div>
                </div>
            </div>
            {/* } */}



        </div>
    );
}
