import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'

import { Box, Heading, SimpleGrid, Button, VStack, Stack } from '@chakra-ui/react';
import ShareListButton from './ShareListButton';
import AddingButton from "./AddingButton";
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';

import { DELETE_LIST, DUPLICATE_LIST, ADD_LIST } from '../utils/mutations';
import { GET_LISTS_BY_ME } from '../utils/queries';

export default function ShoppingList({lists}) {

  // Toggle for Share button
  const { getDisclosureProps, getButtonProps } = useDisclosure()
  
  const [addList] = useMutation(ADD_LIST, {
    refetchQueries: [{ query: GET_LISTS_BY_ME }]
  });

  const [deleteList] = useMutation
    (DELETE_LIST, {
      refetchQueries: [{ query: GET_LISTS_BY_ME }]
    });

  const [duplicateList] = useMutation
    (DUPLICATE_LIST, {
      refetchQueries: [{ query: GET_LISTS_BY_ME }]
    });

  //Add List
  const handleAddListSubmit = async (event) => {
      try {
          const { data } = await addList({
              variables: { 
                  name: event.target[0].value, 
                  description: event.target[1].value
              }
          });
      } catch (err) {
          console.error(err);
      }
  };

  // Duplicate List
  const handleDuplicateList = async (listId) => {
    // // console.log(list);
    try {
      const { data } = await duplicateList({
        variables: { listId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      const { data } = await deleteList({
        variables: { listId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VStack>
      <AddingButton
      addingButtonLabel="Add a new shopping list"
      submitButtonName="OK"
      onClickSubmit={handleAddListSubmit}
      inputProps={[
          { label: "List Name", type: "text" }, 
          { label: "Description", type: "text" }
          ]}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        {lists &&
          lists.map((list) => (
            <Box bg="gray.50" p={4} borderRadius="md" textAlign="center" key={list._id}>
              <ChakraLink as={ReactRouterLink} to={`/lists/${list._id}`}>
              <Heading as='h3' size='lg'>Name: {list.name}.</Heading>
              </ChakraLink>
              <h4>Created by: {list.owner}</h4>
              <h4>Members: {list.members.join(', ')}</h4>
              <h4>Description: {list.description}</h4>
              <Stack direction='row' spacing={4} align='start' justify ='center'>
                <ShareListButton listId={list._id} />
                <Button 
                  colorScheme="teal" 
                  size="sm"
                  onClick={() => handleDuplicateList(list._id)}
                >
                  Duplicate
                </Button>
                {(Auth.getUser().data.username != list.owner) ? null : (
                <Button 
                  colorScheme="red" 
                  size="sm"
                  onClick={() => handleDeleteList(list._id)}
                >
                  Delete
                </Button>
                )}
              </Stack>
            </Box>
          ))}
      </SimpleGrid>
    </VStack>
  );
}