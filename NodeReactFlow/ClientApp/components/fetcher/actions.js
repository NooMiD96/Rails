import * as t from "./actionsType";
import { fetch, addTask } from 'domain-task';

// ----------------
// ACTIONS
export const actions = {
    PostDataRequest: () => ({
        type: t.PostDataRequest
    }),
    PostDataSuccess: () => ({
        type: t.PostDataSuccess
    }),
    PostDataError: () => ({
        type: t.PostDataError
    }),
    GetDataRequest: () => ({
        type: t.GetDataRequest
    }),
    GetDataSuccess: (payload) => ({
        type: t.GetDataSuccess,
        payload,
    }),
    GetDataError: () => ({
        type: t.GetDataError
    }),
}

// ----------------
// ACTION CREATORS
const ActionCreators = {
    GetData: () => (dispatch) => {
        const fetchTask = fetch('/api/GetString', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            }).then(res => {
                return res.json();
            }).then(value => {
                dispatch(actions.GetDataSuccess(value));
            })
            .catch(err => {
                console.log(err);
                dispatch(actions.GetDataError());
            });
    
        addTask(fetchTask);
        dispatch(actions.GetDataRequest());
    },
    PostData: (text) => (dispatch) => {
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
                dispatch(actions.PostDataSuccess());
                ActionCreators.GetData()(dispatch);
            }).catch(err => {
                console.log(err);
                dispatch(actions.PostDataError());
            });
        
        addTask(fetchTask);
        dispatch(actions.PostDataRequest());
    },

}

export default ActionCreators;