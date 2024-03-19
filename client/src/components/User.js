import React, { useState, useEffect } from "react";
import { useUser } from "../context/user";
import SavedList from "./SavedList";
import EditUser from "./EditUser";

export default function User () {
    const [showEdit, setShowEdit] = useState(false);
    const {user} = useUser();
    const [savedItems, setSavedItems] = useState([]);

    function showEditForm() {
        setShowEdit(!showEdit)
    }
    
    useEffect(() => {
        fetch(`/saved_by_user/${user.id}`)
        .then((res) => res.json())
        .then((savedItems) => {setSavedItems(savedItems)})
      }, [user.id]);

    const deleteSaved = (deleted_id) => {
        setSavedItems(savedItems => savedItems.filter((savedItem) => savedItem.id !== deleted_id))
    }
    // console.log(savedItems)
    
    return (
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>

            {showEdit ? 
            <EditUser setShowEdit={showEditForm}/> 
            :
            <div className="ui inverted container" style={{marginTop: "75px"}}>
                <h4  class="ui horizontal inverted divider">My Account</h4>
                <div className="ui centered grid">
                    <div className="ui inverted card" style={{margin: "10px"}}>
                        <div className="content" style={{ padding: "25px"}}>
                                <div className="header">{user.username}</div>
                                <div className="description">{user.email}</div>
                                <div style={{paddingTop: "25px"}}> 
                                    <button onClick={showEditForm} className="ui inverted fluid grey button tiny">Edit User / Change Password </button>
                                </div>
                        </div>  
                    </div>
                </div> 
            </div>
            }
            
            <div className="ui inverted container" style={{marginTop: "15px"}}>
                <h4  style={{marginBottom: "50px"}} class="ui horizontal inverted divider">My Collection</h4> 
                    <SavedList onDeleteSaved={deleteSaved} savedItems={savedItems}/>
            </div>
        </div>
    );
}
