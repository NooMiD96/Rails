import * as React from "react";

import Button from "@core/antd/Button";

export const Counter = (props: { count: number }) => (
  <React.Fragment>
    <h1>Counter</h1>
    <p>Current count: <Button
        shape="circle"
        className="display-button-current-count"
      >
        {props.count}
      </Button>
    </p>
  </React.Fragment>
);
