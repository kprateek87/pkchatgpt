"use client";
import InputBox from "./InputBox";

function ChatBox() {
  return (
    <div className="flex-1 h-full flex flex-col justify-center items-center mx-5 md:mx-10 xl:mx-32 max-md:mt-14 2xl:pr-40">
      <div className={`flex flex-col justify-center mb-5 overflow-y-scroll`}>
        <div className="text-center">
          <span className="text-6xl font-bold">PkChatGPT</span>
          <p className="text-xl sm:text-2xl">Ask me Anything</p>
        </div>
      </div>
      <InputBox />
    </div>
  );
}

export default ChatBox;
