import { RiHomeLine, RiBookLine, RiBookMarkedLine } from 'react-icons/ri';
import GenericNav from './GenericNav';
const Sidebar = () => {
  return (
    <div className="p-4">
      <ul>
        <li>
          <GenericNav key={'Home'} icon={RiHomeLine} text="Home" />
        </li>
        <li>
          <GenericNav
            key={'Recipes'}
            active={true}
            icon={RiBookLine}
            text="Recipes"
          />
        </li>
        <li>
          <GenericNav
            key={'Bookmark'}
            icon={RiBookMarkedLine}
            text="Bookmark"
          />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
