import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUser } from "../context/user";


function EditUser({setShowEdit}){
    const [error, setError] = useState(null);
    const {user, setUser} = useUser();


    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a username"),
        email: yup.string().email().required("Must enter a valid email address"),
        password: yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required("Password is required"),
        password_confirmation: yup.string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required("Confirm password is required"),
      })
    const initValues = user
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initValues,
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch(`/update_user/${user.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(editedUser => {
                setUser(editedUser)
                formik.resetForm()
                setShowEdit()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <div className="ui inverted container" style={{marginTop: "75px"}}>
            <h4  class="ui horizontal inverted divider">My Account</h4>
            <div className="ui centered grid">
                <div className="ui inverted card" style={{margin: "10px"}}>
                    <form className="ui inverted form tiny"  onSubmit={formik.handleSubmit}>  
                        <div className="field">
                         <label>Edit User  <a onClick={setShowEdit}>  Hide</a></label>
                            <input type="text" id="username" name="username" value={formik.values.username} onChange={formik.handleChange}></input>               
                                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.username}</p>}
                         </div>
                        <div className="field">
                            <input type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}></input>
                            {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.email}</p>}
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
                        <button className="ui button fluid inverted grey tiny" type="submit">Submit</button>
                    </form>
                </div>
            </div>
         </div>
    )
}

export default EditUser