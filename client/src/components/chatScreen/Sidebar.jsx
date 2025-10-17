"use client";
import { useAppContext } from "@/context/AppContext";
import {
  CircleX,
  Gem,
  LogOut,
  Menu,
  Search,
  SunMoon,
  Trash2,
  User2,
} from "lucide-react";
import moment from "moment";
import { useTheme } from "next-themes";
import { useState } from "react";
import toast from "react-hot-toast";

function Sidebar() {
  const {
    chats,
    setSelectedChat,
    user,
    router,
    createNewChat,
    axios,
    setChats,
    fetchUsersChats,
    setToken,
    token,
  } = useAppContext();
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.success("Logged out Successfully");
  };
  const deleteChat = async (e, chatId) => {
    try {
      e.stopPropagation();
      const confirm = window.confirm(
        "Are you sure you want to delete this chat?"
      );
      if (!confirm) return;
      else {
        const { data } = axios.post(
          "/api/c/delete",
          { chatId },
          { headers: { Authorization: token } }
        );
        if (data.success) {
          setChats((prev) => prev.filter((chat) => chat._id !== chatId));
          await fetchUsersChats();
          toast.success(data.message);
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {!isMenuOpen && (
        <Menu
          className={`absolute top-3 left-3 size-8 cursor-pointer md:hidden`}
          onClick={() => setIsMenuOpen(true)}
        />
      )}
      <div
        className={`${
          !isMenuOpen && "max-md:-translate-x-full"
        } p-5 flex flex-col h-screen min-w-72 dark:bg-gradient-to-b from-[#242124]/30 to-[#000]/30 border-r border-[#80609f]/30 backdrop-blur-3xl transition-all duration-500 max-md:absolute left-0 z-10`}
      >
        <h1 className="text-xl font-bold w-full max-w-48">PkChatGPT</h1>

        <button
          onClick={createNewChat}
          className="flex justify-center items-center w-full py-2 mt-10 dark:text-white dark:bg-gradient-to-r from-[#a456f7] to-[#3d81f6] text-sm rounded-md cursor-pointer "
        >
          <span className="mr-2 text-xl">+</span> New Chat
        </button>
        <div className="flex items-center gap-2 p-3 mt-4 border-gray-400 dark:border-white/30 rounded-md">
          <Search className="size-4" />
          <input
            type="text"
            placeholder="Search Conversations"
            className="text-xs placeholder:text-gray-400 outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
        {chats.length > 0 && <p className="text-sm mt-4">Recent Chats</p>}
        <div className="flex-1 mt-3 space-y-3">
          {chats
            .filter((chat) =>
              chat.messages[0]
                ? chat.messages[0]?.content
                    .toLowerCase()
                    .includes(search.toLowerCase())
                : chat.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((chat) => (
              <div
                onClick={() => {
                  router.push(`/c/${chat._id}`);
                  setIsMenuOpen(false);
                }}
                className="p-2 px-4 border border-gray-300 rounded-md cursor-pointer flex justify-between group"
                key={chat._id}
              >
                <div className="">
                  <p className="truncate w-full">
                    {chat.messages.length > 0
                      ? chat.messages[0].content.slice(0, 32)
                      : chat.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {moment(chat.updatedAt).fromNow()}
                  </p>
                </div>
                <Trash2
                  className="hidden group-hover:block cursor-pointer"
                  onClick={(e) =>
                    toast.promise(deleteChat(e, chat._id), {
                      loading: "loding...",
                    })
                  }
                />
              </div>
            ))}
        </div>
        <div
          onClick={() => {
            router.push("/credits");
            setIsMenuOpen(false);
          }}
          className="flex items-center gap-2 p-3 mt-4 border-gray-300 rounded-md cursor-pointer hover:scale-105 transition-all"
        >
          <Gem className="size-5" />
          <div className="flex flex-col text-sm">
            <p>Availible Credits: {user?.credits}</p>
            <p className="text-xs text-gray-400">
              Purchase Credits to use PkChatGPT
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 mt-4 border-gray-300 rounded-md">
          <div className="flex items-center gap-2 text-sm">
            <SunMoon className="size-4" />
            <p>Dark Mode</p>
          </div>
          <label className="relative inline-flex cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <div className="w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all" />
            <span className="absolute left-1 top-1 size-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
          </label>
        </div>
        <div className="flex items-center gap-3 p-3 mt-4 border-gray-300 rounded-md cursor-pointer group">
          <User2 className="size-7 rounded-full" />
          <p className="flex-1 text-sm dark:text-primary truncate">
            {user ? user.name : "Login Your Account"}
          </p>
          {user && (
            <LogOut
              className="cursor-pointer size-5 hidden group-hover:block"
              onClick={logOut}
            />
          )}
        </div>
        <CircleX
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-3 right-3 size-5 cursor-pointer md:hidden"
        />
      </div>
    </>
  );
}

export default Sidebar;
