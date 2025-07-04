import React, { useContext } from 'react';
import { FavourContext } from './FavourContext';
import { TbShoppingCartCog } from "react-icons/tb"
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Text
} from '@chakra-ui/react';
import { useColorMode } from './ui/color-mode';
import { useNavigate } from 'react-router-dom';

const FavourMenu = () => {
  const { favourItems, removeFromFavour, clearFavour } = useContext(FavourContext);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  if (favourItems.length === 0) {
    return (
      <>
        <Container maxW={{ base: "90%", sm: "50%" }} backgroundColor={colorMode === "light" ? "gray.100" : "gray.700"} my={5} padding={8}>
          <Flex flexDirection={'column'} alignItems="center">
            <Image src="empty.png" alt="Empty" boxSize="150px" />
            <Text mt={3} fontWeight="bold" color={colorMode === "light" ? "black" : "white"}>
              Your favourites list is empty!
            </Text>
            <Button mt={4} onClick={() => navigate('../menu')} colorScheme="teal">
              Browse Menu
            </Button>
          </Flex>
        </Container>
      </>
    )
  }

  return (
    <>
      <Container maxW={{ base: "90%", sm: "50%" }} backgroundColor={colorMode === "light" ? "white" : "gray.800"} my={5} p={5} borderRadius="md" boxShadow="md">
        <Flex flexDirection={'column'} gap={4}>
          {favourItems.map(item => (
            <Box key={item.id} borderWidth="1px" borderRadius="md" p={3} display="flex" alignItems="center">
              <Image src={item.image} alt={item.name} boxSize="80px" borderRadius="md" mr={4} />
              <Box flex="1">
                <Text fontWeight="bold" color={colorMode === "light" ? "black" : "white"}>
                  {item.name}
                </Text>
                <Text color={colorMode === "light" ? "gray.600" : "gray.300"}>
                  ₦{item.price}
                </Text>
              </Box>
              <Button size="sm" colorScheme="red" onClick={() => removeFromFavour(item.id)}>
                Remove
              </Button>
            </Box>
          ))}
        </Flex>
        <Button mt={5} colorScheme="pink" onClick={clearFavour}>
          Clear Favourites
        </Button>
      </Container>
    </>
  );
};

export default FavourMenu;