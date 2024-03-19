import { useNavigate } from "react-router-dom"
import React, {useState} from "react";


function Search() {
    const navigate = useNavigate();
    const [searchVal, setSearchVal] = useState()

    function handleSearch(event) {
        event.preventDefault();
        navigate(`/search_results/${event.target.search.value}`)
        // setSearchVal("")
    }

    return (
        <>
        
        <div style={{justifyContent: 'flex-end'}} className="ui category search item">
        <form onSubmit={handleSearch} id="search">
            <div className="ui transparent inverted icon input">
                <input 
                className="prompt" 
                type="text" 
                id="search" 
                value={searchVal} 
                placeholder="Search..."
                onChange={(e) => setSearchVal(e.target.value)}>
                </input>
                <i className="search link icon"></i>
            </div>
            </form>
        </div>
        </>
    )

}

export default Search