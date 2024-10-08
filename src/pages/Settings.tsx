import React, { useState } from 'react';
import { Form, Input, Button, Switch, message } from 'antd';

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [autoAccept, setAutoAccept] = useState(false);

  const onFinish = (values: any) => {
    console.log('设置已保存:', values);
    message.success('设置已成功保存');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">设置</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ autoAccept }}
      >
        <Form.Item
          name="sharedFolder"
          label="共享文件夹路径"
          rules={[{ required: true, message: '请输入共享文件夹路径' }]}
        >
          <Input placeholder="例如: C:\Users\YourName\SharedFiles" />
        </Form.Item>
        <Form.Item
          name="downloadFolder"
          label="下载文件夹路径"
          rules={[{ required: true, message: '请输入下载文件夹路径' }]}
        >
          <Input placeholder="例如: C:\Users\YourName\Downloads" />
        </Form.Item>
        <Form.Item name="autoAccept" label="自动接受文件共享请求" valuePropName="checked">
          <Switch
            checked={autoAccept}
            onChange={(checked) => setAutoAccept(checked)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;