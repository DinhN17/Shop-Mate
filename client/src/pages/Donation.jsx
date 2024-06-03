import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Divider,
  Button,
  Box,
  Text,
  Flex,
  Container,
} from "@chakra-ui/react";


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
              This website was developed by us to aid peoples organisation, we created a list website to be used for shopping lists, tasks to be done and can even be used for project organisation. our 3 developers, Adelle, Dinh and Sam have worked hard to create a user friendly and practical page for users to utilise. 
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
                        <Text px={6} py={2} mt={2} textAlign="center" pb={4} >
                        {/* <Text mt={2} textAlign="center" pb={4}> */}
              Welcome to our list creation site, a project born out of a shared
              passion for organization and efficiency. Our journey began with a
              simple idea: to help people streamline their daily tasks, whether
              it's for shopping, managing to-dos, or organizing projects. We
              believe that a well-structured list can make life simpler and more
              productive. 
              </Text>
            
              <Text px={6} py={2} mt={2} textAlign="center" pb={4} > 
              
              Our dedicated team of three developers—Adelle, Dinh,
              and Sam—have poured their expertise and creativity into building
              this platform. With a focus on user-friendliness and practicality,
              we've crafted a tool that anyone can use to stay organized and on
              top of their tasks.
              
            </Text>

            <Text px={6} py={2} mt={2} textAlign="center" pb={4} >
              
              We understand the challenges of juggling
              multiple responsibilities and the importance of having a reliable
              system to manage them. That's why we've worked tirelessly to
              ensure our site is intuitive and efficient, offering features that
              cater to a variety of needs. 
              
            </Text>

            <Text px={6} py={2} mt={2} textAlign="center" pb={4} >

              Thank you for choosing our platform.
              We're excited to be part of your journey towards better
              organization and productivity. 
              
            </Text>

            <Text px={6} py={2} mt={2} textAlign="center" pb={4} >
            
              Happy listing!
              
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
