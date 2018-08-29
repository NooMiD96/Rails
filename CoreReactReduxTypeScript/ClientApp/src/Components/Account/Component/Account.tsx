import * as React from "react";
import Button from "@core/antd/Button";
import ButtonGroup from "@core/antd/ButtonGroup";
import Modal from "@core/antd/Modal";
import Alert from "@core/antd/Alert";

import Authentication from "./Authentication";
import Registration from "./Registration";
import AccountControlButtons from "./AccountControlButtons";

import {
  TState,
  ModalTypeEnums,
  TComponentState,
  TRegistrationModel,
  TAuthenticationModel,
} from "../TAccount";

export class Account extends React.Component<TState, TComponentState> {
  state = {
    modalType: ModalTypeEnums.Nothing,
    pending: false,
  };
  containerRef = React.createRef<HTMLDivElement>();

  static getDerivedStateFromProps(nextProps: TState, prevState: TComponentState) {
    if (prevState.pending && !nextProps.pending) {
      if (nextProps.errorMessage) {
        return {
          ...prevState,
          pending: false,
        } as TComponentState;
      }
      return {
        ...prevState,
        modalType: ModalTypeEnums.Nothing,
        pending: false,
      } as TComponentState;
    }
    return null;
  }

  HandleSubmit = (cb: Function, payload: TRegistrationModel | TAuthenticationModel) => {
    this.props.RemoveErrorMessage();
    cb(payload);
    this.setState({
      pending: true,
    });
  }

  LogOut = () => this.props.Logout();

  ShowModal = (type: ModalTypeEnums) => this.setState({
    modalType: type,
  })
  СloseModal = () => this.setState({
    modalType: ModalTypeEnums.Nothing,
  })

  render() {
    const { modalType } = this.state;
    const { pending, userName, errorMessage } = this.props;

    return (
      <div
        className="account-container"
        ref={this.containerRef}
      >
        <ButtonGroup>
          <AccountControlButtons
            ShowModal={this.ShowModal}
            LogOut={this.LogOut}
            userName={userName}
          />
          <Modal
            getContainer={() => this.containerRef.current!}
            title={<span className="account-modal-title">{ModalTypeEnums[modalType]}</span>}
            visible={modalType !== ModalTypeEnums.Nothing}
            closable={false}
            footer={null}
          >
            {
              errorMessage && <Alert
                message="Error"
                description={errorMessage}
                type="error"
                closable={false}
                style={{marginBottom: 10}}
              />
            }
            {
              modalType === ModalTypeEnums.Authentication
              && <Authentication
                HandleSubmit={(payload: TAuthenticationModel) => this.HandleSubmit(this.props.Authentication, payload)}
                HandleСlose={this.СloseModal}
                loading={pending}
              />
            }
            {
              modalType === ModalTypeEnums.Registration
              && <Registration
                HandleSubmit={(payload: TRegistrationModel) => this.HandleSubmit(this.props.Registration, payload)}
                HandleСlose={this.СloseModal}
                loading={pending}
              />
            }
          </Modal>
        </ButtonGroup>
      </div>
    );
  }
}
