"use client";
import {
  Badge,
  HStack,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { BsEye, BsEyeFill, BsPause } from "react-icons/bs";
import { FaEye, FaPause, FaPenAlt, FaTrash } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";

const page = () => {
  return (
    <>
      <Text fontSize={"lg"}>Forms</Text>
      <br />
      <br />
      <TableContainer>
        <Table variant={"striped"}>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Certificate</Th>
              <Th>Responses</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>1</Td>
              <Td>Form title should appear here...</Td>
              <Td>Form description should appear here...</Td>
              <Td>
                <Badge colorScheme="whatsapp">DRAFT</Badge>
              </Td>
              <Td>
                <Image src="/assets/img/downloads.png" w={8} />
              </Td>
              <Td>43</Td>
              <Td>
                <HStack>
                  <Tooltip label={"Edit"} hasArrow>
                    <IconButton colorScheme="whatsapp" icon={<FaPenAlt />} />
                  </Tooltip>
                  <Tooltip label={"Publish"} hasArrow>
                    <IconButton
                      colorScheme="facebook"
                      icon={<IoMdCloudUpload />}
                    />
                  </Tooltip>
                  <Tooltip label={"Delete Form"} hasArrow>
                    <IconButton colorScheme="red" icon={<FaTrash />} />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
            <Tr>
              <Td>2</Td>
              <Td>Form title should appear here...</Td>
              <Td>Form description should appear here...</Td>
              <Td>
                <Badge colorScheme="facebook">PUBLISHED</Badge>
              </Td>
              <Td>-</Td>
              <Td>43</Td>
              <Td>
                <HStack>
                  <Tooltip label={"Pause"} hasArrow>
                    <IconButton
                      colorScheme="facebook"
                      icon={<IoPauseSharp />}
                    />
                  </Tooltip>
                  <Tooltip label={"View Responses"} hasArrow>
                    <IconButton
                      colorScheme="twitter"
                      icon={<BsEyeFill />}
                      as={"a"}
                      href="/admin/dashboard/responses/form-2kjn23"
                    />
                  </Tooltip>
                  <Tooltip label={"Delete Form"} hasArrow>
                    <IconButton colorScheme="red" icon={<FaTrash />} />
                  </Tooltip>
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default page;
