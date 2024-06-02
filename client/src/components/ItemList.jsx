import { Box, Heading, SimpleGrid, Button, Stack, VStack } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM, EDIT_ITEM, BUY_ITEM, ADD_ITEM } from '../utils/mutations';
import { GET_LIST } from '../utils/queries';
import Auth from '../utils/auth';

import AddingButton from "../components/AddingButton";
import EditableText from '../components/EditableText';

const ItemsList = ({ items, listId }) => {
  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }]
  });
  
  const [buyItem] = useMutation(BUY_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }]
  });

  const [addItem] = useMutation(ADD_ITEM, {
    refetchQueries: [{ query: GET_LIST, variables: { id: listId } }]
  });

  const [editItem] = useMutation(EDIT_ITEM);

  const handleAddItemSubmit = async (event) => {
    try {
      const { data } = await addItem({
        variables: { 
          listId, 
          name: event.target[0].value, 
          description: event.target[1].value 
        }
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleRemoveItem = async (itemId, listId) => {
    try {
      const { data } = await removeItem({
        variables: { listId, itemId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItemName = async (name, {listId, itemId}) => {
    try {
      const { data } = await editItem({
        variables: { listId, itemId, name }
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload(); // workaround solution, need to study more
  };

  const handleUpdateItemDescription = async (description, {listId, itemId}) => {
    try {
      const { data } = await editItem({
        variables: { listId, itemId, description }
      });
    } catch (err) {
      console.error(err);
    }
    window.location.reload(); // workaround solution, need to study more
  };

  const handleBuyItem = async (itemId, listId) => {
    try {
      const { data } = await buyItem({
        variables: {
          listId,
          itemId,
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack>
      <AddingButton
        addingButtonLabel="Add an item to the List"
        submitButtonName="OK"
        onClickSubmit={handleAddItemSubmit}
        inputProps={[
          { label: 'Name', name: 'name', type: 'text' },
          { label: 'Description', name: 'description', type: 'text' }
        ]}
      />
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
        {Auth.loggedIn() && items &&
          items.map((item) => (
            <Box bg="gray.50" p={4} borderRadius="md" textAlign="center" key={item._id}>
              <Heading as='h4' size='md'>
                <EditableText
                  text={item.name}
                  textAlign={"center"}
                  handleSaveButton={handleUpdateItemName}
                  handleSaveButtonProps={{ listId, itemId: item._id }}
                />
              </Heading>
              <EditableText
                text={item.description}
                textAlign={"center"}
                handleSaveButton={handleUpdateItemDescription}
                handleSaveButtonProps={{ listId, itemId: item._id }}
              />
              <h3>Created by: {item.addedBy}</h3>
              {/* Buy button */}
              {item.boughtBy && <h4>Bought by: {item.boughtBy}</h4>}
              <Stack direction='row' spacing={4} align='center' justify ='center'>
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
    </VStack>
  );
};

export default ItemsList;
