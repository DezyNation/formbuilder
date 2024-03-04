"use client";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Link,
  Spacer,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaPenAlt } from "react-icons/fa";

const UnPublishedForm = () => {
  const ref = useRef(true);
  const { handleError } = useErrorHandler();
  const Toast = useToast();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const res = await API.getForms();
      setData(res?.data?.filter((form) => form?.status == "draft"));
    } catch (error) {
      handleError({
        title: "Error while fetching pending forms",
        error: error,
      });
    }
  }

  async function updateForm(id, data) {
    try {
      await API.updateForm(id, data);
      Toast({
        status: "success",
        description: "Form updated successfully!",
      });
      fetchData();
    } catch (error) {
      handleError({
        title: "Error while updating form",
        error: error,
      });
    }
  }

  return (
    <>
      <VStack w={"full"} gap={4}>
        {data?.map((item, i) => (
          <HStack
            w={"full"}
            p={2}
            rounded={4}
            className="shadow"
            bgColor={"#FFF"}
          >
            <Link href={`/admin/dashboard/edit-form/${item?.id}`}>
              <IconButton
                size={"sm"}
                colorScheme="whatsapp"
                icon={<FaPenAlt />}
              />
            </Link>
            <Box>
              <Text>{item?.title}</Text>
            </Box>
            <Spacer />
            <Button
              size={"xs"}
              rounded={"full"}
              colorScheme="facebook"
              fontWeight={"medium"}
              onClick={() => updateForm(item?.id, { status: "active" })}
            >
              Publish
            </Button>
          </HStack>
        ))}
      </VStack>
    </>
  );
};

export default UnPublishedForm;
