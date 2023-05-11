import Markdown from "@/components/markdown";
import dayjs from "dayjs";
import { ILocalMessage } from "./index.d";

interface IProps {
  data: ILocalMessage;
  isRobot: boolean;
}

const getClass = (isRobot: boolean, error: boolean = false) => {
  if (error) {
    return "bg-red-50";
  }

  return isRobot ? "bg-indigo-100" : "bg-gray-100";
};

export default function MessageContent({ data, isRobot }: IProps) {
  return (
    <div className={!isRobot ? "pl-4" : "pr-4"}>
      <div className={`text-gray-400${isRobot ? " text-right" : ""}`}>
        {dayjs(data.date).format("YYYY-MM-DD HH:mm:ss")}
      </div>
      <div className={`p-2 mt-2 rounded ${getClass(isRobot, data.error)}`}>
        <Markdown>{data.content || "--"}</Markdown>
      </div>
    </div>
  );
}
