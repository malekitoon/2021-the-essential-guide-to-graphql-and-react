const axios = require('axios');

const resolvers = {
    Query: {
        user: async (parent, args, context, info) =>{
            try {
                const request = await axios.get(`http://localhost:3004/user/${args.id}`);
                return request.data;
            } catch(error) {
                throw error;
            }
        },
        users: async (parent, args, context, info) =>{
            try {
                const request = await axios.get(`http://localhost:3004/user/`);
                const delayed = await new Promise( resolve => {
                    setTimeout(()=>{
                        resolve(request)
                    },2000)
                })
                return delayed.data;
            } catch(error) {
                throw error;
            }
        },
        lastPost: async (parent, args, context, info) => {
            try {
                const request = await axios.get(`http://localhost:3004/posts/?_sort=id&_order=desc&_limit=1`);
                const data = request.data[0];
                return data
            } catch(error) {
                throw error;
            }
        
        }
    },
    Mutation:{
        addPost: async (parent, args, context, info) => {
            console.log(args)
            try {
                const request = await axios.post(`http://localhost:3004/posts`,{
                    ...args.data
                });
                return request.data;
            } catch(error) {
                throw error;
            }
        }
    },
    User:{
        posts:async (parent, args, context, info) => { 
            try {
                const request = await axios.get(`http://localhost:3004/posts?author=${parent.id}`);
                return request.data;
            } catch(error) {
                throw error;
            }

        }
    },
    Post:{
        author: async (parent, args, context, info) => {
            try {
                const request = await axios.get(`http://localhost:3004/user?id=${parent.author}`);
                return request.data;
            } catch(error) {
                throw error;
            }
        }
    }
};

module.exports = resolvers;