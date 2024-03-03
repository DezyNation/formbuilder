"use client";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { AiOutlineHome } from "react-icons/ai";
import {
  BsClipboardDataFill, BsFileEarmarkPlusFill,
} from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { RiFlashlightFill } from "react-icons/ri";
import { GiReceiveMoney} from "react-icons/gi";
import { FC, ReactNode } from "react";
import { IoMdLogOut } from "react-icons/io";
import { usePathname} from "next/navigation";
import useAuth from "@/lib/hooks/useAuth";
import { IoFileTrayFull } from "react-icons/io5";
import { PiCertificate } from "react-icons/pi";
import { TbBulb } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
}

const Index: FC<LayoutProps> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box
        as="section"
        bg={useColorModeValue("gray.50", "gray.700")}
        minH="100vh"
      >
        <AdminSidebarContent display={{ base: "none", md: "unset" }} />

        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <AdminSidebarContent w="full" borderRight="none" />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: "20%" }} transition=".3s ease">

          <Flex
            as="header"
            align="center"
            justifyContent={{ base: "space-between", md: "space-between" }}
            w="full"
            px="4"
            py={8}
            gap={4}
          >
            <IconButton
              aria-label="Menu"
              display={{ base: "inline-flex", md: "none" }}
              onClick={onOpen}
              icon={<FiMenu />}
              size="md"
            />
          </Flex>

          <Box
            as="main"
            p={4}
            w={"full"}
            minH="100vh"
            bg={useColorModeValue("auto", "gray.800")}
          >
            {children}
          </Box>

        </Box>
      </Box>
    </>
  );
};

const AdminSidebarContent = ({ ...props }: BoxProps) => {
  const pathname = usePathname();
  const {handleLogout} = useAuth()

  return (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      p={[4, "8"]}
      overflowX="hidden"
      overflowY="auto"
      w={["full", "18%", "18%", "18%"]}
      {...props}
    >
      <Flex
        as={"a"}
        href="/admin/dashboard"
        px="4"
        pb={6}
        mb={4}
        align="center"
        borderBottom={"0.5px solid"}
        borderBottomColor={"gray.300"}
      >
        <Icon as={TbBulb} h={8} w={8} />
        <Text
          fontSize="xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          iTasInc
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="md"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem
          icon={AiOutlineHome}
          isActive={pathname == "/admin/dashboard"}
          link={"/admin/dashboard"}
        >
          Dashboard
        </NavItem>
        <br />
        <Text
          fontWeight={"semibold"}
          fontSize={"sm"}
          pb={2}
          mb={4}
          borderBottom={"0.5px solid"}
          borderBottomColor={"gray.300"}
        >
          FORM
        </Text>
        <NavItem
          icon={BsFileEarmarkPlusFill}
          isActive={
            pathname?.split("/")?.includes("create-form")
          }
          link={"/admin/dashboard/create-form"}
        >
          Create Form
        </NavItem>
        <NavItem
          icon={IoFileTrayFull}
          isActive={
            pathname?.split("/")?.includes("forms")
          }
          link={"/admin/dashboard/forms"}
        >
          All Forms
        </NavItem>

        <br />
        <Text
          fontWeight={"semibold"}
          fontSize={"sm"}
          pb={2}
          mb={4}
          borderBottom={"0.5px solid"}
          borderBottomColor={"gray.300"}
        >
          CRTIFICATES
        </Text>
        <NavItem
          icon={FaPlus}
          isActive={
            pathname?.split("/")?.includes("add-template")
          }
          link={"/admin/dashboard/add-template"}
        >
          Add Template
        </NavItem>
        <NavItem
          icon={PiCertificate}
          isActive={
            pathname?.split("/")?.includes("certificates")
          }
          link={"/admin/dashboard/certificates"}
        >
          All Certificates
        </NavItem>

        <br />
        <br />
        <br />
        <HStack
          px={4}
          py={2}
          w={"full"}
          rounded={8}
          alignItems={"center"}
          justifyContent={"center"}
          transition={"all .3s ease"}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.200" }}
          color={"red.400"}
          onClick={handleLogout}
        >
          <Icon as={IoMdLogOut} boxSize={6} />
          <Text>Logout</Text>
        </HStack>
      </Flex>
    </Box>
  );
};

const NavItem = (props: any) => {
  const color = useColorModeValue("gray.600", "gray.300");

  const { icon, children, isActive = false, link } = props;
  return (
    <Flex
      align="center"
      px="4"
      py="2"
      mb={4}
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue("inherit", "gray.400")}
      rounded={4}
      border={isActive ? "0.5px solid" : "none"}
      borderColor={isActive ? "gray.300" : "none"}
      bgColor={isActive ? "#FFF" : "transparent"}
      _hover={{
        bg: "white",
      }}
      as={"a"}
      href={link ?? "#"}
    >
      {icon && (
        <Box
          mr="4"
          bgColor={isActive ? "brand.primary" : "#FFF"}
          p={2}
          rounded={4}
          display={"grid"}
          placeContent={"center"}
          _groupHover={{
            bgColor: "brand.primary",
          }}
          transition={"all .3s ease"}
        >
          <Icon
            fontSize={"lg"}
            color={isActive ? "#FFF" : "auto"}
            _groupHover={{
              color: "#FFF",
            }}
            as={icon}
          />
        </Box>
      )}
      {children}
    </Flex>
  );
};

export default Index;
