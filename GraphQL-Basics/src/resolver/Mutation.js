import { v4 as uuidv4 } from 'uuid';

const Mutation = {
  createUser(parent, args, { data }, info) {
    const isEmailExist = data.userarray.some(user => user.email === args.data.email);

    if (isEmailExist) {
      throw new Error('Email has been taken');
    }

    const user = {
      id: uuidv4(),
      name: args.data.name,
      email: args.data.email,
    };

    data.userarray.push(user);
    return user;
  },

  deleteUser(parent, args, { data }, info) {
    const userIndex = data.userarray.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const [deletedUser] = data.userarray.splice(userIndex, 1);
    return deletedUser;
  },
};

export default Mutation;
