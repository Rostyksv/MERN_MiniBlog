import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { getUserProfile } from '../../actions/userlist';

function User({ user }) {
    const { _id, firstName, lastName, imageUrl } = user;
    const dispatch = useDispatch();
    return (
        <div className='user-container'>
            <div className='user-img-container'>
                <img className='user-img' src={imageUrl ? imageUrl : 'https://spinninrecords.com/images/img_profile.png'}></img>
            </div>
            <div className='user-name'>
                <Link to={`/profile/${_id}`} onClick={() => dispatch(getUserProfile(_id))}>{ firstName + ' ' + lastName }</Link>
            </div>
        </div>
    )
}

export default User;
