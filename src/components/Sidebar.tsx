import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Share2, Settings } from 'lucide-react';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/', icon: <FileText />, label: '我的文件', link: '/' },
    { key: '/shared', icon: <Share2 />, label: '共享文件', link: '/shared' },
    { key: '/settings', icon: <Settings />, label: '设置', link: '/settings' },
  ];

  return (
    <Sider width={200} className="bg-gray-100">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="h-full border-r-0"
      >
        {menuItems.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;