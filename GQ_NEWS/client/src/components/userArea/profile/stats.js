import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardGroup, Alert } from 'react-bootstrap';

import { getUserStats } from '../../../store/actions';

const Stats = (props) => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserStats(user.auth._id));
  }, [dispatch, user.auth._id]);

  return (
    <>
      {user.stats && (
        <>
          <h3>Your stats</h3>
          <CardGroup>
            <Card border='primary'>
              <Card.Body>
                <Card.Title>Categories created by you:</Card.Title>
                {user.stats.categories.length === 0
                  ? "Sorry, you don't have categories"
                  : user.stats.categories.map((item, index) => (
                    <Alert key={index} variant='primary'>
                      {item.name}
                    </Alert>
                  ))}
              </Card.Body>
            </Card>

            <Card border='info'>
              <Card.Body>
                <Card.Title>Last created posts:</Card.Title>
                {user.stats.posts.length === 0
                  ? "Sorry, you don't have posts"
                  : user.stats.posts.map((item, index) => (
                    <Alert key={index} variant='info'>
                      - {item.title}
                    </Alert>
                  ))}
              </Card.Body>
            </Card>
          </CardGroup>
        </>
      )}
    </>
  );
}

export default Stats;