"use client";
import { useRef } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useGptMessage } from "@/components";

const getClass = (loading: boolean) => {
  return loading ? "!text-gray-400 cursor-not-allowed" : "cursor-pointer";
};

export default function TextSender({ className }: { className: string }) {
  const { loading, sendMessage } = useGptMessage();
  const inputRef = useRef<any>();

  const handleSendMessage = async () => {
    const message: string = inputRef.current.value;

    if (!message || loading) {
      return;
    }

    inputRef.current.value = "";
    handleInput(inputRef.current);

    await sendMessage(message);
  };

  const handleKeyDown = async (e: any): Promise<void> => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInput = (target: any) => {
    target.style.height = "auto";
    target.style.height = target.scrollHeight - 1 + "px";
    target.style.overflow =
      target.getBoundingClientRect().height === target.scrollHeight
        ? "hidden"
        : "auto";
  };

  return (
    <div className={`flex items-center${className ? ` ${className}` : ""}`}>
      <textarea
        ref={inputRef}
        className="max-h-[110px] w-full outline-none resize-none bg-transparent text-sm"
        placeholder="请输入聊天内容（回车发送）"
        rows={1}
        onKeyDown={handleKeyDown}
        onInput={(e) => handleInput(e.target)}
      />
      <AiOutlineSend
        onClick={handleSendMessage}
        className={`text-lg ${getClass(loading)}`}
      />
    </div>
  );
}
