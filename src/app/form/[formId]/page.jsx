"use client";
import { Text } from "@chakra-ui/react";
import React from "react";

const page = () => {
  const ref = useRef(true);
  const [formFields, setFormFields] = useState([]);
  const [data, setData] = useState(null);

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
          <Text fontSize={"3xl"}>Form Title</Text>

          <Text fontSize={"sm"}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus corporis, nemo libero incidunt nihil eaque ex
            exercitationem illo dignissimos quis.
          </Text>
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
                  </FormControl>
                );
              }
            })}
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default page;
