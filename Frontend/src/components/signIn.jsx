import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Button, Input } from "@chakra-ui/react";
import { UserContext } from "./UserContext";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { useNavigate } from 'react-router-dom';

import {
  Field,
  Fieldset,
  For,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"
import { Link } from "react-router-dom";
const Signin = () => {
    const navigate = useNavigate();
  const { users, fetchUsers, setCurrentUser } = useContext(UserContext); // IMPORTANT
  const { colorMode } = useColorMode();
  const color = useColorModeValue("white", "gray.800");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    fetchUsers(); // Load all users once
  }, [fetchUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();


    // Find the user
    const foundUser = users.find(
      (u) => u.email.toUpperCase() === email.toUpperCase() && u.password === password
    );

    if (!foundUser) {
      alert("Email or password is incorrect!");
      return;
    }
    
    // Save the logged-in user
    setCurrentUser(foundUser); 
    localStorage.setItem('currentUser', JSON.stringify(foundUser))
    alert(`Welcome ${foundUser.name}!`);
    setEmail("");
    setPassword("");
    navigate('../')
  };

  return (
          <Container maxW={{base:"100%", sm:"55%"}}  color={color} >
            <Box px={4} py={4} my={4} borderRadius={5} marginBottom={"5px"} paddingBottom={"2px"} background={colorMode === "light"? "gray":"white" }>
             <form onSubmit={handleSubmit}>
              <Fieldset.Root size="lg" maxW="md" paddingBottom={"20px"}>
                <Stack>
                  <Fieldset.Legend >SIGN IN</Fieldset.Legend>
                  <Fieldset.HelperText>
                    
                  </Fieldset.HelperText>
                </Stack>
    
                <Fieldset.Content>
                  <Field.Root flexDirection={"row"}>
                    <Field.Label  alignSelf={"center"}><Button background={"none"}><MdOutlineMail /></Button></Field.Label>
                    <Input value={email} name="email" type="email" placeholder='enter your email' onChange={(e) => setEmail(e.target.value)}/>
                  </Field.Root>
    
                  <Field.Root flexDirection={"row"}>
                    <Field.Label></Field.Label>
                    <Field.Label alignSelf={"center"}><Button background={"none"}><RiLockPasswordLine /></Button></Field.Label>
                    <Input name="password" value={password} type= {reveal ? "text": "password"} placeholder='enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                    <Button background={"none"} onClick={() => setReveal(!reveal)}>
                      <FaRegEyeSlash />
                    </Button>
                  </Field.Root>
                </Fieldset.Content>
                
                <Button type="submit" alignSelf="flex-start" > 
                  Submit
                </Button>
                
              </Fieldset.Root>
            </form>
            </Box>
            </Container>
  );
};

export default Signin;