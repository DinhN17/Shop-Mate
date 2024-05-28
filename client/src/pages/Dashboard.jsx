import { useQuery } from "@apollo/client";
import { Box, Container, SimpleGrid, Image, Text, Button, Link, Flex } from '@chakra-ui/react';

import ShoppingList from "../components/ShoppingList";

import { GET_LISTS_BY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import AddShoppingListForm from "../components/AddShoppingListForm";

const Dashboard = () => {

    // console.log(Auth.loggedIn());
    const { loading, error, data } = useQuery(GET_LISTS_BY_ME);
    // console.log(data);
    // const memberlists = data? || [];

    const lists = data?.lists || [];

    console.log(lists);

    if (!Auth.loggedIn()) {
        window.location.assign("/login");
    }

    if (loading) {
        return <div>Loading...</div>;
    };

    return (
        <main>
            <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                <div>
                    <AddShoppingListForm />
                </div>
                <Box bg="gray.50" p={4} borderRadius="md" textAlign="center">
                    <ShoppingList
                    lists={lists}
                    title="Your current shopping lists"
                    />
                </Box>
            </Box>
        </main>
    )
};

export default Dashboard;