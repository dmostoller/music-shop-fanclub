import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../styles/Error.js"
import { useFormik } from "formik";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function tryAgain() {
    setError(null)
  }

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
          r.json().then(error => setError(error.message))
      }
    })
  },
  })
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
          <div className="content">Log-in to your account</div>
        </h2>
        <form className="ui inverted form initial" onSubmit={formik.handleSubmit}>
            <div className="field">
                {/* <label>Log-in to your account</label> */}
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
                {/* <Link to="/" className="ui button inverted grey small">Back</Link> */}
                <button className="ui fluid button violet large" type="submit">Login</button>
            <div>
            </div>
            <div className="ui inverted message tiny">
             New to us? 
              <Link to="/signup">    Sign Up</Link>
            </div>
        </form> 
        </div>  
    </div>
)
}

export default LoginForm