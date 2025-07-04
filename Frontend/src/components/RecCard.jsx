import React, { useState, useContext, useEffect} from 'react'
import { Box, Text, Icon, Flex, Button} from '@chakra-ui/react'
import { HiHeart } from "react-icons/hi"
import { useColorModeValue, useColorMode } from './ui/color-mode'
import { FaCirclePlus } from "react-icons/fa6";
import '../styles/App.css';
import { toaster } from './ui/toaster';
import { FavourContext } from './FavourContext';




const RecCard = ({ dishObj, onAddToCart, onAddToFavour, onRemoveFromFavour }) => {
    const {favourItems= []} = useContext(FavourContext)
    const isFavourited = favourItems.some(item => item.id === dishObj.id);
    const { colorMode } = useColorMode()

    
     // Check on load whether this dish is already favourited
//   useEffect(() => {
//     const exists = favourItems.some(item => item.id === dishObj.id);
//     setLike(exists);
//   }, [favourItems, dishObj.id]);

   function handleLike() {
        if (!isFavourited) {
            onAddToFavour(dishObj);
            toaster.create({
            title: "Submitted",
            description: "Item added to favourite",
            type: "success",
            closable: true,

            });
        } else {
            onRemoveFromFavour(dishObj.id);
            toaster.create({
            title: "Removed",
            description: "Item has been removed from favourite",
            type: "error",
            closable: true,
            });
        }
        };
    
const handleClick = () => {
     toaster.create({
              title: "Submitted",
              description: "Combo has been added to cart",
              type: "success",
              closable: true,
            })
  onAddToCart(dishObj);
};

  if (dishObj.soldOut) return null

  return (
    <>
    <Box maxW="sm" width={{base:'200px', sm:'500px'}}  background= {colorMode == 'light' ? "white" : '#00BFA5'}   color={colorMode == 'light' ? 'blackAlpha.900' : 'white'} padding={"5px"} borderRadius={"2xl"} border={"dotted"}>
        <Flex 
        // width={{base:"auto",sm:"60%"}}
        // height={{base:"auto",sm:"60%"}}
        position={"relative"}
        justifySelf={"center"}>
        
            <img className='imagerec' src={dishObj.image} borderRadius={"20px"}  alt={dishObj.name.replace(/\s*\(food\)$/i, '').replace(/\s*\(drink\)$/i, '')}  />
        </Flex>
        <Flex justifyContent={"space-around"} paddingTop={2}>  
            <Flex flexDirection={"column"}>
            <Text fontSize={{base:"10px",sm:"15px"}}>{dishObj.name.replace(/\s*\(food\)$/i, '').replace(/\s*\(drink\)$/i, '')} </Text> 
            <Text fontSize={{base:"10px",sm:"15px"}} >₦{dishObj.price} </Text>
            </Flex>
            <Flex flexDirection={'column'} gap={0} paddingBottom={5} verticalAlign={"top"}>
                <Button
                    onClick={handleLike}
                    padding={{ base: "0px", sm: "" }}
                    background= 'none'
                    color={ isFavourited === true ? "#E53E3E" : "#FEB2B2"} >
                    <HiHeart
                        
                        size={24}
                    />
                    </Button>
                <Button position={"relative"}  onClick={()=>handleClick()} padding={{base:"0px",sm:"none"}} background={"none"} >
                    <FaCirclePlus color={useColorMode === "light"? "gray":"gray" } />
                </Button>
                
            </Flex>
        </Flex>
      
    </Box>
  
   
       
        
    
    </>
  )
}

export default RecCard