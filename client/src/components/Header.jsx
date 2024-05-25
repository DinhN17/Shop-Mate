import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, HStack, Button, useColorModeValue } from '@chakra-ui/react';

export default function Header() {
  const bg = useColorModeValue('gray.100', 'gray.900');
  const color = useColorModeValue('black', 'white');

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontSize="2xl" fontWeight="bold">Shop Mate</Box>
        <HStack
          as={'nav'}
          spacing={4}
          alignItems={'center'}
        >
          <Link to="/">
            <Button variant="ghost" color={color}>Home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" color={color}>Dashboard</Button>
          </Link>
          <Link to="/login">
            <Button variant="ghost" color={color}>Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="ghost" color={color}>Sign Up</Button>
          </Link>
          <Link to="/donation">
            <Button variant="ghost" color={color}>Donation</Button>
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}
