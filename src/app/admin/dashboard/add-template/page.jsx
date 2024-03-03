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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const page = () => {
  const [file, setFile] = useState(null);
  const [imgLocalUrl, setImgLocalUrl] = useState("");
  const [qrVariant, setQrVariant] = useState("black");
  const [nameCord, setNameCord] = useState({
    x: 0,
    y: 0,
  });
  const [qrCord, setQrCord] = useState({
    x: 93,
    y: 89,
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
                    max={89}
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
              boxShadow={'none'}
            />
          </HStack>
          <br />
          <br />
          <HStack justifyContent={"flex-end"}>
            <CustomButton>Save</CustomButton>
          </HStack>
        </Box>
        {imgLocalUrl ? (
          <Box w={["full", "50%"]} height={'md'} pos={"relative"} bgImage={imgLocalUrl} bgSize={'contain'} bgRepeat={'no-repeat'} >
            <Text
              fontSize={"2xl"}
              fontWeight={"medium"}
              pos={"absolute"}
              top={`${nameCord.y}%`}
              left={`${nameCord.x}%`}
            >
              John Doe
            </Text>
            <Image
              width={12}
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
