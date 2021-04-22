import axios from 'axios';

const API = axios.create({ baseUrl: 'http://localhost:5000' });

//const url = 'http://localhost:5000/posts';

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (updatePost) => API.patch(`/posts/${updatePost._id}`, updatePost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const userProfile = (id) => API.get(`/user/profile/${id}`);
export const updateProfile = (id, updatedProfile) => API.patch(`/user/profile/${id}`, updatedProfile);

export const userlist = () => API.get('/userlist');

export const getUserProfile = (id) => API.get(`/profile/${id}`);