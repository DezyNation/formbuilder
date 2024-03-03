"use client";
import {
  Editable,
  EditableInput,
  EditablePreview,
  InputProps,
} from "@chakra-ui/react";
import React, { FC } from "react";

interface CustomEditableInputProps {
  value?: string;
  onSubmit: (value: string) => void;
  onChange?: (value: string) => void;
  width?: InputProps["width"];
  fontSize?: InputProps["fontSize"];
}

const CustomEditableInput: FC<CustomEditableInputProps> = ({
  value,
  onSubmit,
  onChange,
  width,
  fontSize,
}) => {
  return (
    <>
      <Editable
        defaultValue={value}
        w={width || "auto"}
        onSubmit={(value) => onSubmit(value)}
        fontSize={fontSize || "md"}
      >
        <EditablePreview w={"full"} />
        <EditableInput />
      </Editable>
    </>
  );
};

export default CustomEditableInput;
