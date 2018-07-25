// -----------------
// STATE
export interface FetcherState {
    data: IData[];
    pending: boolean;
    errorMessage: string;
}
export interface IData {
    id: number;
    data: string;
}

export const UnloadedState: FetcherState = { data: [], pending: false, errorMessage: "" };
