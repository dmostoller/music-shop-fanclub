import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../styles/Error.js"
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username"),
    password: yup.string().required("Must enter a password"),
})
  const formik = useFormik({
    initialValues: {
        username:'',
        password:'',
    },
  validationSchema: formSchema,
  onSubmit: (values) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => {
      if (r.ok) {
        r.json().then(user => {
          onLogin(user)
          navigate('/')
      })
      } else {
          r.json().then(errors => setErrors(errors.message))
      }
    })
  },
  })

  return (
    <div className="ui container">
        <form style={{width:"50%", margin:"auto", padding:"25px"}} className="ui form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label>Login</label>
                <input type="text" 
                  id="username" 
                  name="username" 
                  value={formik.values.username} 
                  placeholder="Username..." 
                  onChange={formik.handleChange}
                  >    
                </input>
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}    
            </div>
            <div className="field">
                <input type="password" 
                  id="password" 
                  name="password" 
                  value={formik.values.password} 
                  placeholder="Password..." 
                  onChange={formik.handleChange}
                  >
                </input>
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password}</p>}               
            </div>    
            <div className="field">
                <Link to="/" className="ui button small teal">Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">Login</button>
            </div>
            <div>
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
            </div>
        </form> 
    </div>
)
}

export default LoginForm