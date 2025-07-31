import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import Users from './pages/users';
import MainLayout from './layouts';
import ProfilePage from './pages/Profile';
import RequireAuth from './layouts/RequireAuth';
import RequireAdmin from './layouts/RequireAdmin';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
    {
        path: '/profile',
        element: (
            <RequireAuth>
                <MainLayout>
                    <ProfilePage />
                </MainLayout>
            </RequireAuth>
        ),
    },
    {
        path: '/auth',
        element: (
            <Auth />
        ),
    },
    {
        path: '/users',
        element: (
            <RequireAdmin>
                <MainLayout>
                    <Users />
                </MainLayout>
            </RequireAdmin>
        ),
    },
    {
        path: '*',
        element: (
            <MainLayout>
                <Home />
            </MainLayout>
        ),
    },
]);

export default router;