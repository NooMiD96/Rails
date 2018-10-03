// -----------------
// STATE
import { UserTypeEnums } from "@core/constants";

export interface AccountState {
    userName?: string;
    userType: UserTypeEnums;
    pending: boolean;
    errorMessage?: string;
}

export const UnloadedState: AccountState = { userType: UserTypeEnums.Guest, pending: false };
