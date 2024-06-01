import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { io } from "socket.io-client";
const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;

interface SocketProviderProps {
  children: ReactNode;
}

const SocketContext = createContext<any>(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const socket = useMemo(() => io(ENDPOINT), []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
