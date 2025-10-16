"use client";
import InputBox from "@/components/chatScreen/InputBox";
import Message from "@/components/chatScreen/Message";
import { useAppContext } from "@/context/AppContext";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function ChatPage() {
  const containerRef = useRef(null);
  const { selectedChat } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    if (selectedChat?._id === slug && selectedChat?.messages) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat, slug]);

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col justify-end-safe m-5 md:m-10 xl:mx-32 max-md:mt-14 2xl:pr-40">
      <div
        ref={containerRef}
        className="flex flex-col justify-center mb-5 overflow-y-scroll px-5"
      >
        {messages.map((msg) => (
          <Message key={msg.timestamp} message={msg} />
        ))}
        {loading && (
          <div className="loader flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce" />
            <div className="size-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce" />
            <div className="size-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce" />
          </div>
        )}
      </div>

      <InputBox />
    </div>
  );
}

export default ChatPage;
