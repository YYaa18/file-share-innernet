import React from 'react';
import { Layout, Typography } from 'antd';
import { Share2 } from 'lucide-react';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header: React.FC = () => {
  return (
    <AntHeader className="bg-blue-600 flex items-center">
      <Share2 className="text-white mr-2" size={24} />
      <Title level={3} className="text-white m-0">
        文件共享应用
      </Title>
    </AntHeader>
  );
};

export default Header;