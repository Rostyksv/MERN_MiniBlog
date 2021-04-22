export const userlist = (state = [], action) => {
    switch(action.type) {
        case "GET_ALL_USERS":
            return action.payload;
        default:
            return state;
    }
}

export const userProfile = (state = [], action) => {
    switch(action.type) {
        case "GET_USER_PROFILE":
            return action.payload;
        default:
            return state;
    }
}