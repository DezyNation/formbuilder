"use client";
import CustomButton from "@/components/misc/CustomButton";
import { API } from "@/lib/api";
import useErrorHandler from "@/lib/hooks/useErrorHandler";
import { API_BASE_URL } from "@/lib/utils/constants";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";

const page = ({ params }: any) => {
  const { formId } = params;
  const ref = useRef(true);
  const { handleError } = useErrorHandler();
  const Toast = useToast();

  const [formFields, setFormFields] = useState([]);
  const [data, setData] = useState<any>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      fetchData();
    }
  }, []);

  async function fetchData() {
    try {
      const res = await API.getFormInfo(formId);
      setData(res?.data);

      if (res?.data?.fields) {
        setFormFields(JSON.parse(res?.data?.fields) || []);
      }
    } catch (error) {
      handleError({
        title: "Error while fetching form info",
        error: error,
      });
    }
  }

  async function sumbitForm(data: object) {
    try {
      await API.submitForm({ ...data, form_id: formId });
      Toast({
        status: "success",
        description: "Form submitted successfully!",
      });
      setSubmitSuccess(true);
    } catch (error) {
      handleError({
        title: "Error while submitting form",
        error: error,
      });
    }
  }

  return (
    <>
      <Box pos={"relative"}>
        <Image
          w={"full"}
          minH={"xs"}
          src={
            data?.bg_image
              ? API_BASE_URL.replace("/api", "/") + data?.bg_image
              : "https://www.qualtrics.com/m/assets/blog/wp-content/uploads/2020/10/create-survey-social.jpg"
          }
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
          <Image src="/logo.png" w={32} mb={6} />
          <Text color={"#FFF"} fontSize={"4xl"} fontWeight={"bold"}>
            {data?.title}
          </Text>
          <Text color={"#FFF"}>{data?.description}</Text>
        </VStack>
      </Box>

      <Box w={"full"} mt={16}>
        <Container maxW={["full", "5xl", "7xl"]} minH={"30vh"} p={[4, 8]}>
          {submitSuccess ? (
            <VStack w={"full"} alignItems={"center"} justifyContent={"center"}>
              <Text
                fontSize={"3xl"}
                fontWeight={"semibold"}
                color={"whatsapp.500"}
              >
                Thank You!
              </Text>
              <Text>Your details were submitted successfully!</Text>
            </VStack>
          ) : (
            <Formik
              initialValues={{
                name: "",
                student_id: "",
              }}
              onSubmit={console.log}
            >
              {({ values, handleChange, setFieldValue, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack
                    minH={"50vh"}
                    gap={8}
                    w={"full"}
                    alignItems={"center"}
                    mb={8}
                  >
                    {formFields?.map((field: any, key) => {
                      if (
                        field?.type == "name" ||
                        field?.type == "student_id"
                      ) {
                        return (
                          <FormControl key={key} maxW={["full", "lg"]}>
                            <FormLabel textTransform={"capitalize"}>
                              {field?.label}
                            </FormLabel>
                            <Input
                              name={field?.name}
                              placeholder={field?.placeholder}
                              onChange={handleChange}
                            />
                          </FormControl>
                        );
                      }
                      if (field?.type == "input") {
                        return (
                          <FormControl key={key} maxW={["full", "lg"]}>
                            <FormLabel textTransform={"capitalize"}>
                              {field?.label}
                            </FormLabel>
                            <Input
                              name={field?.name}
                              placeholder={field?.placeholder}
                              onChange={handleChange}
                            />
                          </FormControl>
                        );
                      }
                      if (field?.type == "textarea") {
                        return (
                          <FormControl key={key} maxW={["full", "lg"]}>
                            <FormLabel textTransform={"capitalize"}>
                              {field?.label}
                            </FormLabel>
                            <Textarea
                              name={field?.name}
                              placeholder={field?.placeholder}
                              onChange={handleChange}
                              h={"28"}
                              resize={"none"}
                            />
                          </FormControl>
                        );
                      }
                      if (field?.type == "select") {
                        return (
                          <FormControl key={key} maxW={["full", "lg"]}>
                            <FormLabel textTransform={"capitalize"}>
                              {field?.label}
                            </FormLabel>
                            <Select
                              name={field?.name}
                              placeholder={field?.placeholder}
                              onChange={handleChange}
                            >
                              {field?.options?.map((item: any, i: number) => (
                                <option value={item?.value} key={i}>
                                  {item?.label}
                                </option>
                              ))}
                            </Select>
                          </FormControl>
                        );
                      }
                      if (field?.type == "checkbox") {
                        return (
                          <FormControl key={key} maxW={["full", "lg"]}>
                            <FormLabel textTransform={"capitalize"}>
                              {field?.label}
                            </FormLabel>
                            <CheckboxGroup
                              onChange={(values) =>
                                setFieldValue(field?.name, values)
                              }
                            >
                              {field?.options?.map((item: any, i: number) => (
                                <Checkbox
                                  value={item?.value}
                                  key={i}
                                  mb={4}
                                  w={"full"}
                                >
                                  {item?.label}
                                </Checkbox>
                              ))}
                            </CheckboxGroup>
                          </FormControl>
                        );
                      }
                    })}
                  </VStack>
                  <br />
                  <HStack justifyContent={"flex-end"}>
                    <CustomButton onClick={() => sumbitForm(values)}>
                      Submit
                    </CustomButton>
                  </HStack>
                </Form>
              )}
            </Formik>
          )}
        </Container>
      </Box>
    </>
  );
};

export default page;
