import React from 'react'
import { Container, Box, Flex, Bleed, Text,Button, DrawerActionTrigger } from "@chakra-ui/react"
import { Avatar } from '@chakra-ui/react'
import { IoBagCheckOutline } from "react-icons/io5"
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { FormatNumber } from "@chakra-ui/react"
import { CloseButton, Drawer, Portal } from "@chakra-ui/react"
import { useState } from 'react';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineHomeModern } from "react-icons/hi2";


import {
  ColorModeButton,
  DarkMode,
  LightMode,
  useColorMode,
  useColorModeValue,
} from "./ui/color-mode"
import { Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate()
   const{ currentUser, setCurrentUser} = useContext(UserContext)
  const [open, setOpen] = useState(false);
  // const [user, setUser] =useState(currentUser) // This is for controlling the sign out.
  const { cartItems} = useContext(CartContext);
  const { toggleColorMode, colorMode} = useColorMode()
  const color = useColorModeValue("white", "gray.800")
  const activeItems = cartItems.filter(item => (item.quantity || 0) > 0);


  function handleSignout(){
    setCurrentUser(null);
    localStorage.removeItem('currentUser')
    navigate('../')
  }

  function handleGotoCart(){
    navigate('../cart')
  }

// Total quantity across all items
const TotalNumber = activeItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

const TotalAmount = activeItems.reduce((acc, item) => {
  return acc + (item.price * (item.quantity || 0));
}, 0);

  return (
    <>
      <Container maxW={{base:"100%", sm:"55%"}}  color={color} >
          <Box px={4} py={4} my={4} borderRadius={5} marginBottom={"5px"} paddingBottom={"2px"} background={colorMode === "light"? "gray":"#00B0B9" }>
          <Flex justifyContent={'space-between'} >
            <Box>
              <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement={'start'} contained={'false'}>
                <Drawer.Trigger asChild>
                  <Button background="none">
                  <Avatar.Root size="md" shape="rounded" background={colorMode === "light"? "white":"#2A2A3B" } >
                  <Avatar.Image src="/image.jpg"/>
                  </Avatar.Root>
                  <Text display={{base:"none", sm:'inline'}} color={colorMode === "light"? "white":"#E2E8F0" }>
                   {currentUser ?  currentUser.name : "Guest"}
                  </Text>
                  </Button>
                </Drawer.Trigger>
                <Portal>
                  <Drawer.Backdrop />
                  <Drawer.Positioner>
                    <Drawer.Content>
                      <Drawer.Header>
                        <Drawer.Title></Drawer.Title>
                      </Drawer.Header>
                      <Drawer.Body>
                        <Flex gap={3} marginBottom={"50px"}>
                          <Avatar.Root size="md" shape="rounded" background={colorMode === "light"? "white":"black" } >
                            <Avatar.Image src="/image.jpg"/>
                          </Avatar.Root>
                          <Text fontSize={'15px'} textStyle={"italics"} alignContent={"center"}>
                            {currentUser ? currentUser.email : "Guest"}
                          </Text>
                        </Flex>
                        <Flex flexDirection={"column"} gap={10}>
                          <Button display={!currentUser ? 'none' : 'inline-flex'}>
                            <Link to="../orders">
                              <Text>MY ORDERS</Text>
                            </Link>
                          </Button>
                        
                          <Button display={currentUser ? 'none':'inline-flex'}>
                            <Link to="../signup">
                              <Text>
                              ONBOARDING
                            </Text>
                            </Link>
                            
                          </Button>

                          <Button display={currentUser ? 'none':'inline-flex'}>
                            <Link to="../signin">
                              <Text>
                              SIGN IN
                            </Text>
                            </Link>
                            
                          </Button>
                          
                          <Button display={!currentUser ? 'none':'inline-flex'}>
                            <Text>
                            NOTIFICATIONS
                          </Text>
                          </Button>
                          <Button display={!currentUser ? 'none':'inline-flex'}>
                            <Text>
                              FACE ID
                            </Text>
                          </Button>
                          <Button display={currentUser && currentUser.role ==="admin" ? 'inline-flex':'none'}>
                            <Link to="../adminmenu">
                            <Text>
                              ADMIN MENU
                            </Text>
                             </Link>
                          </Button>
                          <Button display={currentUser && currentUser.role ==="admin" ? 'inline-flex':'none'}>
                            <Link to="../ordermanagementpage">
                            <Text>
                              ORDER MANAGEMENT
                            </Text>
                             </Link>
                          </Button>
                           <Button>
                              <Text>
                                SUPPORT CENTER
                              </Text>
                           </Button >
                            <Button onClick={()=> handleSignout()} display={!currentUser ? 'none':'inline-flex'}>
                              <Text>
                                 SIGN OUT
                              </Text>
                            </Button>
                         
                        </Flex>

                      
                      </Drawer.Body>
                      <Drawer.Footer>
                        <Drawer.ActionTrigger asChild>
                          <Button  variant="outline">Cancel</Button>
                        </Drawer.ActionTrigger>
                        
                        <Button>Save</Button>
                      </Drawer.Footer>
                      <Drawer.CloseTrigger asChild>
                        <CloseButton size="sm" />
                      </Drawer.CloseTrigger>
                    </Drawer.Content>
                  </Drawer.Positioner>
                </Portal>
              </Drawer.Root>
              

            </Box>
            <Flex>
               <Button>
                  <Link 
                  to ="../">
                  <HiOutlineHomeModern />
                  </Link>
              </Button>
            </Flex>
            <Flex onClick={handleGotoCart} cursor={"pointer"} >
              <Button  py={4} width={{base:'none' , sm: "xs"}}  background={"#98E2E5"}>
                
                <Text>
                   ₦<FormatNumber value={TotalAmount} />
                 
                </Text>
              
              </Button>
              <Button  py={4} px={1} marginLeft={"3px"} >
                <IoBagCheckOutline size="sm"/>
              </Button>
            </Flex>
            <Flex>

             <ColorModeButton color={colorMode === "light"? "whiteq":"black" } py={4} px={1} size="lg" />
            </Flex>

          </Flex>
        </Box>

      </Container>
    </>
  )
}
