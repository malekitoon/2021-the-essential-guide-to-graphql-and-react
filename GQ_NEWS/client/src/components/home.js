import React, { useEffect, useReducer } from 'react';
import { Button } from 'react-bootstrap';
import Masonry from 'react-masonry-css';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../store/actions';
import CardItem from './utils/card';

const Home = () => {
  const dispatch = useDispatch();
  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 6, order: 'desc', sortBy: '_id', skip: 0 },
  );
  const posts = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(getPosts(sort, []));
  }, []);

  return (
    <>
      <Masonry
        breakpointCols={3}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {posts && posts.homePosts && (
          posts.homePosts.map((post) => (
            <CardItem key={post._id} item={post} />
        )))}
      </Masonry>

      <Button
        onClick={() => {
          let skip = sort.skip + sort.limit;
          dispatch(
            getPosts({ ...sort, skip }, posts.homePosts)
          ).then(() => {
            setSort({ skip });
          });
        }}
      >
        Load more
      </Button>
    </>
  );
}

export default Home;
