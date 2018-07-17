import { fetch, addTask } from 'domain-task';

import { AppThunkAction } from '@clientApp/store';
import { IData } from "./IFetcherState";
import * as t from "./actionsType";
// ----------------
// ACTIONS
export const ActionsList = {
    PostDataRequest: (): t.IPostDataRequest => ({
        type: t.POST_DATA_REQUEST
    }),
    PostDataSuccess: (): t.IPostDataSuccess => ({
        type: t.POST_DATA_SUCCESS
    }),
    PostDataError: (): t.IPostDataError => ({
        type: t.POST_DATA_ERROR
    }),
    GetDataRequest: (): t.IGetDataRequest => ({
        type: t.GET_DATA_REQUEST
    }),
    GetDataSuccess: (payload: IData[]): t.IGetDataSuccess => ({
        type: t.GET_DATA_SUCCESS,
        payload,
    }),
    GetDataError: (): t.IGetDataError => ({
        type: t.GET_DATA_ERROR
    }),
}
// ----------------
// ACTION CREATORS
export const ActionCreators = {
    GetData: (): AppThunkAction<t.TGetData> => (dispatch, _getState) => {
        const fetchTask = fetch('/api/GetString', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            }).then(res => {
                return res.json();
            }).then(value => {
                dispatch(ActionsList.GetDataSuccess(value));
            })
            .catch(err => {
                console.log(err);
                dispatch(ActionsList.GetDataError());
            });
    
        addTask(fetchTask);
        dispatch(ActionsList.GetDataRequest());
    },
    PostData: (text: string): AppThunkAction<t.TPostData | t.TGetData> => (dispatch, _getState) => {
        const fetchTask = fetch('/api/SaveString', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify({ data: text })
            }).then(res => {
                if(res.status !== 200) {
                    return res.json();
                }
            }).then(value => {
                if(value && value.error) {
                    throw 'content is empty';
                }
                dispatch(ActionsList.PostDataSuccess());
                ActionCreators.GetData()(dispatch, _getState);
            }).catch(err => {
                console.log(err);
                dispatch(ActionsList.PostDataError());
            });
        
        addTask(fetchTask);
        dispatch(ActionsList.PostDataRequest());
    },
}
