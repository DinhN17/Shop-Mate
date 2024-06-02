import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Button, Input, Stack, Box, Card, CardHeader, CardBody,  Heading, Text } from '@chakra-ui/react';

import Auth from '../utils/auth';

const Login = () => {
    const [formState, setFormState] = useState({ email: '', password:'' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        // console.log(formState);
        try {
          const { data } = await login({
            variables: { ...formState },
          });
    
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }

        setFormState({
            email: '',
            password: '',
          });
     };

  return (
    <Box px={38} py={5} my={40}>
        <Card px={10} py={8}>
        <CardHeader >
            <Heading size='md'>Login</Heading>
        </CardHeader>

        <CardBody>
        {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/dashboard">back to the homepage.</Link>
              </p>
            ) : (
        <form onSubmit={handleFormSubmit}>
        <Stack spacing={4}>
              <Input 
                size='sm'
                className="form-input"
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
              />
              <Input 
                size='sm'
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
              />
              <Button 
                colorScheme='blue' size='md'
                className="btn btn-block btn-info"
                style={{ cursor: 'pointer' }}
                type="submit"
              >
                Submit
              </Button>
              <Link style={{ color: 'blue', fontSize: "15px" }} to="/signup">Dont have an account? Sign up</Link>
            </Stack>
            </form>
            )}
            {error && (
            <Text pt="5px">
              {error.message}
            </Text>
          )}
        </CardBody>
        </Card>

    </Box>
  );
};
        


export default Login;
