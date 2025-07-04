import React from 'react'
import { Container } from '@chakra-ui/react'
import { UserContext } from './UserContext';
import { Box } from '@chakra-ui/react'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
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


const Sign = () => {
  const {addUser} = useContext(UserContext)
  const { toggleColorMode, colorMode} = useColorMode()
    const color = useColorModeValue("white", "gray.800")

  //Local state for the form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [reveal2, setReveal2] = useState(false);

  function handleReveal(){
      setReveal(!reveal)
  }


  function handleReveal2(){
      setReveal2(!reveal2)
  }

    //  Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    addUser({ name, email, password }); // Call the context action
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert("User successfully added!");
  };
  return (
    <>
      <Container maxW={{base:"100%", sm:"55%"}}  color={color} >
        <Box px={4} py={4} my={4} borderRadius={5} marginBottom={"5px"} paddingBottom={"2px"} background={colorMode === "light"? "gray":"white" }>
        <form onSubmit={handleSubmit}>
          <Fieldset.Root size="lg" maxW="md" paddingBottom={"20px"}>
            <Stack>
              <Fieldset.Legend >SIGN UP</Fieldset.Legend>
              <Fieldset.HelperText>
                
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
                <Field.Root flexDirection={"row"}>
                <Field.Label  alignSelf={"center"}><Button background={"none"}><FaRegUser /></Button></Field.Label>
                <Input name="name" value={name} placeholder='enter your name' onChange={(e) => setName(e.target.value)}/>
                </Field.Root> 
              <Field.Root flexDirection={"row"}>
                <Field.Label  alignSelf={"center"}><Button background={"none"}><MdOutlineMail /></Button></Field.Label>
                <Input _invalid={"true"} value={email} name="email" type="email" placeholder='enter your email' onChange={(e) => setEmail(e.target.value)}/>
              </Field.Root>

              <Field.Root flexDirection={"row"}>
                <Field.Label></Field.Label>
                <Field.Label alignSelf={"center"}><Button background={"none"}><RiLockPasswordLine /></Button></Field.Label>
                <Input name="password" value={password} type= {reveal ? "text": "password"} placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                <Button background={"none"} onClick={() => handleReveal()}>
                  <FaRegEyeSlash />
                </Button>
                
              </Field.Root>
              <Field.Root flexDirection={"row"}>
                <Field.Label></Field.Label>
                <Field.Label alignSelf={"center"}><Button background={"none"}><RiLockPasswordLine /></Button></Field.Label>
                <Input name="password" value={confirmPassword} type={reveal2 ? "text": "password"} placeholder='confirm your password' onChange={(e)=>setConfirmPassword(e.target.value)} />
                <Button background={"none"} onClick={() => handleReveal2()}>
                  <FaRegEyeSlash />
                </Button>
                
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="flex-start">
              Submit
            </Button>
          </Fieldset.Root>
        </form>
        </Box>
        </Container>
    </>
  )
}

export default Sign
