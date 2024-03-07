"use client";
import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const page = () => {

  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"}>
        Welcome Admin
      </Text>
      <br />
      <br />
      <VStack w={"full"} gap={8}>
        <HStack direction={["column", "row"]} gap={8} w={"full"}>
          <StatsCard data={0} label={"forms"} img={"forms.png"} />
          <StatsCard data={0} label={"responses"} img={"responses.png"} />
        </HStack>
        <HStack direction={["column", "row"]} gap={8} w={"full"}>
          <StatsCard data={0} label={"students"} img={"students.png"} />
          <StatsCard data={0} label={"downloads"} img={"downloads.png"} />
        </HStack>
      </VStack>
    </>
  );
};

const StatsCard = ({ data, label, img }) => {
  return (
    <>
      <Box
        w={"full"}
        p={6}
        bgColor={"#FFF"}
        rounded={4}
        border={"0.5px solid"}
        borderColor={"gray.200"}
      >
        <HStack w={"full"} justifyContent={"space-between"}>
          <Box>
            <Text fontSize={"3xl"} fontWeight={"semibold"}>
              {data}
            </Text>
            <Text
              textTransform={"capitalize"}
              color={"gray.600"}
              fontWeight={"medium"}
            >
              {label}
            </Text>
          </Box>
          <Image w={24} src={`/assets/img/${img}`} />
        </HStack>
      </Box>
    </>
  );
};

export default page;
