import OrderListScreen from '../screens/OrderListScreen';
import { Navigate } from 'react-router-dom';

const PrivateOrderList = ({userInfo}) => {
    
    return (userInfo && userInfo.isAdmin) ? <OrderListScreen /> : <Navigate to="/signin" />
}

export default PrivateOrderList;

