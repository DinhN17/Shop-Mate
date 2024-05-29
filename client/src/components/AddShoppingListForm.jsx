import { useState } from 'react';
import { Button, Link } from '@chakra-ui/react'
import { useMutation } from '@apollo/client';

import { ADD_LIST  } from '../utils/mutations';
import { GET_LISTS_BY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const ShoppingListForm = () => {
    const [formState, setFormState] = useState({ name: '', description: '' });

    const [addList, { error }] = useMutation(
        ADD_LIST, {
            refetchQueries: [{ query: GET_LISTS_BY_ME }]
        }
    );

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!formState.name || !formState.description) {
            return;
        }

        try {
            const { data } = await addList({
                variables: { ...formState },
            });
            console.log(data);
        } catch (e) {
            console.error(e);
        }

        setFormState({
            name: '',
            description: '',
        });
    };

    return (
        <div>
            <h4>Add new List.</h4>
        
            {Auth.loggedIn() ? (
                <form onSubmit={handleFormSubmit}>
                    <input
                        className='form-input'
                        placeholder='List Name'
                        name='name'
                        type='text'
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                    <input
                        className='form-input'
                        placeholder='List Description'
                        name='description'
                        type='text'
                        value={formState.description}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    />
                    <Button colorScheme="teal" size="sm" type='submit'>Add List</Button>
            </form>
            ):(
                <p>Please login to add a list.</p>
            )}
        </div>
    );  
};

export default ShoppingListForm;