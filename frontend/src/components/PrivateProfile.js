import ProfileScreen from '../screens/ProfileScreen';
import { Navigate } from 'react-router-dom';

const PrivateProfile = ({userInfo}) => {
    
    return userInfo ? <ProfileScreen /> : <Navigate to="/signin" />
}

export default PrivateProfile;

