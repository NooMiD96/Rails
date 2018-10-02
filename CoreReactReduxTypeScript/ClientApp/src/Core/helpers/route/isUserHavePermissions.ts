import { UserTypeEnums, allowToAllUserLocation } from "@core/constants";
import { Location } from "history";

export const isUserHavePermissions = (props: { userType: UserTypeEnums, location: Location }): boolean => {
  switch (props.userType) {
    case UserTypeEnums.Guest:
    case UserTypeEnums.User: {
      const { pathname } = props.location;
      const parthOfLocation = pathname.split("/");
      const isHavePermission = (allowToAllUserLocation as any)[`/${parthOfLocation[1]}`] || false;
      return isHavePermission;
    }

    default:
      return true;
  }
};
