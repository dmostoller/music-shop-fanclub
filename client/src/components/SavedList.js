import React from "react"
import SavedItem from "./SavedItem.js"


export default function SavedList({savedItems, onDeleteSaved}) {

    
    const favorites = savedItems.map((savedItem) => {
        return <SavedItem 
        releaseId={savedItem.release_id}
        key={savedItem.id}
        id={savedItem.id}
        onDeleteSaved={onDeleteSaved}
        />
    })
    return (
        <div className="ui centered grid" style={{marginBottom: "25px"}}>
            <div class="ui inverted centered five link cards" >
                {favorites}
            </div> 
        </div>
    )
}

