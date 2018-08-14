import * as React from "react";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Spin from "@core/antd/Spin";
import Table, { Column } from "@core/antd/Table";

import Alert from "@core/Alert";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";
import {
  TState,
  PendingTypeEnums,
  TComponentState,
} from "../TFetcher";

import FetcherWrapped from "./Fetcher.style";

export class Fetcher extends React.Component<TState, TComponentState> {
  state = {
    text: "",
    pendingType: PendingTypeEnums.Nothing,
  };

  componentDidMount() {
    this.props.GetData();
    this.setState({
      pendingType: PendingTypeEnums.GetData,
    });
  }

  static getDerivedStateFromProps(nextProps: TState, prevState: TComponentState) {
    if (!nextProps.pending) {
      return { pendingType: PendingTypeEnums.Nothing } as TComponentState;
    }
    if (nextProps.pending && prevState.pendingType === PendingTypeEnums.Nothing) {
      return { pendingType: PendingTypeEnums.SendData } as TComponentState;
    }
    return null;
  }

  fetchRequest = (_e: IPressEnterEvent | IMouseClickEvent) => {
    const text = this.state.text.trim();
    if (text) {
      this.props.PostData(text);
      this.setState({
        text: "",
        pendingType: PendingTypeEnums.SendData,
      });
    }
  }

  changeHandler = (e: IKeyChangeEvent) => this.setState({
    text: e.currentTarget.value,
  })

  render() {
    const { errorMessage, RemoveErrorMessage, data, GetData } = this.props;
    const { text, pendingType } = this.state;
    return (
      <FetcherWrapped>
        <Alert
          message={errorMessage}
          closable
          onClose={() => RemoveErrorMessage()}
          type="error"
        />
        <Spin spinning={pendingType === PendingTypeEnums.SendData}>
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
              <Spin spinning={pendingType === PendingTypeEnums.GetData}>
                <Button onClick={GetData}>
                  Fetch request
                </Button>
                <Table
                  dataSource={data}
                  rowKey="id"
                >
                  <Column
                    title="Id"
                    key="Id"
                    dataIndex="id"
                  />
                  <Column
                    title="Data"
                    key="Data"
                    dataIndex="data"
                  />
                </Table>
              </Spin>
            </Col>
          </Row>
        </Spin>
      </FetcherWrapped>
    );
  }
}
