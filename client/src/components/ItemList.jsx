import { Link } from 'react-router-dom';
import { REMOVE_ITEM, EDIT_ITEM, BUY_ITEM } from '../utils/mutations';
import { GET_LISTS_BY_ME } from '../utils/queries';


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

  // Handler function for removing an item
  const handleRemoveItem = async (itemId) => {
    try {
      // Execute the removeItem mutation with the listId and itemId as variables
      await removeItem({
        variables: { listId, itemId }
      });
    } catch (err) {
      console.error(err); // Log any errors that occur
    }
  };

    // Handler function for editing an item
    const handleEditItem = async (itemId, name, description) => {
        try {
          // Execute the editItem mutation with the listId, itemId, name, and description as variables
          await editItem({
            variables: { listId, itemId, name, description }
          });
        } catch (err) {
          console.error(err); // Log any errors that occur
        }
      };
    
        // Handler function for buying an item
  const handleBuyItem = async (itemId) => {
    try {
      // Execute the buyItem mutation with the listId, itemId, and boughtBy (username of the logged-in user) as variables
      await buyItem({
        variables: {
          listId,
          itemId,
          boughtBy: Auth.getUser().authenticatedUser.username // Retrieve the username of the logged-in user
        }
      });
    } catch (err) {
      console.error(err); // Log any errors that occur
    }
  };

// If there are no items, display a message
if (!items.length) {
    return <h3>No Items Yet</h3>;
  }

  // Render the list of items
  return (
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}> {/* Each item in the list is rendered as a list item */}
            <span>{item.name} - {item.description}</span> {/* Display the name and description of the item */}
            {isLoggedInUser && ( // If the user is logged in, show buttons for removing, editing, and buying items
              <>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button> {/* Button to remove the item */}
                <button onClick={() => handleEditItem(item._id, item.name, item.description)}>Edit</button> {/* Button to edit the item */}
                <button onClick={() => handleBuyItem(item._id)}>Buy</button> {/* Button to buy the item */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsList; // Export the ItemsList component as the default export