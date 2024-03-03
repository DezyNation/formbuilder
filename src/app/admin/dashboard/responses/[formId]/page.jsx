"use client";
import React from "react";
import {
  HStack,
  Icon,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const page = () => {
  return (
    <>
      <Text fontSize={"xl"} fontWeight={"medium"}>
        Form Responses
      </Text>
      <br />
      <br />
      <HStack flexWrap={"wrap"}>
        <Text>Form Name</Text>
        <Spacer />
        <Input
          w={["full", "xs"]}
          bgColor={"#FFF"}
          rounded={"full"}
          placeholder="Search..."
        />
      </HStack>
      <br />
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Course Name</Th>
              <Th>City</Th>
              <Th textAlign={'center'}>Certificate Downloaded</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Sangam Kumar</Td>
              <Td>Power Bi</Td>
              <Td>New Delhi</Td>
              <Td textAlign={"center"}>
                <Icon as={FaCheckCircle} color={"whatsapp.500"} />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default page;
