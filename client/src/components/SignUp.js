import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formSchema = yup.object().shape({
    username: yup.string()
    .min(2, 'Name must be minimum 2 characters')
    .max(100, 'Name must not be more than 100 characters')
    .required("Username is required"),
    password: yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required("Password is required"),
    password_confirmation: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required("Confirm password is required"),
    email: yup.string().email()
    .required("Must enter an email address"),
})
const formik = useFormik({
  initialValues: {
      username:'',
      password:'',
      password_confirmation:'',
      email:'',
  },
validationSchema: formSchema,
onSubmit: (values) => {
  fetch("/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((r) => {
    if (r.ok) {
      r.json().then(user => {
        setUser(user)
        navigate('/')
    })
    } else {
        r.json().then(error => setError(error.message))
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
                <input type="password" 
                  id="password" 
                  name="password_confirmation" 
                  value={formik.values.password_confirmation} 
                  placeholder="Password Confirmation..." 
                  onChange={formik.handleChange}
                  >
                </input>
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password_confirmation}</p>}                    
            </div>
            <div className="field">
                <input type="text" 
                  id="email" 
                  name="email" 
                  value={formik.values.email} 
                  placeholder="Email Address..." 
                  onChange={formik.handleChange}
                  >
                </input>                
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
            </div>    
            <div className="field">
                <Link to="/" className="ui button small teal">Back</Link>
                <button style={{float: "right"}} className="ui button small teal" type="submit">
                    Submit
                </button>
            </div>
            {/* <div>
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
            </div> */}
        </form> 
    </div>
)
}

export default SignUp;
