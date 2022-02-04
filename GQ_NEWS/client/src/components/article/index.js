import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CardItem from '../utils/card';
import { CardGroup } from 'react-bootstrap';
import { getPost } from '../../store/actions';

const Article = (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);

  useEffect(() => {
    if (props.match.params.id) {
      dispatch(getPost(props.match.params.id))
        .then(({ payload }) => {
          if (!payload.singlePost.post) {
            props.history.push('/');
          }
        });
    }
  }, [dispatch]);

  const myPost = posts.singlePost && posts.singlePost.post ? posts.singlePost.post : null;

  return (
    <>
      {myPost && (
        <>
          <h1>{myPost.title}</h1>
          <small>Created by {myPost.author.name} {myPost.author.lastname}</small>
          <hr />
          <div>{myPost.content}</div>
          <hr />
          <h3>Related posts</h3>
          <CardGroup>
            {myPost.related && myPost.related.map(item => (
              <CardItem key={item._id} item={item} />
            ))}
          </CardGroup>
        </>
      )}
    </>
  );
}

export default Article;
