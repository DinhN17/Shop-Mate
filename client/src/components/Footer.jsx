import React from 'react';
import { Box, Flex, Link, Icon } from '@chakra-ui/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const bg = 'gray.800'; // Background color
  const color = 'white'; // Text color

  return (
    <footer>
      <Flex
        align="center"
        justify="space-between"
        paddingY={4}
        paddingX={8}
        bg={bg}
        color={color}
      >
        <Box>&copy; 2024 ShopMATE</Box>
        <Box>
          <Link href="https://github.com" isExternal marginRight={4}>
            <Icon as={FaGithub} fontSize="xl" />
          </Link>
          <Link href="https://linkedin.com" isExternal>
            <Icon as={FaLinkedin} fontSize="xl" />
          </Link>
        </Box>
      </Flex>
    </footer>
  );
};

export default Footer;
