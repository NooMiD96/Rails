import * as React from "react";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ModalControlButtons from "../ModalControlButtons";

import { TRegistrationModel } from "../../TAccount";

interface Props extends FormComponentProps {
  HandleSubmit: (payload: TRegistrationModel) => void;
  HandleСlose: () => void;
  loading: boolean;
}

export class Registration extends React.Component<Props, {}> {
  OnSubmit = () => {
    this.props.form.validateFields((err: any, values: TRegistrationModel & {confirm: string}) => {
      if (!err) {
        this.props.HandleSubmit({
          userName: values.userName,
          email: values.email,
          password: values.password,
        });
        this.props.form.resetFields(["password", "confirm"]);
      }
    });
  }

  OnClose = () => {
    this.props.form.resetFields();
    this.props.HandleСlose();
  }

  CompareToFirstPassword = (rule: any, value: string, callback: Function) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
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
            rules: [{ required: true, message: "Please input your user Name!" }],
          })(
            <Input
              prefix={<Icon type="user" className="input-prefix-color" />}
              placeholder="Username"
              onPressEnter={this.OnSubmit}
            />
          )}
        </FormItem>
        <FormItem
          label="E-Mail"
        >
          {getFieldDecorator("email", {
            rules: [{
                type: "email", message: "The input is not valid E-mail!",
              }, {
                required: true, message: "Please input your email!",
              }],
          })(
            <Input
              prefix={<Icon type="mail" className="input-prefix-color" />}
              type="email"
              placeholder="Email"
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
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator("confirm", {
            rules: [{
              required: true,
              message: "Please confirm your password!",
            }, {
              validator: this.CompareToFirstPassword,
              message: "Password not equals",
            }],
          })(
            <Input
              prefix={<Icon type="lock" className="input-prefix-color" />}
              type="password"
              placeholder="Confirm Password"
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
            submitTitle="Registration"
          />
        </div>
      </Form>
    );
  }
}
