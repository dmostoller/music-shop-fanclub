import React, { useState, useRef} from 'react'
import ThreadMessageList from './ThreadMessageList'
import MobileThread from './MobileThread'
import AddThread from './AddThread'
import ForumSearch from './ForumSearch'
import { useAdmin } from "../context/admin";

import {
  SidebarPusher,
  SidebarPushable,
  GridColumn,
  Checkbox,
  Grid,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const MobileForum = ({threads, selectedThread, searchVal, setSearchVal, onSelectThread, onDeleteThread, onAddNewThread, showAddThread, isFormVis}) => {
  const segmentRef = useRef()
  const [visible, setVisible] = useState(false)
  const {isAdmin} = useAdmin();


  const activeThreads = threads.map((thread) => {
    return <MobileThread
    key={thread.id}
    name={thread.name}
    id={thread.id}
    onSelectThread={onSelectThread}
    selectedThread={selectedThread}
    onDeleteThread={onDeleteThread}
    />
})

  return (
    <Grid columns={1} style={{marginTop: "45px"}} inverted>
      {/* <GridColumn>
        <Checkbox
          checked={visible}
          label={{ children: <code>visible</code> }}
          onChange={(e, data) => setVisible(data.checked)}
        />
      </GridColumn> */}

      <GridColumn>
        <SidebarPushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='medium'
          >
            {activeThreads}
            { isAdmin &&
                    
                            <div className='item'>
                            { isFormVis ? (
                            <AddThread 
                                onAddNewThread={onAddNewThread} 
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
                        }
                        <ForumSearch searchVal={searchVal} onSearch={setSearchVal}/>

          </Sidebar>
          <SidebarPusher>
            <ThreadMessageList threadId={selectedThread} searchVal={searchVal} setVisible={setVisible} mobile={true}/>
          </SidebarPusher>
        </SidebarPushable>
      </GridColumn>
    </Grid>
  )
}

export default MobileForum
