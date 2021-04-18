import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../actions/posts';

import { createPost } from '../actions/posts';

function Form({currentId, setCurrentId}) {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));
    const post = useSelector(state => currentId!=null ? state.posts.find((post) => post._id === currentId) : null);
    console.log(postData);
    useEffect(() => {
        if(post) {
            setPostData(post);
        }
    }, [post]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId!==null) {
            dispatch(updatePost({ ...postData, name: user?.result?.firstName + user?.result?.lastName }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.firstName + user?.result?.lastName }));
        }
        clear();
    };

    const clear = () => {
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
        setCurrentId(null);
    }

    if(user === null) {
        return (
            <div className='alert alert-danger ' style={{maxHeight:'100px'}}>
                Please login to add post
            </div>
        )
    }

    return(
        <div className='form-element'>
            <h4 style={{textAlign:'center'}} > {currentId !== null ? 'Editing' : 'Creating'} a Memory</h4>
            <form className='form-container' onSubmit={(e) => handleSubmit(e)}>
                <input placeholder='Title' id='Title' type='text' value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})}></input>
                <textarea placeholder='Message' id='Message' value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})}></textarea>
                <input placeholder='Tags(coma seperated)' id='Tags' type='text' value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}></input>
                <FileBase
                    type="file"
                    miltiple={false}
                    onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                />
                <button type='submit' className='btn btn-primary mb-1'>SUBMIT</button>
                <button className='btn btn-danger' type='button' onClick={clear}>CLEAR</button>
            </form>
        </div>
    )
}

export default Form;