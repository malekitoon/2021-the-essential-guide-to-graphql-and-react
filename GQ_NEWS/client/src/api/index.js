import axios from 'axios';

axios.defaults.baseURL = '/graphql';
axios.defaults.method = 'POST';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('X-AUTH')}`;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const signupUser = async (userData) => {
  try {
    const { data } = await axios({
      data: {
        query: `mutation{
          signUp(
            fields: {
              email: "${userData.email}"
              password: "${userData.password}"
            }
          ){
            _id
            email
            token
          }
        }`,
      },
    });

    return {
      auth: data.data ? data.data.signUp : null,
      errors: data.errors,
    };
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (userData) => {
  try {
    const { data } = await axios({
      data: {
        query: `mutation{
          authUser(
            fields: {
              email: "${userData.email}",
              password: "${userData.password}"
            }
          ){
            _id
            email
            token
          }
        }`,
      },
    });

    return {
      auth: data.data ? data.data.authUser : null,
      errors: data.errors,
    };
  } catch (err) {
    console.log(err);
  }
};

export const autoSignIn = async () => {
  try {
    const { data } = await axios({
      data: {
        query: `query { isAuth { _id, email, token } }`,
      },
    });

    if (data.errors) localStorage.removeItem('X-AUTH');

    return {
      auth: data.data ? data.data.isAuth : null,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updateUserEmailPass = async (email, password, id) => {
  try {
    const { data } = await axios({
      data: {
        query: `mutation {
          updateUserEmailPass(
            email: "${email}",
            password: "${password}",
            _id: "${id}"
          ) {
            _id
            token
            email
          }
        }`,
      },
    });

    if (data.errors) {
      return { errors: data.errors };
    } else {
      localStorage.setItem('X-AUTH', data.data.updateUserEmailPass.token);
    }

    return {
      auth: data.data ? data.data.updateUserEmailPass : null,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getUserStats = async (id) => {
  try {
    const body = {
      query: `
        query User($id:ID!, $sort:SortInput){
          user(id:$id) {
            name
            lastname
            posts(sort:$sort) { _id, title }
            categories { name }
          }
        }
      `,
      variables: {
        id,
        sort: { sortBy: '_id', order: 'desc', limit: 13 },
      }
    };

    const { data } = await axios({
      data: JSON.stringify(body),
    });

    return {
      stats: data.data ? data.data.user : null,
      errors: data.errors
    };
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async () => {
  try {
    const body = {
      query: `
        query {
          categories{
            _id
            name
          }
        }
      `,
    };

    const { data } = await axios({ data: JSON.stringify(body) });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (args) => {
  try {
    const body = {
      query: `
        mutation CreatePost($fields:PostInput!){
          createPost(fields:$fields) {
            _id
            title
          }
        }
      `,
      variables: {
        fields: args,
      }
    };

    const { data } = await axios({ data: JSON.stringify(body) });
    return {
      createdPost: {
        post: data.data ? data.data.createPost : null,
        errors: data.errors
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export const getUserPosts = async (sort, prevState, id) => {
  try {
    const body = {
      query: `
        query GetUserPosts($sort: SortInput, $queryBy: QueryByInput) {
          posts(sort: $sort, queryBy: $queryBy) {
            _id
            title
            status
            category { name }
          }
        }
      `,
      variables: {
        sort: sort,
        queryBy: { key: 'author', value: id },
      }
    };

    const { data } = await axios({ data: JSON.stringify(body) });

    let newState;
    let newPosts = data.data ? data.data.posts : null;
    if (newPosts) {
      newState = [...prevState, ...newPosts];
    }

    return {
      posts: data.data ? newState : null,
    };
  } catch (err) {
    console.log(err);
  }
};

export const updatePostStatus = async (status, postId, prevState) => {
  try {
    const body = {
      query: `
        mutation UpdatePost($fields: PostInput!, $postId: ID!) {
          updatePost(fields: $fields, postId: $postId) {
            _id
            title
            status
            category { name }
          }
        }
      `,
      variables: {
        postId,
        fields: { status },
      }
    };

    const { data } = await axios({ data: JSON.stringify(body) });

    let newState = null;
    let updPost = data.data ? data.data.updatePost : null;
    if (updPost) {
      newState = prevState.map(oldObj => {
        return [updPost].find(newObj => newObj._id === oldObj._id) || oldObj;
      });
    }

    return {
      posts: newState || prevState,
    };
  } catch (err) {
    console.log(err);
  }
};

export const removePost = async (postId, prevState) => {
  try {
    const body = {
      query: `
        mutation {
          deletePost(postId: "${postId}") {
            _id
          }
        }
      `,
    };

    const { data } = await axios({ data: JSON.stringify(body) });

    let newState = null;
    let deletedPost = data.data ? data.data.deletePost : null;
    if (deletedPost) {
      newState = prevState.filter((obj) => obj._id !== deletedPost._id);
    }

    return {
      posts: newState || prevState,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async (sort, prevState) => {
  try {
    const body = {
      query: `
        query GetPosts($sort: SortInput, $queryBy: QueryByInput) {
          posts(sort: $sort, queryBy: $queryBy) {
            _id
            title
            status
            content
            excerpt
            category { name }
            author { name, lastname}
          }
        }
      `,
      variables: {
        sort: sort,
        queryBy: { key: 'status', value: 'PUBLIC' },
      }
    };

    const { data } = await axios({ data: JSON.stringify(body) });

    let newState;
    let newPosts = data.data ? data.data.posts : null;
    if (newPosts) {
      newState = [...prevState, ...newPosts];
    }

    return {
      homePosts: data.data ? newState : null,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (id) => {
  try {
    const body = {
      query: `
        query {
          post(id: "${id}") {
            _id
            title
            status
            content
            category { _id, name }
            author { name, lastname}
            related(sort: { limit: 4 }) {
              _id
              title
              excerpt
              author { name, lastname }
            }
          }
        }
      `,
    };

    const { data } = await axios({ data: JSON.stringify(body) });

    return {
      singlePost: {
        post: data.data ? data.data.post : null,
        errors: data.errors,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
