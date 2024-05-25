import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_ITEM } from "../utils/mutations";

import Auth from "../utils/auth";

const ItemForm = ({ listId }) => {
    const [itemDescription, setItemDescription] = useState("");
    const [itemName, setItemName] = useState("");

    const [addItem, { error }] = useMutation(ADD_ITEM);

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
        
};

export default ItemForm;
