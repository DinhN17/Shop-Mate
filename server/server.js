const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const Stripe = require('stripe');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const stripe = Stripe('https://buy.stripe.com/test_00gaHNfVn2tn3XW5kk'); // Replace with your Stripe secret key
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Stripe payment endpoint
  app.post('/api/payment', async (req, res) => {
    const { amount, id } = req.body;
    
    try {
      const payment = await stripe.paymentIntents.create({
        amount: amount * 100, // amount in cents
        currency: 'aud', // setting the currency to AUD
        payment_method: id,
        confirm: true,
      });

      res.json({ success: true, payment });
    } catch (error) {
      res.json({ success: false, message: error.raw.message });
    }
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();


// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const path = require('path');
// const { authMiddleware } = require('./utils/auth');

// const { typeDefs, resolvers } = require('./schemas');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const app = express();
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async () => {
//   await server.start();

//   app.use(express.urlencoded({ extended: false }));
//   app.use(express.json());

//   app.use('/graphql', expressMiddleware(server, {
//     context: authMiddleware
//   }));

//   // Serve up static assets
//   app.use('/images', express.static(path.join(__dirname, '../client/images')));

  
//   if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));

//     app.get('*', (req, res) => {
//       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//     });
//   }

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
//     });
//   });
// };

// // Call the async function to start the server
// startApolloServer();