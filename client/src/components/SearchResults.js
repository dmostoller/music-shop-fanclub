import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import SearchResult from "./SearchResult";
import PostSearchResult from "./PostSearchResult";
import EventSearchResult from "./EventSearchResult";


function SearchResults() {
    const {searchParams} = useParams("");
    const [releases, setReleases] = useState([]);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);


    useEffect(() => {
        fetch(`/releases`)
        .then((res) => res.json())
        .then((releases) => {setReleases(releases)})
      }, []);


    const searchResults = releases
    .filter(release => {
        return (
            release.title.toLowerCase().includes(searchParams.toLowerCase())        
        )
    })

    const resultsList = searchResults.map((searchResult) => {
        return <SearchResult 
        key={searchResult.id}
        id={searchResult.id}
        title={searchResult.title}
        image={searchResult.image}
        artist={searchResult.artist}
        description={searchResult.description}
        recordLabel={searchResult.record_label}
        />
    })
    // console.log(searchResults)

    useEffect(() => {
        fetch(`/posts`)
        .then((res) => res.json())
        .then((posts) => {setPosts(posts)})
      }, []);


    const postResults = posts
    .filter(post => {
        return (
            post.title.toLowerCase().includes(searchParams.toLowerCase())        
        )
    })

    const postResultsList = postResults.map((postResult) => {
        return <PostSearchResult 
        key={postResult.id}
        id={postResult.id}
        title={postResult.title}
        image={postResult.image_url}
        content={postResult.content}
        date={postResult.date_added}
        />
    })

    useEffect(() => {
        fetch(`/events`)
        .then((res) => res.json())
        .then((events) => {setEvents(events)})
      }, []);


    const eventResults = events
    .filter(event => {
        return (
            event.name.toLowerCase().includes(searchParams.toLowerCase())        
        )
    })

    const eventResultsList = eventResults.map((eventResult) => {
        return <EventSearchResult 
        key={eventResult.id}
        id={eventResult.id}
        title={eventResult.name}
        image={eventResult.image_url}
        date={eventResult.event_date}
        details={eventResult.details}
        />
    })


    return (
        <>
        <div className="ui container" style={{marginTop: "40px", minHeight:"100vh"}}>
         { (searchResults.length === 0 && postResults.length === 0)  ?   
             <h4 style={{padding: "50px"}} className="ui horizontal inverted divider"><span className="ui red text">Search Returned No Results</span></h4>
            :
            <h4 style={{padding: "50px"}} className="ui horizontal inverted divider">Search Results</h4>
         }
            <div className="ui centered equal width grid" style={{marginBottom: "25px"}}>
                <div className="ui inverted centered stackable five link cards">
                { (searchResults.length === 0) ?
                    <></>
                :
                resultsList
                }
                { (postResults.length === 0) ?
                    <></>
                :
                postResultsList
                
                }
                { (eventResults.length === 0) ?
                    <></>
                :
                eventResultsList
                
                }
                </div> 
            </div>
        </div>
        </>
    )
}

export default SearchResults