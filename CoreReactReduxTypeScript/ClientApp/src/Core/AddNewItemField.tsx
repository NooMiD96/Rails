import * as React from "react";
import Input, { InputProps } from "@core/antd/Input";
import {
  IKeyChangeEvent,
  IPressEnterEvent,
  IMouseClickEvent,
} from "@core/IEvents";

type AddNewItemFieldProps = {
  onSubmitHandler: (e: IPressEnterEvent | IMouseClickEvent) => void,
  onChangeHandler?: (e: IKeyChangeEvent) => void,
  text?: string,
  addonLabel?: string,
};

const AddNewItemField = (props: AddNewItemFieldProps) => {
  let inputProps: InputProps = {
    onPressEnter: props.onSubmitHandler,
  };

  if (props.onChangeHandler) {
    inputProps.onChange = props.onChangeHandler;
    inputProps.value = props.text;
  }

  if (props.addonLabel) {
    inputProps.addonBefore = (
      <span
        className="ant-input-group-addon-before"
        onClick={props.onSubmitHandler}
      >
        {props.addonLabel}
      </span>
    );
  }

  return (
    <Input {...inputProps}/>
  );
};

export default AddNewItemField;
