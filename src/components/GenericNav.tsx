import { IconType } from 'react-icons';
import { RiBookFill } from 'react-icons/ri';
type TGenericNav = {
  icon: IconType;
  text: string;
  active?: boolean;
};
const GenericNav = ({ icon: Icon, text, active }: TGenericNav) => {
  return (
    <div
      className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 ${
        active && ' bg-gray-100'
      }`}
    >
      {active ? (
        <RiBookFill className={`text-lg text-gray-500`} />
      ) : (
        <Icon className={`text-lg text-gray-500`} />
      )}

      <p>{text}</p>
    </div>
  );
};

export default GenericNav;
