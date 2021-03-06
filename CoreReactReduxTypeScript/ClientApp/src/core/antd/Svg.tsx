import * as React from "react";
import { IconDefinition } from "@antdSvgs/../types";
// TODO: recursive function
interface SvgProps {
  svgProps?: IconDefinition;
  className?: string;
}

const Svg = (props: SvgProps) => {
  if (!props.svgProps
    || typeof(props.svgProps.icon) !== "object"
  ) {
    return null;
  }
  const { icon } = props.svgProps;

  return (
    <i
      className={`anticon${props.className ? " " + props.className : ""}`}
    >
      <svg
        fill="currentColor"
        height="1em"
        width="1em"
        {...icon.attrs}
        >
        {
          icon.children && icon.children.map((val, index) => (
            <val.tag
              key={index}
              {...val.attrs}
            >

            </val.tag>
          ))
        }
      </svg>
    </i>
  );
};

export {
  IconDefinition,
};

export default Svg;
