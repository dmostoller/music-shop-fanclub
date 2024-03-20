import React, { useState, useEffect } from "react";
import ThreadMessage from "./ThreadMessage";
import MessageForm from "./MessageForm";

export default function ThreadMessageList({threadId}) {
    const [messages, setMessages] = useState([]);
    
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
      
    //   console.log(threadId)
      const threadMessages = messages.map((message) => {
        return <ThreadMessage
        key={message.id}
        messageObj={message}
        onDeleteMessage={deleteMessage}
        />
   
})

    return(
        <>
        <div className="ui resizable scrolling inverted segment" style={{height: "600px"}}>
            <div className="ui inverted comments">
                {threadMessages}
            </div>      
        </div>
        <div className="ui bottom attached inverted segment" >
            <MessageForm onAddMessage={addMessage} threadId={threadId} />
        </div>      
        </>
    )
}