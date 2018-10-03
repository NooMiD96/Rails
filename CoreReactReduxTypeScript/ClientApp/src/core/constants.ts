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
