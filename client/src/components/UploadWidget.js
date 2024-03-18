import React, { useEffect, useRef, useState } from "react";


const UploadWidget = () => {
    const [imageUrl, setImageUrl] = useState("");

    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'ddp2xfpyb',
            uploadPreset: 'upload_photo'
        }, function(error, result) { 
                console.log(result.info.secure_url);
                setImageUrl(result.info.secure_url);
        });
    }, [])

return (
    <>
    <button onClick={() => widgetRef.current.open()}>
        Upload
    </button>
   <h2 className="ui red text">{imageUrl}</h2>
    </>
)

}
export default UploadWidget;