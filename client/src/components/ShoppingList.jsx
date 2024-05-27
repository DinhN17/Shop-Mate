import { Link } from 'react-router-dom';

export default function ShoppingList({lists}) {
  if (!lists.length) {
    return <h3>No shopping list Yet</h3>;
  }

  return (
    <div>
      {lists &&
        lists.map((list) => (
          <div key={list._id} className="card mb-3">
            <Link to={`/lists/${list._id}`}>
              Name: {list.name}.
            </Link>
            <h4>Created by: {list.owner}</h4>
            <h4>Description: {list.description}</h4>
          </div>
        ))}
    </div>
  );
}