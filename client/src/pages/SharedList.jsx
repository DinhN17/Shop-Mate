import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';

import EditableText from '../components/EditableText';
import ItemList from "../components/ItemList";

import { GET_LIST } from "../utils/queries";
import { UPDATE_LIST_NAME, UPDATE_LIST_DESCRIPTION } from "../utils/mutations";

import Auth from "../utils/auth";

const SharedList = () => {

    // const [listState, setListState] = useState();

    const { listId } = useParams();
    // // console.log(listId);
    const { loading, error, data, startPolling, stopPolling } = useQuery(GET_LIST, {
        variables: { id: listId },
    });

    const [updateListName] = useMutation(UPDATE_LIST_NAME, {
        refetchQueries: [{ 
            query: GET_LIST, 
            variables: { id: listId },
        }]
      });
    const [updateListDescription] = useMutation(UPDATE_LIST_DESCRIPTION, {
        refetchQueries: [{ 
            query: GET_LIST,
            variables: { id: listId },
        }]
      });

    const handleUpdateListName = async (newName, {listId}) => {
        try {
            await updateListName({
                variables: { id: listId, name: newName },
            });
        } catch (err) {
            console.error(err);
        }
        window.location.reload(); // workaround solution, need to study more

        // setListState(updatedData);
    };

    const handleUpdateListDescription = async (newDescription, {listId}) => {
        try {
            await updateListDescription({
                variables: { id: listId, description: newDescription },
            });
        } catch (err) {
            console.error(err);
        };
        window.location.reload(); // workaround solution, need to study more
    };

    

    useEffect(() => {
        startPolling(5000);
        return () => {
            stopPolling();
        };
    });

    if (!Auth.loggedIn()) {
        window.location.assign("/login");
    };
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error :(</div>;
    // setListState(data.list);
    return (
        <VStack>
            <Heading as='h2' size='2xl'>
                <EditableText
                    text={data.list.name}
                    textAlign={"center"}
                    handleSaveButton={handleUpdateListName}
                    handleSaveButtonProps={{listId: listId}}
                />
            </Heading>
            <EditableText
                text={data.list.description}
                textAlign={"center"}
                handleSaveButton={handleUpdateListDescription}
                handleSaveButtonProps={{listId: listId}}
            />
            <ItemList items={data.list.items} listId={listId} />
        </VStack>
    );
};

export default SharedList;