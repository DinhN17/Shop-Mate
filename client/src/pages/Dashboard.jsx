import { useQuery } from "@apollo/client";
import { Box } from '@chakra-ui/react';

import ShoppingList from "../components/ShoppingList";

import { GET_LISTS_BY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Dashboard = () => {

    const { loading, error, data } = useQuery(GET_LISTS_BY_ME);
    const lists = data?.me.memberedLists || [];

    if (!Auth.loggedIn()) {
        window.location.assign("/login");
    }

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <main>
            <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                <ShoppingList
                lists={lists}
                title="Your current shopping lists"
                />
            </Box>
        </main>
    )
};

export default Dashboard;