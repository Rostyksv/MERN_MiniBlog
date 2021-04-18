import * as api from '../api/index.js';

export const userProfile = (id) => async (dispatch) => {
    try {
        const { data } = await api.userProfile(id);
        dispatch({ type: 'USER_PROFILE', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = (id, updatedProfile) => async (dispatch) => {
    try {
        const { data } = await api.updateProfile(id, updatedProfile);
        console.log('updateProfileAction', data)
        dispatch({
            type: 'UPDATE_PROFILE',
            payload: { ...data }
        });
    } catch (error) {
        console.log(error);
    }
}