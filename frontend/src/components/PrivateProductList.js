import ProductListScreen from '../screens/ProductListScreen';
import { Navigate } from 'react-router-dom';

const PrivateProductList = ({userInfo}) => {
    
    return (userInfo && userInfo.isAdmin) ? <ProductListScreen /> : <Navigate to="/signin" />
}

export default PrivateProductList;

