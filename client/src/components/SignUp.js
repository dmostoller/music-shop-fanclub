import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/user";
import { Button, Error, Input, FormField, Label, Textarea } from "../styles";



function SignUp() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function tryAgain() {
    setError(null)
  }


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
  setError(null);

  fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((r) => {
    if (r.ok) {
      r.json().then(user => {
        setUser(user)
        toast.dark(`${user.username} has joined the Superluminal community!`);
        navigate('/')
    })
    } else {
        r.json().then(error => setError(error.message))
    }
  })
},
})



// {errors.map((err) => (
//   <Error key={err}>{err}</Error>
// ))}
if(error) return (
  <>
   <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
     <div className="column" style={{width:"450px"}}>
     <h4 className="ui inverted image header">
         <div className="content"><span className="ui inverted red text">{error}</span></div>
     </h4>
     <button onClick={tryAgain} className="ui fluid button inverted large grey" type="submit">Try Again</button>
   </div>
 </div>      
       
 </>)
  return (
    <div className="ui middle aligned center aligned grid" style={{minHeight:"100vh"}}>
            <div className="column" style={{width:"450px"}}>
            <h2 className="ui inverted image header">
          <div className="content">Create a new account</div>
        </h2>
        <form className="ui inverted form" onSubmit={formik.handleSubmit}>
            <div className="field">
                {/* <label>Create New Account</label> */}
                <div className="ui left icon input">
                <i className="user icon"></i>
                <input type="text" 
                  id="username" 
                  name="username" 
                  value={formik.values.username} 
                  placeholder="Username..." 
                  onChange={formik.handleChange}
                  >    
                </input>   
                </div>                 
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
            </div>
            <div className="field">
            <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" 
                  id="password" 
                  name="password" 
                  value={formik.values.password} 
                  placeholder="Password..." 
                  onChange={formik.handleChange}
                  >
                </input>
              </div>
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password}</p>}
             </div>   
              <div className="field">
              <div className="ui left icon input">
                <i className="lock icon"></i>
                <input type="password" 
                  id="password" 
                  name="password_confirmation" 
                  value={formik.values.password_confirmation} 
                  placeholder="Password Confirmation..." 
                  onChange={formik.handleChange}
                  >
                </input>
              </div>
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.password_confirmation}</p>}                    
            </div>
            <div className="field">
            <div className="ui left icon input">
                <i className="mail icon"></i>
                <input type="text" 
                  id="email" 
                  name="email" 
                  value={formik.values.email} 
                  placeholder="Email Address..." 
                  onChange={formik.handleChange}
                  >
                </input>  
                </div>              
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
            </div>    
                <button className="ui fluid button inverted grey large" type="submit">Submit</button>
                <div className="ui inverted message tiny">
             Already have an account? 
              <Link to="/login">    Login</Link>
            </div>
      
            {/* <div className="field">
            {errors.map((err) => (
                <Error key={err}>{err}</Error>
            ))}
            </div>  */}
        </form> 
        </div>
    </div>
)
}

export default SignUp;
