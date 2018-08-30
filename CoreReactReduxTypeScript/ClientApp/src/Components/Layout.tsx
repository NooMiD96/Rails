import * as React from "react";
import AntdLayout from "@core/antd/Layout";
const { Header, Content, Footer } = AntdLayout;

import AccountControlComponent from "@core/AccountControlComponent";
import NavMenu from "./NavMenu";

export class Layout extends React.Component<{}, {}> {
  public render() {
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
