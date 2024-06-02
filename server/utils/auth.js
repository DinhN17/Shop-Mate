const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'thisisthesecret';
const expiration = '2h';

module.exports = {
    AuthenticationError: new GraphQLError('User could not be authenticated.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }), 

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        // // console.log("payload",payload);
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
    
        if (req.headers.authorization) {
          token = token.split(' ').pop().trim();
        }
    
        if (!token) {
          return req;
        }
        
        try {
          const { data } = jwt.verify(token, secret, { maxAge: expiration });
          // // console.log("authenticatedPerson", data);
          req.user = data;
        } catch {
          // console.log('Invalid token');
        }
    
        // // console.log("req.user", req.user);
        return req;
    },
};