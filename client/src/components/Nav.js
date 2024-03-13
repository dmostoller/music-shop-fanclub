import React from 'react';
import { Menu } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";

function Nav() {
    return (
        <Menu className='ui top fixed inverted menu' style={{marginBottom: "25px"}}>
            <div  className="item">
                <NavLink to='/'><i className="home icon"></i></NavLink>
            </div>
            <div className="item">
                <NavLink to="/">MyCollection</NavLink>
            </div>     
            <div className="item">
                <NavLink to='/'>Music</NavLink>
            </div>
            <div className="item">
                <NavLink to='/'>Video</NavLink>
            </div>
            <div className="item">
                <NavLink to='/'>Events</NavLink>
            </div>
            <div className="item">
                <NavLink to='/'>Bio</NavLink>
            </div>
            <div className="item">
                <NavLink to='/shop'>Shop</NavLink>
            </div>
            <div className="item">
                <NavLink to='/'>Forum</NavLink>
            </div>  
            <div className='right menu'>
                <div style={{justifyContent: 'flex-end'}} className="ui category search item">
                    <div className="ui transparent inverted icon input">
                        <input className="prompt" type="text" placeholder="Search..."></input>
                        <i className="search link icon"></i>
                    </div>
                    <div className="results"></div>
                </div>
            </div>
            <div className="item">
                <div style={{marginRight: '3px'}} className="ui circular inverted secondary icon button small"> <i className="sign in alternate icon"></i></div>
                <div style={{marginRight: '3px'}} className="ui circular inverted secondary icon button small"> <i className="sign out alternate icon"></i></div>
                <div style={{marginRight: '3px'}} className="ui circular inverted secondary icon button small">  <i className="user icon"></i></div>
            </div>
            {/* <Segment className='nav-segment'>
                <Menu.Item>
                    <Image src={logo} size='tiny' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                <Menu.Item>
                    <Icon name='shopping cart' size='large' color='green'/>
                </Menu.Item>
            </Segment> */}
        </Menu>
    );
};

export default Nav