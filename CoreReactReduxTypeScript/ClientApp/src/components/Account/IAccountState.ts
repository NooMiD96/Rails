// -----------------
// STATE
import { UserTypeEnums } from "@core/constants";
import { XPT } from "@core/helpers/auth/xsrf";

export interface AccountState {
    userName?: string;
    userType: UserTypeEnums;
    pending: boolean;
    errorMessage?: string;
    _xpt: XPT | null;
}

export const UnloadedState: AccountState = { userType: UserTypeEnums.Guest, _xpt: null, pending: false };
