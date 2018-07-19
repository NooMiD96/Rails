import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import Menu from "@core/Menu";

export class NavMenu extends React.Component<{}, {}> {
    componentDidMount() {
        //
    }
    public render() {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["1"]}
                >
                    <Menu.Item key="1">
                        <NavLink exact to={"/"}>
                            <span className="glyphicon glyphicon-home"></span> Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <NavLink to={"/Fetcher"}>
                            <span className="glyphicon glyphicon-home"></span> Fetcher
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <NavLink to={"/Counter"}>
                            <span className="glyphicon glyphicon-home"></span> Counter
                        </NavLink>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
