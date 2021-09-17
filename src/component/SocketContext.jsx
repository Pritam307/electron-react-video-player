import { io } from "socket.io-client";
import React from "react";


const SOCKET_URL = "localhost:3001/"

export const socket = io(SOCKET_URL,{
    transports: ["websocket", "polling"]
});

export const SocketContext = React.createContext();

