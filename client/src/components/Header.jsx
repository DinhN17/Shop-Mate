import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, HStack, Button, Image } from '@chakra-ui/react';


import Auth from '../utils/auth';

export default function Header() {

  const bg = 'gray.800';
  const color = 'white';

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  

  return (
    <Box bg={bg} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={2} alignItems="center">
          <Image
            src="../../public/wishlist.png"
            alt="ShopMate Icon"
            boxSize="40px"
          />
          <Box fontSize="2xl" fontWeight="bold" color={color}>ShopMate!</Box>
        </HStack>
        <HStack as={'nav'} spacing={4} alignItems={'center'}>
          <Link to="/">
            <Button variant="ghost" color={color}>Home</Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" color={color}>Dashboard</Button>
          </Link>
          <Link to="/donation">
            <Button variant="ghost" color={color}>Donation</Button>
          </Link>
          {Auth.loggedIn () ? (
            <>
            <Link to="/">
            <Button variant="ghost" color={color} onClick={logout}>Logout</Button>
            </Link>
            </>
          ) : (
            <>
          <Link to="/login">
            <Button variant="ghost" color={color}>Login</Button>
          </Link>
          <Link to="/signup">
            <Button variant="ghost" color={color}>Sign Up</Button>
          </Link>
          </>
          )};
        </HStack>
      </Flex>
    </Box>
  );
}
