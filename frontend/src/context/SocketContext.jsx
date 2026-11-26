
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const newSocket = io("https://fundraise-backend-6o4a.onrender.com");

    setSocket(newSocket);

    newSocket.on("campaignStatusUpdated", (data) => {
      setNotification(data.message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, notification, setNotification }}
    >
      {children}
    </SocketContext.Provider>
  );
}
