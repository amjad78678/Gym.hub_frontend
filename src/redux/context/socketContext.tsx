import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { RootState } from "../store";
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
  const {userDetails} = useSelector((state: RootState) => state.auth);
  const {trainerDetails} = useSelector(
    (state: RootState) => state.auth
  );
  const userId = userDetails?.userId;
  const trainerId = trainerDetails?.trainerId;

  useEffect(() => {
    if (userId) socket.emit("add_user", userId);
    if (trainerId) socket.emit("add_user", trainerId);
  }, [socket, userId, trainerId]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
