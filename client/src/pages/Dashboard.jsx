import { useQuery } from "@apollo/client";

import ShoppingList from "../components/ShoppingList";

import { GET_LISTS, GET_LIST_BY_USER } from "../utils/queries";

const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_LIST_BY_USER, {
        variables: { user: localStorage.getItem('username') }
    });
    const ownedlists = data?.ownedlists || [];
    const memberlists = data?.memberlists || [];

    const lists = [...ownedlists, ...memberlists];

    return (
        <main>
            <div className="flex-row justify-center">
                <div className="col-12 col-md-8 mb-3">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <ShoppingList
                    lists={lists}
                    title="Your current shopping lists"
                    />
                )}
                </div>
            </div>
        </main>
    )
};

export default Dashboard;