import React from 'react';
import { Menu } from 'semantic-ui-react';

const LeftPanel = () => {
    return (
        <>
            <Menu className='ui inverted segment' vertical size='large'>
            {/* <Image src={leftImage} /> */}
                <Menu.Item>
                    <Menu.Header>Clothings</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='shirts' />
                        <Menu.Item name='sweatshirts' />
                        <Menu.Item name='Tank Tops' />
                    </Menu.Menu>
                </Menu.Item>
                <Menu.Item>
                    <Menu.Header>Misc</Menu.Header>

                    <Menu.Menu>
                        <Menu.Item name='hats' />
                        <Menu.Item name='stickers' />
                    </Menu.Menu>
                </Menu.Item>
            </Menu>
        </>
    );
};

export default LeftPanel;