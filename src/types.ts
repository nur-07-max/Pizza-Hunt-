export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'pizza' | 'sides' | 'drinks' | 'desserts';
  tags?: string[];
  isPopular?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
  size?: 'small' | 'medium' | 'large';
}

export interface User {
  id: string;
  name: string;
  points: number;
}
