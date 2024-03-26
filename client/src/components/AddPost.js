import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function AddPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [imageLink, setImageLink] = useState("");

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        content: yup.string().required("Must enter content for your post"),
        image_url: yup.string().required("Must add an image link"),
      })

    const formik = useFormik({
      enableReinitialize: true, 
        initialValues: {
          title:'',
          content:'',
          image_url:`${imageLink}`,

        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/posts", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(post => {
                navigate(`/`)
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <>
        {error && <h2 style={{color:'red', textAlign:'center'}}> {error} </h2>}
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
        <div className="ui text container" style={{marginTop: "50px"}}>
            <form style={{marginTop: "40px", padding:"25px"}} className="ui inverted form" onSubmit={formik.handleSubmit} id="new_post_form">
            <h4 style={{marginTop: "50px"}} className="ui horizontal inverted divider">Add New Post</h4>
                <div className="field">
                    <label>Upload image then enter post info...<Link style={{float: "right"}} to="/">  Back to homepage</Link></label>
                    {(imageLink === "")?
                    <UploadWidget onSetImageUrl={setImageLink}/>
                    : (
                    <>
                    <img className="ui circular centered image small" src={imageLink} alt=""></img>
                    <input type="text" style={{visibility: "hidden"}} name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image_url}</p>}
                    </>
                    )}
                </div>    
                <div className="field">
                    <input type="text"  name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <textarea type="text" rows="6" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.content}</p>}
                </div>
                <div className="field">
                <button className="ui button fluid violet" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </div>
        </>
    )
}

export default AddPost