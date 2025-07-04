import React from 'react'
import { Container, Text, Flex } from '@chakra-ui/react'
import MainMenuCard from './MainMenuCard'
import { MenuContext } from './MenuContext'
import { useContext } from 'react'
import { CartContext } from './CartContext'
import {
  Accordion
} from '@chakra-ui/react'

const MainMenuGrid = () => {
  const { addToCart } = useContext(CartContext);
  const { menu } = useContext(MenuContext);
  const dish = menu;
  const numDish = dish.length;

  if(dish.name?.toLowerCase().endsWith("(drink)")){

  }

  function categorizeMenuItems(menuItems) {
    const soups = menuItems.filter(item => Number(item.price) === 0);
    const drinks = menuItems.filter(item =>
      item.name?.toLowerCase().endsWith("(drink)")
    );
    const foods = menuItems.filter(item =>
      item.name?.toLowerCase().endsWith("(food)")
    );
    return { foods, drinks, soups };
  }

  const { foods, drinks, soups } = categorizeMenuItems(dish);

  const categories = [
    { key: 'foods', label: 'Foods', items: foods },
    { key: 'drinks', label: 'Drinks', items: drinks },
    { key: 'soups', label: 'Soups', items: soups },
  ];

  return (
    <Container maxW="740px">
      {numDish > 0 ? (
        <Accordion.Root type="single" collapsible>
          {categories.map(category =>
            category.items.length > 0 ? (
              <Accordion.Item key={category.key} value={category.key}>
                <Accordion.ItemTrigger>
                  <Text flex="1" textAlign="left" fontWeight="bold">
                    {category.label}
                  </Text>
                <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>
                <Accordion.ItemBody pb={4}>
                  <Flex wrap="wrap" gap={4}>
                    {category.items.map(dishObj => (
                      <MainMenuCard
                        dishObj={dishObj}
                        key={dishObj.id}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </Flex>
                </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            ) : null
          )}
        </Accordion.Root>
      ) : (
        <Text>
          We're still sorting out our menu, sorry for the inconvenience
        </Text>
      )}
    </Container>
  )
}

export default MainMenuGrid