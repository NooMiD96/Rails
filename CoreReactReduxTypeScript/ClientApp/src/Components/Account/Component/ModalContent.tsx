import * as React from "react";

import Authentication from "./Authentication";
import Registration from "./Registration";

import {
  ModalTypeEnums,
  TAuthenticationModel,
  TRegistrationModel,
} from "../TAccount";

type AccountControlButtonsProps = {
  HandleAuthSubmit: (payload: TAuthenticationModel) => void,
  HandleRegSubmit: (payload: TRegistrationModel) => void,
  generalProps: {
    HandleСlose: () => void,
    loading: boolean,
  }
  modalType: ModalTypeEnums,
};

const AccountControlButtons = (props: AccountControlButtonsProps) => {
  switch (props.modalType) {
    case ModalTypeEnums.Authentication:
      return (
        <Authentication
          HandleSubmit={props.HandleAuthSubmit}
          {...props.generalProps}
        />
      );
    case ModalTypeEnums.Registration:
      return (
        <Registration
          HandleSubmit={props.HandleRegSubmit}
          {...props.generalProps}
        />
      );
    default:
      return <div />;
  }
};

export default AccountControlButtons;
