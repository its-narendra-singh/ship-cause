import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';

const RequireAuth = ({ children }: { children: any }) => {
    const auth = useSelector((state: RootState) => state.auth);
    if (!auth.user || !auth.accessToken) {
        return <Navigate to="/auth" replace />;
    }
    return children;
};
export default RequireAuth;