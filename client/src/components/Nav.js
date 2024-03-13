import React from 'react';
import { Menu, Image, Icon, Segment, Input } from 'semantic-ui-react'
import logo from '../img/logo.png'

const Nav = () => {
    return (
        <Menu style={{display: 'flex'}} className='ui top fixed centered fluid inverted menu'>
            <div  className="item">
                <div style={{marginRight: '5px'}} className="ui inverted violet basic icon button small ">  <i className="home icon"></i></div>
                <div style={{marginRight: '5px'}}className="ui inverted  violet basic icon button small ">  <i className="user icon"></i></div>
                <div style={{marginRight: '5px'}}className="ui inverted  violet basic icon button small ">Login</div>
                <div className="ui inverted  violet basic icon button small ">Signup</div>
            </div>
            <div className="item">
                <a>MyCollection</a>
            </div>     
            <div className="item">
                <a>Music</a>
            </div>
            <div className="item">
                <a>Video</a>
            </div>
            <div className="item">
                <a>Events</a>
            </div>
            <div className="item">
                <a>Bio</a>
            </div>
            <div className="item">
                <a>Shop</a>
            </div>
            <div className="item">
                <a>Forum</a>
            </div>  
            <div style={{justifyContent: 'flex-end'}} className="ui category search item">
                <div className="ui transparent inverted icon input">
                    <input className="prompt" type="text" placeholder="Search..."></input>
                    <i className="search link icon"></i>
                </div>
                <div className="results"></div>
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