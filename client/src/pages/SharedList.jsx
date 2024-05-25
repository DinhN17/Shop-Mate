import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

import ItemList from "../components/ItemList";

import { GET_LIST } from "../utils/queries";

const SharedList = () => {

    const { listId } = useParams();
    console.log(listId);
    const { loading, error, data } = useQuery(GET_LIST, {
        variables: { id: listId },
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return (
        <div>
            <h1>{data.list.name}</h1>
            <ItemList items={data.list.items} />
        </div>
    );
};

export default SharedList;