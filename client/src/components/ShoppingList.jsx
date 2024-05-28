// import { Link } from 'react-router-dom';
import { Box, Container, SimpleGrid, Image, Text, Button, Link, Flex, Stack } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';

import { DELETE_LIST, DUPLICATE_LIST } from '../utils/mutations';
import { GET_LISTS_BY_ME } from '../utils/queries';

export default function ShoppingList({lists}) {
  if (!lists.length) {
    return <h3>No shopping list Yet</h3>;
  };

  const [deleteList] = useMutation
    (DELETE_LIST, {
      refetchQueries: [{ query: GET_LISTS_BY_ME }]
    });

  const [duplicateList] = useMutation
    (DUPLICATE_LIST, {
      refetchQueries: [{ query: GET_LISTS_BY_ME }]
    });
  
  // Duplicate List
  const handleDuplicateList = async (listId) => {
    // console.log(list);
    try {
      const { data } = await duplicateList({
        variables: { listId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteList = async (listId) => {
    // console.log(list);
    try {
      const { data } = await deleteList({
        variables: { listId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
      {lists &&
        lists.map((list) => (
          <Box bg="gray.50" p={4} borderRadius="md" textAlign="center" key={list._id}>
            <Link to={`/lists/${list._id}`}>
              Name: {list.name}.
            </Link>
            <h4>Created by: {list.owner}</h4>
            <h4>Description: {list.description}</h4>
            <Stack direction='row' spacing={4} align='center' justify ='center'>
              <Button 
                colorScheme="blue" 
                size="sm" 
              >
                Share
              </Button>
              <Button 
                colorScheme="teal" 
                size="sm"
                onClick={() => handleDuplicateList(list._id)}
              >
                Duplicate
              </Button>
              <Button 
                colorScheme="red" 
                size="sm"
                onClick={() => handleDeleteList(list._id)}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        ))}
    </SimpleGrid>
  );
}