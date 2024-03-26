import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUser } from "../context/user";
import Picker from "emoji-picker-react";
import GifPicker from 'gif-picker-react';
import { Link } from "react-router-dom";


const REACT_APP_TENOR_API_KEY='AIzaSyD8IIaxutwoxDDPdfZAC33_vACCtuLSZIs';

function PostCommentForm({onAddMessage, threadId}){
    const [error, setError] = useState(null);
    const {user} = useUser();
    const [inputStr, setInputStr] = useState("");
    const [showPicker, setShowPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);

    const onEmojiClick = (event, emojiObject) => {
        setInputStr((prevInput) => prevInput + emojiObject.emoji);
        setShowPicker(false);
      };

    function onGifClick(gifObject) {
        fetch("forum_messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gif: `${gifObject.url}`,
              forum_thread_id: threadId,
              message: null,
              date_added: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
            }),
          })
            .then((r) => r.json())
            .then((newMessage) => {
              onAddMessage(newMessage);
              setInputStr("");
              setShowGifPicker(false)
            });
        }


    const initValues = {
        message: inputStr,
        forum_thread_id: threadId,
        date_added: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
        gif: null,
        }

    const formSchema = yup.object().shape({
        message: yup.string().required("Please enter a message")
      })

    const formik = useFormik({
        enableReinitialize: true,   
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/forum_messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(newMessage => {
                onAddMessage(newMessage)
                formik.resetForm()
                setInputStr("")
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <div className="ui text container">
          { user ? 
          <>
          <form className="ui inverted form" onSubmit={formik.handleSubmit}>  
              <div className="field">
                  <div className="ui fluid transparent inverted input" >
                      <em data-emoji=":globe_with_meridians:" className="small link" onClick={() => setShowGifPicker((val) => !val)}></em>
                      <em data-emoji=":alien:" className="small link" onClick={() => setShowPicker((val) => !val)}></em>
                      {(threadId !==1) ?
                      <input type="fluid text" 
                      name="message" 
                      id="message" 
                      value={formik.values.message}
                      onChange={(e) => setInputStr(e.target.value)} 
                      // onChange={formik.handleChange}
                      className="prompt" 
                      placeholder="Message...">
                      </input>      
                      :
                      <input type="fluid text" 
                      name="message" 
                      id="message" 
                      readOnly
                      value={formik.values.message}
                      onChange={(e) => setInputStr(e.target.value)} 
                      // onChange={formik.handleChange}
                      className="prompt" 
                      placeholder="forum-rules is a read-only channel">
                      </input>
                      }      
                      {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.message}</p>}
                  </div> 
              </div>
          </form>
          </>
        :
        <>
          <span className="ui medium violet text">
            Please <Link to='/login'>Login</Link> or <Link to='/signup'>Create an Account</Link> to use the forum
          </span>
        </>

          }
        <div className="picker-container">
            {showPicker && (
            <Picker pickerStyle={{ width: "70%" }} onEmojiClick={onEmojiClick} reactionsDefaultOpen={true}/>
            )}
         </div>
            {showGifPicker && (
            <div className="gif-container">
                <GifPicker tenorApiKey={REACT_APP_TENOR_API_KEY} onGifClick={onGifClick}/>
            </div>
            )}

       
    </div>
    )
}

export default PostCommentForm