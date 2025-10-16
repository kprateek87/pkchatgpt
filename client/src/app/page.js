import ChatBox from "@/components/chatScreen/ChatBox";
import Sidebar from "@/components/chatScreen/Sidebar";
import { AppContextProvider } from "@/context/AppContext";
import Image from "next/image";

export default function Home() {
  return (
    <div className="dark:bg-gradient-to-b dark:from-[#242124] dark:to-[#000]">
      <div className="flex h-screen">
        <Sidebar />
        <div className="h-screen w-full">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
