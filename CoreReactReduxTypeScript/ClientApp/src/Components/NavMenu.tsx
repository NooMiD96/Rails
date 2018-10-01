import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "@core/antd/Menu";

import { ApplicationState } from "@src/Store";
import { AccountState, UserTypeEnums } from "@components/Account/IAccountState";

import Account from "@components/Account";

interface IComponentState {
  selectedKeys: string[];
}
interface IComponentProps extends AccountState { }

export class NavMenu extends React.Component<IComponentProps, IComponentState> {
  state = {
    selectedKeys: ["1"],
  };

  componentDidMount() {
    const urls = document.location!.pathname.split("/").filter(Boolean);
    if (urls.length) {
      let urlKey = "1";
      switch (urls[0].toLowerCase()) {
        case "fetcher":
          urlKey = "2";
          break;
        case "counter":
          urlKey = "3";
          break;
        case "todolist":
          urlKey = "4";
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

  render() {
    const { userType } = this.props;
    return (
      <div className="header-container">
        <div className="header-menu-container">
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
              <Link to={"/fetcher"}>Fetcher</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to={"/counter"}>Counter</Link>
            </Menu.Item>
            {
              (
                userType === UserTypeEnums.Admin
                || userType === UserTypeEnums.Employee
              ) && <Menu.Item key="4">
                <Link to={"/todolist"}>Todo List</Link>
              </Menu.Item>
            }
          </Menu>
        </div>
        <div className="header-account-container">
          <Account />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState): AccountState => state.account
)(NavMenu);
