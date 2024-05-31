// sourced from https://v2.chakra-ui.com/docs/hooks/use-disclosure
import React from 'react'
import { Stack, Button, useDisclosure } from '@chakra-ui/react'


import SearchUserForm from './SearchUserForm';

export default function ShareListButton({listId}) {
    const { getDisclosureProps, getButtonProps } = useDisclosure();
    // console.log(listId);
  
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    return (
        <Stack direction='column' spacing={1} align='center' justify ='center'>
            <Button {...buttonProps} colorScheme='blue' size="sm">Share</Button>
            <SearchUserForm
                disclosureProps={disclosureProps}
                listId={listId}
            />
      </Stack>
    )
  }