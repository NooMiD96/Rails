import * as React from "react";
import Icon from "@core/antd/Icon";
import Input from "@core/antd/Input";
import Form, { FormItem, FormComponentProps } from "@core/antd/Form";

import ActionButtons from "../ActionButtons";

interface Props extends FormComponentProps {
  HandleSubmit: (payload: object) => void;
  HandleСlose: () => void;
  loading: boolean;
}

export class Registration extends React.Component<Props, {}> {
  OnSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
          label="UserName"
        >
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }],
          })(
            <Input prefix={<Icon type="user" className="input-prefix-color" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          label="Password"
        >
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }],
          })(
            <Input prefix={<Icon type="lock" className="input-prefix-color" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem
          label="Confirm Password"
        >
          {getFieldDecorator("confirm", {
            rules: [{
              required: true, message: "Please confirm your password!",
            }, {
              validator: this.CompareToFirstPassword,
            }],
          })(
            <Input prefix={<Icon type="lock" className="input-prefix-color" />} type="password" placeholder="Confirm Password" />
          )}
        </FormItem>
        <div className="ant-modal-footer">
          <ActionButtons
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
