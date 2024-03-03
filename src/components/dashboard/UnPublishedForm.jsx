"use client";
import { Box, Button, HStack, IconButton, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaPenAlt } from "react-icons/fa";

const UnPublishedForm = () => {
  return (
    <>
      <HStack w={"full"} p={2} rounded={4} className="shadow" bgColor={"#FFF"}>
        <IconButton size={"sm"} colorScheme="whatsapp" icon={<FaPenAlt />} />
        <Box>
          <Text>Form title will show here...</Text>
        </Box>
        <Spacer />
        <Button
          size={"xs"}
          rounded={"full"}
          colorScheme="facebook"
          fontWeight={"medium"}
        >
          Publish
        </Button>
      </HStack>
    </>
  );
};

export default UnPublishedForm;
