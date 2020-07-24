import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const NotificationContext = createContext();

let socket = io.connect("http://localhost:3001");

const NotificationProvider = ({ children }) => {
  const [msg, setMsg] = useState({});
  const [notificationMsg, setNotificationMsg] = useState();

  useEffect(() => {
    socket.on("connect", () => console.log(socket.connected));

    const user = localStorage.getItem("user");

    socket.emit("currentUser", user);

    socket.emit("notify", msg);

    socket.on("notification", (notification) => {
      setNotificationMsg(notification);
    });
  }, [msg]);

  console.log(notificationMsg);

  return (
    <NotificationContext.Provider value={{ setMsg, notificationMsg }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
