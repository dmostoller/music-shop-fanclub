import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import ReleasesList from "./ReleasesList";

function ReleasesPage() {
    const { user } = useUser()
    const {isAdmin} = useAdmin()
    const [releases, setReleases] = useState([])

    useEffect(() => {
        fetch(`/releases`)
        .then((res) => res.json())
        .then((releases) => {setReleases(releases)})
      }, []);
      
    const deleteRelease = (deleted_release_id) => {
        setReleases(releases => releases.filter((release) => release.id !== deleted_release_id))
        // console.log(deleted_track_id)
    }
    const sortedReleases = releases.sort((a, b) => (a.date_released) > (b.date_released) ? -1 : 1)

    const [compact, setCompact] = useState(true);
        function changeTab(){
            setCompact(!compact)
        }


    return (
        <div className="ui container" style={{backgroundColor: "#303030", marginTop:"40px"}} >

            <div className="ui inverted centered secondary pointing menu" style={{marginTop: "10px"}}>
                { compact ?
                <a onClick={changeTab} className="active item">Collapsed View</a>
                :
                <a onClick={changeTab} className="item">Collapsed View</a>
                }
                
                
                { !compact ? 
                <a onClick={changeTab} className="active item">Expanded View</a>
                :
                <a onClick={changeTab} className="item">Expanded View</a>
                }
            </div>
            
            
            <div className="ui container">
                <ReleasesList releases={sortedReleases} onDeleteRelease={deleteRelease} compact={compact}/>
            </div>
            { user && isAdmin ?
            <div className="ui grid container centered">
            <Link to={`/releases/new`} style={{margin: "25px"}} className="ui circular icon secondary button"><i className="plus icon"></i></Link>
            </div>
            : <></>
            }



        </div>
    )
}


export default ReleasesPage