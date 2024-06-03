import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Divider, Button, Box, Text, Flex, Container, ListItem, UnorderedList} from "@chakra-ui/react";

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
              Welcome to our list creation site, a project born out of a shared
              passion for organization and efficiency. Our journey began with a
              simple idea: to help people streamline their daily tasks, whether
              it's for shopping, managing to-dos, or organizing projects. We
              believe that a well-structured list can make life simpler and more
              productive. 
              <Text mt={2} textAlign="center" pb={4}> 
              
              Our dedicated team of three developers—Adelle, Dinh,
              and Sam—have poured their expertise and creativity into building
              this platform. With a focus on user-friendliness and practicality,
              we've crafted a tool that anyone can use to stay organized and on
              top of their tasks.
              
            </Text>

              <Text mt={2} textAlign="center" pb={4}> 
              
              We understand the challenges of juggling
              multiple responsibilities and the importance of having a reliable
              system to manage them. That's why we've worked tirelessly to
              ensure our site is intuitive and efficient, offering features that
              cater to a variety of needs. 
              
            </Text>

            <Text mt={2} textAlign="center" pb={4}> 

              Thank you for choosing our platform.
              We're excited to be part of your journey towards better
              organization and productivity. 
              
            </Text>

              <Text mt={2} textAlign="center" pb={4}> 
            
              Happy listing!
              
            </Text>

            </Text>
          </Box>
        </Flex>

        <Divider />

        <Box flex="1" textAlign={{ base: "center", md: "left" }}>
          <Box
            bg="gray.50"
            p={4}
            py={10}
            my={5}
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
          >
            <Text p={2} pb={3} mt={2} fontSize="2xl" fontWeight="bold">
              Support Us Here
            </Text>
            <Divider />

            <Box>
              <Box py={5}>
                <Text fontSize="sm" px={6} py={2}>
              At our list creation site, we're committed to making your life more organized and productive. Our small team of developers—Adelle, Dinh, and Sam—has worked tirelessly to create a platform that meets your needs. But we can't do it alone; we need your help to continue improving and expanding our services.
                </Text>

                <Text fontSize="sm" px={6} py={2}>
                Every contribution, no matter the size, makes a significant impact. By donating, you’re not just supporting us; you’re investing in a tool that helps you and countless others stay organized.
                </Text>

                <Text fontSize="sm" px={6} py={2}>
                To show our appreciation, we offer special perks for our donors, including early access to new features and exclusive updates.
                </Text>

                <Text fontSize="sm" px={6} py={2}>
                Thank you for considering a donation. Together, we can continue to build and improve a site that helps everyone stay on top of their tasks and projects.
                </Text>

              </Box>

              <Box px={8} pb={4}>
                <a href="https://donate.stripe.com/test_3csaHN10t4Bv2TScMN">
                  <Button colorScheme="blue" size="md" px={10}>
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
