import { lazy } from "react";
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

export interface RouteType {
  path: string;
  element: React.ReactNode;
  children?: Array<RouteType>;
  title?: string;
}

const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Layout = lazy(() => import('@/components/Layout/index'));

export const routes: Array<RouteType> = [
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    children: [
      {
        path: '',  // 空路径匹配根路由
        element: <Navigate to="/home" replace />  // 替换 redirect
      },
      {
        path: '/home',
        title: '首页',
        element: <Home />
      },
      {
        path: '/about',
        title: '关于',
        element: <About />
      }
    ]
  }
];
const WrappedRoutes = () => {
  return useRoutes(routes);
};

export default WrappedRoutes;