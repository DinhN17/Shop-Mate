import { useState } from "react";
import { Link } from "react-router-dom";
// import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from "@apollo/client";
import {
  Divider,
  Button,
  Box,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";

// const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Donation = () => {




  return (
    <Container>
      <Box>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
        >
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Text as="h1" fontSize="4xl" textAlign="center" p={4}>
              Our Story
            </Text>
            <Text mt={2} textAlign="center" pb={4}>
              This website was developed by us
            </Text>
          </Box>
        </Flex>

        <Divider />

        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
              <Box
                  bg="gray.50"
                  p={4}
                  py={10}
                  my = {5}
                  borderRadius="md"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Text p={2} pb= {3} mt={2} fontSize="2xl" fontWeight="bold">
                    Support Us Here
                  </Text>
                  <Divider/>

                  <Box >
                  <Box py={5}>
                        <Text fontSize="sm" px={6} py={2} >
                            dkfjaisdogasoidfgjasifgj iahjiaop jpfija ikkawe nioetjiaweojt iopaerjt ioarwjtiorajt iorj ioer
                        </Text>
                    </Box>

                    <Box px={8} pb={4}>
                      <a href="https://donate.stripe.com/test_3csaHN10t4Bv2TScMN">
                        <Button colorScheme='blue' size='md' px={10}>
                            Donate Now
                        </Button> 
                        </a>
                    </Box>
                    </Box>
                </Box>
            </Box>
      </Box>
    </Container>
  );
};

export default Donation;
