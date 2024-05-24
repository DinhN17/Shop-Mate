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
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
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
          const { authenticatedPerson } = jwt.verify(token, secret, { maxAge: expiration });
          req.user = authenticatedPerson;
        } catch {
          console.log('Invalid token');
        }
    
        return req;
    },
};