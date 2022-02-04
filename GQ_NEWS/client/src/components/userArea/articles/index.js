import React, { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import UserAreaHOC from '../../hoc/userArea';
import { getUserPosts, updatePostStatus, removePost } from '../../../store/actions';

const Articles = (props) => {
  const dispatch = useDispatch();

  const [sort, setSort] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { limit: 3, order: 'desc', sortBy: '_id', skip: 0 },
  );

  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getUserPosts(sort, [], user.auth._id));
  }, []);

  const updateStatusHandler = (item) => {
    const status = item.status === 'DRAFT' ? 'PUBLIC' : 'DRAFT';
    dispatch(updatePostStatus(status, item._id, user.posts));
  };

  return (
    <UserAreaHOC>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {user.posts
            ? user.posts.map((item, i) => (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.title}</td>
                <td>{item.category.name}</td>
                <td
                  onClick={() => updateStatusHandler(item)}
                  className={item.status === 'DRAFT' ? 'yell' : 'green'}
                >
                  {item.status}
                </td>
                <td
                  className='remove_btn'
                  onClick={() => dispatch(removePost(item._id, user.posts))}
                >
                  Remove
                </td>
              </tr>
            ))
            : null}
        </tbody>
      </Table>

      <Button
        onClick={() => {
          let skip = sort.skip + sort.limit;
          dispatch(
            getUserPosts({ ...sort, skip }, user.posts, user.auth._id)
          ).then(() => {
            setSort({ skip });
          });
        }}
      >
        Load more
      </Button>

      <Button
        className='ml-2'
        variant='outline-info'
        onClick={() => {
          props.history.push('/user_area/create');
        }}
      >
        Create new article
      </Button>


    </UserAreaHOC>
  );
}

export default Articles;
