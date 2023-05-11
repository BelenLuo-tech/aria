import { AiOutlineLoading } from "react-icons/ai";

export default function () {
  return (
    <div className="ml-4 flex items-center h-10">
      <AiOutlineLoading className="animate-spin" />
      <span className="pl-4">容我思考一下...</span>
    </div>
  );
}
