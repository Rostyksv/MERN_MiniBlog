export const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        case 'UPDATE':
        case 'LIKE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};

export const showModal = (modal = {showModal: false, img: null}, action) => {
    switch(action.type) {
        case 'SHOW_MODAL':
            return action.payload;
        case 'HIDE_MODAL':
            return {showModal: false, img: action.payload.img}
        default:
            return modal;
    }
}