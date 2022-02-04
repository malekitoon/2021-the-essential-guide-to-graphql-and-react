import axios from 'axios';

const DB_URL = 'http://localhost:3004';

const Query = {
  agent: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/users/${args.id}`);
    return response.data;
  },
  agents: async (parent, args, context, info) => {
    const name = args.name != null ? `name=${args.name}` : '';
    const age = args.age != null ? `age=${args.age}` : '';

    const response = await axios.get(`${DB_URL}/users?${name}&${age}`);
    return response.data;
  },
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/posts`);
    return response.data;
  },
  post: async(parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/posts/${args.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/pictures`);
    return response.data;
  },
  getAnimal: async (parent, args, context, info) => {
    let response;
    let random = Math.floor(Math.random() * 6) + 1;

    if (random > 3) {
      response = {
        animal: 'DOG',
        name: 'Captain',
        hair: 'lots'
      };
    } else {
      response = {
        animal: 'CAT',
        name: 'Fluffy',
        paws: 'sharpy',
      }
    }

    return response;
  },
};

const Mutation = {
  createAgent: async (parent, args, context, info) => {
    const params = {
      name: args.data.name,
      age: args.data.age,
      married: args.data.married,
      average: 0,
      status: args.data.status,
    };
    const response = await axios.post(`${DB_URL}/users`, params);
    return response.data;
  },
  createPost: async (parent,args,context, info) => {
    const params = {
      title: args.title,
      content: args.content,
      status: args.status,
      author: 1, // get user id from somewhere
      picture: 1, // get picture id from somewhere
    };
    const response = await axios.post(`${DB_URL}/posts`, params);
    return response.data;
  },
  deletePost: async (parent, args, context, info) => {
    const response = await axios.delete(`${DB_URL}/posts/${args.id}`);

    // find all posts and delete them
    // find all pictures and delete them
    return Object.keys(response.data).length === 0;

  },
  deleteAgent: async (parent, args, context, info) => {
    const response = await axios.delete(`${DB_URL}/users/${args.id}`);
    return Object.keys(response.data).length === 0;
  },
  updateAgent: async (parent, args, context, info) => {
    const data = {};
    if (args.data.name !== undefined) { data.name = args.data.name; }
    if (args.data.age !== undefined) { data.age = args.data.age; }
    if (args.data.married !== undefined) { data.married = args.data.married; }
    if (args.data.average !== undefined) { data.average = args.data.average; }
    if (args.data.status !== undefined) { data.status = args.data.status; }

    const response = await axios.patch(`${DB_URL}/users/${args.id}`, data);
    return response.data;
  }
};

const Post = {
  author: async(parent, args, context, info) => {
    try {
      const response = await axios.get(`${DB_URL}/users/${parent.author}`);
      return response.data;
    } catch (err) {
      return null;
    }
  },
  picture: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/pictures/${parent.picture}`);
    return response.data;
  },
};

const User = {
  posts: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/posts?author=${parent.id}`);
    return response.data;
  },
  pictures: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/pictures?author=${parent.id}`);
    return response.data;
  },
};

const Picture = {
  author: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/users/${parent.author}`);
    return response.data;
  },
  post: async (parent, args, context, info) => {
    const response = await axios.get(`${DB_URL}/posts/${parent.post}`);
    return response.data;
  },
};

const AnimalUnion = {
  __resolveType(obj, context, info) {
    if (obj.animal === 'DOG') {
      return 'Dog';
    }

    if (obj.animal === 'CAT') {
      return 'Cat';
    }

    return null;
  }
}

const IAnimal = {
  __resolveType(obj, context, info) {
    if (obj.animal === 'DOG') {
      return 'Dog';
    }

    if (obj.animal === 'CAT') {
      return 'Cat';
    }

    return null;
  }
};

export {
  Query,
  Mutation,
  User,
  Post,
  Picture,
  AnimalUnion,
  IAnimal,
};
