import React from 'react'
import { Container, Image, Flex, Box, Button} from '@chakra-ui/react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"
import { useState } from 'react'

const ImageSlider = () => {
    const[step, setStep]= useState(1);
     
    function handlePrevious() {
        if (step>1)  setStep((s) => s - 1);}

function handleNext() {
    if (step < 3) setStep((s) => s + 1);}

  return (
    <>
    <Container maxW={{base:"100%", sm:"55%"}}  marginBottom={"5px"}>
        <Flex justifyContent={"center"}>
        <Box display={step ==1? "flex": "none"}>
        <Image
    width={{base:"100%", sm:"100%"}}
    height={{base:"100%", sm:"100%"}}
      src="https://sunderlandac-my.sharepoint.com/:i:/r/personal/ue0una_sunderland_ac_uk/Documents/Attachments/egusi.jpg?csf=1&web=1&e=Qgh5x2"
    />
        </Box>
        <Box display={step ==2? "flex": "none"}>
           <Image
    width={{base:"100%", sm:"100%"}}
    height={{base:"100%", sm:"100%"}}
      src="https://sunderlandac-my.sharepoint.com/:i:/r/personal/ue0una_sunderland_ac_uk/Documents/Attachments/JOLLOF.jpg?csf=1&web=1&e=cH4cT9"
    />
        </Box>
          <Box display={step ==3? "flex": "none"}>
           <Image 
    width={{base:"100%", sm:"100%"}}
    height={{base:"100%", sm:"100%"}}
      src="https://sunderlandac-my.sharepoint.com/:i:/r/personal/ue0una_sunderland_ac_uk/Documents/Attachments/new.jpg?csf=1&web=1&e=yOfucn"
    />
        </Box>
         <Button height={{base:"10%", sm:""}} width={{base:"10%", sm:""}} position={"absolute"} colorPalette="black" variant="solid" left={{base:"30%", sm:"30%"}} bottom={{base:"5%", sm:"5%"}} onClick={()=>handlePrevious()}>
            <FaArrowLeft />
        </Button>
        <Button  height={{base:"10%", sm:""}} width={{base:"10%", sm:""}} position={"absolute"} colorPalette="black" variant="solid" right={{base:"45%", sm:"35%"}} bottom={{base:"5%", sm:"5%"}} onClick={()=>handleNext()}>
            <FaArrowRight />
        </Button>
       
        
  

        </Flex>
   

    </Container>
    </>
  )
}

export default ImageSlider
