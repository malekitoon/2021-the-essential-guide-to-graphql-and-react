import React from 'react';
import UserAreaHOC from '../hoc/userArea';

const UserArea = () => {
  return (
    <UserAreaHOC>
      <div className='mt-3'>
        Welcome to your user area
      </div>
    </UserAreaHOC>
  );
}

export default UserArea;
