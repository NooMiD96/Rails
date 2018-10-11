import * as React from "react";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  // DraggableLocation,
  DropResult,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

// import {
//   IKeyChangeEvent,
//   IPressEnterEvent,
//   IMouseClickEvent,
// } from "@core/IEvents";

import { TodoPayload } from "../ITodoListState";

interface IComponentProps {
  label: string;
  dataSource: TodoPayload[];
}
interface TodoPayloadWithId extends TodoPayload {
  id: number;
}
interface IComponentState {
  text: string;
  items: TodoPayloadWithId[];
}

const grid = 8;
const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
  userSelect: "none",
  padding: 2 * grid,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "#28c2ffa6",
  fontSize: "16px",
  color: "whitesmoke",
  ...draggableStyle,
});
const getListStyle = (isDraggingOver: boolean): {} => ({
  background: isDraggingOver ? "lightblue" : "#28dbff40",
  borderRadius: "10%",
  padding: grid,
  width: 300,
  minHeight: 400,
});

export class DragDropTodoList extends React.Component<IComponentProps, IComponentState> {
  state: IComponentState = {
    text: "",
    items: [],
  };

  componentDidMount() {
    const newList = [...this.props.dataSource] as TodoPayloadWithId[];
    newList.forEach((x, index) => x.id = index);
    this.setState({
      items: newList,
    });
  }

  reorder = (list: TodoPayloadWithId[], startIndex: number, endIndex: number): TodoPayloadWithId[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  onDragEnd = (result: DropResult): void => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      let nextState: IComponentState = { ...this.state };

      const items = this.reorder(
        nextState.items,
        source.index,
        destination.index
      );

      if (source.droppableId === this.props.label) {
        nextState = { ...nextState, items };
      }

      this.setState(nextState);
    } else {
      // Move item to another List
    }
  }

  render() {
    const { items } = this.state;
    if (!items.length) {
      return <div />;
    }
    const { label } = this.props;
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
      >
        <Droppable
          droppableId={label}
        >
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <div className="dnd-header-label">
                <span>
                  {label}
                </span>
              </div>
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
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
      </DragDropContext>
    );
  }
}
