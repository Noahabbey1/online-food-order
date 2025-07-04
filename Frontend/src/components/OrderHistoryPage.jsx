import React, { useEffect, useState, useContext } from "react";
import { Container, Box, Text, Button, Flex } from "@chakra-ui/react";
import { UserContext } from "../components/UserContext";
import { CartContext } from "../components/CartContext";
import {MenuContext} from "../components/MenuContext"

const OrderHistoryPage = () => {
  const { currentUser } = useContext(UserContext);
  const {menu} =useContext(MenuContext)
  const { addToCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    // Fetch orders from backend API
    fetch(`http://127.0.0.1:5000/api/orders?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [currentUser]);

  if (!currentUser) {
    return (
      <Container mt={5}>
        <Text>You must be signed in to see your orders.</Text>
      </Container>
    );
  }

//    reorderImages = menu.filter((x) => x.name === orders.name)
//    .map((x) => {image = x.image} )

  return (
    
    <Container maxW="600px" mt={5}>
      <Text fontSize="2xl" mb={4}>
        Your Order History
      </Text>

      {orders.length === 0 && (
        <Text>No past orders found.</Text>
      )}

      {orders.map((order) => (
        <Box key={order.id} p={4} border="1px solid #ccc" borderRadius="md" mb={4}>
          <Text fontWeight="bold" mb={2}>
            Order #{order.id}
          </Text>
          {order.items.map((item) => (
            <Flex key={item.id} justifyContent="space-between" marginBottom={1}>
              <Text>{item.name}</Text>
              <Text>₦{item.price}</Text>
              {/* <img src={item.image}  alt={item.name} style={{  width: "20px", height: "20px", objectFit: "cover" }}/>            */}
            </Flex>
            
          ))}
          <Box>
             {order.deliveryMode === 'Delivery' &&
              <Flex marginBottom={1} justifyContent="space-between">
                <Text fontStyle={'bold'}>Delivery Amount:</Text>
            <Text>₦800</Text>
            </Flex>}
            <Flex outline={'dotted'} marginBottom={4} marginTop={5} padding={2} justifyContent="space-between">
                <Text fontStyle={'bold'}>Total Amount:</Text>
            <Text>₦{order.total_amount}</Text>
            </Flex>
             <Flex justifyContent="space-between">
                <Text fontStyle={'bold'}>Delivery Mode:</Text>
            <Text>{order.deliveryMode}</Text>
            </Flex>
            {order.comment&& 
            <Flex justifyContent="space-between">
                <Text fontStyle={'bold'}>Comment:</Text>
            <Text>{order.comment}</Text>
            </Flex>}
            {order.addressDetails &&
            <Flex justifyContent="space-between">
                 <Text>Address:</Text>
           <Text>{order.addressDetails}</Text>
            </Flex>}
          </Box>
           


          <Button
            mt={2}
            colorScheme="teal"
            onClick={() => {
              order.items.forEach(item => {
                addToCart(item);
              });
              alert("Items added to cart!");
            }}
          >
            Re-order
          </Button>
        </Box>
      ))}
    </Container>
  );
};

export default OrderHistoryPage;