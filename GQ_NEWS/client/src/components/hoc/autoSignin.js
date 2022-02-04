import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { autoSignIn } from '../../store/actions';

const AutoSignIn = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(autoSignIn())
      .then(() => { setLoading(false); })
  }, [dispatch]);

  if (loading) {
    return (
      <div className='main_loader'>
        <div className='lds-heart'>
          <div />
        </div>
      </div>
    )
  }

  return (
    <>
      {props.children}
    </>
  );
};

export default withRouter(AutoSignIn);
