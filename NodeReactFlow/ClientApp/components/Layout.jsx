import * as React from 'react';
import { NavMenu } from './NavMenu';
import { Layout as AntdLayout } from 'antd';
const { Header, Content, Footer } = AntdLayout;

export class Layout extends React.Component {
    render() {
        return (
            <AntdLayout>
                <Header>
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
