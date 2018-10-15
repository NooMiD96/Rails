export const routesObject = {
  "/": 0,
  "/fetcher": 1,
  "/counter": 2,
  "/todolist": 3,
};

export const routesArray = Object.keys(routesObject);

export const allowToAllUserLocation = {
  "/": true,
  "/fetcher": true,
  "/counter": true,
};

export enum UserTypeEnums {
  Guest,
  User,
  Employee,
  Admin,
}

export type TIcons =
  "loading"
  /* Main: Button */
  | "login"
  | "idcard"
  | "logout"
  /* END Main: Button */
  /* Main: Account: Input */
  | "user"
  | "lock"
  | "mail"
  /* END Main: Account: Input */
  /* Alert */
  | "close-circle"
  | "close"
  /* END Alert */
  /* Input */
  | "left"
  | "right"
  /* END Input */
  /* Counter: Button */
  | "down-circle-o"
  | "up-circle-o"
  /* END Counter: Button */
  ;

export const getIconAsync = async (type: TIcons) => {
  switch (type) {
    case "loading":
      return (await import(/* webpackChunkName: "main-client.global.icons" */ "@antdSvgs/LoadingOutline")).default;
/* Main: Button */
    case "login":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/LoginOutline")).default;
    case "idcard":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/IdcardOutline")).default;
    case "logout":
      return (await import(/* webpackChunkName: "main-client.icons" */ "@antdSvgs/LogoutOutline")).default;
/* END Main: Button */
/* Main: Account: Input */
    case "user":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/UserOutline")).default;
    case "lock":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/LockOutline")).default;
    case "mail":
      return (await import(/* webpackChunkName: "account.modal.icons" */ "@antdSvgs/MailOutline")).default;
/* END Main: Account: Input */
/* Alert */
    case "close-circle":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseCircleOutline")).default;
    case "close":
      return (await import(/* webpackChunkName: "alert.icons" */ "@antdSvgs/CloseOutline")).default;
/* END Alert */
/* Input */
    case "left":
      return (await import(/* webpackChunkName: "input.icons" */ "@antdSvgs/LeftOutline")).default;
    case "right":
      return (await import(/* webpackChunkName: "input.icons" */ "@antdSvgs/RightOutline")).default;
/* END Input */
/* Counter: Button */
    case "down-circle-o":
      return (await import(/* webpackChunkName: "counter.icons" */ "@antdSvgs/DownCircleOutline")).default;
    case "up-circle-o":
      return (await import(/* webpackChunkName: "counter.icons" */ "@antdSvgs/UpCircleOutline")).default;
/* END Counter: Button */
    default:
      const exhaustiveCheck: never = type;
      throw new Error(`SVG with "${exhaustiveCheck}" type not found!`);
  }
};
