import React, { useEffect, useRef } from "react";


function UploadTrackWidget({onSetTrackUrl}) {

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'upload_track',
            multiple: false,  //restrict upload to a single file
            sources: [ "local", "url"], // restrict the upload sources to URL and local files
        }, function(error, result) { 
            if (!error && result && result.event === "success") {
                // console.log(result.info);
                onSetTrackUrl(result.info.secure_url);
    }});
    }, [onSetTrackUrl])

return (
    <>
    <button type="button" className="ui button fluid violet tiny" onClick={() => widgetRef.current.open()}>
        Upload Track
    </button>
    </>
)

}
export default UploadTrackWidget;