import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import SearchResult from "./SearchResult";
import PostSearchResult from "./PostSearchResult";


function SearchResults() {
    // const [searchResults, setSearchResults] = useState([]);
    const {searchParams} = useParams("");
    const [releases, setReleases] = useState([]);
    const [posts, setPosts] = useState([]);
    const [noResults, setNoResults] = useState(false);


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
        record_label={searchResult.record_label}
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
        date={postResult.date_added}
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
            <div className="ui centered grid" style={{marginBottom: "25px"}}>
                <div className="ui inverted stackable link cards">
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
                </div> 
            </div>
        </div>
        </>
    )
}

export default SearchResults