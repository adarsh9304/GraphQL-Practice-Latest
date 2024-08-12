const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");
const authMiddleware = require("../middleware/auth.js");

const users = [];

const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      const user = authMiddleware(context);
      console.log('user', user)
      return users.find((u) => u.id == user.id);
    }
  },
  Mutation: {
    signup: (parent, { username, email, password }, context, info) => {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = {
        id: users.length + 1,
        username,
        email,
        password: hashedPassword
      };
      users.push(user);
      return user;
    },

    login: (parent, { username, password }, context, args) => {
      const user = users.find((u) => u.username === username);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      user.token = generateToken(user);
      return user;
    }
  }
};

module.exports=resolvers