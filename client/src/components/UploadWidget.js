import React, { useEffect, useRef } from "react";


function UploadWidget({onSetImageUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'upload_photo',
            multiple: false,  //restrict upload to a single file
            sources: [ "local", "url"], // restrict the upload sources to URL and local files
        }, function(error, result) { 
            if (!error && result && result.event === "success") {
                // console.log(result.info);
                onSetImageUrl(result.info.secure_url);
    }});
    }, [onSetImageUrl])

return (
    <>
    <button type="button" className="ui button fluid violet small" onClick={() => widgetRef.current.open()}>
        Upload Image
    </button>
    </>
)

}
export default UploadWidget;