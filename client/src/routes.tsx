import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Auth from './pages/auth';
import MainLayout from './layouts';

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
        path: '/auth',
        element: (
            <MainLayout>
                <Auth />
            </MainLayout>
        ),
    },
]);

export default router;