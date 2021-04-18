import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Posts from './components/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import UserProfile from './components/UserProfile/UserProfile';
import { getPosts } from './actions/posts'

function App() {
  const [currentId, setCurrentId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const dispatch = useDispatch(null);

  useEffect(() => {
    dispatch(getPosts());
    console.log(currentId);
  }, [dispatch, currentId]);

  return (
    <Router>
    <div className="App">
        <Navbar />
        <div className='app-container container'>
        <Route path="/" exact>
          <>
            <Posts setCurrentId={setCurrentId} currentId={currentId} />
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
          </>
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/user/profile">
          <UserProfile />
        </Route>
      </div>
    </div>
    </Router>
  );
}

export default App;
