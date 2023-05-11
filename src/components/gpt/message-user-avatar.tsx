import { FaRobot, FaUserAlt } from "react-icons/fa";

interface IProps {
  isRobot: boolean;
}

const RenderIcon = ({ isRobot }: IProps) => {
  if (isRobot) {
    return <FaUserAlt className="text-white text-lg" />;
  }

  return <FaRobot className="text-white text-lg" />;
};

export default function MessageUserAvatar({ isRobot = false }: IProps) {
  return (
    <div className="mt-1 bg-gray-300 w-10 h-10 flex items-center justify-center rounded-full">
      <RenderIcon isRobot={isRobot} />
    </div>
  );
}
