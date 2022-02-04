import React from 'react';
import { useFormik } from 'formik';
import { Form,Button} from 'react-bootstrap';
import { gql, useQuery, useMutation } from '@apollo/client';

const ADD_POST = gql`
  mutation AddPost($data: PostInput!) {
    addPost(data: $data) {
      id
      title
      body
      author { name }
    }
  }
`;

const GET_LAST_POST = gql`
  query {
    lastPost {
      id
      title
      body
    }
  }
`;

const Posts = () => {
  const getLastPost = useQuery(GET_LAST_POST);

  const [addPost, { data, error, loading, called }] = useMutation(ADD_POST, {
    onCompleted: (data) => { console.log('onCompleted===', data); },
    onError: (error) => { console.log(error); },
    ignoreResults: true,
    refetchQueries: [
      { query: GET_LAST_POST },
    ],
    awaitRefetchQueries: true,
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      author: '',
    },
    onSubmit: values => {
      addPost({
        variables: {
          data: values,
        }
      })
    }
  });

  // if (loading) console.log('loading....');
  // if (called) console.log('called');
  if (data) {
    console.log('data===', data);
  }

  return (
    <div>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Control
            type='string'
            name='title'
            placeholder='Enter title'
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='string'
            name='body'
            placeholder='Enter body'
            onChange={formik.handleChange}
            value={formik.values.body}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type='string'
            name='author'
            placeholder='Enter author'
            onChange={formik.handleChange}
            value={formik.values.author}
          />
        </Form.Group>

        <Button type='submit'>Submit</Button>
      </Form>

      <h3>The last post is:</h3>
      {getLastPost && getLastPost.data && (
        <div>
          <div><b>Title:</b> {getLastPost.data.lastPost.title}</div>
          <div><b>Body:</b> {getLastPost.data.lastPost.body}</div>
        </div>
      )}
    </div>
  );
}

export default Posts;
