import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

    const socket = io("https://uber-clone-t911.onrender.com", {
      transports: ["websocket"],
      reconnection: true,
    });

const SocketProvider = ({ children }) => {
  

  useEffect(() => {

    socket.on("connect", () => {
    });
    socket.on("disconnect", () => {
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
