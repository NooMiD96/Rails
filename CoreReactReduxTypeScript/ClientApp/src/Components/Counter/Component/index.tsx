import * as React from "react";

import { ControlButtons } from "./ControlButtons";
import { Counter } from "./Counter";

import {
  TComponentState,
  TState,
} from "../TCounter";

import CounterWrapper from "./styles/Counter.style";

export default class extends React.Component<TState, TComponentState> {
  render() {
    const { count, Increment, Decrement } = this.props;
    return (
      <CounterWrapper>
        <Counter
          count={count}
        />
        <ControlButtons
          Decrement={Decrement}
          Increment={Increment}
        />
      </CounterWrapper>
    );
  }
}
