import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_ITEM } from "../utils/mutations";

import Auth from "../utils/auth";

const ItemForm = ({ listId }) => {
    const [itemDescription, setItemDescription] = useState('');
    const [itemName, setItemName] = useState("");

    const [addItem, { error }] = useMutation(ADD_ITEM, {
        refetchQueries: ['getList'] 
      });
    

    // handle form submission
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addItem({
                variables: {
                    listId: listId,
                    itemName: itemName,
                    itemDescription: itemDescription,
                    // get username from logged in user
                    addedBy: Auth.getUser().authenticatedUser.username
                },
            });
            console.log(data);

            setItemDescription("");
            setItemName("");
        } catch (err) {
            console.error(err);
        }
        
        // Rendering the item form
        return (
            <div>
                {/* Form for adding an item */}
                <form onSubmit={handleFormSubmit}>
                    {/* Input field for item name */}
                    <input
                        type="text"
                        placeholder="Enter item name"
                        value={itemName}
                        onChange={(event) => setItemName(event.target.value)}
                    />
                    {/* Input field for item description */}
                    <input
                        type="text"
                        placeholder="Enter item description"
                        value={itemDescription}
                        onChange={(event) => setItemDescription(event.target.value)}
                    />
                    {/* Submit button */}
                    <button type="submit">Add Item</button>
                    {/* Error message display */}
                    {error && <div>{error.message}</div>}
                </form>
            </div>
        );
};

export default ItemForm;
