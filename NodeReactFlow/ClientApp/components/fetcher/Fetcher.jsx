import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input, Row, Col } from "antd";

import Hot from "core/Hot";
import ActionCreators from "./actions";
import { State } from "./reducer";
import FetcherWrapped from "./Fetcher.style";


type LocalProps = {
    fetcher: State,
    GetData: (text: string) => void,
    PostData: (text: string) => void
}
type LocalState = {
    text: string
}

export class Fetcher extends React.Component<LocalProps, LocalState> {
    state = {
        text: ''
    }

    fetchRequest = () => {
        const text = this.state.text.trim();
        if(text){
            this.props.PostData(text);
            this.setState({
                text: ''
            });
        }
    }

    changeHandler = (e) => this.setState({
        text: e.target.value
    });

    render() {
        const { fetcher, GetData } = this.props;
        const { text } = this.state;
        return <FetcherWrapped>
            <Row>
                <Col
                    md={{ span: 22, offset: 1 }}
                    xs={{ span: 24 }}
                >
                <Input
                    addonBefore={
                        <span
                            className="ant-input-group-addon-before"
                            onClick={this.fetchRequest}
                        >
                            Send data
                        </span>
                    }
                    value={text}
                    onChange={this.changeHandler}
                    onPressEnter={this.fetchRequest}
                />
                </Col>
            </Row>
            <Row>
                <Col
                    md={{ span: 22, offset: 1 }}
                    xs={{ span: 24 }}
                >
                    <Button onClick={GetData}>
                        Fetch request
                    </Button>
                    {fetcher.dataList.map((val, index) => <p key={index}>{val}</p>)}
                </Col>
            </Row>
        </FetcherWrapped>
    }
}

export default Hot(module,
    connect(
        state => ({
            fetcher: state.fetcher
        }),
        (ActionCreators)
    )(Fetcher)
);