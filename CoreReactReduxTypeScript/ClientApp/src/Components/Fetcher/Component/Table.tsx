import * as React from "react";

import Button from "@core/antd/Button";
import AntdTable, { Column } from "@core/antd/Table";

import { IData } from "../IFetcherState";

interface ComponentProps {
  data: IData[];
  getData: () => void;
}

export class Table extends React.PureComponent<ComponentProps, {}> {
  render() {
    const { data, getData } = this.props;

    return (
      <React.Fragment>
        <Button onClick={getData}>
          Fetch request
        </Button>
        <AntdTable
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
        </AntdTable>
      </React.Fragment>
    );
  }
}
