import * as React from "react";
import Input from "@core/antd/Input";
import Button from "@core/antd/Button";
import Row from "@core/antd/Row";
import Col from "@core/antd/Col";
import Spin from "@core/antd/Spin";
import Table, { Column } from "@core/antd/Table";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DraggableLocation,
  DropResult,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

import Alert from "@core/Alert";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";

import { TodoPayload } from "../ITodoListState";

interface IComponentProps {
  dataSource: TodoPayload[];
}
interface IComponentState {
  text: string;
}
export class DragDropTodoList extends React.Component<IComponentProps, IComponentState> {
  state: IComponentState = {
    text: "",
  };

  getList (id: string): TodoPayload[] {
    return this.state[this.id2List[id]];
  }

  onDragEnd(result: DropResult): void {

    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      let state:IAppState = {...this.state};

      if (source.droppableId === "droppable2") {
        state = { ...this.state, selected: items };
      } else if (source.droppableId === "droppable") {
        state = {...this.state, items}
      }

      this.setState(state);

    } else {
      const resultFromMove:IMoveResult = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      this.setState({
        items: resultFromMove.droppable,
        selected: resultFromMove.droppable2
      });
    }
  }


  render() {
    const { dataSource } = this.props;
    // const { errorMessage, RemoveErrorMessage, todoList, GetData, pending } = this.props;
    const { text } = this.state;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {dataSource.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                    <div>
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={getItemStyle(
                          providedDraggable.draggableProps.style,
                          snapshotDraggable.isDragging
                        )}
                      >
                        {item.content}
                      </div>
                      {providedDraggable.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* <Droppable droppableId="droppable2">
          {(providedDroppable2: DroppableProvided, snapshotDroppable2: DroppableStateSnapshot) => (
            <div
              ref={providedDroppable2.innerRef}
              style={getListStyle(snapshotDroppable2.isDraggingOver)}>
              {this.state.selected.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}>
                  {(providedDraggable2: DraggableProvided, snapshotDraggable2: DraggableStateSnapshot) => (
                    <div>
                      <div
                        ref={providedDraggable2.innerRef}
                        {...providedDraggable2.draggableProps}
                        {...providedDraggable2.dragHandleProps}
                        style={getItemStyle(
                          providedDraggable2.draggableProps.style,
                          snapshotDraggable2.isDragging
                        )}>
                        {item.content}
                      </div>
                      {providedDraggable2.placeholder}
                    </div>
                  )}
                </Draggable>
              ))}
              {providedDroppable2.placeholder}
            </div>
          )}
        </Droppable> */}
      </DragDropContext>
    );
  }
}
