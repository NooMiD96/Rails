import * as React from "react";
import Svg, { IconDefinition } from "./Svg";

import "antd/es/button/style/index.css";
// TODO: fill props and component
export interface CustomButtonProps {
  key?: string;
  type?: string;
  shape?: "circle" | "circle-outline";
  size?: "large" | "default" | "small";
  svgProps?: IconDefinition;
  children?: React.ReactNodeArray | string | number;
  loading?: boolean;
  ghost?: boolean;
  className?: string;
  onClick?: (...props: any[]) => void;
}

const CustomButton = (props: CustomButtonProps): JSX.Element => {
  const {
    type = "",
    shape = "",
    size = "default",
    svgProps,
    loading = false,
    ghost = false,
    className = "",
    onClick,
    children,
  } = props;

  const isIconOnly = !children && typeof (children) !== "number";
  let sizeCls = "";
  switch (size) {
    case "large":
      sizeCls = "lg";
      break;
    case "small":
      sizeCls = "sm";
      break;
    default:
      break;
  }

  return (
    <button
      className={`ant-btn${
        className ? " " + className : ""}${
        type ? " ant-btn-" + type : ""}${
        sizeCls ? " ant-btn-" + sizeCls : ""}${
        shape ? " ant-btn-" + shape : ""}${
        // icon ? " ant-btn-" + icon : ""}${
        isIconOnly ? " ant-btn-icon-only" : ""}${
        loading ? " ant-btn-loading" : ""}${
        ghost ? " ant-btn-background-ghost" : ""
        }`
      }
      type="button"
      onClick={onClick}
    >
      <React.Fragment>
        {isIconOnly && <Svg svgProps={svgProps} />}
        {props.children}
      </React.Fragment>
    </button>
  );
};

export default CustomButton;
