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

export const mainIcons = {
  /* Main: Button */
  "login": "@antdSvgs/LoginOutline",
  "idcard": "@antdSvgs/IdcardOutline",
  "logout": "@antdSvgs/LogoutOutline",
  /* END Main: Button */
};

export const icons = {
  /* Main: Account: Input */
  "user": "@antdSvgs/UserOutline",
  "lock": "@antdSvgs/LockOutline",
  "mail": "@antdSvgs/MailOutline",
  /* END Main: Account: Input */

  /* Alert */
  "close-circle": "@antdSvgs/CloseCircleOutline",
  "close": "@antdSvgs/CloseOutline",
  /* END Alert */

  /* Input */
  "left": "@antdSvgs/LeftOutline",
  "right": "@antdSvgs/RightOutline",
  /* END Input */

  /* Counter: Button */
  "down-circle-o": "@antdSvgs/DownCircleOutline",
  "up-circle-o": "@antdSvgs/UpCircleOutline",
  /* END Counter: Button */

  "loading": "@antdSvgs/LoadingOutline",
};

export type TIcons = keyof typeof icons;
export type TMainIcons = keyof typeof mainIcons;
