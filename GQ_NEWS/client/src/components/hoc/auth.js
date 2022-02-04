import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function(ComposedComponent) {
  const AuthenticationCheck = (props) => {
    const [isAuth, setIsAuth] = useState(false);
    const user = useSelector(state => state.user);

    useEffect(() => {
      if (!user.auth) {
        props.history.push('/')
      } else {
        setIsAuth(true);
      }
    }, [props, user]);

    if (!isAuth) {
      return (
        <div className='main_loader'>
          <div className='lds-heart'>
            <div />
          </div>
        </div>
      );
    }

    return (
      <ComposedComponent {...props} />
    );
  }

  return AuthenticationCheck;
}
