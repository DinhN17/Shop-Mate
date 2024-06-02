// sourced from https://v2.chakra-ui.com/docs/hooks/use-disclosure
// import React from 'react'
import { Stack, Button, useDisclosure } from '@chakra-ui/react'


import AddingFormWith2Inputs from './AddingFormWith2Inputs';

export default function ShareListButton(
    { 
        onClickSubmit, 
        addingButtonLabel,
        submitButtonName,
        inputProps
    }) 
    {
    const { getDisclosureProps, getButtonProps } = useDisclosure();
  
    const buttonProps = getButtonProps()
    const disclosureProps = getDisclosureProps()
    return (
        <Stack direction='column' spacing={1} align='center' justify ='center'>
            <Button {...buttonProps} colorScheme='blue' size="sm">{addingButtonLabel}</Button>
            <AddingFormWith2Inputs
                disclosureProps={disclosureProps}
                submitButtonName={submitButtonName}
                handleFormSubmit={onClickSubmit}
                inputProps={inputProps}
            />
      </Stack>
    )
  }