"use client";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import UnPublishedForm from "@/components/dashboard/UnPublishedForm";
import CustomButton from "@/components/misc/CustomButton";
import CustomTabs from "@/components/misc/CustomTabs";

const page = () => {
    const [canGetCertificate, setCanGetCertificate] = useState("yes")
  return (
    <>
      <Stack direction={["column", "row"]} gap={8}>
        <Box
          w={"full"}
          p={[4, 6]}
          bgColor={"#FFF"}
          className="shadow"
          rounded={4}
        >
          <Text fontSize={"lg"} fontWeight={"medium"} color={"gray.700"}>
            Create New Form
          </Text>
          <br />
          <br />
          <FormControl variant={"floating"}>
            <Input placeholder=" " />
            <FormLabel>Form Title</FormLabel>
          </FormControl>
          <br />
          <br />
          <FormControl mt={2}>
            <FormLabel>Form Description</FormLabel>
            <Textarea maxH={"xs"} resize={"none"} />
          </FormControl>
          <br />
          <br />
          <FormLabel>Can responders get certificate?</FormLabel>
          <CustomTabs
            tabList={[
              { id: "yes", label: "Yes" },
              { id: "no", label: "No" },
            ]}
            onChange={(value) => setCanGetCertificate(value)}
            boxShadow={'none'}
          />
          <br />
          <br />
          <FormLabel>Choose a Template</FormLabel>
          <HStack w={'full'} overflowX={'scroll'} className="hide-scrollbar" mt={4} gap={8}>
            <Image src="/assets/img/downloads.png" w={20} />
            <Image src="/assets/img/downloads.png" w={20} />
          </HStack>
          <br />
          <HStack w={"full"} justifyContent={"flex-end"}>
            <CustomButton>Continue...</CustomButton>
          </HStack>
        </Box>

        <Box minW={["full", "sm"]}>
          <Text fontSize={"lg"} fontWeight={"medium"} color={"gray.700"}>
            Edit Your Unpublished Forms
          </Text>
          <br />
          <VStack w={"full"} gap={4}>
            <UnPublishedForm />
          </VStack>
        </Box>
      </Stack>
    </>
  );
};

export default page;
