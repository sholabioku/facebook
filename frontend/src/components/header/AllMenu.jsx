import { menu } from '../../data/allMenu';
import AllMenuItem from './AllMenuItem';

const AllMenu = () => {
  return (
    <div className='all_menu'>
      <div className='all_menu_header'>Menu</div>
      <div className='all_menu_wrap scrollbar'>
        <div className='all_left'>
          <div className='all_menu_search'>
            <i className='amm_s_ic' />
            <input type='text' placeholder='Search Menu' />
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Social</div>
            {menu.slice(0, 6).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Entertainment</div>
            {menu.slice(6, 9).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Shopping</div>
            {menu.slice(9, 11).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Personal</div>
            {menu.slice(11, 15).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Professional</div>
            {menu.slice(15, 17).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>Community resources</div>
            {menu.slice(17, 21).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
          <div className='all_menu_group'>
            <div className='all_menu_group_header'>More from Meta</div>
            {menu.slice(21, 23).map((item, index) => (
              <AllMenuItem
                name={item.name}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllMenu;
