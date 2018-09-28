// -----------------
// STATE
export enum UserTypeEnums {
    Guest,
    User,
    Employee,
    Admin,
}
export interface AccountState {
    userName?: string;
    userType: UserTypeEnums;
    pending: boolean;
    errorMessage?: string;
}

export const UnloadedState: AccountState = { userType: UserTypeEnums.Guest, pending: false };
