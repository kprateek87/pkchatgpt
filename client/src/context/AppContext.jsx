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

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken || null);
    }
  }, []); 

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: token },
      });
      if (data.success) setUser(data.user);
      else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoadingUser(false);
    }
  };
  const createNewChat = async () => {
    try {
      if (!user) return toast("Login/Signup For create Chats");
      router.replace("/");
      await axios.get("/api/c/create", { headers: { Authorization: token } });
    } catch (e) {
      toast.error(e.message);
    }
    await fetchUserChats();
  };
  const fetchUserChats = async () => {
    try {
      const { data } = axios.get("/api/c/get", {
        headers: { Authorization: token },
      });
      if (data.success) {
        setChats(data.chats);
        if (data.chats.length === 0) {
          await createNewChat();
          return fetchUserChats();
        } else setSelectedChat(data.chats[0]);
      } else toast.error(data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };
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
    user,
    setUser,
    fetchUser,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    loading,
    setLoading,
    createNewChat,
    loadingUser,
    fetchUserChats,token,setToken,axios,router
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
