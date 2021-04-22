import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import User from './User.js';

import { getUsers } from '../../actions/userlist';

function Userlist() {
    const [users, setUsers] = useState(null);
    const data = useSelector(state => state.userlist);
    console.log('users', users);
    console.log('data', data)
    const dispatch = useDispatch();
    useEffect(() => {
        if(data.length === 0) {
            dispatch(getUsers());
        }
        else {
            setUsers(data);
        }
        
    }, [data]);
    
    if(!users) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div class="userlist">
                <div className='userlist-info'>
                    Profiles
                </div>
            <div className='userlist-container'>
                {users.map((user, id) => {
                    return (
                        <User key={user._id} user={user}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Userlist;
