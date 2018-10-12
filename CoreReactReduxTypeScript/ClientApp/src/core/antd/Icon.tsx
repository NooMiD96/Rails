// import * as React from "react";
// import Svg, { IconDefinition } from "./Svg";
// import { mainIcons, icons, TIcons, TMainIcons } from "../constants";

// export interface CustomIconProps {
//   type: TIcons | TMainIcons;
//   className?: string;
// }

// export interface CustomIconState {
//   svgProps: IconDefinition | null;
// }

// class CustomIcon extends React.PureComponent<CustomIconProps, CustomIconState> {
//   state: CustomIconState = {
//     svgProps: null,
//   };

//   importSvg = async (path: string) => {
//     const svg = await import(/* webpackChunkName: "icons" */ path);
//     return svg.default as IconDefinition;
//   }

//   importMainSvg = async (path: string) => {
//     const svg = await import(
//       /* webpackChunkName: "icons" */
//       path
//     );
//     return svg.default as IconDefinition;
//   }

//   loadIcon = async (type: TIcons | TMainIcons) => {
//     if (icons[type as TIcons]) {
//       const svgProps = await this.importSvg(icons[type as TIcons]);
//       this.setState({svgProps});
//     } else if (mainIcons[type as TMainIcons]) {
//       const svgProps = await this.importMainSvg(mainIcons[type as TMainIcons]);
//       this.setState({svgProps});
//     } else {
//       throw new Error(`SVG with "${type}" type not found!`);
//     }
//   }
//   async componentDidMount() {
//     const { type } = this.props;
//     try {
//       await this.loadIcon(type);
//     } catch (err) {
//       if (process.env.NODE_ENV === "development") {
//         throw new Error(err.message);
//       }
//     }
//   }

//   render() {
//     const { svgProps } = this.state;
//     return (
//       svgProps
//         ? <Svg
//           className={this.props.className}
//           svgProps={svgProps}
//         />
//         : <span />
//     );
//   }
// }

// export default CustomIcon;

import * as React from "react";
import Svg, { IconDefinition } from "./Svg";

import LoginSvgProps from "@antdSvgs/LoginOutline";
import LogoutSvgProps from "@antdSvgs/LogoutOutline";
import IdcardSvgProps from "@antdSvgs/IdcardOutline";
import UserSvg from "@antdSvgs/UserOutline";
import LockSvg from "@antdSvgs/LockOutline";
import MailSvg from "@antdSvgs/MailOutline";
import DownCircleSvg from "@antdSvgs/DownCircleOutline";
import UpCircleSvg from "@antdSvgs/UpCircleOutline";
import LeftSvg from "@antdSvgs/LeftOutline";
import RightSvg from "@antdSvgs/RightOutline";
import LoadingSvg from "@antdSvgs/LoadingOutline";
import CloseCircleSvg from "@antdSvgs/CloseCircleOutline";
import CloseSvg from "@antdSvgs/CloseOutline";

export interface CustomIconProps {
  type: string;
  className?: string;
}

const CustomIcon = (props: CustomIconProps): JSX.Element => {
  const {
    type = "",
    className = "",
  } = props;

  let svgProps: IconDefinition;
  switch (type) {
    case "user":
      svgProps = UserSvg;
      break;
    case "lock":
      svgProps = LockSvg;
      break;
    case "mail":
      svgProps = MailSvg;
      break;
    case "down-circle-o":
      svgProps = DownCircleSvg;
      break;
    case "up-circle-o":
      svgProps = UpCircleSvg;
      break;
    case "login":
      svgProps = LoginSvgProps;
      break;
    case "idcard":
      svgProps = IdcardSvgProps;
      break;
    case "logout":
      svgProps = LogoutSvgProps;
      break;
    case "left":
      svgProps = LeftSvg;
      break;
    case "right":
      svgProps = RightSvg;
      break;
    case "loading":
      svgProps = LoadingSvg;
      break;
    case "close-circle":
      svgProps = CloseCircleSvg;
      break;
    case "close":
      svgProps = CloseSvg;
      break;

    default:
      if (process.env.NODE_ENV === "development") {
        throw new Error(`SVG with "${type}" type not found!`);
      } else {
        return <span />;
      }
  }

  return (
    <Svg
      className={className}
      svgProps={svgProps}
    />
  );
};

export default CustomIcon;
