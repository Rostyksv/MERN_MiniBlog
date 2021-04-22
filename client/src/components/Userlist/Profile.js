import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Profile() {
    const [profile, setProfile] = useState(null);
    const data = useSelector(state => state.userlist);
    const { id } = useParams();

    useEffect(() => {
        const prof = data.find((el) => el._id === id);
        setProfile(prof);
    }, []);
    if(!profile) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className='profile-visit'>
            <div className='profile-visit-container'>
            <div class="profile-visit-info-container">
                
            </div>
                <div class="profile-visit-img-container">
                    <p>{profile?.firstName + ' ' + profile?.lastName}</p>
                    <img className='profile-visit-img' src={profile?.imageUrl ? profile?.imageUrl : 'https://spinninrecords.com/images/img_profile.png'}></img>
                </div>
            </div>
        </div>
    )
}

export default Profile
