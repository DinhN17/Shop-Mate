export default function ShopList({lists}) {
  if (!lists.length) {
    return <h3>No shopping list Yet</h3>;
  }

  return (
    <div>
      {lists &&
        lists.map((list) => (
          <div key={list._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {list.owner} <br />
              <span style={{ fontSize: '1rem' }}>
                had this list on {list.createdAt}
              </span>
            </h4>
            <div className="card-body bg-light p-2">
              <p>{list.name}</p>
            </div>
          </div>
        ))}
    </div>
  );
};