import { Link } from 'react-router-dom';

export default function ItemList({ items }) {
    if (!items.length) {
        return <h3>No items Yet</h3>;
    };

    return (
        <div>
            {/* Add Item button */}
            <div>
                <button>Add Item</button>
            </div>
            {items &&
                items.map((item) => (
                    <div key={item._id} className="card mb-3">
                        <Link to={`/items/${item._id}`}>
                            Name: {item.name}.
                        </Link>
                        <h4>Added by: {item.addedBy}</h4>
                        <h4>Description: {item.description}</h4>
                        
                        {/* Buy button */}
                        {item.boughtBy ? (
                                <h4>Bought by: {item.boughtBy}</h4>
                            ) : (
                                <button>Buy</button>
                        )}
                        
                    </div>
                ))}
        </div>
    );
}