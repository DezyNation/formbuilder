"use client";
import CustomEditableInput from "@/components/misc/CustomEditableInput";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  BsInputCursor,
  BsMenuAppFill,
  BsTextarea,
  BsTextareaResize,
} from "react-icons/bs";
import { FaPlus, FaTrash, FaTrashAlt, FaUserAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IoMdCheckbox, IoMdRadioButtonOn } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

const nameBlock = {
  type: "name",
  name: "name",
  label: "name",
  placeholder: "Enter your name",
};

const inputBlock = {
  type: "input",
  name: uuidv4(),
  label: "Field Name",
  placeholder: "Placeholder text...",
};

const textareaBlock = {
  type: "textarea",
  name: uuidv4(),
  label: "Field Name",
  placeholder: "Placeholder text...",
};

const selectBlock = {
  type: "select",
  name: uuidv4(),
  label: "Please Select",
  placeholder: "Please Select",
  options: [
    {
      label: "optiona name",
      value: "option_name",
    },
  ],
};

const checkboxBlock = {
  type: "checkbox",
  name: uuidv4(),
  label: "Please Select",
  placeholder: "Please Select",
  options: [
    {
      label: "optiona name",
      value: "option_name",
    },
  ],
};

const page = ({ params }) => {
  const { formId } = params;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(true);

  const [formFields, setFormFields] = useState([]);
  const [targetObject, setTargetObject] = useState(null);

  useEffect(() => {
    if (ref.current) {
      ref.current = false;
      const data = JSON.parse(localStorage.getItem(formId));
      if (data) {
        setFormFields(data);
      }
    }
  }, []);

  function handleFieldAddition(type) {
    if (type == "name") {
      setFormFields((prev) => [...prev, nameBlock]);
    }
    if (type == "input") {
      setFormFields((prev) => [...prev, inputBlock]);
    }
    if (type == "textarea") {
      setFormFields((prev) => [...prev, textareaBlock]);
    }
    if (type == "select") {
      setFormFields((prev) => [...prev, selectBlock]);
    }
    if (type == "checkbox") {
      setFormFields((prev) => [...prev, checkboxBlock]);
    }
  }

  function handleFieldDelete(id) {
    const existingFields = formFields;
    const index = existingFields?.findIndex((field) => field.id == id);

    if (index > -1) {
      existingFields.splice(index, 1);
      setFormFields([...existingFields]);
    } else {
      console.log("No field found with id ", id);
    }
  }

  function handleOptionDelete(value) {
    let existingObject = targetObject;
    const index = existingObject?.options?.findIndex(
      (field) => field.value == value
    );

    console.log(index);

    if (index > -1) {
      existingObject?.options?.splice(index, 1);
      console.log(existingObject);
      setTargetObject((prev) => ({
        ...prev,
        options: [...existingObject.options],
      }));
    } else {
      console.log("No option found with id ", value);
    }
  }

  function handleOptionEdit(index, value) {
    let existingObject = targetObject;
    console.log(index);

    existingObject.options[index].label = value?.trim();
    existingObject.options[index].value = value?.trim()?.replace(/ /g, "_");
    setTargetObject((prev) => ({
      ...prev,
      options: [...existingObject.options],
    }));
  }

  function handleOptionAddition() {
    setTargetObject((prev) => ({
      ...prev,
      options: [...prev.options, { value: "new_value", label: "new value" }],
    }));
  }

  useEffect(() => {
    const allFields = formFields;
    const i = formFields?.findIndex((f) => f?.name == targetObject?.name);
    if (i != undefined && i >= 0) {
      allFields[i] = targetObject;
      setFormFields(allFields);
    }
  }, [targetObject]);

  useEffect(() => {
    localStorage.setItem(formId, JSON.stringify(formFields));
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

          <VStack
            minH={"50vh"}
            gap={16}
            w={"full"}
            alignItems={"center"}
            mb={8}
          >
            {formFields?.map((field, key) => {
              if (field?.type == "name") {
                return (
                  <FormControl key={key} maxW={["full", "lg"]}>
                    <FormLabel textTransform={"capitalize"}>
                      {field?.label}
                    </FormLabel>
                    <Input name={"name"} placeholder={field?.placeholder} />
                    <HStack justifyContent={"flex-end"} pt={2}>
                      <IconButton
                        size={"sm"}
                        colorScheme="red"
                        icon={<FaTrashAlt />}
                        onClick={() => handleFieldDelete(field?.id)}
                      />
                    </HStack>
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
                    />
                    <HStack justifyContent={"flex-end"} pt={2}>
                      <IconButton
                        size={"sm"}
                        icon={<FaGear />}
                        onClick={() => {
                          setTargetObject(field);
                          onOpen();
                        }}
                      />
                      <IconButton
                        size={"sm"}
                        colorScheme="red"
                        icon={<FaTrashAlt />}
                        onClick={() => handleFieldDelete(field?.id)}
                      />
                    </HStack>
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
                      h={"28"}
                      resize={"none"}
                    />
                    <HStack justifyContent={"flex-end"} pt={2}>
                      <IconButton
                        size={"sm"}
                        icon={<FaGear />}
                        onClick={() => {
                          setTargetObject(field);
                          onOpen();
                        }}
                      />
                      <IconButton
                        size={"sm"}
                        colorScheme="red"
                        icon={<FaTrashAlt />}
                        onClick={() => handleFieldDelete(field?.id)}
                      />
                    </HStack>
                  </FormControl>
                );
              }
              if (field?.type == "select") {
                return (
                  <FormControl key={key} maxW={["full", "lg"]}>
                    <FormLabel textTransform={"capitalize"}>
                      {field?.label}
                    </FormLabel>
                    <Select name={field?.name} placeholder={field?.placeholder}>
                      {field?.options?.map((item, i) => (
                        <option value={item?.value} key={i}>
                          {item?.label}
                        </option>
                      ))}
                    </Select>
                    <HStack justifyContent={"flex-end"} pt={2}>
                      <IconButton
                        size={"sm"}
                        icon={<FaGear />}
                        onClick={() => {
                          setTargetObject(field);
                          onOpen();
                        }}
                      />
                      <IconButton
                        size={"sm"}
                        colorScheme="red"
                        icon={<FaTrashAlt />}
                        onClick={() => handleFieldDelete(field?.id)}
                      />
                    </HStack>
                  </FormControl>
                );
              }
              if (field?.type == "checkbox") {
                return (
                  <FormControl key={key} maxW={["full", "lg"]}>
                    <FormLabel textTransform={"capitalize"}>
                      {field?.label}
                    </FormLabel>
                    <CheckboxGroup name={field?.name}>
                      {field?.options?.map((item, i) => (
                        <Checkbox value={item?.value} key={i} mb={4} w={"full"}>
                          {item?.label}
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                    <HStack justifyContent={"flex-end"} pt={2}>
                      <IconButton
                        size={"sm"}
                        icon={<FaGear />}
                        onClick={() => {
                          setTargetObject(field);
                          onOpen();
                        }}
                      />
                      <IconButton
                        size={"sm"}
                        colorScheme="red"
                        icon={<FaTrashAlt />}
                        onClick={() => handleFieldDelete(field?.id)}
                      />
                    </HStack>
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
                isDisabled={
                  formFields?.filter((field) => field?.name == "name")?.length >
                  0
                }
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
                icon={<BsTextareaResize />}
                onClick={() => handleFieldAddition("textarea")}
              >
                Add a Textarea
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

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setTargetObject(null);
          onClose();
        }}
        placement="right"
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Edit Field Settings</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody>
            <HStack gap={4} mb={4}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Field ID:{" "}
              </Text>
              <CustomEditableInput
                value={targetObject?.name}
                fontSize={"sm"}
                onSubmit={(value) =>
                  setTargetObject((prev) => ({ ...prev, id: value }))
                }
                onChange={(value) =>
                  setTargetObject((prev) => ({ ...prev, id: value }))
                }
              />
            </HStack>
            <HStack gap={4} mb={4}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Label:{" "}
              </Text>
              <CustomEditableInput
                value={targetObject?.label}
                fontSize={"sm"}
                onSubmit={(value) =>
                  setTargetObject((prev) => ({ ...prev, label: value }))
                }
                onChange={(value) =>
                  setTargetObject((prev) => ({ ...prev, label: value }))
                }
              />
            </HStack>
            <HStack gap={4} mb={4}>
              <Text fontSize={"sm"} fontWeight={"medium"}>
                Placeholder:{" "}
              </Text>
              <CustomEditableInput
                value={targetObject?.placeholder}
                fontSize={"sm"}
                onSubmit={(value) =>
                  setTargetObject((prev) => ({ ...prev, placeholder: value }))
                }
                onChange={(value) =>
                  setTargetObject((prev) => ({ ...prev, placeholder: value }))
                }
              />
            </HStack>
            <br />
            <br />
            {targetObject?.type == "select" ||
            targetObject?.type == "checkbox" ? (
              <Text
                fontSize={"xs"}
                fontWeight={"medium"}
                color={"gray.600"}
                textTransform={"uppercase"}
              >
                FIELD OPTIONS
              </Text>
            ) : null}
            <VStack
              mt={4}
              w={"full"}
              alignItems={"flex-start"}
              justifyContent={"flex-start"}
              gap={4}
            >
              {targetObject?.options?.map((item, i) => (
                <HStack gap={4} mb={4} w={"full"} key={i}>
                  <CustomEditableInput
                    width={"full"}
                    value={item?.label}
                    onSubmit={(value) => handleOptionEdit(i, value)}
                  />
                  <IconButton
                    size={"xs"}
                    colorScheme="red"
                    icon={<FaTrashAlt />}
                    onClick={() => handleOptionDelete(item?.value)}
                  />
                </HStack>
              ))}
              <HStack mt={4} justifyContent={"flex-end"}>
                <Button
                  size={"sm"}
                  colorScheme="whatsapp"
                  onClick={handleOptionAddition}
                >
                  Add New
                </Button>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default page;
