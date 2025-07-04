import React from 'react'
import { Rec } from '../Dummy/sample'
import { Container, Flex, Text, Grid} from '@chakra-ui/react'
import RecCard from './RecCard' // Make sure the file name matches
import  { useContext } from 'react';
import { CartContext } from './CartContext';
import { MenuContext } from './MenuContext';
import { FavourContext } from './FavourContext';
import { Link } from 'react-router-dom';

const RecGrid= () => {
  const {menu} = useContext(MenuContext);
   const { addToCart } = useContext(CartContext);
   const {addToFavour, removeFromFavour} = useContext(FavourContext)
  const dish = menu
  const numDish = dish.length

  return (
    <Container maxW="740px">
      <Flex justifyContent="space-between" mt={5}>
        <Text fontWeight="bold">Reccomendations for You</Text>
      </Flex>
{/* dish.id > 7 && dish.id < 11  */}
      {numDish > 0 ? (
        <Flex gap={{base:2, sm:6}} flexDirection={"row"} justifyContent={'space-between'}>
          {dish.filter((dish)=> dish.name == 'Goat Meat(Ogufe)(food)' || dish.name == 'Asorted(Inu Erun)(food)' || dish.name == 'Dry Fish(food)' ).map((dish) => (
            <RecCard dishObj={dish} key={dish.id} onAddToCart={addToCart} onAddToFavour ={addToFavour} onRemoveFromFavour ={removeFromFavour} />
          ))}
        </Flex>
      ) : (
        <Text>
          We're still sorting out our menu, sorry for the inconvenience
        </Text>
      )}
    </Container>
  )
}

export default RecGrid