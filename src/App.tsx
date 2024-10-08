import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FileList from './pages/FileList';
import SharedFiles from './pages/SharedFiles';
import Settings from './pages/Settings';
import { socketService } from './services/socketService';

const { Content } = Layout;

function App() {
  useEffect(() => {
    socketService.connect();
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <Router>
      <Layout className="min-h-screen">
        <Header />
        <Layout>
          <Sidebar />
          <Layout className="p-6">
            <Content className="bg-white p-6 rounded-lg">
              <Routes>
                <Route path="/" element={<FileList />} />
                <Route path="/shared" element={<SharedFiles />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;