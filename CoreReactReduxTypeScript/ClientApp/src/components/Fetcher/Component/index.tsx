import * as React from "react";
import Input from "@core/antd/Input";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Spin from "@core/antd/Spin";

import Alert from "@core/components/Alert";
import AddNewItemField from "@core/components/AddNewItemField";
import { Table } from "./Table";

import {
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";
import {
  TState,
  PendingTypeEnums,
  TComponentState,
} from "../TFetcher";

import FetcherWrapped from "./styles/Fetcher.style";

export default class extends React.Component<TState, TComponentState> {
  state = {
    pendingType: PendingTypeEnums.Nothing,
  };
  inputFieldRef = React.createRef<Input>();

  componentDidMount() {
    this.getData();
    if (this.inputFieldRef.current) {
      this.inputFieldRef.current.focus();
    }
  }

  static getDerivedStateFromProps(nextProps: TState, prevState: TComponentState) {
    if (!nextProps.pending) {
      return { pendingType: PendingTypeEnums.Nothing } as TComponentState;
    }
    return null;
  }

  componentDidUpdate(prevProps: TState, prevState: TComponentState) {
    if (prevState.pendingType === PendingTypeEnums.SendData
      && this.state.pendingType === PendingTypeEnums.Nothing
      && !this.props.errorMessage
    ) {
      this.inputFieldRef.current!.input.value = "";
    }
  }

  getData = () => {
    this.props.GetData();
    this.setState({
      pendingType: PendingTypeEnums.GetData,
    });
  }

  postData(text: string) {
    this.props.PostData(text);
    this.setState({
      pendingType: PendingTypeEnums.SendData,
    });
  }

  fetchRequest = (_e: IPressEnterEvent | IMouseClickEvent) => {
    const text = this.inputFieldRef.current!.input.value.trim();
    if (text) {
      this.postData(text);
    }
  }

  render() {
    const { errorMessage, RemoveErrorMessage, data } = this.props;
    const { pendingType } = this.state;
    return (
      <FetcherWrapped>
        <Alert
          message={errorMessage}
          closable
          onClose={RemoveErrorMessage}
          type="error"
        />
        <Spin spinning={pendingType === PendingTypeEnums.SendData}>
          <Row>
            <Col
              md={{ span: 22, offset: 1 }}
              xs={{ span: 24 }}
            >
              <AddNewItemField
                inputFieldRef={this.inputFieldRef}
                onSubmitHandler={this.fetchRequest}
                addonLabel="Send fetch string "
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 22, offset: 1 }}
              xs={{ span: 24 }}
            >
              <Spin spinning={pendingType === PendingTypeEnums.GetData}>
                <Table
                  data={data}
                  getData={this.getData}
                />
              </Spin>
            </Col>
          </Row>
        </Spin>
      </FetcherWrapped>
    );
  }
}
