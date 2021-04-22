import { combineReducers } from 'redux';

import {posts} from './posts';
import {showModal} from './posts';
import authReducer from './auth';
import { userProfileReducer, updateProfile } from './userProfile';
import { userlist, userProfile } from './userlist';

export default combineReducers({
    posts,
    showModal,
    authReducer,
    userProfileReducer,
    updateProfile,
    userlist,
    userProfile
});