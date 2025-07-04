import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UpdateMenuCard = ({ menuObj, onEdit, setMenu}) => {
  const navigate = useNavigate()


  function handleClick(){
    navigate('/updatemenu', { state: { menuObj } })
  } 

  return (
    <Box cursor="pointer" borderWidth="1px" borderRadius="2xl" borderStyle="dotted" bg="white" color="blackAlpha.900"
      p={2}
      textAlign="center"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <Button
        onClick={()=>handleClick()}
        variant="ghost"
        flexDirection="column"
        width="110px"
        height="auto"
        padding={2}
        _hover={{ bg: "gray.100" }}
        aria-label={`Edit ${menuObj.name}`}
      >
        <Box
          as="img"
          src={menuObj.image}
          alt={menuObj.name}
          borderRadius="md"
          width="92px"
          height="75px"
          mb={2}
          objectFit="cover"
        />
        <Text fontSize="sm" color={'black'} fontWeight="semibold">
          {menuObj.name}
        </Text>
        <Text fontSize="sm" color={'black'}>₦{menuObj.price}</Text>
        <Text fontSize="sm" color={menuObj.availability ? "green.500" : "red.500"}>
          {menuObj.availability ? "Available" : "Unavailable"}
        </Text>
      </Button>
    </Box>
  );
};

export default UpdateMenuCard;