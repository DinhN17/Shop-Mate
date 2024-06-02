import { HStack, Input, Button } from '@chakra-ui/react'

import { useState } from 'react'

export default function AddingFormWith2Input({ disclosureProps, inputProps, submitButtonName, handleFormSubmit }) {
    const [input1State, setInput1State] = useState('');
    const [input2State, setInput2State] = useState('');

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
