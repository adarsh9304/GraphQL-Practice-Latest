const Subscription = {
    countUpdated: {
        
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(['count_Updated']),
    },
  };
  
  export default Subscription;
  