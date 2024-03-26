import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import UploadWidget from "./UploadWidget";

function FormTest() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [imageLink, setImageLink] = useState("");

    const formSchema = yup.object().shape({
      name: yup.string()
          .required("Name is required")
          .min(2, "Name must be more than two characters long"),
      email: yup.string().email().required("You must enter a valid email"),
    })

    const formik = useFormik({
      initialValues: {
        name:'',
        email:'',
      },
      validationSchema: formSchema,
      onSubmit: (values) => {
        fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
          if(res.ok) {
            res.json().then(user => {
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
        <div className="ui centered grid" style={{minHeight:"100vh"}}>
        <div className="ui text container" style={{marginTop: "50px"}}>
    <form onSubmit={formik.handleSubmit} id="form" style={{marginTop: "150px"}}>
    <div className="field">
         <input type="text"  
           name="name" 
           value={formik.values.name} 
           placeholder="Name..." 
           onChange={formik.handleChange}>
         </input>
        {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.name}</p>}
    </div>
    <div className="field">
         <input type="text"  
           name="email" 
           value={formik.values.email} 
           placeholder="Email address..." 
           onChange={formik.handleChange}>
         </input>
        {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
    </div>
    <div className="field">
      <button type="submit">Submit</button>
    </div>
</form>
</div>
</div>
        </>
    )
}

export default FormTest