import { Stack, HStack, Input, Button, IconButton, useDisclosure } from '@chakra-ui/react'
// import { SearchIcon } from '@chakra-ui/icons'

import { useState } from 'react'
// import { useQuery } from '@apollo/client';
// import { GET_USERNAME_BY_EMAIL } from '../utils/queries';


export default function AddingFormWith2Input({ disclosureProps, inputProps, submitButtonName, handleFormSubmit }) {
    const [input1State, setInput1State] = useState('');
    const [input2State, setInput2State] = useState('');
    // const { inputs } = inputProps;

    return (
        <form onSubmit={handleFormSubmit}>
            <HStack {...disclosureProps}>
                <Input
                    placeholder={inputProps[0].label}
                    type={inputProps[0].type} 
                    value={input1State}
                    onChange={(e) => setInput1State(e.target.value)}
                />
                <Input
                    placeholder={inputProps[1].label}
                    type={inputProps[1].type} 
                    value={input2State}
                    onChange={(e) => setInput2State(e.target.value)}
                />
                <Button 
                colorScheme="teal" 
                size="sm"
                type='submit'
                >
                {submitButtonName}
                </Button>
            </HStack>
        </form>
        
    )
}
