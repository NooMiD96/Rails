import * as React from "react";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Spin from "@core/antd/Spin";

import Alert from "@core/components/Alert";
import AddNewItemField from "@core/components/AddNewItemField";
import { DragDropTodoList } from "./DragDropTodoList";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";
import {
  TState,
  TComponentState,
  TTodoListModel,
} from "../TTodoList";

import TodoListWrapped from "./TodoList.style";

export class TodoList extends React.Component<TState, TComponentState> {
  state = {
    text: "",
  };

  fetchRequest = (_e: IPressEnterEvent | IMouseClickEvent) => {
    const text = this.state.text.trim();
    if (text) {
      const newTodoList: TTodoListModel = {
        todoId: 0,
        label: text,
        todoPayloads: [],
      };
      this.props.PostTodoList(newTodoList);
      this.setState({
        text: "",
      });
    }
  }

  changeHandler = (e: IKeyChangeEvent) => this.setState({
    text: e.currentTarget.value,
  })

  render() {
    const { errorMessage, RemoveErrorMessage, todoList, todoListlabel, pending } = this.props;
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
              <AddNewItemField
                onSubmitHandler={this.fetchRequest}
                addonLabel="Create new todo list"
                onChangeHandler={this.changeHandler}
                text={text}
              />
            </Col>
          </Row>
          <Row>
            <Col
              md={{ span: 22, offset: 1 }}
              xs={{ span: 24 }}
            >
              <Spin spinning={pending}>
                <DragDropTodoList
                  dataSource={todoList}
                  label={todoListlabel}
                />
              </Spin>
            </Col>
          </Row>
        </Spin>
      </TodoListWrapped>
    );
  }
}
