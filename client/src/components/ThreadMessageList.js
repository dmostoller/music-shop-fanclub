import React, { useState, useEffect, useRef } from "react";
import ThreadMessage from "./ThreadMessage";
import ThreadMessageForm from "./ThreadMessageForm";

export default function ThreadMessageList({threadId, searchVal, setVisible, mobile }) {
    const [messages, setMessages] = useState([]);
    const divRef = useRef(null);

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    useEffect(() => {
        fetch(`/messages_by_thread_id/${threadId}`)
        .then((res) => res.json())
        .then((messages) => {setMessages(messages)})
      }, [threadId]);

    const deleteMessage = (deleted_message_id) => {
        setMessages(messages => messages.filter((message) => message.id !== deleted_message_id))
    // console.log(deleted_comment_id)
    }
    const addMessage = (newMessage) => {
        setMessages(messages => ([...messages, newMessage]))
    }

    const filteredMessages = messages
    .filter(message => {
        { if (searchVal && message.message) {
        return (
            message.message.toLowerCase().includes(searchVal.toLowerCase()) || message.user.username.toLowerCase().includes(searchVal.toLowerCase())        
        )}
        else {
        return (message)
        }}
    })

    // console.log(searchVal)
    const threadMessages = filteredMessages.map((message) => {
    return <ThreadMessage
    key={message.id}
    messageId={message.id}
    messageObj={message}
    onDeleteMessage={deleteMessage}
    />
})

    // if (mobile === true) {
    //     divStyle = {height: "100vh"}
    // }
    // else {
    //     divStyle = {height: "635px"}
    // }
    
    return(
        mobile == true ?
        <>
            <div className="ui very long scrolling inverted attached segment" id="scrollWindow">
                <div className="ui inverted minimal comments">
                    {threadMessages}
                    <div ref={divRef} />
                </div>      
            </div>
            <div className="ui bottom attached inverted segment" >
                <ThreadMessageForm onAddMessage={addMessage} threadId={threadId} divRef={divRef} mobile={mobile} setVisible={setVisible}/>
            </div>   
        </>
        : 
        <>
        <div className="ui resizable scrolling inverted attached segment" id="scrollWindow" style={{height: "635px"}}>
            <div className="ui inverted minimal comments">
                {threadMessages}
                <div ref={divRef} />
            </div>      
        </div>
        <div className="ui bottom attached inverted segment" >
            <ThreadMessageForm onAddMessage={addMessage} threadId={threadId} divRef={divRef} mobile={mobile} setVisible={setVisible}/>
        </div>     
        </>
    
    )
}