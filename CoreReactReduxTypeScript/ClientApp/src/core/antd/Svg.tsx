import * as React from "react";
import { IconDefinition } from "@antdSvgs/../types";
// TODO: recursive function
const Svg = (props: { svgProps?: IconDefinition }) => {
  if (!props.svgProps
    || typeof(props.svgProps.icon) !== "object"
  ) {
    return null;
  }
  const { icon } = props.svgProps;

  return (
    <svg
      {...icon.attrs}
    >
      {
        icon.children && icon.children.map(val => (
          <val.tag
            {...val.attrs}
          >

          </val.tag>
        ))
      }
    </svg>
  );
};

export {
  IconDefinition,
};

export default Svg;
