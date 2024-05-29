import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, SimpleGrid, Image, Text, Button, Flex, Stack } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM, EDIT_ITEM, BUY_ITEM } from '../utils/mutations';
import { GET_LIST } from '../utils/queries';
import Auth from '../utils/auth';

const ItemsList = ({ items, listId }) => {
  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }]
  });
  
  const [buyItem] = useMutation(BUY_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }]
  });

  const handleRemoveItem = async (itemId, listId) => {
    try {
      const { data } = await removeItem({
        variables: { listId, itemId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditItem = async (itemId, name, description) => {
    // try {
    //   await editItem({
    //     variables: { listId, itemId, name, description }
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleBuyItem = async (itemId) => {
    try {
      const user = Auth.getUser();
      if (!user || !user.authenticatedUser || !user.authenticatedUser.username) {
        throw new Error('User is not authenticated');
      }
      await buyItem({
        variables: {
          listId,
          itemId,
          boughtBy: user.authenticatedUser.username
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!items.length) {
    return <h3>No Items Yet</h3>;
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
      {Auth.loggedIn() && items &&
        items.map((item) => (
          <Box bg="gray.50" p={4} borderRadius="md" textAlign="center" key={item._id}>
            <h4>Name: {item.name}.</h4>  
            <p>Description: {item.description}</p>
            <h3>Created by: {item.addedBy}</h3>
            {/* Buy button */}
            {item.boughtBy && <h4>Bought by: {item.boughtBy}</h4>}
            <Stack direction='row' spacing={4} align='center' justify ='center'>
              <Button 
                colorScheme="blue" 
                size="sm" 
                onClick={() => handleEditItem(item._id, item.name, item.description)}
              >
                Edit
              </Button>
              <Button 
                colorScheme="teal" 
                size="sm"
                onClick={() => handleBuyItem(item._id, listId)}
              >
                Buy
              </Button>
              <Button 
                colorScheme="red" 
                size="sm"
                onClick={() => handleRemoveItem(item._id, listId)}
              >
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default ItemsList;
