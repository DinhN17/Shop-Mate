import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import { Button, Input, Stack, Box, Card, CardHeader, CardBody,  Heading, Text } from '@chakra-ui/react';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);
    const [formError, setFormError] = useState('');

    const handleChange = (event) => {
        const{ name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value, 
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.firstName || !formState.lastName || !formState.username || !formState.email || !formState.password) {
            setFormError('All fields are required.');
            return;
        }

        console.log(formState);

        try {
            const { data } = await createUser({
                variables: { ...formState },
            }); 

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error('Error during form submission:', e);
            setFormError('Failed to create profile. Please try again.');
        }
    };

    return (
        <Box>
            <Card my={30} mx={10} py={15} px={10}>
                <CardHeader>
                    <Heading  size='md'> Sign up</Heading> 
                </CardHeader>

                <CardBody>
                {data ? (
                    <p>
                       Success! You mat now head {' '}
                       <Link to="/"> back to homepage. </Link> 
                    </p>

                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <Stack spacing={4}> 
                            <Input
                            size = "md"
                            placeholder="First Name"
                            name = "firstName"
                            type = "text"
                            value = {formState.firstName}
                            onChange={handleChange}
                            />
                            <Input
                            size = "md"
                            placeholder="Last Name"
                            name = "lastName"
                            type = "text"
                            value = {formState.lastName}
                            onChange={handleChange}
                            />
                            <Input
                            size = "md"
                            placeholder=" Your username"
                            name = "username"
                            type = "text"
                            value = {formState.username}
                            onChange={handleChange}
                            />
                            <Input
                            size = "md"
                            placeholder=" Your email"
                            name = "email"
                            type = "email"
                            value = {formState.email}
                            onChange={handleChange}
                            />
                            <Input
                            size = "md"
                            placeholder=" ******"
                            name = "password"
                            type = "password"
                            value = {formState.password}
                            onChange={handleChange}
                            />
                            <Button 
                            colorScheme='blue' size='md'
                            className="btn btn-block btn-info"
                            style={{ cursor: 'pointer' }}
                            type="submit"
                            mt={8}
                            >
                            Create Profile
                            </Button>
                            <Link style={{ color: 'blue', fontSize: "15px" }} to="/login">Already have an account? Login</Link>

                        </Stack>

                    </form>
                )}
                {formError && (
                        <Text pt="5px" color="red.500">
                            {formError}
                        </Text>
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
export default Signup;
