import React from "react";
import Release from "./Release";
import ReleaseThumb from "./ReleaseThumb";


function ReleasesList ({ releases, onDeleteRelease, compact }) {
    
    const discography = releases.map((release) => {
        // console.log(release)
        return <Release
        key={release.id}
        id={release.id}
        title={release.title}
        artist={release.artist}
        description={release.description}
        record_label={release.record_label}
        date_released={release.date_released}
        buyLink={release.buy_link}
        image={release.image}
        onDeleteRelease={onDeleteRelease}
        savedItems={release.saved_items}
        />
    })

    const thumbGallery = releases.map((release) => {
        return <ReleaseThumb
        key={release.id}
        id={release.id}
        title={release.title}
        artist={release.artist}
        description={release.description}
        record_label={release.record_label}
        date_released={release.date_released}
        buyLink={release.buy_link}
        image={release.image}
        />
    })

    return (
        <>        
        { !compact ?
        <div className="ui grid">{discography}</div> 
        :
        <div className="ui centered grid" style={{marginTop:"10px", marginBottom: "25px"}}>
            <div className="ui four stackable inverted centered cards">
            {thumbGallery}
            </div>
        </div> 
        }
    </>

    )
}

export default ReleasesList