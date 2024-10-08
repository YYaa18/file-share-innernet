import { io, Socket } from 'socket.io-client';
import axios from 'axios';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:3001'); // 替换为您的服务器地址

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('fileShared', (data) => {
      console.log('New file shared:', data);
      // 在这里触发UI更新
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  shareFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post('http://localhost:3001/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  downloadFile(fileId: string) {
    return axios.get(`http://localhost:3001/download/${fileId}`, {
      responseType: 'blob',
    });
  }
}

export const socketService = new SocketService();