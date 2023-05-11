"use client";
import { AiOutlineSync, AiOutlineClear } from "react-icons/ai";
import { useMessage } from "./useMessage";

export default function MessageBar() {
  const { loading, messageList, stop, resend, clear } = useMessage();

  return (
    <div
      className={`flex justify-center${!messageList.length ? " hidden" : ""}`}
    >
      <button
        className="mr-2 rounded-full border px-4 py-2 flex items-center hover:border-blue-300 hover:text-blue-400"
        onClick={() => (loading ? stop() : resend())}
      >
        <AiOutlineSync className="mr-2" />
        {loading ? "停止生成" : "重新生成回复"}
      </button>
      <button
        onClick={clear}
        className="rounded-full border px-4 py-2 flex items-center hover:border-blue-300 hover:text-blue-400"
      >
        <AiOutlineClear className="mr-2" />
        清空
      </button>
    </div>
  );
}
