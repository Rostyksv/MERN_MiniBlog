import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userProfile } from '../../actions/profile';

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation(); //when url changes

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <div>
            <header class="app-header container">
                <Link to="/" style={{fontSize:"3rem", textDecoration:'none'}}>Posts</Link>
                <Link to="/userlist" style={{fontSize:"3rem", textDecoration:'none'}}>Userlist</Link>
                {user ? <div className='header-info'>
                    <img className='auth-info-img mr-3' src={user?.result?.imageUrl}></img>
                    { user.result.firstName ? <div><span>Hello, </span><Link to="/user/profile" onClick={() => dispatch(userProfile(user.result._id))} className='mr-3'>{user.result.firstName}</Link></div> 
                    : <span className='mr-3'>Hello, {user.result.name}</span>} 
                    <Link to="/auth" className='btn btn-danger' onClick={handleLogout}>Logout</Link>
                </div> : <Link to="/auth" className="btn btn-danger">Sign in</Link>}
            </header>
        </div>
    )
    
}

export default Navbar;
