import React from "react";


export default function ForumSearch({searchVal, onSearch}) {

    return (
        <>        
        {/* <div className='item' style={{height: "55px"}}></div> */}
        <div className='item'>
            <div className="ui transparent inverted fluid icon input small">
                <input 
                type="text" 
                name="search" 
                value={searchVal} 
                placeholder="search forum..."
                onChange={(e) => onSearch(e.target.value)}>
                </input>
                <i className="ui search link icon"></i>
            </div>
        </div>
        </>


    )

}