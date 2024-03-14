import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";

function Nav({onLogout}) {
        function handleLogout() {
          fetch("/logout", {
            method: "DELETE",
          }).then(() => onLogout());
        }
    return (
        <Menu className='ui top fixed inverted menu' style={{marginBottom: "25px"}}>
            <div  className="item">
                <Link to='/'><i className="galactic republic icon"></i>SuperLuminal</Link>
            </div>   
            <NavLink className="item" to='/releases'>Music</NavLink>
            <NavLink className="item"  to='/video'>Video</NavLink>
            <NavLink className="item" to='/events'>Events</NavLink>
            <NavLink className="item" to='/about'>Bio</NavLink>
            <NavLink className="item"  to='/shop'>Shop</NavLink>
             <NavLink className="item" to='/forum'>Forum</NavLink>  
            {/* <div className="item">
                <NavLink to="/">MyCollection</NavLink>
            </div>   */}

            <div className='right menu'>
                <div className='item'>
                        <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1525430860&color=%23626262&inverse=true&auto_play=true&show_user=true"></iframe>            
                </div>
                <div style={{justifyContent: 'flex-end'}} className="ui category search item">
                    <div className="ui transparent inverted icon input">
                        <input className="prompt" type="text" placeholder="Search..."></input>
                        <i className="search link icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
            </div>
            <div className="item">
                <Link to='/login' style={{marginRight: '3px'}} className="ui circular inverted grey icon button small">
                    <i className="sign in alternate icon"></i>
                </Link>
                <button onClick={handleLogout} style={{marginRight: '3px'}} className="ui circular inverted grey icon button small">
                    <i className="sign out alternate icon"></i>
                </button>
                <Link to='/user' style={{marginRight: '3px'}} className="ui circular inverted grey icon button small">
                    <i className="user icon"></i>
                </Link>
            </div>
        </Menu>
    );
};

export default Nav