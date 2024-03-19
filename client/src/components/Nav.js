import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink, Link } from "react-router-dom";
import { useUser } from "../context/user.js"
import Search from './Search.js';


function Nav({onLogout}) {
    const { user } = useUser()

    function handleLogout() {
        fetch("/logout", {
        method: "DELETE",
        }).then(() => onLogout());
    }
    return (
        <Menu className='ui top fixed inverted menu' style={{marginBottom: "25px"}}>
            <div className="item">
                <Link to='/'><i className="galactic republic icon"></i>Superluminal</Link>
            </div>   
            <NavLink className="item" to='/releases'>Music</NavLink>
            <NavLink className="item"  to='/learn'>Video</NavLink>
            <NavLink className="item" to='/events'>Events</NavLink>
            <NavLink className="item" to='/about'>Bio</NavLink>
            <NavLink className="item"  to='/shop'>Shop</NavLink>
            <NavLink className="item" to='/forum'>Forum</NavLink>  
            <div className='right menu'>
                {/* <div className='item'>
                        <iframe width="100%" height="20" scrolling="no" frameborder="no" allow="autoplay" 
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1525430860&color=%23626262&inverse=true&auto_play=false&show_user=true">
                        </iframe>            
                </div> */}
                <Search/>
            </div>
            <div className="item">
                { !user ? (
                    <>
                    <Link to='/login' style={{marginRight: '3px'}} data-tooltip="Login" data-position="bottom center" className="ui circular inverted grey icon button small">
                        <i className="sign in alternate icon"></i>
                    </Link>
                    <Link to='/signup' style={{marginRight: '3px'}} data-tooltip="Sign Up" data-position="bottom right" className="ui circular inverted grey icon button small">
                        <i className="plus icon"></i>
                    </Link>
                    </>
                ) : (
                    <>
                    <button onClick={handleLogout} style={{marginRight: '3px'}} data-tooltip="Logout" data-position="bottom center" className="ui circular inverted grey icon button small">
                        <i className="sign out alternate icon"></i>
                    </button>
                    <Link to='/user' style={{marginRight: '3px'}} data-tooltip="User Profile" data-position="bottom right" className="ui circular inverted grey icon button small">
                        <i className="user icon"></i>
                    </Link>
                    </>
                )
                }
            </div>
        </Menu>
    );
};

export default Nav