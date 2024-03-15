import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function EditPost() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [post, setPost] = useState({})
    const {id} = useParams();

    useEffect(() => {
      fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((post) => setPost(post))
  }, [id]);

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
        initialValues: initValues,
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
        <div className="ui text container" style={{marginTop: "40px"}}>
            <form style={{padding:"25px"}} className="ui inverted form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label className="inverted">Title</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Post title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <label className="inverted">Image Link</label>
                    <input type="text" name="image_url" value={formik.values.image_url} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image_url}</p>}
                </div>    
                <div className="field">
                  <label className="inverted">Content</label>
                    <textarea type="text" rows="6" name="content" value={formik.values.content} placeholder="Post content..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.content}</p>}
                </div>
                <div className="field">
                <Link to={`/posts/${id}`} className="ui button inverted grey small" >Back</Link>
                  <button style={{float: "right"}} className="ui button inverted small " type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default EditPost
