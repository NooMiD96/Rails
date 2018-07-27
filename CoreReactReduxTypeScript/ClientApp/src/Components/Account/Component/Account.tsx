import * as React from "react";
import Button from "@core/antd/Button";
import ButtonGroup from "@core/antd/ButtonGroup";
import Modal from "@core/antd/Modal";

import Authentication from "./Authentication";
import Registration from "./Registration";

import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";
import {
  TState,
  ModalTypeEnums,
  TComponentState,
} from "../TAccount";

export class Account extends React.Component<TState, TComponentState> {
  state = {
    modalType: ModalTypeEnums.Nothing,
    loading: false,
  };
  containerRef = React.createRef<HTMLDivElement>();

  HandleSubmit = (payload: object) => {
    // TODO: request
  }

  componentDidMount() {
    // TODO: request user info
  }

  ShowModal = (type: ModalTypeEnums) => this.setState({
    modalType: type,
  })

  HandleСlose = () => this.setState({
    modalType: ModalTypeEnums.Nothing,
  })

  render() {
    const { modalType } = this.state;
    const { pending } = this.props;

    return (
      <div
        className="account-container"
        ref={this.containerRef}
      >
        <ButtonGroup>
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon="login"
            onClick={() => this.ShowModal(ModalTypeEnums.Authentication)}
          />
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon="idcard"
            onClick={() => this.ShowModal(ModalTypeEnums.Registration)}
          />
        <Modal
          getContainer={() => this.containerRef.current!}
          title={<span className="account-modal-title">{ModalTypeEnums[modalType]}</span>}
          visible={modalType !== ModalTypeEnums.Nothing}
          closable={false}
          footer={null}
        >
          {
            modalType === ModalTypeEnums.Authentication
            && <Authentication
              HandleSubmit={this.HandleSubmit}
              HandleСlose={this.HandleСlose}
              loading={pending}
            />
          }
          {
            modalType === ModalTypeEnums.Registration
            && <Registration
              HandleSubmit={this.HandleSubmit}
              HandleСlose={this.HandleСlose}
              loading={pending}
            />
          }
        </Modal>
        </ButtonGroup>
      </div>
    );
  }
}
