import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Input, HStack, Box, Text, Flex, Container, Divider } from "@chakra-ui/react";
import axios from "axios";

const stripePromise = loadStripe('https://buy.stripe.com/test_00gaHNfVn2tn3XW5kk');

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    try {
      const { id } = paymentMethod;
      const response = await axios.post('/api/payment', {
        amount,
        id,
      });

      if (response.data.success) {
        console.log('Payment successful');
      }
    } catch (error) {
      setError(error.response.data.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || loading} mt={4}>
        {loading ? 'Processing...' : `Donate $${amount}`}
      </Button>
      {error && <Text color="red.500" mt={2}>{error}</Text>}
    </form>
  );
};

const Donation = () => {
  const [customAmount, setCustomAmount] = useState(0);

  return (
    <Container>
      <Box>
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="center">
          <Box flex="1" textAlign={{ base: "center", md: "left" }}>
            <Text as="h1" fontSize="4xl" textAlign="center" p={4}>
              Our Story
            </Text>
            <Text mt={2} textAlign="center" pb={4}>
              write story here osjdgtapij asdjgapor jipaerj joaerjtapore
              jpseortjg poraej gopserjgpo sjre opgj poejsgfsporejgt op osrejtgps
              rjs oserjtgpos jrpogj pojesrpojt gpeorj
            </Text>
          </Box>
        </Flex>

        <Divider />

        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Box bg="gray.50" p={4} py={10} my={5} borderRadius="md" boxShadow="md" textAlign="center">
            <Text p={2} pb={3} mt={2} fontSize="2xl" fontWeight="bold">
              Support Us Here
            </Text>
            <Divider />

            <Box>
              <Box py={5}>
                <Text fontSize="sm" px={6} py={2}>
                  dkfjaisdogasoidfgjasifgj iahjiaop jpfija ikkawe nioetjiaweojt iopaerjt ioarwjtiorajt iorj ioer
                </Text>
                <Text fontSize="sm" textAlign="left" pb={1} fontWeight="bold">
                  Custom Amount:
                </Text>
                <HStack>
                  <Input 
                    placeholder='Enter Amount' 
                    size='md' 
                    type="number"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                  />
                  <Elements stripe={stripePromise}>
                    <CheckoutForm amount={customAmount} />
                  </Elements>
                </HStack>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Donation;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// // import { loadStripe } from '@stripe/stripe-js';
// import { useMutation } from "@apollo/client";
// import {
//   Divider,
//   Button,
//   Input,
//   HStack,
//   Box,
//   Text,
//   Flex,
//   Container,
// } from "@chakra-ui/react";

// // const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

// const Donation = () => {




//   return (
//     <Container>
//       <Box>
//         <Flex
//           direction={{ base: "column", md: "row" }}
//           align="center"
//           justify="center"
//         >
//           <Box flex="1" textAlign={{ base: "center", md: "left" }}>
//             <Text as="h1" fontSize="4xl" textAlign="center" p={4}>
//               Our Story
//             </Text>
//             <Text mt={2} textAlign="center" pb={4}>
//               write story here osjdgtapij asdjgapor jipaerj joaerjtapore
//               jpseortjg poraej gopserjgpo sjre opgj poejsgfsporejgt op osrejtgps
//               rjs oserjtgpos jrpogj pojesrpojt gpeorj
//             </Text>
//           </Box>
//         </Flex>

//         <Divider />

//         <Box flex="1" textAlign={{ base: "center", md: "left" }}>
//               <Box
//                   bg="gray.50"
//                   p={4}
//                   py={10}
//                   my = {5}
//                   borderRadius="md"
//                   boxShadow="md"
//                   textAlign="center"
//                 >
//                   <Text p={2} pb= {3} mt={2} fontSize="2xl" fontWeight="bold">
//                     Support Us Here
//                   </Text>
//                   <Divider/>

//                   <Box >
//                   <Box py={5}>
//                         <Text fontSize="sm" px={6} py={2} >
//                             dkfjaisdogasoidfgjasifgj iahjiaop jpfija ikkawe nioetjiaweojt iopaerjt ioarwjtiorajt iorj ioer
//                         </Text>
//                         <Button colorScheme='blue' size='md' m={2} px={10}>
//                             $5
//                         </Button>
//                         <Button colorScheme='blue' size='md' m={2} px={10}>
//                             $10
//                         </Button>
//                         <Button colorScheme='blue' size='md' m={2} px={10}>
//                             $15
//                         </Button>
//                         <Button colorScheme='blue' size='md' m={2} px={10}>
//                             $20
//                         </Button>
//                     </Box>

//                     <Box px={8} pb={4}>
//                         <Text fontSize="sm" textAlign="left" pb={1} fontWeight="bold"> 
//                             Custom Amount:
//                         </Text>
//                         <HStack>
//                         <Input placeholder='Enter Amount' size='md'/>
//                         <Button colorScheme='blue' size='md' px={10}>
//                             Donate Now
//                         </Button>
//                         </HStack>
//                     </Box>
//                     </Box>
//                 </Box>
//             </Box>
//       </Box>
//     </Container>
//   );
// };

// export default Donation;
