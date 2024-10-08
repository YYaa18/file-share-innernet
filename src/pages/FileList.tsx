import React, { useState, useEffect } from 'react';
import { Table, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { File } from 'lucide-react';
import { socketService } from '../services/socketService';

interface FileItem {
  key: string;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    // 从localStorage加载文件列表
    const savedFiles = localStorage.getItem('myFiles');
    if (savedFiles) {
      setFiles(JSON.parse(savedFiles));
    }
  }, []);

  useEffect(() => {
    // 保存文件列表到localStorage
    localStorage.setItem('myFiles', JSON.stringify(files));
  }, [files]);

  const columns = [
    // ... (保持原有的列定义不变)
  ];

  const handleUpload = async (info: any) => {
    const { status } = info.file;
    if (status === 'done') {
      try {
        await socketService.shareFile(info.file.originFileObj);
        const newFile: FileItem = {
          key: info.file.uid,
          name: info.file.name,
          size: info.file.size,
          type: info.file.type,
          lastModified: new Date(info.file.lastModified),
        };
        setFiles([...files, newFile]);
        message.success(`${info.file.name} 文件上传成功`);
      } catch (error) {
        message.error(`${info.file.name} 文件上传失败`);
      }
    }
  };

  const handleShare = (file: FileItem) => {
    // 实现文件共享逻辑
    socketService.socket?.emit('shareFile', file);
    message.success(`${file.name} 已成功共享`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">我的文件</h1>
      <Upload
        accept="*/*"
        showUploadList={false}
        customRequest={({ onSuccess }) => {
          setTimeout(() => {
            onSuccess!('ok', undefined);
          }, 0);
        }}
        onChange={handleUpload}
      >
        <Button icon={<UploadOutlined />} className="mb-4">
          上传文件
        </Button>
      </Upload>
      <Table columns={columns} dataSource={files} />
    </div>
  );
};

export default FileList;