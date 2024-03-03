"use client";
import CustomEditableInput from "@/components/misc/CustomEditableInput";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsInputCursor, BsMenuAppFill } from "react-icons/bs";
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const nameBlock = {
  type: "input",
  id: "name",
  label: "name",
  additionalParams: {
    placeholder: "Enter your name",
  },
};

const inputBlock = {
  type: "input",
  id: uuidv4(),
  label: "Field Name",
  additionalParams: {
    placeholder: "Placeholder text...",
  },
};

const selectBlock = {
  type: "select",
  id: uuidv4(),
  label: "Please Select",
  additionalParams: {
    placeholder: "Please Select",
    options: [
      {
        label: "optiona name",
        value: "option_name",
      },
    ],
  },
};

const checkboxBlock = {
  type: "checkbox",
  id: uuidv4(),
  label: "Please Select",
  additionalParams: {
    placeholder: "Please Select",
    options: [
      {
        label: "optiona name",
        value: "option_name",
      },
    ],
  },
};

const page = ({ params }) => {
  const { formId } = params;

  const [formFields, setFormFields] = useState([]);

  function handleFieldAddition(type) {
    console.log(type);

    if (type == "name"){
      setFormFields(prev => [...prev, nameBlock])
    }
    if (type == "input"){
      setFormFields(prev => [...prev, inputBlock])
    }
    if (type == "select"){
      setFormFields(prev => [...prev, selectBlock])
    }
    if (type == "checkbox"){
      setFormFields(prev => [...prev, checkboxBlock])
    }
  }

  useEffect(() => {
    console.log(formFields);
  }, [formFields]);

  return (
    <>
      <Box w={"full"}>
        <Container
          maxW={["full", "5xl", "7xl"]}
          minH={"70vh"}
          p={[4, 8]}
          bgColor={"#FFF"}
          boxShadow={"base"}
        >
          <CustomEditableInput
            fontSize={"3xl"}
            value="Form Title"
            onSubmit={console.log}
          />
          <CustomEditableInput
            fontSize={"sm"}
            value={
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus corporis, nemo libero incidunt nihil eaque ex exercitationem illo dignissimos quis."
            }
            onSubmit={console.log}
          />
          <br />
          <br />

          <VStack minH={"50vh"} gap={16} w={'full'} alignItems={'center'} mb={8}>
            {formFields?.map((field, key) => {
              if (field?.type == "name") {
                return (
                  <FormControl key={key} maxW={["full", "sm"]}>
                    <FormLabel textTransform={'capitalize'}>{field?.label}</FormLabel>
                    <Input
                      name={"name"}
                      placeholder={field?.additionalParams?.placeholder}
                    />
                  </FormControl>
                );
              }
              if (field?.type == "input") {
                return (
                  <FormControl key={key} maxW={["full", "sm"]}>
                    <FormLabel textTransform={'capitalize'}>{field?.label}</FormLabel>
                    <Input
                      name={field?.id}
                      placeholder={field?.additionalParams?.placeholder}
                    />
                  </FormControl>
                );
              }
              if (field?.type == "select") {
                return (
                  <FormControl key={key} maxW={["full", "sm"]}>
                    <FormLabel textTransform={'capitalize'}>{field?.label}</FormLabel>
                    <Select
                      name={field?.id}
                      placeholder={field?.additionalParams?.placeholder}
                    >
                      {field?.additionalParams?.options?.map((item, i) => (
                        <option value={item?.value} key={i}>{item?.label}</option>
                      ))}
                    </Select>
                  </FormControl>
                );
              }
              if (field?.type == "checkbox") {
                return (
                  <FormControl key={key} maxW={["full", "sm"]}>
                    <FormLabel textTransform={'capitalize'}>{field?.label}</FormLabel>
                    <CheckboxGroup name={field?.id}>
                      {field?.additionalParams?.options?.map((item, i) => (
                        <Checkbox value={item?.value} key={i} mb={4}>
                          {item?.label}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </FormControl>
                );
              }
            })}
          </VStack>

          <Menu placement="top">
            <MenuButton as={Box} w={"full"} cursor={"pointer"}>
              <VStack
                p={4}
                rounded={8}
                bgColor={"gray.100"}
                alignItems={"center"}
                justifyContent={"center"}
                transition={"all .3s ease"}
                _hover={{
                  bgColor: "gray.200",
                }}
              >
                <Icon as={FaPlus} fontSize={"xl"} fontWeight={"medium"} />
                <Text fontSize={"sm"}>Add New Block</Text>
              </VStack>
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={<FaUserAlt />}
                onClick={() => handleFieldAddition("name")}
                isDisabled={formFields?.filter(field => field?.id == "name")?.length > 0}
              >
                Add Name Field
              </MenuItem>
              <MenuItem
                icon={<BsInputCursor />}
                onClick={() => handleFieldAddition("input")}
              >
                Add a Input
              </MenuItem>
              <MenuItem
                icon={<BsMenuAppFill />}
                onClick={() => handleFieldAddition("select")}
              >
                Add a Dropdown
              </MenuItem>
              <MenuItem
                icon={<IoMdCheckbox />}
                onClick={() => handleFieldAddition("checkbox")}
              >
                Add Checkboxes
              </MenuItem>
            </MenuList>
          </Menu>
        </Container>
      </Box>
    </>
  );
};

export default page;
