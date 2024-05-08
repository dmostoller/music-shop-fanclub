import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, DropdownMenu } from 'semantic-ui-react'
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

    const [deviceSize, setDeviceSize] = useState(window.innerWidth);

    useEffect(() => {
      const resizeW = () => setDeviceSize(window.innerWidth);
      window.addEventListener("resize", resizeW); // Update the width on resize
      return () => window.removeEventListener("resize", resizeW);
    });
  // console.log(deviceSize)


    return (
        <Menu className='ui top fixed inverted menu' style={{marginBottom: "25px"}}>
        {(deviceSize <= 768) && 
            <>
            <Dropdown     
            icon='inverted hamburger'
            style={{padding: "1em"}}
            floating
            className='inverted fluid dropdown icon'>
                <DropdownMenu>
                    <NavLink className="item" to='/releases'>Music</NavLink>
                    <NavLink className="item"  to='/learn'>Video</NavLink>
                    <NavLink className="item" to='/events'>Events</NavLink>
                    <NavLink className="item" to='/about'>Bio</NavLink>
                    <NavLink className="item" to='/forum'>Forum</NavLink>  
                </DropdownMenu>
            </Dropdown>
            </>
        }
            <div className="item">
                <Link to='/'><i className="galactic republic icon"></i>Superluminal</Link>
            </div>   

        {(deviceSize > 768) &&
        <>
            <NavLink className="item" to='/releases'>Music</NavLink>
            <NavLink className="item"  to='/learn'>Video</NavLink>
            <NavLink className="item" to='/events'>Events</NavLink>
            <NavLink className="item" to='/about'>Bio</NavLink>
            <NavLink className="item" to='/forum'>Forum</NavLink>  

        </>
        }
            <div className='right menu'>
                <Search/>
            </div>
            <div className="item">
                { !user ? (
                    <>
                    <Link to='/login' style={{marginRight: '3px'}} data-inverted="" data-tooltip="Login" data-position="bottom center" className="ui circular violet icon button small">
                        <i className="sign in alternate icon"></i>
                    </Link>
                    <Link to='/signup' style={{marginRight: '3px'}} data-inverted="" data-tooltip="Sign Up" data-position="bottom right" className="ui circular violet icon button small">
                        <i className="plus icon"></i>
                    </Link>
                    </>
                ) : (
                    <>
                    <button onClick={handleLogout} style={{marginRight: '3px'}} data-inverted="" data-tooltip="Logout" data-position="bottom center" className="ui circular violet icon button small">
                        <i className="sign out alternate icon"></i>
                    </button>
                    <Link to='/user' style={{marginRight: '3px'}} data-inverted="" data-tooltip="User Profile" data-position="bottom right" className="ui circular violet icon button small">
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