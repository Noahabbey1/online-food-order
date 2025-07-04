import React from 'react'
import { Container } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react';
import { MenuContext } from './MenuContext';
import { Box } from '@chakra-ui/react'
import UpdateMenuCard from './UpdateMenuCard'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';
import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "./ui/color-mode"

import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"
import { useContext, useState } from 'react'


const UpdateMenuGrid = ({onEdit}) => {
  const {menu, setMenu} = useContext(MenuContext)
  const {colorMode} = useColorMode()
    const color = useColorModeValue("white", "gray.800")

  
  return (
    <>
      <Container maxW={{base:"100%", sm:"55%"}}  color={color} >
        <Box px={4} py={4} my={4} borderRadius={5} marginBottom={"5px"} paddingBottom={"2px"} background={colorMode === "light"? "gray":"white" }>
         <Flex  justifyContent={"center"} gap={{base:2, sm:1}} flexWrap={"wrap"}>
         {menu.map((menuItem)=>(
            <UpdateMenuCard key= {menuItem.id} menuObj={menuItem} setMenu={setMenu} onEdit={()=> onEdit(menuItem)} />
            
         ))}
         </Flex> 
        </Box>
        </Container>
    </>
  )
}

export default UpdateMenuGrid
