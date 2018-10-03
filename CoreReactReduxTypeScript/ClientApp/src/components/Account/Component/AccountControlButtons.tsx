import * as React from "react";
import Button from "@core/antd/Button";

import LoginSvgProps from "@antdSvgs/LoginOutline";
import LogoutSvgProps from "@antdSvgs/LogoutOutline";
import IdcardSvgProps from "@antdSvgs/IdcardOutline";
import { ModalTypeEnums } from "../TAccount";

type AccountControlButtonsProps = {
  ShowModal: (ModalType: ModalTypeEnums) => void,
  LogOut: () => void,
  userName?: string,
};

const AccountControlButtons = (props: AccountControlButtonsProps) => (
  !props.userName
  ? <React.Fragment>
      <Button
        type="primary"
        shape="circle"
        size="large"
        svgProps={LoginSvgProps}
        onClick={() => props.ShowModal(ModalTypeEnums.Authentication)}
      />
      <Button
        type="primary"
        shape="circle"
        size="large"
        svgProps={IdcardSvgProps}
        onClick={() => props.ShowModal(ModalTypeEnums.Registration)}
      />
    </React.Fragment>
    : <Button
      type="primary"
      shape="circle"
      size="large"
      svgProps={LogoutSvgProps}
      onClick={() => props.LogOut()}
    />
);

export default AccountControlButtons;
