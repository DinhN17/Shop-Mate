import { Text, HStack, VStack, Input, Button, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client';
import { GET_USERNAME_BY_EMAIL } from '../utils/queries';
import { SHARE_LIST_WITH_FRIEND } from '../utils/mutations';

export default function SearchUserForm({ disclosureProps, listId }) {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState('');
    
    const client = useApolloClient();
    
    const [shareListWithFriend] = useMutation(SHARE_LIST_WITH_FRIEND);

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await client.query({
                query: GET_USERNAME_BY_EMAIL,
                variables: { email: searchValue },
            })
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
