import { Stack, HStack, Input, Button, IconButton, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { GET_USERNAME_BY_EMAIL } from '../utils/queries';

export default function SearchUserForm({ disclosureProps, handleFormSubmit }) {
    const [emailState, setEmailState] = useState('');
    
    return (
        <form onSubmit={handleFormSubmit}>
            <HStack {...disclosureProps}>
                <Input
                    placeholder='email address'
                    type="email" 
                    value={emailState}
                    onChange={(e) => setEmailState(e.target.value)}
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
        
    )
}
