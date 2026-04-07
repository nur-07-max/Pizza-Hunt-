import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'p1',
    name: 'The Ultimate Hunter',
    description: 'Double pepperoni, Italian sausage, smoked bacon, and honey-glazed ham on our signature crust.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    category: 'pizza',
    tags: ['Meat Lovers', 'Best Seller'],
    isPopular: true
  },
  {
    id: 'p2',
    name: 'Garden Fresh Delight',
    description: 'Fresh bell peppers, red onions, mushrooms, black olives, and vine-ripened tomatoes.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=800',
    category: 'pizza',
    tags: ['Vegetarian', 'Healthy']
  },
  {
    id: 'p3',
    name: 'Truffle Mushroom Bliss',
    description: 'Wild mushrooms, truffle oil, roasted garlic, and creamy white sauce.',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    category: 'pizza',
    tags: ['Premium', 'Chef Choice'],
    isPopular: true
  },
  {
    id: 's1',
    name: 'Garlic Hunter Knots',
    description: 'Freshly baked dough knots tossed in garlic butter and parmesan.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=800',
    category: 'sides'
  },
  {
    id: 's2',
    name: 'Spicy Buffalo Wings',
    description: 'Crispy wings tossed in our signature spicy buffalo sauce.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&q=80&w=800',
    category: 'sides',
    isPopular: true
  },
  {
    id: 'd1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&q=80&w=800',
    category: 'desserts'
  }
];
