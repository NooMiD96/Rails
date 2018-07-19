// -----------------
// STATE
export interface FetcherState {
    data: IData[];
}
export interface IData {
    id: number;
    data: string;
}

export const UnloadedState: FetcherState = { data: [] };
