import React from 'react'
import { Box, Text} from '@chakra-ui/react'
import '../styles/App.css';
import { useColorMode } from './ui/color-mode';
import { toaster } from './ui/toaster';
import { Accordion, Span } from "@chakra-ui/react"
import { Image } from '@chakra-ui/react';



const MainMenuCard = ({ dishObj , onAddToCart }) => {
  const {colorMode} = useColorMode()


  
  const handleClick = () => {
    if(dishObj.availability){
      onAddToCart(dishObj);
     toaster.create({
              title: "Submitted",
              description: "Item has been added to cart",
              type: "success",
              closable: true,
              duration: 1000,
            })
    }else{
      toaster.create({
              title: "Unavailable",
              description: "Item is not available",
              type: "error",
              closable: false,
              duration: 1000,
            })
    }
    
  }
  
  if (dishObj.soldOut) return null

  return (
    <>
    <Box onClick={()=> handleClick()} cursor={'pointer'} justifyItems={"center"} width={"30%"}  bg={"black"} background={colorMode === "light" ? "gray.200" : "#1E1E2F"} color={colorMode == 'light' ? "black" : "white"} padding={"5px"} borderRadius={"2xl"}  border={"dotted"}>
        <Image height={{base:"50px",sm:"100px"}} width={{base:"50px",sm:"100px"}}   src={dishObj.image} alt={dishObj.name.replace(/\s*\(food\)$/i, '').replace(/\s*\(drink\)$/i, '')} borderRadius={"5px"} />
       <Text fontSize={"15px"} fontWeight={500} textAlign={"center"}>{dishObj.name.replace(/\s*\(food\)$/i, '').replace(/\s*\(drink\)$/i, '')} </Text>
       <Text fontSize={"15px"} fontWeight={500} textAlign={"center"}>₦{dishObj.price} </Text>
       <Text fontSize={"15px"} color={'red'} fontWeight={500} textAlign={"center"}>{dishObj.availability == true ? "": "Item not available" } </Text>  
    </Box> 
    </>
  )
}

export default MainMenuCard