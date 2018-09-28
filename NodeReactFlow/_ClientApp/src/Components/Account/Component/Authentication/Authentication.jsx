import * as React from "react";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ModalControlButtons from "../ModalControlButtons";

import { TAuthenticationModel } from "../../TAccount";

interface Props extends FormComponentProps {
  HandleSubmit: (payload: TAuthenticationModel) => void;
  HandleСlose: () => void;
  loading: boolean;
}

export class Authentication extends React.Component<Props, {}> {
  OnSubmit = () => {
    this.props.form.validateFields((err: any, values: TAuthenticationModel) => {
      if (!err) {
        this.props.HandleSubmit({
          password: values.password,
          userName: values.userName,
        });
        this.props.form.resetFields(["password"]);
      }
    });
  }

  OnClose = () => {
    this.props.form.resetFields();
    this.props.HandleСlose();
  }

  render() {
    const { form, loading } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Form layout="vertical" onSubmit={this.OnSubmit}>
        <FormItem
          label="User Name"
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your User Name!" }],
          })(
            <Input
              prefix={<Icon type="user" className="input-prefix-color" />}
              placeholder="User Name"
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-prefix-color" />}
              type="password"
              placeholder="Password"
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <ModalControlButtons
            HandleSubmit={this.OnSubmit}
            HandleCancel={this.OnClose}
            loading={loading}
            returnTitle="Return"
            submitTitle="Login"
          />
        </div>
      </Form>
    );
  }
}
