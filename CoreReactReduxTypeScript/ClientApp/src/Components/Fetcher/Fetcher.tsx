import * as React from "react";
import Input, { InputProps } from "@core/Input";
import Button from "@core/Button";
import Row from "@core/Row";
import Col from "@core/Col";

import {
    TStateToProps,
    TDispatchToProps,
    TOwnState,
    IData,
} from "./TFetcher";
import FetcherWrapped from "./Fetcher.style";

export class Fetcher extends React.Component<TStateToProps & TDispatchToProps, TOwnState> {
    state: TOwnState = {
        text: "",
    };

    fetchRequest = () => {
        const text = this.state.text.trim();
        if (text) {
            this.props.PostData(text);
            this.setState({
                text: "",
            });
        }
    }

    changeHandler = (e: InputProps) => this.setState({
        text: e.target.value,
    })

    render() {
        const { data, GetData } = this.props;
        const { text } = this.state;
        return (
            <FetcherWrapped>
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
                        {data.map((val: IData) => <p key={val.id}>{val}</p>)}
                    </Col>
                </Row>
            </FetcherWrapped>
        );
    }
}
