import { useQuery } from "@apollo/client";

import ShoppingList from "../components/ShoppingList";

import { GET_LISTS_BY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import ShoppingListForm from "../components/ShoppingListForm";

const Dashboard = () => {

    // console.log(Auth.loggedIn());
    const { loading, error, data } = useQuery(GET_LISTS_BY_ME);
    // console.log(data);
    // const memberlists = data? || [];

    const lists = data?.me.memberedLists || [];

    console.log(lists);

    if (!Auth.loggedIn()) {
        window.location.assign("/login");
    }

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <main>
            <div className="flex-row justify-center">
                <div>
                    <ShoppingListForm userId={data.me._id} />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    <ShoppingList
                    lists={lists}
                    title="Your current shopping lists"
                    />
                </div>
            </div>
        </main>
    )
};

export default Dashboard;