import { User2 } from "lucide-react";
import moment from "moment";
import Markdown from "react-markdown";

function Message({ message }) {
  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-start justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317c]/30 border border-[#80609f]/30 rounded-md max-w-2xl">
            <p className="text-sm">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#b1a6c0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <User2 className="size-8 rounded-full" />
        </div>
      ) : (
        <div className="inline-flex flex-col p-2 px-4 gap-2 max-w-2xl bg-slate-50 dark:bg-[#57317c]/30 border border-[#80609f]/30 rounded-md">
          <div className="text-sm reset-tw">
            <Markdown>{message.content}</Markdown>
          </div>
          <span className="text-xs text-gray-400 dark:text-[#b1a6c0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
}

export default Message;
