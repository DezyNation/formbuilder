"use client";
import CustomModal from "@/components/misc/CustomModal";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import {
  Badge,
  Button,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsEye, BsEyeFill, BsPause } from "react-icons/bs";
import { FaEye, FaPause, FaPenAlt, FaTrash } from "react-icons/fa";
import { IoMdCloudUpload } from "react-icons/io";
import { IoPauseSharp } from "react-icons/io5";

const page = () => {
  const ref = useRef(true);
  const Toast = useToast();
  const { handleError } = useErrorHandler();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [targetFormId, setTargetFormId] = useState("");
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
      setData(res?.data);
    } catch (error) {
      handleError({
        title: "Error while fetching forms",
        error: error,
      });
    }
  }

  async function updateForm(id: number, data: object) {
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

  async function deleteForm() {
    try {
      const res = await API.deleteForm(targetFormId);
      Toast({
        status: "success",
        description: "Form deleted successfully!",
      });
      onClose();
      fetchData();
    } catch (error) {
      handleError({
        title: "Error while deleting form",
        error: error,
      });
    }
  }

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
            {data?.map((item: any, i) => (
              <Tr>
                <Td>{i + 1}</Td>
                <Td>{item?.title}</Td>
                <Td>{item?.description}</Td>
                <Td>
                  <Badge
                    colorScheme={
                      item?.status == "active"
                        ? "whatsapp"
                        : item?.status == "draft"
                        ? "twitter"
                        : "facebook"
                    }
                  >
                    {item?.status}
                  </Badge>
                </Td>
                <Td>
                  <Image src="/assets/img/downloads.png" w={8} />
                </Td>
                <Td>43</Td>
                <Td>
                  <HStack>
                    {item?.status == "draft" ? (
                      <Tooltip label={"Edit"} hasArrow>
                        <IconButton
                          aria-label="edit"
                          colorScheme="whatsapp"
                          icon={<FaPenAlt />}
                          as={"a"}
                          href={`/admin/dashboard/edit-form/${item?.id}`}
                          target="_blank"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip label={"Pause"} hasArrow>
                        <IconButton
                          aria-label="pause"
                          colorScheme="facebook"
                          icon={<IoPauseSharp />}
                          onClick={() =>
                            updateForm(item?.id, { status: "draft" })
                          }
                        />
                      </Tooltip>
                    )}

                    {item?.status == "draft" ? (
                      <Tooltip label={"Publish"} hasArrow>
                        <IconButton
                          aria-label="publish"
                          colorScheme="facebook"
                          icon={<IoMdCloudUpload />}
                          onClick={() =>
                            updateForm(item?.id, { status: "active" })
                          }
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip label={"View Responses"} hasArrow>
                        <IconButton
                          aria-label="responses"
                          colorScheme="twitter"
                          icon={<BsEyeFill />}
                          as={"a"}
                          href={`/admin/dashboard/responses/${item?.id}`}
                        />
                      </Tooltip>
                    )}

                    <Tooltip label={"Delete Form"} hasArrow>
                      <IconButton
                        aria-label="delete"
                        colorScheme="red"
                        icon={<FaTrash />}
                        onClick={() => {
                          setTargetFormId(item?.id);
                          onOpen();
                        }}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <CustomModal
        title={"Are you sure"}
        isOpen={isOpen}
        onClose={onClose}
        showFooter={false}
      >
        <Text>Are you sure you want to delete this form?</Text>
        <br />
        <br />
        <HStack justifyContent={"flex-end"} gap={4}>
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="red" onClick={() => deleteForm()}>
            Yes Delete
          </Button>
        </HStack>
      </CustomModal>
    </>
  );
};

export default page;
