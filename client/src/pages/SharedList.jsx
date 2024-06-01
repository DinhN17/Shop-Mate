import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Heading, VStack, Text } from '@chakra-ui/react';

import EditableText from '../components/EditableText';
import ItemList from "../components/ItemList";

import { GET_LIST } from "../utils/queries";

const SharedList = () => {

    const { listId } = useParams();
    // console.log(listId);
    const { loading, error, data, startPolling, stopPolling } = useQuery(GET_LIST, {
        variables: { id: listId },
    });

    useEffect(() => {
        startPolling(5000);
        return () => {
            stopPolling();
        };
    })
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <VStack>
            <Heading as='h2' size='2xl'>
                <EditableText
                    text={data.list.name}
                    textAlign={"center"}
                />
            </Heading>
            <EditableText
                text={data.list.description}
                textAlign={"center"}
            />
            <ItemList items={data.list.items} listId={listId} />
        </VStack>
    );
};

export default SharedList;