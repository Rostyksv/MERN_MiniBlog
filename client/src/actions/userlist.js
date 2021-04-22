import * as api from '../api/index.js';

export const getUsers = () => async (dispatch) => {
    try {
        const { data }  = await api.userlist();
        dispatch({ type: 'GET_ALL_USERS', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getUserProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.getUserProfile(id);
        console.log('userprof', data);
        dispatch({ type: 'GET_USER_PROFILE', payload: data });
    } catch (error) {
        console.log(error);
    }
}