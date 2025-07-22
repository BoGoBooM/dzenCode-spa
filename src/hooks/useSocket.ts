import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeSessions, setActiveSessions] = useState<number>(0);

  useEffect(() => {
    if (!SOCKET_URL) return;

    const socketIo: Socket = io(SOCKET_URL);

    socketIo.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socketIo.on('active sessions', (count: number) => {
      setActiveSessions(count);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return { socket, activeSessions };
};
