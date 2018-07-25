import * as React from "react";
import { Link } from "react-router-dom";
import Menu from "@core/antd/Menu";

interface IState {
    selectedKeys: string[];
}

export class NavMenu extends React.Component<{}, IState> {
    state = {
        selectedKeys: ["1"],
    };

    componentDidMount() {
        const urls = document.location.pathname.split("/").filter(Boolean);
        if (urls.length) {
            let urlKey = "1";
            switch (urls[0].toLowerCase()) {
                case "fetcher":
                    urlKey = "2";
                    break;
                case "counter":
                    urlKey = "3";
                    break;
                default:
                    break;
            }
            this.setState({
                selectedKeys: [urlKey],
            });
        }
    }

    onSelectItemHandler = (event: { item: {}, key: string, selectedKeys: string[] }) => {
        if (!this.state.selectedKeys.includes(event.key)) {
            this.setState({
                selectedKeys: [event.key],
            });
        }
    }

    public render() {
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={this.state.selectedKeys}
                    onSelect={this.onSelectItemHandler}
                >
                    <Menu.Item key="1">
                        <Link to={"/"}>Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={"/Fetcher"}>Fetcher</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={"/Counter"}>Counter</Link>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}
