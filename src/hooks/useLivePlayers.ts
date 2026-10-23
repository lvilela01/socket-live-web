import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// localhost
// const SOCKET_URL = 'http://localhost:3001';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://socket-live-api.onrender.com';

// Instancia o socket UMA única vez para ser reaproveitado por toda a aplicação
const socket = io(SOCKET_URL);

export function useLivePlayers() {
  const [players, setPlayers] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected); // <-- Estado inicial definido aqui
  const [lastBet, setLastBet] = useState<string | null>(null);

  useEffect(() => {
    // Ouvintes dos eventos do servidor
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('players_update', (count: number) => setPlayers(count));
    socket.on('bet_received', (msg: string) => setLastBet(msg));

    // Limpeza de ouvintes quando o componente for destruído
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('players_update');
      socket.off('bet_received');
    };
  }, []);

  // Emite a aposta reaproveitando a conexão já existente
  const sendBet = () => {
    socket.emit('send_bet', `Aposta de R$ 50 efetuada às ${new Date().toLocaleTimeString()}`);
  };

  return { players, isConnected, lastBet, sendBet };
}
