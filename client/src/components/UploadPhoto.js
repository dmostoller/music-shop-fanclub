import React, {useState} from "react";
// Example code to show how to upload images using an unsigned preset
// and a form.

// Note, for security reasons, the upload preset used in this example
// sets the access control mode of the uploaded assets to restricted,
// so the URLs returned in the response will return 404 errors.
function UploadPhoto() {

const url = "https://api.cloudinary.com/v1_1/ddp2xfpyb/image/upload";
const [data, setData] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  const files = document.querySelector("[type=file]").files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "photo_upload");

    fetch(url, {
      method: "POST",
      body: formData
    })
    //   .then((response) => {
    //     return response.json();
    //   })
      .then((data) => {
        setData(data);
      });
  }
};


return (
    <>
        <form className="ui inverted form" method="post" onSubmit={handleSubmit} enctype="multipart/form-data">
            <input type="file" name="files[]" multiple />
            <input className="ui inverted grey button" type="submit" value="Upload Files" name="submit" />
        </form>
        <div><p>{data}</p></div>
    
    
    </>
)

}
export default UploadPhoto