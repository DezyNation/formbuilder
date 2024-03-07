"use client";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import { API_BASE_URL } from "@/lib/utils/constants";
import { Box, Button, HStack, Image, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsDownload } from "react-icons/bs";
import { FaFile, FaTrash } from "react-icons/fa";

const page = () => {
  const ref = useRef(true);
  const { handleError } = useErrorHandler();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      getData();
    }
  }, []);

  async function getData() {
    try {
      const res = await API.getTemplates();
      setData(res?.data);
    } catch (error) {
      handleError({
        title: "Errror while fetching certificates",
        error: error,
      });
    }
  }

  async function deleteTemplate(id: number) {
    try {
      await API.deleteTemplate(id);
      getData();
    } catch (error) {
      handleError({
        title: "Errror while deleting certificate",
        error: error,
      });
    }
  }

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"semibold"}>
        Certificate Templates
      </Text>
      <br />
      <br />

      <HStack gap={6} flexWrap={"wrap"}>
        {data?.map((item: any, key: number) => (
          <Box
            w={["full", "xs"]}
            p={4}
            rounded={4}
            overflow={"hidden"}
            key={key}
          >
            <Image
              src={API_BASE_URL.replace("/api", "/") + item?.path}
              w={"full"}
            />
            <HStack mt={2}>
              <Button
                size={"xs"}
                rounded={"full"}
                colorScheme="red"
                leftIcon={<FaTrash />}
                onClick={() => deleteTemplate(item?.id)}
              >
                Delete
              </Button>
              <Spacer />
              <Button
                size={"xs"}
                rounded={"full"}
                colorScheme="twitter"
                leftIcon={<FaFile />}
              >
                {item?.forms_count || 0}
              </Button>
            </HStack>
          </Box>
        ))}
      </HStack>
    </>
  );
};

export default page;
