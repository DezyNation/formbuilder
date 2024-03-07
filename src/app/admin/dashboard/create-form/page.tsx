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
import { Form, Formik } from "formik";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import { API } from "@/lib/api";
import FileDropzone from "@/components/misc/FileDropzone";
import { API_BASE_URL } from "@/lib/utils/constants";
import { FormAxios } from "@/lib/utils/axios";

const page = () => {
  const { handleError } = useErrorHandler();

  const [canGetCertificate, setCanGetCertificate] = useState("yes");
  const [templates, setTemplates] = useState([]);

  async function fetchTemplates() {
    try {
      const res = await API.getTemplates();
      setTemplates(res?.data);
    } catch (error) {
      handleError({
        title: "Error while fetching ceretificate templates",
        error: error,
      });
    }
  }

  function createForm(data: any) {
    FormAxios.post(`/admin/forms`, {
      ...data,
      certificate: canGetCertificate === "yes" ? 1 : 0,
    })
      .then((res) => {
        if (res?.data?.data?.id) {
          window.location.href = `/admin/dashboard/edit-form/${res?.data?.data?.id}`;
        }
      })
      .catch((error) => {
        handleError({
          title: "Error while creating form",
          error: error,
        });
      });
  }

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          event_name: "",
          template_id: "",
          bg_image: null,
        }}
        onSubmit={console.log}
      >
        {({ values, handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
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
                  <Input placeholder=" " name="title" onChange={handleChange} />
                  <FormLabel>Form Title</FormLabel>
                </FormControl>
                <br />
                <br />
                <FormControl mt={2}>
                  <FormLabel>Form Description</FormLabel>
                  <Textarea
                    maxH={"xs"}
                    resize={"none"}
                    name="description"
                    onChange={handleChange}
                  />
                </FormControl>
                <br />
                <br />
                <FormLabel>Background Image (optional)</FormLabel>
                <FileDropzone
                  onUpload={(file) => setFieldValue("bg_image", file)}
                  multiple={false}
                />
                <br />
                <br />
                <FormLabel>Can responders get certificate?</FormLabel>
                <CustomTabs
                  tabList={[
                    { id: "yes", label: "Yes" },
                    { id: "no", label: "No" },
                  ]}
                  onChange={(value) => setCanGetCertificate(value)}
                  boxShadow={"none"}
                />
                <br />
                <br />
                {canGetCertificate === "yes" ? (
                  <FormControl variant={"floating"}>
                    <Input
                      placeholder=" "
                      name="event_name"
                      onChange={handleChange}
                    />
                    <FormLabel>Event Name</FormLabel>
                  </FormControl>
                ) : null}
                <br />
                <br />
                {canGetCertificate === "yes" ? (
                  <>
                    <FormLabel>Choose a Template</FormLabel>
                    <HStack
                      w={"full"}
                      overflowX={"scroll"}
                      className="hide-scrollbar"
                      mt={4}
                      gap={8}
                    >
                      {templates?.map((item: any, key: number) => (
                        <Image
                          src={API_BASE_URL.replace("/api", "/") + item?.path}
                          w={20}
                          border={"2px solid"}
                          borderColor={
                            values?.template_id == item?.id
                              ? "brand.primary"
                              : "#FFF"
                          }
                          onClick={() => setFieldValue("template_id", item?.id)}
                        />
                      ))}
                    </HStack>
                  </>
                ) : null}
                <br />
                <HStack w={"full"} justifyContent={"flex-end"}>
                  <CustomButton onClick={() => createForm(values)}>
                    Continue...
                  </CustomButton>
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default page;
