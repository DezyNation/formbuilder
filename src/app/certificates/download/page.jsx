"use client";
import CustomButton from "@/components/misc/CustomButton";
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <>
      <Box pos={"relative"}>
        <Image
          w={"full"}
          h={"xs"}
          src="https://rocketexpansion.com/wp-content/uploads/2022/03/Book-Awards-v2.jpg"
          objectFit={"cover"}
        />
        <VStack
          w={"full"}
          pos={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          width={"full"}
          h={"100%"}
          bgColor={"blackAlpha.600"}
          zIndex={99}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"#FFF"} fontSize={"4xl"} fontWeight={"bold"}>
            Download Your Certificates
          </Text>
          <Text color={"#FFF"}>Enter Your Student ID To Download</Text>
        </VStack>
      </Box>
      <Box p={[4, 8]} mt={8}>
        <Container maxW={["full", "5xl"]}>
          <Stack
            direction={["column", "row"]}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <FormControl maxW={["full", "sm"]} variant={"floating"}>
              <Input placeholder={" "} />
              <FormLabel>Your Student ID</FormLabel>
            </FormControl>
            <CustomButton>Search</CustomButton>
          </Stack>
          <br />
          <br />
          <br />
          <Text
            fontSize={"sm"}
            fontWeight={"medium"}
            color={"gray.600"}
            textAlign={"center"}
          >
            Available certificates will be shown below:
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default page;
