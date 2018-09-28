import * as React from "react";
// import AntdLayout from "@core/antd/Layout";
import { Layout as AntdLayout } from "antd";
const { Header, Content, Footer } = AntdLayout;

import AccountControlComponent from "@core/AccountControlComponent";
import NavMenu from "./NavMenu";

export class Layout extends React.Component<{children: React.ChildrenArray<any>}, {}> {
  render() {
    return (
      <AntdLayout>
        <Header className="antd-header">
          <NavMenu />
        </Header>
        <Content>
          <AccountControlComponent>
            {this.props.children}
          </AccountControlComponent>
        </Content>
        <Footer>
          Footer
        </Footer>
      </AntdLayout>
    );
  }
}
