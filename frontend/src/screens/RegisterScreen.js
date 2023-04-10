import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useRef(useNavigate());
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchSplit = search.split('=')[1];
  const redirect = search ? `/${searchSplit}` : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

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

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter name" required onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" placeholder="Enter confirm password" required onChange={(e) => setConfirmPassword(e.target.value)}></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit"> Register </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{' '}  <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
