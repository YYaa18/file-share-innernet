import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { File } from 'lucide-react';
import { socketService } from '../services/socketService';

interface SharedFile {
  key: string;
  name: string;
  size: number;
  type: string;
  sharedBy: string;
  sharedDate: Date;
}

const SharedFiles: React.FC = () => {
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);

  useEffect(() => {
    // 从localStorage加载共享文件列表
    const savedSharedFiles = localStorage.getItem('sharedFiles');
    if (savedSharedFiles) {
      setSharedFiles(JSON.parse(savedSharedFiles));
    }

    // 监听新共享文件
    socketService.socket?.on('fileShared', (newFile: SharedFile) => {
      setSharedFiles((prevFiles) => [...prevFiles, newFile]);
    });

    return () => {
      socketService.socket?.off('fileShared');
    };
  }, []);

  useEffect(() => {
    // 保存共享文件列表到localStorage
    localStorage.setItem('sharedFiles', JSON.stringify(sharedFiles));
  }, [sharedFiles]);

  const columns = [
    // ... (保持原有的列定义不变)
  ];

  const handleDownload = async (file: SharedFile) => {
    try {
      const response = await socketService.downloadFile(file.key);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.name);
      document.body.appendChild(link);
      link.click();
      link.remove();
      message.success(`${file.name} 下载成功`);
    } catch (error) {
      message.error(`${file.name} 下载失败`);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">共享文件</h1>
      <Table columns={columns} dataSource={sharedFiles} />
    </div>
  );
};

export default SharedFiles;