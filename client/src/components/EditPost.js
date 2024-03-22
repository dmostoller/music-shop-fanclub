import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function EditPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [post, setPost] = useState({})
    const {id} = useParams();
    const [imageLink, setImageLink] = useState("");

    useEffect(() => {
      fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((post) => {
        setPost(post)
        setImageLink(post.image_url)
    })}, [id]);

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        content: yup.string().required("Must enter content for your post"),
        image_url: yup.string().required("Must add an image link"),
      })
    
    const initValues = post
    const formik = useFormik({
        enableReinitialize: true,   
        initialValues:{
          title:`${post.title}`,
          content:`${post.content}`,
          image_url:`${imageLink}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/posts/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(post => {
                navigate(`/posts/${id}`)
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
        <div className="ui text container" style={{marginTop: "80px"}}>
        <h4  style={{marginTop: "100px"}} className="ui horizontal inverted divider">Edit Post</h4>
            <form className="ui inverted form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label className="inverted">Image Link <Link to={`/posts/${id}`} style={{float:"right"}}>  Back to Post</Link></label>
                    <UploadWidget onSetImageUrl={setImageLink}/>
                    <input type="text" name="image_url"  style={{visibility: "hidden"}} value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image_url}</p>}
                    <img className="ui circular centered image small" src={imageLink} alt=""></img>
                </div>    
                <div className="field">
                    <label className="inverted">Title </label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                  <label className="inverted">Content</label>
                    <textarea type="text" rows="6" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.content}</p>}
                </div>
                <div className="field">
                  <button className="ui button violet fluid" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </div>
        </>
    )
}

export default EditPost
