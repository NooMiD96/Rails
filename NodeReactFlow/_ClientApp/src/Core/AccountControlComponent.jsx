import * as React from "react";
import { connect } from "react-redux";
import type { RouterState } from "connected-react-router";

import { ApplicationState } from "@src/Store";
import { AccountState, UserTypeEnums } from "@components/Account/IAccountState";

type TComponentProps = AccountState & RouterState;

const allowToAllUserLocation = {
  "/": true,
  "/counter": true,
  "/fetcher": true,
};

class AccountControlComponent extends React.Component<TComponentProps, {}> {

  shouldComponentUpdate(nextProps: TComponentProps) {
    if (this.props.location === nextProps.location) {
      return true;
    }
    switch (this.props.userType) {
      case UserTypeEnums.Admin:
        return true;

      case UserTypeEnums.Employee:
        return true;

      case UserTypeEnums.Guest:
      case UserTypeEnums.User: {
        const { pathname } = nextProps.location;
        const parthOfLocation = pathname.split("/");
        return allowToAllUserLocation[`/${parthOfLocation[1]}`] || false;
      }

      default:
        return true;
    }
  }

  render() {
    return (this.props.children);
  }
}

export default connect(
  (state: ApplicationState): TComponentProps => ({ ...state.account, ...state.router })
)(AccountControlComponent);
