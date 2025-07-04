import React from 'react';
import { Button, Container, Flex} from '@chakra-ui/react';
import { HiOutlineHomeModern } from "react-icons/hi2";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { AiTwotoneNotification } from "react-icons/ai";
import { useColorMode } from './ui/color-mode';
import { Link } from 'react-router-dom';

const Footer = () => {
    const {colorMode} = useColorMode()
  return (
    <>
     <Container maxW={{base:"90%", sm:"50%"}} backgroundColor={colorMode=="light" ? "gray": "white"} my={5} padding={"8px"}>
        <Flex flexDir
        ection={"row"} gap={{base:5, sm:50}} justifyContent={"center"}>
            
            <Button>
               <Link 
               to ="../">
                <HiOutlineHomeModern />
               </Link>
            </Button>
            <Button background={"none"}>
              <Link to="../menu">
                <CgMenuGridR />
              </Link>  
            </Button>
            <Button background={"none"}>
            <Link 
            to ="../Cart"> 
              <MdOutlineShoppingCart /> 
            </Link>
            </Button>
            <Button background={"none"}>
              <Link to ="../FavourPage">
                <GrFavorite />
              </Link>
            </Button>
            <Button background={"none"}>
                <AiTwotoneNotification />
            </Button>     
        </Flex>
    </Container>
    </>
  )
}

export default Footer
