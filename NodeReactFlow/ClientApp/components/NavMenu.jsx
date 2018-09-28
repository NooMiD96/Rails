import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import NavMenuWrapper from "core/style/NavMenu.style";

export class NavMenu extends React.Component {
    render() {
        return (
        <NavMenuWrapper>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
            >
                <Menu.Item key="1">
                    <NavLink exact to={'/'}>
                        <span className='glyphicon glyphicon-home'></span> Home
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to={'/Fetcher'}>
                        <span className='glyphicon glyphicon-home'></span> Fetcher
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to={'/Counter'}>
                        <span className='glyphicon glyphicon-home'></span> Counter
                    </NavLink>
                </Menu.Item>
            </Menu>
        </NavMenuWrapper>
        );
    }
}
