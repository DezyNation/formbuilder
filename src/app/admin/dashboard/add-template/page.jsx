"use client";
import CustomButton from "@/components/misc/CustomButton";
import CustomTabs from "@/components/misc/CustomTabs";
import FileDropzone from "@/components/misc/FileDropzone";
import {
  Box,
  Button,
  FormLabel,
  HStack,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FormAxios } from "@/lib/utils/axios";
import useErrorHandler from "@/lib/hooks/useErrorHandler";

const page = () => {
  const Toast = useToast();
  const { handleError } = useErrorHandler();

  const [file, setFile] = useState(null);
  const [imgLocalUrl, setImgLocalUrl] = useState("");
  const [qrVariant, setQrVariant] = useState("black");

  const [nameFontSize, setNameFontSize] = useState("20");
  const [nameCord, setNameCord] = useState({
    x: 0,
    y: 0,
  });

  const [eventFontSize, setEventFontSize] = useState("20");
  const [eventCord, setEventCord] = useState({
    x: 0,
    y: 0,
  });

  const [qrCord, setQrCord] = useState({
    x: 93,
    y: 95,
  });

  useEffect(() => {
    if (!file) return;

    const newImage = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    console.log(newImage);
    Promise.all([newImage])
      .then((imagePreview) => setImgLocalUrl(() => imagePreview[0]))
      .catch((error) => console.error("Error reading file:", error));
  }, [file]);

  function handleSubmit() {
    FormAxios.post(`/admin/templates`, {
      file: file,
      name_x_coordinate: nameCord.x,
      name_y_coordinate: nameCord.y,
      qr_x_coordinate: qrCord.x,
      qr_y_coordinate: qrCord.y,
      workshop_x_coordinate: eventCord.x,
      workshop_y_coordinate: eventCord.y,
      name_font_size: nameFontSize,
      event_font_size: eventFontSize,
      font_name: "serif",
      qr_color: qrVariant,
    })
      .then((res) => {
        Toast({
          status: "success",
          description: "Template added successfully!",
        });
      })
      .catch((error) => {
        handleError({
          title: "Error while saving template",
          error: error,
        });
      });
  }

  return (
    <>
      <Text fontSize={"lg"}>Upload Certificate Template</Text>
      <br />
      <br />
      <Stack direction={["column", "row"]} pos={"relative"}>
        <Box p={[4, 6]} bgColor={"#FFF"} flex={1} maxW={["full", "50%"]}>
          <FileDropzone
            height={"xs"}
            multiple={false}
            onUpload={(files) => setFile(files)}
            label="Upload Blank Certificate Template (Image / PDF)"
          />
          <br />
          <br />
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <FormLabel>Name Co-ordinates (in %)</FormLabel>
            <HStack gap={6}>
              <HStack>
                <Box w={28}>
                  <FormLabel>X axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={nameCord.x}
                    onChange={(value) =>
                      setNameCord((prev) => ({ ...prev, x: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
              <HStack>
                <Box w={28}>
                  <FormLabel>Y axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={nameCord.y}
                    onChange={(value) =>
                      setNameCord((prev) => ({ ...prev, y: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
            </HStack>
          </HStack>
          <br />
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <FormLabel>Name Font Size (in px)</FormLabel>
            <HStack>
              <Box w={60}>
                <NumberInput
                  value={nameFontSize}
                  onChange={(value) => setNameFontSize(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </HStack>
          </HStack>
          <br />
          <br />
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <FormLabel>Event Name Co-ordinates (in %)</FormLabel>
            <HStack gap={6}>
              <HStack>
                <Box w={28}>
                  <FormLabel>X axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={eventCord.x}
                    onChange={(value) =>
                      setEventCord((prev) => ({ ...prev, x: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
              <HStack>
                <Box w={28}>
                  <FormLabel>Y axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={100}
                    value={eventCord.y}
                    onChange={(value) =>
                      setEventCord((prev) => ({ ...prev, y: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
            </HStack>
          </HStack>
          <br />
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <FormLabel>Event Name Font Size (in px)</FormLabel>
            <HStack>
              <Box w={60}>
                <NumberInput
                  value={eventFontSize}
                  onChange={(value) => setEventFontSize(value)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </HStack>
          </HStack>
          <br />
          <br />
          <HStack alignItems={"flex-end"} justifyContent={"space-between"}>
            <FormLabel>Certificate QR Co-ordinates (in %)</FormLabel>
            <HStack gap={6}>
              <HStack>
                <Box w={28}>
                  <FormLabel>X axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={93}
                    value={qrCord.x}
                    onChange={(value) =>
                      setQrCord((prev) => ({ ...prev, x: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
              <HStack>
                <Box w={28}>
                  <FormLabel>Y axis</FormLabel>
                  <NumberInput
                    min={0}
                    max={95}
                    value={qrCord.y}
                    onChange={(value) =>
                      setQrCord((prev) => ({ ...prev, y: value }))
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              </HStack>
            </HStack>
          </HStack>
          <br />
          <br />
          <HStack justifyContent={"space-between"}>
            <FormLabel>QR Code Color</FormLabel>
            <CustomTabs
              tabList={[
                { id: "white", label: "white" },
                { id: "black", label: "black" },
              ]}
              onChange={(value) => setQrVariant(value)}
              boxShadow={"none"}
            />
          </HStack>
          <br />
          <br />
          <HStack justifyContent={"flex-end"}>
            <Button fontWeight={"medium"}>Preview</Button>
            <CustomButton onClick={() => handleSubmit()}>Save</CustomButton>
          </HStack>
        </Box>
        {imgLocalUrl ? (
          <Box
            w={["full", "50%"]}
            pos={"relative"}
            h={"max-content"}
            bgImage={imgLocalUrl}
            bgSize={"contain"}
            bgRepeat={"no-repeat"}
            bgColor={"#FFF"}
          >
            <Image src={imgLocalUrl} />
            <Text
              fontSize={`${nameFontSize}px`}
              fontWeight={"medium"}
              pos={"absolute"}
              top={`${nameCord.y}%`}
              left={`${nameCord.x}%`}
            >
              John Doe
            </Text>
            <Text
              fontSize={`${eventFontSize}px`}
              fontWeight={"medium"}
              pos={"absolute"}
              top={`${eventCord.y}%`}
              left={`${eventCord.x}%`}
            >
              Event Name
            </Text>
            <Image
              width={16}
              src={`/assets/img/sample-qr-${qrVariant}.png`}
              pos={"absolute"}
              top={`${qrCord.y}%`}
              left={`${qrCord.x}%`}
            />
          </Box>
        ) : null}
      </Stack>
    </>
  );
};

export default page;
