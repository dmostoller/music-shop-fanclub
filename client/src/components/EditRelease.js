import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function EditRelease() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [release, setRelease] = useState({});
    const {id} = useParams();
    const [image, setImage] = useState("");


  useEffect(() => {
      fetch(`/releases/${id}`)
      .then((res) => res.json())
      .then((release) => {
        setRelease(release)
        setImage(release.image)
  })}, [id]);

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
    
    const initValues = release 
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          title:`${release.title}`,
          artist:`${release.artist}`,
          description:`${release.description}`,
          record_label:`${release.record_label}`,
          date_released:`${release.date_released}`,
          image:`${image}`,
          buy_link:`${release.buy_link}`,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/releases/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(release => {
                navigate(`/releases/${id}`)
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
        <div className="ui text container">
            <form style={{marginTop: "40px", padding:"25px"}} className="ui inverted form" onSubmit={formik.handleSubmit}>
            <h4  style={{marginTop: "100px"}} class="ui horizontal inverted divider">Edit Release</h4>
                <div className="field">
                    <label>Image <Link style={{float:"right"}} to={`/releases/${id}`}>  Back to Release Page</Link></label>
                    <UploadWidget onSetImageUrl={setImage}/>
                    <input type="text" style={{visibility: "hidden"}} name="image" value={formik.values.image} placeholder="Image link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.image}</p>}
                    <img className="ui circular centered image small" src={image} alt=""></img>
                </div>
                <div className="field">
                  <label>Title</label>
                    <input type="text" name="title" value={formik.values.title} placeholder="Release title..." onChange={formik.handleChange}></input>
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.title}</p>}
                </div>
                <div className="field">
                    <label>Artist</label>
                    <input type="text" name="artist" value={formik.values.artist} placeholder="Artist name..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.artist}</p>}
                </div>    
                <div className="field">
                    <label>Description</label>
                    <textarea type="text" rows="10" name="description" value={formik.values.description} placeholder="Release description..." onChange={formik.handleChange}></textarea>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.description}</p>}
                </div>
                <div className="field">
                    <label>Record label</label>
                    <input type="text" name="record_label" value={formik.values.record_label} placeholder="Record label name..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.record_label}</p>}
                </div>
                <div className="field">
                    <label>Release Date</label>
                    <input type="date" name="date_released" value={formik.values.date_released} placeholder="Release date..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.date_released}</p>}
                </div>
                <div className="field">
                    <input type="text" name="buy_link" value={formik.values.buy_link} placeholder="Purchase link..." onChange={formik.handleChange}></input>               
                    {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.buy_link}</p>}
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

export default EditRelease

