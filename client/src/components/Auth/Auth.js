import React, {useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.development';
import { signin, signup } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [warning, setWarning] = useState(false);
    const [warnMsg, setWarnMsg] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', payload: {result, token} });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };
    const googleFailure = () => {
        console.log('Google Sign in was unsuccessful. Try again later.')
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            for(let key in formData) {
                if(!formData[key]) {
                    setWarnMsg(key);
                    setWarning(true);
                    break;
                }
            };
        }else {
            for(let key in formData) {
                if(!formData[key] && key === 'email' || key === 'password') {
                    setWarnMsg(key);
                    setWarning(true);
                    break;
                }
            };
        }
        
        // if(!formData.password) {
        //     setWarning(true);
        //     console.log('Please enter pass');
        // }
        if(isSignup) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    }
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setWarning(false);
        }, 5000);
        return () => {
            clearTimeout(timeout);
        }
    }, [warning]);

    return (
        <div className="auth-form">
        <div className='auth-container'>
            <div className="auth-info p-3">
                <img className="auth-info-img" src="https://cdn2.iconfinder.com/data/icons/ui-elements-23/50/Exports_account-user-person-signin-login-512.png"></img>
                {isSignup ? <p>Sign up</p> : <p>Sign in</p> }
            </div>
            <form onSubmit={handleSubmit}>
            {isSignup && 
                <div className="row mb-4">
                    <div className="col">
                        <input onChange={(e) => {handleChange(e)}} type="text" className="form-control" placeholder="First name" name="firstName" aria-label="First name" />
                    </div>
                    <div className="col">
                        <input onChange={(e) => {handleChange(e)}} type="text" className="form-control" placeholder="Last name" name="lastName" aria-label="Last name" />
                    </div>
                </div>}
                <div className="mb-4">
                    <input onChange={(e) => {handleChange(e)}} placeholder="Email adress" type="email" className="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-4">
                    <input onChange={(e) => {handleChange(e)}} placeholder="Password" type="password" className="form-control" name="password" id="exampleInputPassword1"/>
                </div>
               {isSignup &&  <div className="mb-4">
                    <input onChange={(e) => {handleChange(e)}} placeholder="Repeat password" type="password" className="form-control" name="confirmPassword" id="exampleInputPassword1"/>
                </div>
                }
                { warning && <p className="alert alert-danger">Please enter {warnMsg}</p> }
                <button type="submit" className="btn btn-primary auth-btn mb-3">Submit</button>
                <GoogleLogin
                    clientId="175914545985-7hm948ecfnh99a748re027ui9kie46he.apps.googleusercontent.com"
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    buttonText="Sign in"
                    className="btn auth-btn mb-3"
                />
                <button onClick={() => {setIsSignup(!isSignup)}} type="button" className="btn btn-light mb-3">{isSignup ? 'Already registered? Sign in' : 'Dont have a account yet? Sign up'}</button>
            </form>
        </div>
        </div>
    )
}

export default Auth;
