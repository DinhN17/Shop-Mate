import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_ITEM, EDIT_ITEM, BUY_ITEM } from '../utils/mutations';
import { GET_LISTS_BY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const ItemsList = ({ items, listId, isLoggedInUser = false }) => {
  const [removeItem] = useMutation(REMOVE_ITEM, {
    refetchQueries: [{ query: GET_LISTS_BY_ME }]
  });
  const [editItem] = useMutation(EDIT_ITEM, {
    refetchQueries: [{ query: GET_LISTS_BY_ME }]
  });
  const [buyItem] = useMutation(BUY_ITEM, {
    refetchQueries: [{ query: GET_LISTS_BY_ME }]
  });

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem({
        variables: { listId, itemId }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditItem = async (itemId, name, description) => {
    try {
      await editItem({
        variables: { listId, itemId, name, description }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleBuyItem = async (itemId) => {
    try {
      const user = Auth.getUser();
      if (!user || !user.authenticatedUser || !user.authenticatedUser.username) {
        throw new Error('User is not authenticated');
      }
      await buyItem({
        variables: {
          listId,
          itemId,
          boughtBy: user.authenticatedUser.username
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!items.length) {
    return <h3>No Items Yet</h3>;
  }

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <span>{item.name} - {item.description}</span>
            {isLoggedInUser && (
              <>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
                <button onClick={() => handleEditItem(item._id, item.name, item.description)}>Edit</button>
                <button onClick={() => handleBuyItem(item._id)}>Buy</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList;
