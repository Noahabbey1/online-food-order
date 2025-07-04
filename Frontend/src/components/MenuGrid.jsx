import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { USERS } from '../Dummy/Dumy';
import { Container, Flex, Text } from '@chakra-ui/react';
import MenuCard from './menuCard';
import { Link } from 'react-router-dom';
import { MenuContext } from './MenuContext';
import { useBreakpointValue } from '@chakra-ui/react';


const MenuGrid = () => {
  const {menu} = useContext(MenuContext);
  const { addToCart } = useContext(CartContext);
  const dish = menu;
  const numItemsToShow = useBreakpointValue({ base: 3, sm: 5 });
  const numDish = dish.length;


  return (
    <>
      <Container maxW="740px">
        <Flex justifyContent="space-between" mt={5}>
          <Text fontWeight="bold">We Offer</Text>
          <Link to="../menu" style={{ fontWeight: 'bold', color: '#00b0b9' }}>
            View all ➢
          </Link>
        </Flex>
        
        {numDish > 0 ? (
          <Flex gap={{ base: 1, sm: 3 }} flexWrap="wrap" justifyContent={'center'} mt={4}>
            {dish.filter((dishItem)=> dishItem.availability == true).slice(0,numItemsToShow).map((dishItem) => (
              <MenuCard dishObj={dishItem} key={dishItem.id} onAddToCart={addToCart} />
            ))}
          </Flex>
        ) : (
          <Text>We're still sorting out our menu, sorry for the inconvenience</Text>
        )}
      </Container>
    </>
  );

};

export default MenuGrid;