// Import required components
import { Box, Container, SimpleGrid, Image, Text, Button, Link, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

const Home = () => {
    return (
        <Container maxW="container.xxl">
            <Box bg="white" p={4} borderRadius="md">
                {/* Hero section */}
                <MotionBox
                    bg="gray.50"
                    p={8}
                    borderRadius="md"
                    textAlign="center"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="center">
                        <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
                            <Text as="h1" fontSize="9xl" fontWeight="bold" textAlign="center">
                                Welcome to ShopMate!
                            </Text>
                            <Text fontSize="4xl" mt={2} textAlign="center">
                                Shop Smart, Share Together!
                            </Text>
                        </Box>
                        <Image
                            src="/shopping-list.gif" 
                            alt="Hero GIF"
                            mx="auto"
                            ml={{ md: 8 }}
                            boxSize="20%"
                            
                          
                        />
                    </Flex>
                </MotionBox>
                {/* Main content */}
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mt={4}>
                    <Box bg="gray.50" py={12} borderRadius="md" textAlign="center">
                        <Container maxW="container.lg">
                            <Text as="h2" fontSize="2xl" fontWeight="bold" mb={6}>
                                Support Our Website's Growth
                            </Text>
                            <Text style={{ fontSize: '1.2rem'}}>
                                Help us improve and maintain our website to provide you with better experiences.
                            </Text>
                            <br></br>
                            <Link as={RouterLink} to="/donation">
                                <Button colorScheme="teal" size="lg">
                                    Donate Now
                                </Button>
                            </Link>
                        </Container>
                    </Box>
                    {/* About Us Section */}
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>About Us</h2>
                        <br></br>
                        <p style={{ fontSize: '1.2rem'}}> At ShopMate, we value shared experiences, especially in shopping. With our app, effortlessly manage and share lists with friends, family, or colleagues. Seamlessly add, update, and check off items in real-time, from anywhere. Join ShopMate now for collaborative shopping</p>
                    </Box>
                </SimpleGrid>

                {/* Available Features Section */}
                <SimpleGrid columns={1} spacing={4} mt={4}>
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Available Features</h2>
                        <p>Include list of available features</p>
                    </Box>

                    {/* Meet The Team Section */}
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Meet the Team</h2>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
                            {/* Team Member 1 */}
                            <Box bg="white" p={4} borderRadius="md" boxShadow="md" textAlign="center">
                                <Image
                                    borderRadius="full"
                                    boxSize="150px"
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 1"
                                    mx="auto"
                                />
                                <Text mt={2} fontSize="lg" fontWeight="bold">Dinh Nguyen</Text>
                                <Text>Project Lead & Full-Stack Developer</Text>
                        
                            </Box>
                            {/* Team Member 2 */}
                            <Box bg="white" p={4} borderRadius="md" boxShadow="md" textAlign="center">
                                <Image
                                    borderRadius="full"
                                    boxSize="150px"
                                    src="https://via.placeholder.com/150"
                                    alt="Team Member 2"
                                    mx="auto"
                                />
                                <Text mt={2} fontSize="lg" fontWeight="bold">Adelle Ocampo</Text>
                                <Text>Full-Stack Developer</Text>
                               
                            </Box>
                            {/* Team Member 3 */}
                            <Box bg="white" p={4} borderRadius="md" boxShadow="md" textAlign="center">
                                <Image
                                    borderRadius="full"
                                    boxSize="150px"
                                    src="/Samantha.png"
                                    alt="Team Member 3"
                                    mx="auto"
                                />
                                <Text mt={2} fontSize="lg" fontWeight="bold">Samantha Samarua</Text>
                                <Text>Full-Stack Developer</Text>
                                
                            </Box>
                        </SimpleGrid>
                    </Box>
                </SimpleGrid>
            </Box>
        </Container>
    );
};

export default Home;
