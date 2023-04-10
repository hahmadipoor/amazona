import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../actions/userActions';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useRef(useNavigate());
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchSplit = search.split('=')[1];
  //const redirect = search ? `/${searchSplit}` : '/';
  const redirect = search ? `${searchSplit}` : '/';
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo,loading, error } = userSignin;

  useEffect(() => {
    if (userInfo) {
      if(redirect==='shipping'){
        navigate('/shipping');
      }else if(redirect==='register'){
        navigate('/register');
      }else if(redirect==='signin'){
        navigate('/signin');
      }else{
        navigate('/');
        //navigation.current(redirect);
      }
    }
  }, [userInfo, navigation, redirect,navigate])
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit"> Sign In</button>
        </div>
        <div>
          <label />
          <div>
          New customer?{' '} <Link to={`/register?redirect=${redirect}`}> Create your account  </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

