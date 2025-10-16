"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const fetchUser = async () => {
    setUser({
      name: "Prateek",
      email: "kprateek787@gmail.com",
      password: "Abc@123",
      _id: "1234asdfqwerty",
      credits: 200,
    });
    setLoading(false);
  };
  const fetchUserChats = async () => {
    setChats([
      {
        name: "New chats",
        userName: "Prateek",
        email: "kprateek787@gmail.com",
        password: "Abc@123",
        _id: "689de4bbaa932dc3a8ef6cd7",
        userId: "1234asdfqwerty",
        messages: [
          {
            isImage: false,
            isPublished: false,
            role: "user",
            content: "hello",
            timestamp: 1755178179612,
          },
          {
            isImage: false,
            isPublished: false,
            role: "assistant",
            content: "Hello! 😊 How can I assist you today?",
            timestamp: 1755106420723,
          },
          {
            isImage: false,
            isPublished: false,
            role: "user",
            content: "Generate a image of boy talking with others",
            timestamp: 1755107475040,
          },
        ],
        createdAt: "2025-08-14T13:29:31.398Z",
        updatedAt: "2025-08-14T13:29:54.753Z",
      },
    ]);
    setSelectedChat({
      name: "New chats",
      userName: "Prateek",
      email: "kprateek787@gmail.com",
      password: "Abc@123",
      _id: "689de4bbaa932dc3a8ef6cd7",
      userId: "1234asdfqwerty",
      messages: [
        {
          isImage: false,
          isPublished: false,
          role: "user",
          content: "hello",
          timestamp: 1755178179612,
        },
        {
          isImage: false,
          isPublished: false,
          role: "assistant",
          content: "Hello! 😊 How can I assist you today?",
          timestamp: 1755106420723,
        },
        {
          isImage: false,
          isPublished: false,
          role: "user",
          content: "Generate a image of boy talking with others",
          timestamp: 1755107475040,
        },
      ],
      createdAt: "2025-08-14T13:29:31.398Z",
      updatedAt: "2025-08-14T13:29:54.753Z",
    });
  };
  useEffect(() => {
    if (user) fetchUserChats();
    else {
      setChats([]);
      setSelectedChat(null);
    }
  }, [user]);
  useEffect(() => {
    fetchUser();
  }, []);

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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export const useAppContext = () => useContext(AppContext);
