import React from 'react';
import { BrowserRouter, Link, Route,Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import PrivateProfile from './components/PrivateProfile';
import PrivateProductList from './components/PrivateProductList';
import ProductEditScreen from './screens/ProductEditScreen';
import PrivateOrderList from './components/PrivateOrderList';

function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());  
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
            <div>
                <Link to="/" className="brand">amazona</Link>
            </div>
            <div>
              <Link to="/cart">Cart{cartItems.length > 0 && (<span className="badge">{cartItems.length}</span>)}</Link>
              {userInfo ? (
              <div className="dropdown">
                <Link to="#"> {userInfo.name} <i className="fa fa-caret-down"></i>{' '} </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}> Sign Out </Link>
                  </li>
                </ul>
              </div>
              ) : (
                <Link to="/signin">Sign In</Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <div className="dropdown">
                  <Link to="#admin">Admin<i className="fa fa-caret-down"></i></Link>
                  <ul className="dropdown-content">
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/productlist">Products</Link></li>
                    <li><Link to="/orderlist">Orders</Link></li>
                    <li><Link to="/userlist">Users</Link></li>
                  </ul>
                </div>
              )}
            </div>
        </header>
        <main>
          <Routes>
            <Route path="/product/:id" element={<ProductScreen />} exact></Route>
            <Route path="/cart/:id?" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen/>}></Route>
            <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
            <Route path="/order/:id" element={<OrderScreen/>}></Route>
            <Route path="/orderhistory" element={<OrderHistoryScreen/>}></Route>
            <Route path="/profile" element={<PrivateProfile userInfo={userInfo} />} />
            <Route path="/productlist" element={<PrivateProductList userInfo={userInfo} />} />
            <Route path="/orderlist" element={<PrivateOrderList userInfo={userInfo} />} />
            <Route path="/product/:id/edit" element={<ProductEditScreen></ProductEditScreen>} exact ></Route>
            <Route path="/" element={<HomeScreen/>} exact></Route>
          </Routes>
        </main>
        <footer className="row center">All rights are reserved</footer>
      </div>    
    </BrowserRouter>    
  );
}

export default App;
