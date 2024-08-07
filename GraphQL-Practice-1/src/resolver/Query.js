const Query = {
    me() {
      return {
        id: '1',
        name: 'Adarsh',
        email: 'adarsh@gmail.com',
      };
    },
    hello: () => 'Hello world!',
    
    getUserData(parent, args, {data}, info) {
      console.log('data in getUserData:', data); 
      if (!data || !data.userarray) {
        throw new Error('Data not available');
      }
      if (!args.query) {
        return data.userarray;
      }
      return data.userarray.sort((a, b) => b.id - a.id);
    },
    greeting(parent, args, ctx, info) {
      console.log('parent', parent);
      console.log('args', args);
      return `Hello, ${args.name || 'World'}!`;
    },
    getPostData(parent, args, { data }, info) {
      if (!data || !data.posts) {
        throw new Error('Data not available');
      }
      return data.posts;
    },
  };
  
  export default Query;
  