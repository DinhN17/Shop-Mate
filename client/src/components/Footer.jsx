import React from 'react';
import { Box, Flex, Link, Icon, VStack, Text } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const bg = 'gray.800'; // Background color
  const color = 'white'; // Text color

  return (
    <footer>
      <Flex
        direction="column"
        align="center"
        paddingY={4}
        paddingX={8}
        bg={bg}
        color={color}
      >
        <Flex mb={2}>
          <Link href="https://github.com" isExternal mx={2}>
            <Icon as={FaGithub} fontSize="2xl" />
          </Link>
          <Link href="https://linkedin.com" isExternal mx={2}>
            <Icon as={FaLinkedin} fontSize="2xl" />
          </Link>
        </Flex>
        <Text>&copy; 2024 ShopMate!</Text>
      </Flex>
    </footer>
  );
};

export default Footer;
