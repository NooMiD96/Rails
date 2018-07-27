// -----------------
// STATE
export enum UserTypeEnums {
    Guest,
    User,
    Admin,
}
export interface AccountState {
    userType: UserTypeEnums;
    pending: boolean;
}

export const UnloadedState: AccountState = { userType: UserTypeEnums.Guest, pending: false };
