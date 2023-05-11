import MessageList from "./message-list";
import TextSender from "./text-sender";
import MessageBar from "./message-bar";

export default function Gpt() {
  return (
    <div className="flex flex-col scroll-auto h-full w-full border md:rounded-3xl bg-white">
      <MessageList />

      <div>
        <MessageBar />
        <TextSender className="border-t-[1px] p-4 mt-3" />
      </div>
    </div>
  );
}
