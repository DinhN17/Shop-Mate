import { Box, Container } from '@chakra-ui/react'; // Import Container for responsive layout

const Home = () => {
    return (
        <Container maxW="container.lg"> {/* Use Container for responsive layout */}
            <Box bg="white" p={4} borderRadius="md">
                <h1>Home</h1>
                <Box mt={4}>
                    <p>This is the first div with some text.</p>
                </Box>
                <Box mt={4}>
                    <p>This is the second div with some more text.</p>
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
