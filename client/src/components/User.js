import React, { useState, useEffect } from "react";
import { useUser } from "../context/user";

export default function User ({}) {
    const [showEdit, setShowEdit] = useState(false);
    const {user} = useUser();

    function showEditForm() {
        setShowEdit(!showEdit)
    }
    // useEffect(() => {
    //     fetch(`/users/${user.id}`)
    //     .then((res) => res.json())
    //     .then((user) => {setUser(user)})
    //   }, []);

    return (
        <div className="ui centered grid">
            {/* {showEdit ?  */}
            
             {/* <EditUser id={user.id} setUser={setUser} showEdit={showEditForm}/> */}
            {/* :  */}
            <div className="ui inverted container" style={{marginTop: "75px"}}>
            <h4  class="ui horizontal inverted divider">My Account</h4> 
            </div>


            <div className="ui inverted card" style={{margin: "10px"}}>
                <div className="content" style={{ padding: "25px"}}>
                        <div className="header">{user.username}</div>
                        <div className="description">{user.email}</div>
                        <div style={{paddingTop: "25px"}}> 
                            <button onClick={showEditForm} className="ui inverted grey button tiny">Edit User</button>
                            <button className="ui inverted grey button tiny">Change Password</button>
                        </div>
                </div>
                
            </div>
            {/* } */}
            <div className="ui inverted container" style={{marginTop: "15px"}}>
            <h4  class="ui horizontal inverted divider">My Collection</h4> 
            </div>


        </div>
    );
}
