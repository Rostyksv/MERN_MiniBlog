import { combineReducers } from 'redux';

import {posts} from './posts';
import {showModal} from './posts';
import authReducer from './auth';
import { userProfileReducer, updateProfile } from './userProfile';

export default combineReducers({
    posts,
    showModal,
    authReducer,
    userProfileReducer,
    updateProfile
})