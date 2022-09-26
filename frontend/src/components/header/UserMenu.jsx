import { Link } from 'react-router-dom';

const UserMenu = ({ user }) => {
  return (
    <div className='menu'>
      <Link to='/profile' className='menu_header hover3'>
        <img src={user?.picture} alt='' />
        <div className='menu_col'>
          <span>
            {user?.first_name}
            {user?.last_name}
          </span>
          <span>See your profile</span>
        </div>
      </Link>
      <div className='menu_splitter'></div>
      <div className='menu_main hover3'>
        <div className='small_circle'>
          <i className='report_filled_icon' />
        </div>
        <div className='menu_col'>
          <div className='menu_span1'>Give feedback</div>
          <div className='menu_span2'>Help us improve facebook</div>
        </div>
      </div>
      <div className='menu_splitter'></div>
      <div className='menu_item hover3'>
        <div className='small_circle'>
          <i className='settings_filled_icon' />
        </div>
        <span>Settings & privacy</span>
        <div className='rArrow'>
          <i className='right_icon' />
        </div>
      </div>
      <div className='menu_item hover3'>
        <div className='small_circle'>
          <i className='help_filled_icon' />
        </div>
        <span>Help & support</span>
        <div className='rArrow'>
          <i className='right_icon' />
        </div>
      </div>
      <div className='menu_item hover3'>
        <div className='small_circle'>
          <i className='dark_filled_icon' />
        </div>
        <span>Display & accessibility</span>
        <div className='rArrow'>
          <i className='right_icon' />
        </div>
      </div>
      <div className='menu_item hover3'>
        <div className='small_circle'>
          <i className='logout_filled_icon' />
        </div>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default UserMenu;
