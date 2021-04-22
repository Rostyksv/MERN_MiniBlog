import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react/cjs/react.development';
import { updateProfile } from '../../actions/profile';
import FileBase from 'react-file-base64';

import CountrySelector from './CountrySelector';

import Select from 'react-select'
import countryList from 'react-select-country-list'

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
    console.log(countryList());
    const testix = () => {
        
    }
    return (
        <div className="profile-container">
            <div className='profile-settings mb-3'>
                    <img onClick={testix} className="profile-image" src={user.imageUrl} alt='Profile image'></img>
                    <FileBase
                            type="file"
                            miltiple={false}
                            onDone={({base64}) => setUser({...user, imageUrl: base64})}
                    />
                <form className="profile-inputs" onSubmit={handleSubmit}>
                    <div className='profile-forms-block'>
                    {/* <FileBase
                        type="file"
                        miltiple={false}
                        onDone={({base64}) => setUser({...user, imageUrl: base64})}
                    /> */}
                        <div>
                            <label htmlFor="firstName">Firstname</label>
                            <br />
                            <input onChange={handleInput} id="firstName" className="form-control" value={user.firstName}></input>
                        </div>
                        <div >
                            <label htmlFor="lasttName">Lastname</label>
                            <br />
                            <input onChange={handleInput} id="lastName" className="form-control" value={user.lastName}></input>
                        </div>
                        <div >
                            <label htmlFor="email">email</label>
                            <br />
                            <input onChange={handleInput} id="email" className="form-control" value={user.email}></input>
                        </div>
                    </div>
                    <div className='profile-forms-block'>
                        <div>
                            <label htmlFor="password">password</label>
                            <br />
                            <input type='password' onChange={handleInput} id="password" className="form-control"></input>
                        </div>
                        <div >
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <br />
                            <input type='password' onChange={handleInput} id="confirmPassword" className="form-control mb-4"></input>
                        </div>
                        <button className='btn btn-success profile-update-btn'>Update</button>
                        { warning && <p className='alert alert-danger'>Password mismatch!</p>}
                    </div>
                </form>
            </div>
            
            <div className="profile-additional-info">
                <h3 style={{textAlign:'center'}} >Additional info</h3>
                <CountrySelector />
            </div>
        </div>
    )
}

export default UserProfile;
