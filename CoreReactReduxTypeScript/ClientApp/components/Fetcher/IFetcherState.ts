// -----------------
// STATE
export interface FetcherState {
    data: IData[],
}
export interface IData {
    data: string,
};

export const UnloadedState: FetcherState = { data: [] };
