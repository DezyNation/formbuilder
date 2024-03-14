"use client";
import CustomButton from "@/components/misc/CustomButton";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import { API_BASE_URL } from "@/lib/utils/constants";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";
import BackendAxios from "@/lib/utils/axios";
import fileDownload from "js-file-download";

const page = () => {
  const { handleError } = useErrorHandler();

  const [studentId, setStudentId] = useState("");
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await API.myCertificates(studentId);
      setData(res?.data);
    } catch (error) {
      handleError({
        title: "Could not fetch any certificates",
        error: error,
      });
    }
  }

  async function downloadCertificate(id: any) {
    BackendAxios.get(`/download-certificate/${id}`, {
      responseType: "blob",
    })
      .then((res) => {
        fileDownload(res?.data, "Certificate.png");
      })
      .catch((error) => {
        handleError({
          title: "Could not download certificate",
          error: error,
        });
      });
  }

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
              <Input
                placeholder={" "}
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
              <FormLabel>Your Student ID</FormLabel>
            </FormControl>
            <CustomButton onClick={() => fetchData()}>Search</CustomButton>
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
          <HStack gap={6} justifyContent={"center"} flexWrap={"wrap"}>
            {data?.map((item: any, key: number) => (
              <Box
                w={["full", "xs"]}
                p={4}
                rounded={4}
                overflow={"hidden"}
                key={key}
              >
                <Image
                  src={
                    API_BASE_URL.replace("in/api", "in/") +
                    item?.form?.template.path
                  }
                  w={"full"}
                />
                <Text fontSize={"sm"} mt={2} textAlign={"center"}>
                  <strong>Workshop</strong>: {item?.form?.event_name}
                </Text>
                <HStack mt={2} justifyContent={"center"}>
                  <Button
                    size={"xs"}
                    rounded={"full"}
                    colorScheme="whatsapp"
                    leftIcon={<BsDownload />}
                    onClick={() => downloadCertificate(item?.id)}
                  >
                    Download
                  </Button>
                </HStack>
              </Box>
            ))}
          </HStack>
        </Container>
      </Box>
    </>
  );
};

export default page;
