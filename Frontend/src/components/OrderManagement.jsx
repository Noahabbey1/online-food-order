import React, { useEffect, useState, useContext } from "react";
import { Container, Box, Text, Button, Flex } from "@chakra-ui/react";
import { CartContext } from "../components/CartContext";
import { MenuContext } from "../components/MenuContext";

const OrderManagement = () => {
  const { addToCart } = useContext(CartContext);
  const { menu } = useContext(MenuContext);
  const [orders, setOrders] = useState([]);
  const [hiddenOrders, setHiddenOrders] = useState([]); // ⬅️ NEW

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/admin/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelivery = (orderId) => {
    setHiddenOrders((prev) => [...prev, orderId]);

    alert("Items have been delivered and hidden from view!");
  };

  return (
    <Container maxW="600px" mt={5}>
      <Text fontSize="2xl" mb={4}>
        Current Orders
      </Text>

      {orders
        .filter((order) => !hiddenOrders.includes(order.id)) // ⬅️ Filter out hidden orders
        .map((order) => (
          <Box
            key={order.id}
            p={4}
            border="1px solid #ccc"
            borderRadius="md"
            mb={4}
          >
            <Text fontWeight="bold" mb={2}>
              Order #{order.id}
            </Text>

            {order.items.map((item) => (
              <Flex key={item.id} justifyContent="space-between" mb={1}>
                <Text>{item.name}</Text>
                <Text>₦{item.price}</Text>
              </Flex>
            ))}

            <Box>
              {order.deliveryMode === "Delivery" && (
                <Flex mb={1} justifyContent="space-between">
                  <Text fontWeight="bold">Delivery Amount:</Text>
                  <Text>₦800</Text>
                </Flex>
              )}
              <Flex
                border="1px dotted"
                mb={4}
                mt={5}
                p={2}
                justifyContent="space-between"
              >
                <Text fontWeight="bold">Total Amount:</Text>
                <Text>₦{order.total_amount}</Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text fontWeight="bold">Delivery Mode:</Text>
                <Text>{order.deliveryMode}</Text>
              </Flex>

              {order.comment && (
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold">Comment:</Text>
                  <Text>{order.comment}</Text>
                </Flex>
              )}

              {order.addressDetails && (
                <Flex justifyContent="space-between">
                  <Text fontWeight="bold">Address:</Text>
                  <Text>{order.addressDetails}</Text>
                </Flex>
              )}
            </Box>

            <Flex justifyContent="space-between" mt={3}>
              <Button
                colorScheme="teal"
                onClick={() => {
                  order.items.forEach((item) => addToCart(item));
                  alert("Items added to cart!");
                }}
              >
                Re-order
              </Button>

              <Button
                colorScheme="red"
                onClick={() => handleDelivery(order.id)}
              >
                Delivered
              </Button>
            </Flex>
          </Box>
        ))}
    </Container>
  );
};

export default OrderManagement;