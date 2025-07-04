import React from 'react'
import { Box, Button, Text, Link, Flex, Input, Alert} from '@chakra-ui/react'
import {Dialog, Portal, createOverlay } from "@chakra-ui/react"
import { useState } from 'react'
import { MenuContext } from './MenuContext'
import {toaster} from './ui/toaster'
import { useColorMode } from './ui/color-mode';
import '../styles/App.css';



const MenuCard = ({ dishObj, onAddToCart }) => {

  const {colorMode} = useColorMode()

  if (dishObj.soldOut) return null



//   const handleClick = () => {
//   onAddToCart(dishObj);
// };

const handleClick = () => {
  if(dishObj.availability == true){
        onAddToCart(dishObj);
     toaster.create({
              title: "Submitted",
              description: "item has been added to cart",
              type: "success",
              closable: true,
            })
  }else{
    alert('sorry, item is not available at this time')
  }
  }
  

 

  return (
    <>
  
    <Box textAlignLast={"center"} width={{base:'30%', sm:'120px'}} height={{base:'140px', sm:''}}  borderWidth="1px" bg={"white"} background= {colorMode == 'light' ? "white" : '#00BFA5'}  paddingTop={"10px"} paddingBottom={"5px"} borderRadius={"2xl"}  border={"dotted"}>
        <Button 
        onClick={()=>{handleClick()}} background={"none"} paddingLeft={"0px"} paddingRight={"0"}  flexDirection={"column"} width={"110px"} height={"150px"} display={'flex'} justifyContent={'flex-start'}>
         <img className='menuimages' src={dishObj.image} alt={dishObj.name} borderRadius={"5px"} />
      <Flex gap={'0px'} flexDirection={'column'}>
       <Text color={colorMode == 'light' ? "black" : 'white'} zIndex={1}  fontSize={"12px"} fontWeight={"300px"} textAlign={"center"} width={"100%"}>{
         dishObj.name.replace(/\s*\(food\)$/i, '').replace(/\s*\(drink\)$/i, '')
       } </Text>
      <Text color={colorMode == 'light' ? "black" : 'white'} zIndex={1}  fontSize={"12px"} fontWeight={"300px"} textAlign={"center"} width={"100%"}>₦{dishObj.price} </Text>
      </Flex>
      </Button>
     
    </Box>
     
    
    </>
  )
}

export default MenuCard