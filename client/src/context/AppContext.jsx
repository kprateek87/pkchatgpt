"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [token, setToken] = useState(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: token },
      });
      if (data.success) setUser(data.user);
      else console.error(data.message);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUser(false);
    }
  };
const createNewChat = async () => {
  try {
    if (!user) {
      toast.error("Login/Signup to create chats");
      return;
    }

    const { data } = await axios.get("/api/c/create", {
      headers: { Authorization: token },
    });

    if (!data.success) {
      toast.error(data.message || "Failed to create chat");
    }
  } catch (e) {
    console.error(e);
    toast.error("An error occurred while creating chat");
  }
};

const fetchUserChats = async () => {
  try {
    const { data } = await axios.get("/api/c/get", {
      headers: { Authorization: token },
    });

    if (data.success) {
      if (data.chats.length === 0) {
        await createNewChat();

        const refreshed = await axios.get("/api/c/get", {
          headers: { Authorization: token },
        });

        if (refreshed.data.success) {
          setChats(refreshed.data.chats);
          setSelectedChat(refreshed.data.chats[0] || null);
        }
      } else {
        setChats(data.chats);
        setSelectedChat(data.chats[0]);
      }
    } else {
      toast.error(data.message || "Failed to fetch chats");
    }
  } catch (e) {
    console.error(e);
    toast.error("An error occurred while fetching chats");
  }
};

  useEffect(() => {
    const item = localStorage.getItem("token");
    setToken(item);
  }, []);
  useEffect(() => {
    if (user) fetchUserChats();
    else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);
  useEffect(() => {
    if (token) fetchUser();
    else {
      setUser(null);
      setLoadingUser(false);
    }
  }, [token]);

  const value = {
    loading,
    setLoading,
    router,
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    createNewChat,
    loadingUser,
    fetchUserChats,
    token,
    setToken,
    axios,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
