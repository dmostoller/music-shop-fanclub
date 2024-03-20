
import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddThread ({onAddNewThread, showAddThread, handleSearch}) {
    const [newChannelName, setNewChannelName] = useState();
    const [error, setError] = useState(null);
    
    
    const formSchema = yup.object().shape({
        name: yup.string().required("Please enter a channel name"),
      })

    const formik = useFormik({
        initialValues: {
          name:'',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/forum_threads", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(newThread => {
                onAddNewThread(newThread)
                formik.resetForm()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        <form onSubmit={formik.handleSubmit} name="new_thread" id="new_thread">
            <div className="ui transparent inverted fluid icon input">
                <input 
                className="prompt" 
                type="text" 
                id="name" 
                value={newChannelName} 
                placeholder="new channel name..."
                onChange={formik.handleChange}>
                </input>
                <button className='ui circular icon button inverted violet mini' type="submit">
                    <i className='arrow right icon'></i>
                </button>
                <button className='ui circular icon button inverted violet mini' onClick={showAddThread}>
                    <i className='undo alternate icon'></i>
                </button>
            </div>
        </form>
        </>
        )
    }