import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";



const CustomButton = (props: ButtonProps) => {
    const {children, ...rest} = props
  return (
    <>
      <Button
        bgColor={"brand.primary"}
        _hover={{ bgColor: "brand.hover" }}
        color={"#FFF"}
        fontWeight={'medium'}
        {...rest}
      >{children}</Button>
    </>
  );
};

export default CustomButton;
