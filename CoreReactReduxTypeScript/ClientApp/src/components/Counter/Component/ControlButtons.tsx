import * as React from "react";

import Button from "@core/antd/Button";
import ButtonGroup from "@core/antd/ButtonGroup";
import Icon from "@core/antd/Icon";

interface ButtonsProps {
  Decrement: () => void;
  Increment: () => void;
}

export class ControlButtons extends React.Component<ButtonsProps, {}> {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { Decrement, Increment } = this.props;
    return (
      <ButtonGroup>
        <Button
          type="primary"
          ghost
          onClick={Decrement}
        >
          <Icon type="down-circle-o" /> Decrement
        </Button>
        <Button
          type="primary"
          ghost
          onClick={Increment}
        >
          Increment <Icon type="up-circle-o" />
        </Button>
      </ButtonGroup>
    );
  }
}
