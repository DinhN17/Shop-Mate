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

    const handleChange = (event) => {
        const{ name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value, 
        });
    };

    const handleFromSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await createUser({
                varibles: { ...formState },
            }); 

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box>
            <Card>
                <CardHeader>
                    <Heading  size='md'> Signin</Heading> 
                </CardHeader>

                <CardBody>
                {data ? (
                    <p>
                       Success! You mat now head {' '}
                       <Link to="/"> back to homepage. </Link> 
                    </p>

                ) : (
                    <form onSubmit={handleFromSubmit}>
                        <Stack spacing={4}> 
                            <Input
                            size = "md"
                            placeholder="First Name"
                            name = "firstname"
                            type = "text"
                            value = {formState.firstName}
                            onChange={handleChange}
                            />
                            <Input
                            size = "md"
                            placeholder="Last Name"
                            name = "lastname"
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
                            >
                            Create Profile
                            </Button>

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
export default Signup;


// const Signup = () => {
//     return (
//         <div>
//             <h1>Donation</h1>
//         </div>
//     )
// };

// export default Signup;