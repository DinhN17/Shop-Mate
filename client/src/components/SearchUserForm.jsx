import { Text, HStack, VStack, Input, Button, IconButton, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { useState } from 'react'
import { useQuery, useMutation, useLazyQuery, useApolloClient } from '@apollo/client';
import { GET_USERNAME_BY_EMAIL } from '../utils/queries';
import { SHARE_LIST_WITH_FRIEND } from '../utils/mutations';

export default function SearchUserForm({ disclosureProps, listId }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState('');
    // const [resultState, setResultState] = useState('');
    // console.log(listId);
    
    const client = useApolloClient();
    // const { data, loading, error } = useQuery(GET_USERNAME_BY_EMAIL, {
    //     variables: { email: searchValue },
    // });

    const [shareListWithFriend] = useMutation(SHARE_LIST_WITH_FRIEND);

    // let searchResult;
    // let sValue;
    // if (data !== undefined && data !== null) {
    //     if (loading) { searchResult = 'Loading User...' }
    
    //     if (error) { searchResult = `Error Occur: ${error}` }
    
    //     searchResult = data.userByEmail;
    // };

    const handleSearchSubmit = async (event) => {
        // setSearchValue(sValue);
        console.log(searchValue);
        console.log(event.target.value);
        event.preventDefault();
        try {
            const { data } = await client.query({
                query: GET_USERNAME_BY_EMAIL,
                variables: { email: searchValue },
            })
            console.log(data.userByEmail);
            setSearchResult(data.userByEmail.username);
        } catch (error) {
            console.error(error);
        };
    };

    const handleFormSubmit = async () => {
        try {
            const { data } = await shareListWithFriend({
                 variables: { 
                    listId: listId,
                    friendUsername: searchResult 
                } 
            });
        } catch (err) {
            console.error(err);
        }
        setSearchValue('');
        setSearchResult('');
    };
    
    return (
        <VStack>
            <form onSubmit={handleSearchSubmit}>
                <HStack {...disclosureProps}>
                    <Input
                        placeholder='email address'
                        type="email"
                        name="email"
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                    />
                    <IconButton
                        colorScheme='blue'
                        aria-label='Search database'
                        size="sm"
                        icon={<SearchIcon />}
                        type='submit'
                    />
                </HStack>
            </form>
            {
            searchResult==='' ? <></> : (
                <HStack {...disclosureProps}>
                    <Text>Share list to: {searchResult}</Text>
                    <Button onClick={handleFormSubmit}>OK</Button>
                </HStack>
            )
            }
            
        </VStack>
    )
}
