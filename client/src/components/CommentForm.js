import React, {useState} from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useUser } from "../context/user";


function CommentForm({onAddComment, releaseId, onChangeIsComFormVis}){
    const [error, setError] = useState(null);
    const {user} = useUser()

    const formSchema = yup.object().shape({
        comment: yup.string().required("Must enter a comment"),
      })

    const formik = useFormik({
        initialValues: {
          comment:'',
          date_added: `${new Date().toLocaleDateString('en-US')} ${new Date().toLocaleTimeString('en-US')}`,
          release_id: parseInt(releaseId),
          user_id: user.id,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
          fetch("/comments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }).then((res) => {
            if(res.ok) {
              res.json().then(newComment => {
                onAddComment(newComment)
                formik.resetForm()
              })
            } else {
                res.json().then(error => setError(error.message))
            }
          })
        },
      })

    return (
        <div className="ui text container">
        <form className="ui inverted form" onSubmit={formik.handleSubmit}>  
            <div className="field">
            <label>Add Comment  <a onClick={onChangeIsComFormVis}>Hide</a></label>
                <textarea rows="2" type="text" id="comment" name="comment" value={formik.values.comment} placeholder="Your comment here" onChange={formik.handleChange}></textarea>               
                {formik.errors && <p style={{color:'red', textAlign:'center'}}>{formik.errors.comment}</p>}
            </div>
            <div className="field"></div>
            <button className="ui fluid button violet small " type="submit">Submit</button>
        </form>
         
         </div>
    )
}

export default CommentForm