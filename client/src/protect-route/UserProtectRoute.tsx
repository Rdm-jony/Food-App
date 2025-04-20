import { useUserStore } from '@/stote/useUserStore';
import { Navigate } from 'react-router-dom';

const UserProtectRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated } = useUserStore()
    console.log(user)
    if (!isAuthenticated) {
        return <Navigate to="/signIn" replace></Navigate>
    }
    if (!user?.isVerified) {


        return <Navigate to="/verifyEmail" replace></Navigate>

    }

    return children;

};

export default UserProtectRoute;