"use client";
import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsDownload } from "react-icons/bs";
import { FaFile } from "react-icons/fa";

const page = () => {
  return (
    <>
      <Text fontSize={"lg"} fontWeight={"semibold"}>
        Certificates
      </Text>
      <br />
      <br />

      <HStack gap={6}>
        <Box w={["full", "xs"]} p={4} rounded={4} overflow={"hidden"}>
          <Image
            src="https://marketplace.canva.com/EAFIEvneNCM/1/0/1600w/canva-golden-elegant-certificate-of-appreciation-0bN-aLORS9U.jpg"
            w={"full"}
          />
          <HStack justifyContent={"flex-end"} mt={2}>
            <Button
              size={"xs"}
              rounded={"full"}
              colorScheme="twitter"
              leftIcon={<FaFile />}
            >
              3
            </Button>
            <Button
              size={"xs"}
              rounded={"full"}
              colorScheme="whatsapp"
              leftIcon={<BsDownload />}
            >
              28
            </Button>
          </HStack>
        </Box>
      </HStack>
    </>
  );
};

export default page;
