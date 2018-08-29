import * as React from "react";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Spin from "@core/antd/Spin";
import Table, { Column } from "@core/antd/Table";

import Alert from "@core/Alert";

import { Testdnd } from "./Testdnd";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";
import {
  TState,
  TComponentState,
} from "../TTodoList";

import TodoListWrapped from "./TodoList.style";

export class TodoList extends React.Component<TState, TComponentState> {
  state = {
    text: "",
  };

  componentDidMount() {
    this.props.GetData();
    this.setState({
    });
  }

  static getDerivedStateFromProps(nextProps: TState, prevState: TComponentState) {
    return null;
  }

  fetchRequest = (_e: IPressEnterEvent | IMouseClickEvent) => {
    const text = this.state.text.trim();
    if (text) {
      this.props.PostData(text);
      this.setState({
        text: "",
      });
    }
  }

  changeHandler = (e: IKeyChangeEvent) => this.setState({
    text: e.currentTarget.value,
  })

  render() {
    const { errorMessage, RemoveErrorMessage, todoList, GetData, pending } = this.props;
    const { text } = this.state;
    return (
      <TodoListWrapped>
        <Alert
          message={errorMessage}
          closable
          onClose={() => RemoveErrorMessage()}
          type="error"
        />
        <Spin spinning={pending}>
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
                    Create new todo list
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
              <Spin spinning={pending}>
                <Testdnd />
              </Spin>
            </Col>
          </Row>
        </Spin>
      </TodoListWrapped>
    );
  }
}
