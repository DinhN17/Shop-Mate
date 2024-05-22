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
};