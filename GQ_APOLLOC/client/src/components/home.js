import React, { useState } from 'react';
import { gql, useQuery, useLazyQuery, NetworkStatus } from '@apollo/client';
import { Card,CardGroup,Form, Button } from 'react-bootstrap';

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id){
      id
      name
      lastname
      email
    }
  }
`;

const GET_ALL_USERS = gql`
  query {
    users {
      id
      name
      lastname
      email
    }
  }
`;

const Home = () => {
  const getAllUsers = useQuery(
    GET_ALL_USERS,
    {
      // pollInterval: 3000,
      notifyOnNetworkStatusChange: true,
    },
  );

  const [user, setUser] = useState('');
  const [userGetLazy, userGetLazyResult] = useLazyQuery(GET_USER_BY_ID);
  // const [userGetLazy, { data, loading, error }] = useLazyQuery(
  // GET_USER_BY_ID,
  // {
  //    variables: { id: user }
  // }
  // );

  const allUsersHandler = () => {
    return getAllUsers.data
      ? getAllUsers.data.users.map((item, i) => (
        <Card key={i}>
          <Card.Body>
            <Card.Title>{item.email}</Card.Title>
            <Card.Text>{item.name}</Card.Text>
          </Card.Body>
        </Card>
      ))
      : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userGetLazy({
      variables: { id: user }
    });
  };

  // console.log(getAllUsers.networkStatus);
  if (getAllUsers.networkStatus === NetworkStatus.ready) {
    console.log('done fetching');
  }

  return (
    <div className='App'>
      <>
        <h3>All users</h3>
        <CardGroup>
          {allUsersHandler()}
        </CardGroup>
      </>

      <>
        <h3>Get user by ID</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Enter user id'
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Form.Group>

          <Button type='submit'>Submit</Button>
        </Form>

        {userGetLazyResult.data
          ? (
            <div className='mt-3'>
              <div>Name: {userGetLazyResult.data.user.name}</div>
              <div>Last Name: {userGetLazyResult.data.user.lastname}</div>
              <div>Email: {userGetLazyResult.data.user.email}</div>
            </div>
          )
          : null}
      </>

      <hr />
      <Button
        onClick={() => getAllUsers.stopPolling()}
      >
        Stop polling
      </Button>

      <Button
        onClick={() => getAllUsers.startPolling(500)}
      >
        Start polling
      </Button>
      <hr />
      <Button
        onClick={() => getAllUsers.refetch()}
      >
        Refetch
      </Button>
    </div>
  );
}

export default Home;
