import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function AddRelease() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [image, setImage] = useState("");

    const formSchema = yup.object().shape({
        title: yup.string()
            .required("Must enter a title")
            .min(2, 'name must be more than two characters'),
        artist: yup.string().required("Must enter an artist name"),
        description: yup.string().required("Must add an description"),
        record_label: yup.string().required("Must enter an record label"),
        date_released: yup.string().required("Must enter a release date"),
        image: yup.string().required("Must enter an image link"),
        buy_link: yup.string().required("Must enter a purchase link"),
      })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          title:'',
          artist:'',
          description:'',
          record_label:'',
          date_released:'',
          image:`${image}`,
          buy_link: '',
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
        <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
        <div className="ui text container" style={{marginTop: "40px"}}>
            <form style={{marginTop: "40px", padding:"25px"}} className="ui inverted form" onSubmit={formik.handleSubmit}>
            <h4 class="ui horizontal inverted divider">Add New Release</h4>
                
                <div className="field">
                    <label>Upload image, then enter release info... <Link style={{float:"right"}}to="/releases">  Back to Releases Page</Link></label>
                    {(image === "")?
                    <UploadWidget onSetImageUrl={setImage}/>
                    : (
                    <>
                    <img className="ui circular centered image small" src={image} alt=""></img>
                    <input type="text" name="image" style={{visibility: "hidden"}} value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image}</p>}
                    </>
                    )}
                </div>
                <div className="field">
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
                    <input type="date" name="date_released" value={formik.values.date_released} placeholder="Release date..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.date_released}</p>}
                </div>
                <div className="field">
                    <input type="text" name="buy_link" value={formik.values.buy_link} placeholder="Purchase link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.buy_link}</p>}
                </div>
                <div className="field">
                  <button className="ui button fluid violet small" type="submit">Submit</button>
                </div>
            </form> 
        </div>
        </div>
        </>
    )
}

export default AddRelease

