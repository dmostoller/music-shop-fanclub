import React, { useEffect, useRef, useState } from "react";


function UploadWidget({onSetImageUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'upload_photo',
            // clientAllowedFormats: ["images"], //restrict uploading to image files only
            multiple: false,  //restrict upload to a single file
            sources: [ "local", "url"], // restrict the upload sources to URL and local files
        }, function(error, result) { 
            if (!error && result && result.event === "success") {
                // console.log(result.info);
                onSetImageUrl(result.info.secure_url);
    }});
    }, [onSetImageUrl])
  // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme

// (error, result) => {
//   if (!error && result && result.event === "success") {
//     console.log("Done! Here is the image info: ", result.info);
//     document
//       .getElementById("uploadedimage")
//       .setAttribute("src", result.info.secure_url);
//   }
// }
// );

return (
    <>
    <button type="button" className="ui inverted button fluid blue small" onClick={() => widgetRef.current.open()}>
        Upload
    </button>
    </>
)

}
export default UploadWidget;