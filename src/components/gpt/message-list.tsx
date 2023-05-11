"use client";
import { useEffect, useRef } from "react";
import MessageUserAvatar from "./message-user-avatar";
import MessageContent from "./message-content";
import { useMessage } from "./useMessage";
import type { ILocalMessage } from "./index.d";

type IProps = {
  data: ILocalMessage;
  loading: boolean;
};

const RenderAvatar = ({ isRobot }: { isRobot: boolean }) => {
  return (
    <div>
      <MessageUserAvatar isRobot={isRobot} />
    </div>
  );
};

const RenderMessageItem = ({ data, loading }: IProps) => {
  const isRobot = data.role === "user";

  return (
    <li key={data.id} className={`flex${isRobot ? " justify-end" : ""}`}>
      {!isRobot ? <RenderAvatar isRobot={isRobot} /> : ""}
      <MessageContent loading={loading} data={data} isRobot={isRobot} />
      {isRobot ? <RenderAvatar isRobot={isRobot} /> : ""}
    </li>
  );
};

export default function MessageList() {
  const { loading, messageList } = useMessage();
  const containerRef = useRef<any>(null);

  const handleScrollBottom = () => {
    const target = containerRef.current;
    target.scrollTop = target.scrollHeight;
  };

  const containerResizeObserverChangeScrollByBottom = () => {
    const target = containerRef.current;
    let oldScrollTop: number = 0;
    let clear: NodeJS.Timeout | null = null;

    target.addEventListener("DOMNodeInserted", () => {
      if (clear) {
        clearTimeout(clear);
      }

      clear = setTimeout(() => {
        if (oldScrollTop !== target.scrollHeight) {
          oldScrollTop = target.scrollHeight;
          handleScrollBottom();
        }
      }, 300);
    });
  };

  useEffect(() => {
    containerResizeObserverChangeScrollByBottom();

    return () => {
      const target = containerRef.current;
      if (target) target.removeEventListener("DOMNodeInserted", () => {});
    };
  }, []);

  return (
    <>
      <div
        className="flex-1 overscroll-y-auto overflow-auto"
        ref={containerRef}
      >
        <ul className="flex flex-col p-4 gap-5">
          {messageList.map((item, index) => (
            <RenderMessageItem
              loading={loading && index + 1 === messageList.length}
              key={item.id}
              data={item}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
