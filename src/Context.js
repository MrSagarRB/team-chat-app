import React, { createContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase-config";
import Axios from "axios";

export const ContextProvider = createContext();
const Context = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [chatMsg, setChatMsg] = useState();
  const bottomRef = useRef(null);

  let apiBaseUrl = "https://team-chat-app-backend.vercel.app";

  useEffect(() => {
    let handelGetMessages = async () => {
      await Axios.get(`${apiBaseUrl}/api/getAllMessages`).then((result) => {
        setChatMsg(result.data);
      });
    };
    handelGetMessages();
  }, [chatMsg]);

  return (
    <ContextProvider.Provider
      value={{ user, loading, error, chatMsg, setChatMsg, apiBaseUrl }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
