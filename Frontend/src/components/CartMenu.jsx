import { Flex, Text, Container, Button, Image, Box } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { useColorMode } from './ui/color-mode';
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FormatNumber} from "@chakra-ui/react"
import { UserContext } from './UserContext';


const CartMenu = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
   const activeItems = cartItems.filter(item => (item.quantity || 0) > 0);
   const TotalAmount = activeItems.reduce((acc, item) => {
  return acc + (item.price * (item.quantity || 0));
}, 0);




 

  // const handleDecrease = (itemId) => {
  //   const updated = cartItems.map(item =>
  //     item.id === itemId
  //       ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
  //       : item
  //   );
  //   localStorage.setItem('cartItems', JSON.stringify(updated));
  //   // Note: You'll need to call setCartItems from context or provide a removeFromCart in CartContext
  // };

  if (activeItems.length === 0) {
    return (
      <>
        <Container className='empty-cart' maxW={{ base: "90%", sm: "50%" }} background={colorMode === "light" ? "gray.200" : "#1E1E2F"} my={5} padding={"8px"}>
          <Flex flexDirection={'column'} maxW={'-webkit-fit-content'}>
            <img src="../cart.jpg" />
            <Text textAlign={"center"} fontWeight={"bold"} background={colorMode === "light" ? "gray" : "white"} color={colorMode === "light" ? "white" : "black"}>Your Cart is Empty</Text>
            <Text textAlign={"center"} background={colorMode === "light" ? "gray" : "white"} color={colorMode === "light" ? "white" : "black"}>Looks like you haven't added anything to your cart yet</Text>
          </Flex>
        </Container>
        <Flex alignItems={"center"} justifyContent={"center"} sm={"3rem"} marginInline={"auto"}>
          <Button onClick={() => navigate('../menu')} background={'#00b0b9'} width={"300px"} maxW={{ base: "90%", sm: "300px" }}>
            Shop Now
          </Button>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Container maxW={{ base: "90%", sm: "50%" }} background={colorMode === "light" ? "gray.200" : "#1E1E2F"} my={5} padding={{base:'none',sm:"8px"}}>
        <Flex flexDirection={'column'} alignItems={"flex-end"}>
          {activeItems.map((item) => {
            const name = item.name;
            const count = item.quantity || 0;
            const amount = item.price * count;

            return (
           
              <Box key={item.id} border="1px solid" borderRadius="md" padding={2}>
              
                <Image display={"inline"} justifySelf={"left"} src={item.image} alt={item.name} width="30%" height="20%" objectFit="cover" />
                {/* <Flex paddingLeft={"10px"} display={"inline-flex"} verticalAlign={{base:"top", sm:"middle"}} gap={{base:'80px', sm:"200px"}}> */}
                  <Flex display={"inline-flex"} flexDirection={"column"} verticalAlign={"middle"} margin={3} alignSelf={"center"}>
                    <Text display={"inline"} color={colorMode === "light" ? "black" : "white"} fontSize={{ base: "14px", sm: "20px" }} textAlign={"center"} fontWeight="bold">{name}</Text>
                    <Text display={"inline"} color={colorMode === "light" ? "black" : "white"} fontSize={{ base: "20px", sm: "25px" }} textAlign={"center"} fontWeight="bold">₦<FormatNumber value={amount} /></Text>
                  </Flex>
                  <Flex display={"inline-flex"} right={50} marginTop={{base:'', sm:'25px'}}  flexDirection={"column"}  float={"right"} >
                    <Button background={"none"} onClick={() => addToCart(item)}>
                      <FaPlusCircle display={"inline"} color={colorMode === "light" ? "black" : "white"} />
                    </Button>
                    <Text display={"inline"} color={colorMode === "light" ? "black" : "white"} fontSize={{ base: "20px", sm: "25px" }} textAlign={"center"} fontWeight="bold">{count}</Text>
                    <Button background={"none"} onClick={() => removeFromCart(item.id)}>
                      <FaMinusCircle color={colorMode === "light" ? "black" : "white"} />
                    </Button>
                  </Flex>
             
              </Box>
            );
          })}
        </Flex>
      </Container>
      {/* <Flex direction="column">
        {activeItems.map((item) => (
          <CheckOutMenu key={item.id} checkOutItems={item} />
        ))}
      </Flex> */}
      <Text display={"inline"} color={colorMode === "light" ? "black" : "white"} fontSize={{ base: "20px", sm: "25px" }} textAlign={"center"} fontWeight="bold">₦<FormatNumber value={TotalAmount} /></Text>
      <Flex alignItems={"center"} justifyContent={"center"} marginInline={"auto"}>
        <Button onClick={() => navigate('../checkout')}
         background={'#00b0b9'} width={"300px"} maxW={{ base: "90%", sm: "300px" }}>
          Checkout ({activeItems.length} item{activeItems.length !== 1 ? 's' : ''})
        </Button>
      </Flex>
    </>
  );
};

export default CartMenu;
