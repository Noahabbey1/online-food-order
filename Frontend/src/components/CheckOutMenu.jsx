import React, { useContext, useEffect } from "react";
import { useColorMode } from './ui/color-mode';
import { CartContext } from "../components/CartContext";
import { IoChevronBackCircle } from "react-icons/io5";
import PaystackPop from "@paystack/inline-js"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import '../styles/App.css';
import { UserContext } from "./UserContext";
import {Input, Popover, Portal, Textarea } from "@chakra-ui/react"
import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Stack,
  Button,
} from "@chakra-ui/react";

const CheckOut = () => {
  const{ currentUser, setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const { cartItems, clearCart} = useContext(CartContext);
  const [email, setEmail] = useState('')
 
  const [comment, setComment] = useState();
  const [deliveryOption, setDeliveryOption] = useState('Delivery');

  const [addressDetail, setAddressDetail] = useState(() =>{
    const storeAddress = localStorage.getItem('addressDetail')
    return storeAddress ? JSON.parse(storeAddress) : []
  })

    



    useEffect(() => {
      localStorage.setItem('addressDetail', JSON.stringify(addressDetail));
    }, [addressDetail]);
  
    useEffect(() => {
      const storeAddress = JSON.parse(localStorage.getItem('addressDetail')) || [];
      setAddressDetail(storeAddress);
    }, []);
  


 
  
  const deliveryAmount = 800;

  // ✅ Filter out items with quantity > 0
  const activeItems = cartItems.filter(
    (item) => (item.quantity || 0) > 0
  );

  // ✅ Calculate total
  const subtotal = activeItems.reduce(
    (acc, item) => acc + item.price * (item.quantity || 0),
    0
  );
  
 const total = deliveryOption === "Delivery"
  ? subtotal + deliveryAmount
  : subtotal;

// const orderPayload = {
//   user_email: currentUser ? currentUser.email : email,
//   items: activeItems.map(item => ({
//     id: item.id,
//     name: item.name,
//     price: item.price,
//     quantity: item.quantity,
//   })),
//   total_amount: total,
//   delivery_option: deliveryOption,
//   comment: comment,
// };


const paystackConversion = total * 100;
    const payWithPaystack = () => {
      const paystack = new PaystackPop();
  
      paystack.newTransaction({
        key:'pk_test_e6c2d5d04164185a642e41f9632a4a0e0862ac2a',
        amount: paystackConversion,
        email: currentUser ? currentUser.email : email,
        firstname: currentUser ? currentUser.name : "Not available",
        lastname: currentUser ? currentUser.name : "Not available",
        onSuccess: (transaction) => {
        console.log(transaction);
        alert(`payment complete! Reference: ${transaction.reference}`);

        // Prepare payload
        const orderPayload = {
          user_email: currentUser ? currentUser.email : email,
          items: activeItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total_amount: total,
          deliveryMode: deliveryOption,
          comment: comment,
          addressDetails: addressDetail,
          transaction_reference: transaction.reference,
        };

        // Send order to backend
        fetch("http://127.0.0.1:5000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        })
        .then(res => {
          if (!res.ok) return res.text().then(text => { throw new Error(text) });
          return res.json();
        })
        .then(data => {
          console.log("Order saved:", data);
          clearCart();
          navigate("../");
        })
      .catch(err => {
        console.error(err);
        alert("Payment succeeded but failed saving order details.");
        navigate("../");
        });
      },
        onCancel: ()=>{
          alert("Transaction canceled")
          navigate('../cart')
        } 
      });
    };


  return (
    <Container maxW={{ base: "100%", sm: "55%" }} color={'black'}>
      {/* ✅ Single Header - NOT repeated anymore */}
      <Box
        justifyContent={"center"}
        px={4}
        py={4}
        my={4}
        borderRadius={5}
        marginBottom={"5px"}
        background={colorMode === "light" ? "gray.200" : "#00B0B9"}
      >
        <Flex gap={"35%"}>
          <Link to='../cart'  >
            <IoChevronBackCircle id="logoBack"  />
          </Link>
          
          <Text>CHECKOUT PAGE</Text>
        </Flex>
      </Box>

      {/* ✅ This block renders only once */}
      <Box
        border="1px solid #00B0B9"
        borderRadius="lg"
        p={4}
        bg="white"
        mb={6}
      >
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontWeight="bold" fontSize="lg">
            My Order
          </Text>
          <Text fontWeight="bold" fontSize="lg">
            ₦{subtotal.toFixed(2)}
          </Text>
        </Flex>

        <Stack spacing={3}>
          {/* ✅ Loop items only for rows, not entire page */}
          {activeItems.map((item) => (
            <Flex key={item.id} justify="space-between" align="center">
              <Text>{item.name}</Text>
              <Text>
                {item.quantity} x ₦{item.price.toFixed(2)}
              </Text>
            </Flex>
          ))}

          <Flex justify="space-between" align="center">
            <Text>Discount</Text>
            <Text>₦0</Text>
          </Flex>
          <Flex justify="space-between" align="center">
            <Text>Delivery</Text>
            <Text>{deliveryOption == 'Delivery' ? '₦' + deliveryAmount : "₦0"}</Text>
          </Flex>
        </Stack>
      </Box>
      {!currentUser &&
      <Box
        
        bg="white"
        borderRadius="lg"
        p={4}
        mb={4}
        boxShadow="sm"
      >
        <Input value={email} placeholder="Kindly insert your email" onChange={(e)=> setEmail(e.target.value)}></Input>
        </Box>
      
      }
        <Box
        
        bg="white"
        borderRadius="lg"
        p={4}
        mb={4}
        boxShadow="sm"
      >
        <Textarea value={comment} placeholder="addtional comments for your order (Kindly include your number for delivery)" onChange={(e)=> setComment(e.target.value)}></Textarea>
        </Box>

      {/* Shipping Details */}
      {deliveryOption === 'Delivery' && (
      <Box
        
        bg="white"
        borderRadius="lg"
        p={4}
        mb={4}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold" mb={1}>
              Shipping Details
            </Text>
            <Text color="gray.600">
              {addressDetail}
            </Text>
          </Box>
                <Popover.Root>
            <Popover.Trigger asChild>
              <Button size="sm" variant="outline" color={'black'}>
                Edit Address
              </Button>
            </Popover.Trigger>
            <Portal>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Popover.Title fontWeight="medium">Naruto Form</Popover.Title>
                    <Text my="4">
                      Kindly Ensure that your address is correct to avoid delay in delivery
                    </Text>
                    <Textarea value={addressDetail}  placeholder="Enter you address details" size="sm" onChange={(e) => setAddressDetail(e.target.value)}/>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Portal>
          </Popover.Root>
        </Flex>
      </Box>
      )}

      {/* Payment Method */}
      <Box
        bg="white"
        borderRadius="lg"
        p={4}
        boxShadow="sm"
      >
        <Flex justify="space-between" align="center">
          <Box>
            <Text fontWeight="bold" mb={1}>
              DELIVERY OR PICKUP
            </Text>
            <Text color="gray.600">
              4947 **** **** 3157
            </Text>
          </Box>
          <Flex direction={'column'}>
              <label >Choose Your Delivery Option</label>
                <select  id="deliveryOption" name="deliveryOption" value={deliveryOption} onChange={e => setDeliveryOption(e.target.value)}>
              <option value="Delivery">Delivery</option>
              <option value="Collection">collection</option>
            </select>
          </Flex>
        
        </Flex>
      </Box>

      {/* Pay Button */}
      <Button
        mt={6}
        colorScheme="teal"
        size="lg"
        width="full"
        onClick={()=> !currentUser && !email ? alert('kindly put in your email' ) : deliveryOption == 'Delivery' && addressDetail.length < 5 ? alert('Kindly add an address')  : payWithPaystack()}
        on
      >
        Pay ₦{total.toFixed(2)}
      </Button>
    </Container>
  );
};

export default CheckOut;