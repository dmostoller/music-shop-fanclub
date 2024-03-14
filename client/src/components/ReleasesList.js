import React from "react";
import Release from "./Release";


function ReleasesList ({ releases }) {
    const discography = releases.map((release) => {
        return <Release
        key={release.id}
        id={release.id}
        title={release.title}
        artist={release.artist}
        description={release.description}
        record_label={release.record_label}
        date_released={release.date_released}
        image={release.image}
        />
    })
    return (
        <div className="ui grid">{discography}</div> 
    )
}

export default ReleasesList