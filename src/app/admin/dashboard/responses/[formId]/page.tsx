"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  HStack,
  Icon,
  IconButton,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import { API } from "@/lib/api";
import { BsX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const page = ({ params }) => {
  const { formId } = params;
  const ref = useRef(true);
  const { handleError } = useErrorHandler();
  const Toast = useToast();

  const [data, setData] = useState<any>([]);
  const [formInfo, setFormInfo] = useState<any>(null);
  const [formFields, setFormFields] = useState<any>([]);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      fetchFormData();
      fetchFormSubmissions();
    }
  }, []);

  async function fetchFormData() {
    try {
      const res = await API.adminGetFormInfo(formId);
      setFormInfo(res?.data);
      if (res?.data?.fields) {
        setFormFields(JSON.parse(res?.data?.fields) || []);
      }
    } catch (error) {
      handleError({
        title: "Could not fetch form info",
        error: error,
      });
    }
  }

  async function fetchFormSubmissions() {
    try {
      const res = await API.formSubmissions(formId);
      setData(res?.data);
    } catch (error) {
      handleError({
        title: "Could not fetch form responses",
        error: error,
      });
    }
  }

  async function updateData(id: number, data: object) {
    try {
      await API.updateSubmission(id, data);
      Toast({
        status: "success",
        description: "Updated successfully",
      });
      fetchFormSubmissions();
    } catch (error) {
      handleError({
        title: "Could not update form response",
        error: error,
      });
    }
  }

  return (
    <>
      <Text fontSize={"xl"} fontWeight={"semibold"}>
        Form Responses
      </Text>
      <br />
      <br />
      <HStack flexWrap={"wrap"}>
        <Text fontWeight={"medium"}>{formInfo?.title}</Text>
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
              {formFields?.map((item: any, key: number) => (
                <Th key={key}>{item?.label}</Th>
              ))}
              <Th textAlign={"center"}>Cert. Downloaded</Th>
              <Th textAlign={"center"}>Approve/Reject</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item: any, key: number) => (
              <Tr key={key}>
                <Td>{key + 1}</Td>
                {formFields?.map((field: any, i: number) => (
                  <Td key={i}>
                    {typeof JSON.parse(item?.data)[field?.name] == "object" &&
                    JSON.parse(item?.data)[field?.name]?.length > 0
                      ? JSON.parse(item?.data)[field?.name]?.map(
                          (opt: string, index: number) => (
                            <Text fontSize={"sm"} mb={1}>
                              {opt}
                            </Text>
                          )
                        )
                      : JSON.parse(item?.data)[field?.name]}
                  </Td>
                ))}
                <Td textAlign={"center"}>
                  {item?.downloaded ? (
                    <Icon as={FaCheckCircle} color={"whatsapp.500"} />
                  ) : null}
                </Td>
                <Td textAlign={"center"}>
                  {item?.approved ? (
                    <Tooltip label={"Reject this response"}>
                      <IconButton
                        size={"sm"}
                        aria-label="reject"
                        icon={<IoMdClose />}
                        colorScheme={"red"}
                        onClick={() => updateData(item?.id, { approved: 0 })}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label={"Approve this response"}>
                      <IconButton
                        size={"sm"}
                        aria-label="approve"
                        icon={<FaCheck />}
                        colorScheme="whatsapp"
                        onClick={() => updateData(item?.id, { approved: 1 })}
                      />
                    </Tooltip>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default page;
