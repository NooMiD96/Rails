import * as React from "react";

import { NavMenu } from "./NavMenu";
import AntdLayout from "@core/antd/Layout";
const { Header, Content, Footer } = AntdLayout;

export class Layout extends React.Component<{}, {}> {
  public render() {
    return (
      <AntdLayout>
        <Header className="antd-header">
          <NavMenu />
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>
          Footer
        </Footer>
      </AntdLayout>
    );
  }
}
