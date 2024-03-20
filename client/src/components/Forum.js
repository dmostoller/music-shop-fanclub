import React, { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import Thread from './Thread';
import ThreadMessageList from './ThreadMessageList';


function Forum() {
    const [threads, setThreads] = useState([]);  
    const [selectedThread, setSelectedThread] = useState(1);

    useEffect(() => {
        fetch("/forum_threads")
        .then((res) => res.json())
        .then((threads) => {setThreads(threads)})
    }, []);
    
    const activeThreads = threads.map((thread) => {
        console.log(thread)
        return <Thread
        key={thread.id}
        name={thread.name}
        id={thread.id}
        onSelectThread={setSelectedThread}
        />
})


    return (
        <div className="ui grid" style={{width:"90%", margin:"auto", minHeight:"100vh", marginTop:"40px"}}>
            <div className="four wide left attached column">
            
                    <div class="ui inverted fluid large vertical pointing menu">
                        <div className='item'>
                            Channels
                        </div>
                        {activeThreads}
                    </div>

            </div>
            <div className="eleven wide right attached column" style={{height: "100"}}>
                
                <ThreadMessageList threadId={selectedThread}/>                                   
                
            </div>
        </div> 
    )
}

export default Forum