import React, { useState } from 'react';
import { AiFillLike, AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import moment from 'moment';

import { deletePost, likePost} from '../actions/posts.js';
import { useEffect } from 'react/cjs/react.development';

import {showModal, hideModal} from '../actions/posts';

function Post( {post, setCurrentId, setTag} ) {
    const {name, title, message, tags, selectedFile, _id, createdAd, likes, creator} = post;
    const [readMore, setReadMore] = useState(false);
    const user = JSON.parse(localStorage.getItem('profile'))?.result;

    //console.log('id', user._id);
    const dispatch = useDispatch();

    //{() => {setCurrentId(_id)}}
    //console.log(user._id == creator);
    //console.log('creator', creator);
    if(user === null) {
        return (
            <div>
                Error, please login...
            </div>
        )
    }
    return(
        <div className='app-post'>
            <div className="post-container">
                <div className='top-post'>
                    {selectedFile ? <img onClick={() => dispatch(showModal({showModal: true, img: selectedFile}))} src={selectedFile} id='postImg' alt={'No image'}></img> : <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSgM3hZ8VQVLXRdp7H1KXBghWyGtk-OWsBZg&usqp=CAU'} id='postImg' alt={'No image'}></img>}
                    <div className='top-info'>
                        <p> {name}<span style={{display:'block', fontSize:'0.7rem'}}>{moment(createdAd).fromNow()}</span></p>
                        {creator == user?.googleId || user?._id == creator ? <div><button onClick={() => setCurrentId(_id)}>...</button></div> : ''}
                        
                    </div>
                </div>
                <div className={'btm-post'}>
                    <div className='info-container'>
                        {tags.map((el,i) => {
                            if(el) {
                            return (
                                <button onClick={(e) => {setTag(e.target.value)}} className={tags.length > 0 ? 'tag-btns' : 'tag-btns-none'} key={_id+i} value={el}>{el && '#' + el}</button>
                            )
                        }
                        })}
                        <h3>{title}</h3>
                        <p className='btm-post-message'>{message.length > 110 && readMore==false ? message.slice(0, 110)+'... '  : message}
                           {message.length > 110 && <button className='post-read-more' onClick={() => {setReadMore(!readMore)}}>{readMore ? 'Read less' : 'Read more'}</button>}
                        </p>
                    </div>
                    <div className='btns-container'>
                        <button onClick={() => {dispatch(likePost(_id))}}><AiFillLike />LIKE {likes.length}</button>
                        {creator == user?.googleId || user?._id == creator ? <button onClick={() => {dispatch(deletePost(_id))}} ><AiFillDelete />DELETE</button> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;

