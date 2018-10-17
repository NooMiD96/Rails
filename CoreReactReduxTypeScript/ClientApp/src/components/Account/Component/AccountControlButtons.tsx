import * as React from "react";
import Button from "@core/antd/Button";

import { ModalTypeEnums } from "../TAccount";

type AccountControlButtonsProps = {
  ShowModal: (ModalType: ModalTypeEnums) => void,
  LogOut: () => void,
  userName?: string,
};

const AccountControlButtons = (props: AccountControlButtonsProps) => (
  ! props.userName
  ? <React.Fragment>
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon="login"
        onClick={() => props.ShowModal(ModalTypeEnums.Authentication)}
      />
      <Button
        type="primary"
        shape="circle"
        size="large"
        icon="idcard"
        onClick={() => props.ShowModal(ModalTypeEnums.Registration)}
      />
    </React.Fragment>
    : <Button
      type="primary"
      shape="circle"
      size="large"
      icon="logout"
      onClick={() => props.LogOut()}
    />
);

export default AccountControlButtons;
