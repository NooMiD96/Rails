import * as React from 'react';
import { NavMenu } from './NavMenu';
import AntdLayout from "antd/lib/layout/index";
import "antd/lib/layout/style/css";
const { Header, Content, Footer } = AntdLayout;

export class Layout extends React.Component<{}, {}> {
    public render() {
        return(
            <AntdLayout>
                <Header style={{height: 'initial'}}>
                    <NavMenu />
                </Header>
                <Content>
                    { this.props.children }
                </Content>
                <Footer>
                    Footer
                </Footer>
            </AntdLayout>
        );
    }
}
