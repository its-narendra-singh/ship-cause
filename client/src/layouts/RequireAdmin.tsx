import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';

const RequireAdmin = ({ children }: { children: any }) => {
    const auth = useSelector((state: RootState) => state.auth);
    if (!auth.user || !auth.accessToken || auth.user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return children;
};

export default RequireAdmin;