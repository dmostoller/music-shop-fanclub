import React, { useState, useEffect } from 'react';
import { useUser } from "../context/user";
import { useAdmin } from "../context/admin";
import Thread from './Thread';
import ThreadMessageList from './ThreadMessageList';
import AddThread from './AddThread';
import ForumSearch from './ForumSearch';
import Map from './Map';

function Forum() {
    const [threads, setThreads] = useState([]);  
    const [selectedThread, setSelectedThread] = useState(1);
    const [searchVal, setSearchVal] = useState();
    const [isFormVis, setIsFormVis] = useState();
    const {user} = useUser();
    const {isAdmin} = useAdmin();
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
      fetch("/users")
      .then((res) => res.json())
      .then((users) => {setUsers(users)})
    }, []);

    useEffect(() => {
        fetch("/forum_threads")
        .then((res) => res.json())
        .then((threads) => {setThreads(threads)})
    }, []);
    
    const deleteThread = (deleted_thread_id) => {
        setThreads(threads => threads.filter((thread) => thread.id !== deleted_thread_id))
    }

    const activeThreads = threads.map((thread) => {
        return <Thread
        key={thread.id}
        name={thread.name}
        id={thread.id}
        onSelectThread={changeThread}
        selectedThread={selectedThread}
        onDeleteThread={deleteThread}
        />
    })
    function changeThread(id) {
        setSelectedThread(id)
    }

    function showAddThread(){
        setIsFormVis(!isFormVis)
    }

    const addNewThread = (newThread) => {
        setThreads([...threads, newThread])
        showAddThread()
    } 
    return (
            <div className="ui grid" style={{width:"90%", margin:"auto", minHeight:"100vh", marginTop:"40px"}}>
                <div className="six wide wide left attached column" style={{marginTop: "100px"}}>
                    <div className="ui inverted fluid large vertical pointing menu">
                        <div className='item'>
                            Channels
                        </div>
                        {activeThreads}
                       { isAdmin ?
                        <div className='item'>
                            { isFormVis ? (
                            <AddThread 
                                onAddNewThread={addNewThread} 
                                showAddThread={showAddThread} 
                            />
                            ): 
                            <>
                            <button 
                            className='ui circular inverted violet icon button mini' 
                            onClick={showAddThread} 
                            data-inverted=""
                            data-tooltip="Add New Channel" 
                            data-position="right center" >
                                <i className='plus icon'></i>
                            </button>
                            {/* <span className="ui grey text medium">  add new channel</span> */}
                            </>
                            }
                        </div>
                        :
                        <></>
                        }
                        <ForumSearch searchVal={searchVal} onSearch={setSearchVal}/>
                        <Map users={users} />
                        </div>

                    </div>
                <div className="ten wide right attached column"  style={{marginTop: "100px"}}>
                    <ThreadMessageList threadId={selectedThread} searchVal={searchVal}/>                                   
                </div>
        </div> 
    )
}

export default Forum