import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function AddRelease() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        artist: yup.string().required("Must enter an artist name"),
        description: yup.string().required("Must add an description"),
        record_label: yup.string().required("Must enter an record label"),
        date_released: yup.string().required("Must enter a release date"),
        image: yup.string().required("Must enter an image link"),
      })

    const formik = useFormik({
        initialValues: {
          title:'',
          artist:'',
          description:'',
          record_label:'',
          date_released:'',
          image:'',
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/releases", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(release => {
                navigate(`/releases`)
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
        <div className="ui container">
            <form style={{width:"60%", margin:"auto", marginTop: "40px", padding:"25px"}} className="ui inverted form" onSubmit={formik.handleSubmit}>
                <div className="field">
                    <label>New Release</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Release title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <input type="text" name="artist" value={formik.values.artist} placeholder="Artist name..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.artist}</p>}
                </div>    
                <div className="field">
                    <textarea type="text" rows="6" name="description" value={formik.values.description} placeholder="Release description..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.description}</p>}
                </div>
                <div className="field">
                    <input type="text" name="record_label" value={formik.values.record_label} placeholder="Record label name..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.record_label}</p>}
                </div>
                <div className="field">
                    <input type="text" name="date_released" value={formik.values.date_released} placeholder="Release date..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.date_released}</p>}
                </div>
                <div className="field">
                    <input type="text" name="image" value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image}</p>}
                </div>
                <div className="field">
                <Link to="/releases" className="ui button inverted small" >Back</Link>
                <button style={{float: "right"}} className="ui button inverted small" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </>
    )
}

export default AddRelease

