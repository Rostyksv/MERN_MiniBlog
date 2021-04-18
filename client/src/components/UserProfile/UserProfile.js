import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { updateProfile } from '../../actions/profile';
import FileBase from 'react-file-base64';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [warning, setWarning] = useState(false);

    const dispatch = useDispatch();

    const profile = useSelector(state => state.userProfileReducer);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProfile(user._id, user));
    };
    const handleInput = (e) => {
        setUser({...user, [e.target.id]: e.target.value});
    }

    useEffect(() => {
        if(profile !== null) {
            setUser(profile);
        }else {
            setUser(JSON.parse(localStorage.getItem('profile'))?.result);
        }
    }, [profile]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setWarning(false);
        }, 5000);
        return () => {
            clearTimeout(timeout);
        }
    }, []);

    // useEffect(() => {
    //     if(profile === null) {
    //         return setUser(JSON.parse(localStorage.getItem('profile')).result)
    //     }
    //     setUser(profile);
    // }, []);

    if(!user) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    return (
        <div className='user-container'>
            <img className="profile-image" src={user.imageUrl} alt='Profile image'></img>
            <form className="profile-inputs" onSubmit={handleSubmit}>
                <div>
                <FileBase
                    type="file"
                    miltiple={false}
                    onDone={({base64}) => setUser({...user, imageUrl: base64})}
                />
                    <div style={{maxWidth:'300px'}}>
                        <label htmlFor="firstName">Firstname</label>
                        <br />
                        <input onChange={handleInput} id="firstName" className="form-control" value={user.firstName}></input>
                    </div>
                    <div style={{maxWidth:'300px'}}>
                        <label htmlFor="lasttName">Lastname</label>
                        <br />
                        <input onChange={handleInput} id="lastName" className="form-control" value={user.lastName}></input>
                    </div>
                    <div style={{maxWidth:'300px'}}>
                        <label htmlFor="email">email</label>
                        <br />
                        <input onChange={handleInput} id="email" className="form-control" value={user.email}></input>
                    </div>
                </div>
                <div className='pt-4'>
                    <div style={{maxWidth:'300px'}}>
                        <label htmlFor="password">password</label>
                        <br />
                        <input type='password' onChange={handleInput} id="password" className="form-control"></input>
                    </div>
                    <div style={{maxWidth:'300px'}}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <br />
                        <input type='password' onChange={handleInput} id="confirmPassword" className="form-control"></input>
                    </div>
                    { warning && <p className='alert alert-danger'>Password mismatch!</p>}
                </div>
                <button className='btn btn-success profile-update-btn'>Update</button>
            </form>
        </div>
    )
}

export default UserProfile;
