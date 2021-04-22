export const userProfileReducer = (state = null, action) => {
    switch(action.type) {
        case 'USER_PROFILE':
            console.log('hey', action);
            return action?.payload;
        default: 
            return state;
    }
};

export const updateProfile = (state = null, action) => {
    switch(action.type) {
        case 'UPDATE_PROFILE':
            localStorage.setItem('profile', JSON.stringify({...JSON.parse(localStorage.getItem('profile')), result: action?.payload}));
            return action?.payload;
        default: 
            return state;
    }
};