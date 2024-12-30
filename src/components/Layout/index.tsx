import React, { useRef } from 'react';
import './index.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

//import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RouteType, routes } from '@/router';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutCom: React.FC<LayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const nodeRef = useRef(null);  // 创建 ref
  const navigate = useNavigate();
  const location = useLocation();  // 获取当前路径

  const menuItems: MenuProps['items'] = routes[0].children
    ?.filter((route: RouteType) => route.title) // 过滤掉没有 title 的路由（如重定向路由）
    .map((route: RouteType) => ({
      key: route.path,
      label: route.title,
      onClick: () => navigate(route.path)
    }));

  // 生成面包屑数据
  const getBreadcrumbs = () => {
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const breadcrumbItems: { title: string }[] = [];
    
    pathSnippets.forEach((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const route = routes[0].children?.find(r => r.path === url);
      if (route?.title) {
        breadcrumbItems.push({ title: route.title });
      }
    });
    
    return breadcrumbItems;
  };

  return (
    <Layout style={{ height: '100%' }}>
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
    <Content style={{ padding: '16px' }}>
      <Layout
        style={{ height: '100%', padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}
      >
        <Sider style={{ background: colorBgContainer }} width={200}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
            items={menuItems}
            selectedKeys={[location.pathname]}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
           <div className="bread-crumb">
              <Breadcrumb items={getBreadcrumbs()} />
           </div>
           <div className="content">
              <TransitionGroup>
                <CSSTransition
                  nodeRef={nodeRef}  // 添加 nodeRef
                  key={location.pathname}
                  timeout={500}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="route-section">
                    {children}
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
          </Content>
      </Layout>
    </Content>
  </Layout>
  );
};

export default LayoutCom;