"use client";
import CustomButton from "@/components/misc/CustomButton";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
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
import React, { useState } from "react";

const page = () => {
  const { handleError } = useErrorHandler();

  const [id, setId] = useState("");
  const [data, setData] = useState<any>(null);

  async function fetchData() {
    try {
      const res = await API.submissionInfo(id);
      setData(res?.data);
    } catch (error) {
      handleError({
        title: "Error occured while fetching certificate info",
        error: error,
      });
    }
  }

  return (
    <>
      <Box pos={"relative"}>
        <Image
          w={"full"}
          h={"xs"}
          src="https://localiq.com/wp-content/uploads/2020/11/how-to-promote-your-business-award.png"
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
            Verify Issued Certificates
          </Text>
          <Text color={"#FFF"}>Enter Your Certificate ID To Verify</Text>
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
              <Input placeholder={" "} onChange={e => setId(e.target.value)} />
              <FormLabel>Your Certificate ID</FormLabel>
            </FormControl>
            <CustomButton onClick={() => fetchData()}>Verify</CustomButton>
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
            Issued certificate (if valid) will be shown below:
          </Text>
        </Container>
      </Box>
    </>
  );
};

export default page;
