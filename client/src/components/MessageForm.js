import React, {useState} from "react";
import Picker from "emoji-picker-react";


function MessageForm({onAddMessage, threadId}){
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);

    const initialState = {
        message: inputStr,
        forum_thread_id: threadId,
          }

    const [formData, setFormData] = useState(initialState)
    // console.log(user.id)
    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData(formData => ({...formData, message: inputStr, forum_thread_id: threadId}))
        fetch("/forum_messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...formData})
        }).then((res) => res.json())
            .then((newMessage) => {
                // console.log(newMessage)
                onAddMessage(newMessage)
                setInputStr("")

            })

        }

    return (
        
    <div className="ui fluid text container">
        <form className="ui form" onSubmit={(e) => handleSubmit(e)}>
            <div className="field">
                <div className="ui fluid transparent inverted small input" >
                    <input type="fluid text" name="message" id="message" value={inputStr} onChange={(e) => setInputStr(e.target.value)} className="prompt" placeholder="Message..."></input>
                    <em data-emoji=":alien:" className="small link" onClick={() => setShowPicker((val) => !val)}></em>
                </div> 
            </div>
        </form>
        <div className="picker-container">
            {showPicker && (
            <Picker pickerStyle={{ width: "80%" }} onEmojiClick={onEmojiClick} />
            )}
        </div>
    </div>
    )
}


export default MessageForm