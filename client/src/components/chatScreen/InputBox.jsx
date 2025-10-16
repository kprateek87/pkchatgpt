"use client";
import { SendHorizonal, StopCircle } from "lucide-react";
import { useState } from "react";
function InputBox() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-full w-full flex gap-4 items-center border border-[#80609f]/30 p-3 pl-4 bg-[#583c79]/30"
    >
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="type your prompt here ..."
        className="placeholder:capitalize flex-1 w-full text-sm outline-none"
        required
      />
      <button disabled={loading}>
        {loading ? (
          <StopCircle className="size-8 cursor-pointer" />
        ) : (
          <SendHorizonal className="size-8 cursor-pointer" />
        )}
      </button>
    </form>
  );
}

export default InputBox;
