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
                            <Text as="h1" fontSize={{ base: '3xl', md: '6xl', lg: '8xl' }} fontWeight="bold">
                                Welcome to ShopMate!
                            </Text>
                            <Text fontSize={{ base: 'xl', md: '2xl', lg: '4xl' }} mt={2}>
                                Shop Smart, Share Together!
                            </Text>
                        </Box>
                        <Image
                            src="/shopping-list.gif"
                            alt="Hero GIF"
                            mx="auto"
                            mt={{ base: 4, md: 0 }}
                            ml={{ md: 8 }}
                            boxSize={{ base: '50%', md: '30%', lg: '20%' }}
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
                            <Text fontSize={{ base: 'md', md: 'lg' }}>
                                Help us improve and maintain our website to provide you with better experiences.
                            </Text>
                            <br />
                            <Link as={RouterLink} to="/donation">
                                <Button colorScheme="teal" size="lg">
                                    Donate Now
                                </Button>
                            </Link>
                        </Container>
                    </Box>
                    {/* About Us Section */}
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <Text as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
                            About Us
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }}>
                            At ShopMate, we value shared experiences, especially in shopping. With our app, effortlessly manage and share lists with friends, family, or colleagues. Seamlessly add, update, and check off items in real-time, from anywhere. Join ShopMate now for collaborative shopping.
                        </Text>
                    </Box>
                </SimpleGrid>

                {/* Available Features Section */}
                <SimpleGrid columns={1} spacing={4} mt={4}>
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <Text as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
                            Available Features
                        </Text>
                        <Text fontSize={{ base: 'md', md: 'lg' }}>Include list of available features</Text>
                    </Box>

                    {/* Meet The Team Section */}
                    <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                        <Text as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
                            Meet the Team
                        </Text>
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
