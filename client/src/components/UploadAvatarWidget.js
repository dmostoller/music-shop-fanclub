import React, { useEffect, useRef } from "react";

function UploadAvatarWidget({onSetImageUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'upload-avatar',
            // cropping: true, //add a cropping step
            clientAllowedFormats: ["image"], //restrict uploading to image files only
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
    <button type="button" className="ui inverted button fluid blue small" onClick={() => widgetRef.current.open()}>
        Upload
    </button>
    </>
)

}
export default UploadAvatarWidget;