import React, { useState } from "react";
import { useUser } from "../context/user";
import { Modal } from "semantic-ui-react";
import UserModal from "./UserModal";
import { useAdmin } from "../context/admin";

export default function ThreadMessage({messageObj, onDeleteMessage, messageId}) {
    const {user} = useUser();
    const {isAdmin} = useAdmin();
    const [modalOpen, setModalOpen] = useState(false);

    const handleDeleteMessage = (e) => {
        fetch(`/forum_messages/${messageId}`,{
          method:"DELETE"
        })
        .then(() => {
          onDeleteMessage(messageId)
        })
    }

    function handleOpen() {
        setModalOpen(true)
    } 

    function handleClose() {
        setModalOpen(false)
    } 

    return (
        <>
        
        <div className="comment" style={{margin:"10px"}}>
            <div className="avatar">
                <a className="ui circular image" style={{cursor: "pointer"}} onClick={handleOpen}><img alt="user avatar" src={messageObj.user.avatar} ></img></a>
            </div>
            <Modal
            open={modalOpen}
            onClose={handleClose}
            basic={true}
            >
            {/* <Modal.Content> */}
              <UserModal user={messageObj.user}/>
            {/* </Modal.Content> */}
          </Modal>
            <div className="content">
                <div className="author">{messageObj.user.username}
                    <div className="metadata"> 
                        <span className="date">{messageObj.date_added}</span>
                    </div>
                </div>
                {messageObj.gif ? 
                 <div className="ui small image"><img src={messageObj.gif} alt="gif"></img></div>
                :
                <div className="text">{messageObj.message}</div>
                }
                <div className="actions">
                {/* <em data-emoji=":astonished:" class="small"></em> */}
                { user ? 
                 (user.id == messageObj.user_id) || isAdmin ? ( 
                    <button onClick={handleDeleteMessage} className="ui circular delete inverted icon violet button mini"><i className="trash icon"></i></button>
                ):
                <></>
                : <></>
                }            
                </div>
            </div>
        </div>
        </>
    )



}