import React, { useContext, useEffect, useState } from "react";
import { Container, Box, Button, Input } from "@chakra-ui/react";
import { MenuContext } from "./MenuContext";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import { useLocation } from "react-router-dom";
import {  FileUpload } from "@chakra-ui/react"
import { HiUpload } from "react-icons/hi"
import { useNavigate } from "react-router-dom";
import { toaster } from "./ui/toaster";
import {
  Field,
  Fieldset,
  NativeSelect,
  Stack,
} from "@chakra-ui/react";

const UpdateMenuForm = ({ onClose}) => {
  const {fetchMenu} = useContext(MenuContext)
  const navigate = useNavigate()
  const [imageFile, setImageFile] = useState(null);
  const location = useLocation();
  const menuObj = location.state?.menuObj;
  // const { updateItem} = useContext(MenuContext); 
  const { colorMode } = useColorMode();
  const color = useColorModeValue("white", "gray.800");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(false);
  const [image, setImage] = useState("");


  useEffect(() => {
    if (menuObj) {
      setName(menuObj.name || "");
      setPrice(menuObj.price || "");
      setAvailability(menuObj.availability);
      setImage(menuObj.image || "");
    }
  }, [menuObj]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("availability", availability === "true" ? "true" : "false");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Debug log to verify FormData contents
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/menu-items/${menuObj.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        console.log("Server returned error:", text);
        throw new Error(`Error updating item: ${text}`);
      }
      await fetchMenu();
      // successfull  toast
      toaster.create({
          title: "Submitted",
          description: "File saved successfully",
          type: "success",
          closable: true,
        })
       
      if (onClose) onClose();
      navigate("../adminmenu")
    } catch (error) {
          // failedToast;
          toaster.create({
            title: "Error",
            description: error.message,
            type: "error",
            closable: true,
          });
      // alert(`Error: ${error.message}`);
    }

  };

  return (
    <Container maxW={{ base: "100%", sm: "55%" }} color={color}>
      <Box p={6} my={4} borderRadius= "md" boxShadow="lg" background={colorMode === "light" ? "gray.200" : "#1E1E2F"}>
        <form onSubmit={handleSubmit}>
          <Fieldset.Root size="lg" maxW="md" paddingBottom="20px" justifySelf={"center"}>
            <Stack spacing={4}>
              <Fieldset.Legend textAlign={'center'}>UPDATE MENU</Fieldset.Legend>

              <Fieldset.Content>
                <Field.Root flexDirection="row">
                  <Field.Label color= {colorMode === "light" ? "black" : "white"} alignSelf={'center'}>Name</Field.Label>
                  <Input borderColor={" #4A5568"} color= {colorMode === "light" ? "black" : "#00B0B9"}  value={name} onChange={(e) => setName(e.target.value)} />
                </Field.Root>

                <Field.Root flexDirection="row">
                  <Field.Label  color= {colorMode === "light" ? "black" : "white"} alignSelf={'center'}>Price</Field.Label>
                  <Input borderColor={" #4A5568"} color= {colorMode === "light" ? "black" : "#00B0B9"} value={price} onChange={(e) => setPrice(e.target.value)} />
                </Field.Root>

                <Field.Root flexDirection="row">
                  <Field.Label  color= {colorMode === "light" ? "black" : "white"} alignSelf={'center'}>Availability</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      name="Availability"
                      value={availability}
                      borderColor={" #4A5568"}
                      onChange={(e) => setAvailability(e.target.value)}
                      color= {colorMode === "light" ? "black" : "#00B0B9"}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                     
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field.Root>

                <Field.Root flexDirection="row" color= {colorMode === "light" ? "black" : "white"}>
                    <Field.Label  color= {colorMode === "light" ? "black" : "white"} alignSelf={'center'}>Upload Image</Field.Label>
                    <input
                      type="file"
                      color= {colorMode === "light" ? "black" : "white"}
                      accept="image/*"
                      onChange={(e) => {
                        setImageFile(e.target.files[0]);
                      }}
                    />
                  </Field.Root>

                  {imageFile && (
                    <span style={{ fontSize: "0.9rem" }}>
                      Selected: {imageFile.name}
                    </span>
                  )}
              </Fieldset.Content>
              <Button marginTop={"20px"}
              type="submit">Update Menu</Button>
            </Stack>
          </Fieldset.Root>
        </form>
      </Box>
    </Container>
  );
};

export default UpdateMenuForm;