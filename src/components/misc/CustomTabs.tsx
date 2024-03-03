"use client";
import { Button, HStack, ButtonProps, BoxProps } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";

interface TabItem {
  label: string;
  id: string | number;
  isDisabled?: boolean;
}

interface CustomTabsProps {
  tabList: TabItem[];
  defaultValue?: string | number | boolean;
  onChange: (tabId: string | number | boolean) => void;
  size?: ButtonProps["size"];
  boxShadow?: BoxProps["boxShadow"];
  w?: BoxProps["w"];
}

const CustomTabs: FC<CustomTabsProps> = ({
  tabList,
  onChange,
  size,
  boxShadow,
  w,
  defaultValue
}) => {
  const [activeTab, setActiveTab] = useState<string | number | boolean>("");

  useEffect(() => {
    if(activeTab){
      onChange(activeTab)
    }
    else{
      setActiveTab(defaultValue ? defaultValue : tabList[0]?.isDisabled ? tabList[1]?.id : tabList[0]?.id)
    }
  }, [activeTab])

  return (
    <>
      <HStack
        p={size == "xs" ? 1 : 2}
        bgColor={size == "xs" ? "transparent" : "#FFF"}
        w={w || "max-content"}
        rounded={8}
        boxShadow={boxShadow ?? "sm"}
        overflowX={size == "xs" ? "visible" : "scroll"}
        justifyContent={"center"}
        className="hide-scrollbar"
      >
        {tabList?.map((item, key) => (
          <Button
            key={key}
            colorScheme="green"
            bgColor={activeTab == item?.id ? "brand.primary" : "transparent"}
            color={activeTab == item?.id ? "#FFF" : "gray.700"}
            _hover={{
              bgColor: activeTab == item?.id ? "brand.hover" : "gray.100",
            }}
            onClick={() => setActiveTab(item?.id)}
            size={size ?? "md"}
            isDisabled={item?.isDisabled}
            textTransform={"capitalize"}
          >
            {item?.label}
          </Button>
        ))}
      </HStack>
    </>
  );
};

export default CustomTabs;
