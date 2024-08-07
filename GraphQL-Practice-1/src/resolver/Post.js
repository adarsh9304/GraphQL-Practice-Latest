const Post = {
    author(parent, args, { data }, info) {
      return data.userarray.find(user => user.id === parent.author);
    },
  };
  
  export default Post;
  