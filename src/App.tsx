import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, 
  ChevronRight, 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Minus, 
  X, 
  ArrowRight,
  Pizza,
  Coffee,
  IceCream,
  UtensilsCrossed,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from './constants';
import { MenuItem, CartItem, User } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [user, setUser] = useState<User>({ id: 'u1', name: 'Pizza Lover', points: 450 });
  const [orderStatus, setOrderStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const categories = [
    { id: 'all', name: 'All', icon: UtensilsCrossed },
    { id: 'pizza', name: 'Pizzas', icon: Pizza },
    { id: 'sides', name: 'Sides', icon: Flame },
    { id: 'drinks', name: 'Drinks', icon: Coffee },
    { id: 'desserts', name: 'Desserts', icon: IceCream },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Smart Upsell Logic: Suggest sides if only pizza is in cart, or dessert if total is high
  const upsellItem = useMemo(() => {
    const hasPizza = cart.some(item => item.category === 'pizza');
    const hasSides = cart.some(item => item.category === 'sides');
    const hasDessert = cart.some(item => item.category === 'desserts');

    if (hasPizza && !hasSides) {
      return MENU_ITEMS.find(item => item.id === 's2'); // Suggest Buffalo Wings
    }
    if (cartTotal > 30 && !hasDessert) {
      return MENU_ITEMS.find(item => item.id === 'd1'); // Suggest Lava Cake
    }
    return null;
  }, [cart, cartTotal]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    if (!isCartOpen) setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleCheckout = () => {
    setOrderStatus('processing');
    setTimeout(() => {
      setOrderStatus('success');
      setCart([]);
      setUser(prev => ({ ...prev, points: prev.points + Math.floor(cartTotal) }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass-effect border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center text-white pizza-shadow">
                <Pizza size={24} />
              </div>
              <span className="text-2xl font-display font-bold text-brand-dark">Pizza<span className="text-brand-red">Hunt</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors">Menu</a>
              <a href="#" className="text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors">Deals</a>
              <a href="#" className="text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors">Locations</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-brand-yellow/10 rounded-full border border-brand-yellow/20">
                <Gift size={16} className="text-brand-orange" />
                <span className="text-xs font-bold text-brand-orange">{user.points} pts</span>
              </div>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-neutral-600 hover:text-brand-red transition-colors"
              >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-brand-red text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="relative rounded-3xl overflow-hidden mb-12 bg-brand-dark text-white">
          <div className="absolute inset-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2000" 
              alt="Hero Pizza" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10 px-8 py-16 md:py-24 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1 bg-brand-red rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Limited Time Offer
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
                Hunt for the <span className="text-brand-yellow">Perfect</span> Slice.
              </h1>
              <p className="text-lg text-neutral-300 mb-8 max-w-lg">
                Hand-crafted dough, secret family sauce, and the freshest toppings delivered to your door in 30 minutes or it's on us.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white rounded-2xl font-bold flex items-center gap-2 transition-all pizza-shadow">
                  Order Now <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl font-bold transition-all">
                  View Deals
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Explore Our Menu</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap",
                    activeCategory === cat.id 
                      ? "bg-brand-red text-white pizza-shadow" 
                      : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                  )}
                >
                  <cat.icon size={18} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-neutral-200 hover:border-brand-red/30 transition-all hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {item.isPopular && (
                      <div className="absolute top-4 left-4 px-3 py-1 bg-brand-yellow text-brand-dark text-[10px] font-black uppercase tracking-tighter rounded-lg flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> Popular
                      </div>
                    )}
                    <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-brand-red">
                      <Flame size={16} />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-brand-red transition-colors">{item.name}</h3>
                      <span className="text-xl font-display font-bold text-brand-red">${item.price}</span>
                    </div>
                    <p className="text-neutral-500 text-sm mb-6 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-neutral-400 font-medium">
                        <span className="flex items-center gap-1"><Clock size={14} /> 25-30 min</span>
                        <span className="flex items-center gap-1"><Star size={14} className="text-brand-yellow" fill="currentColor" /> 4.9</span>
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-3 bg-brand-dark hover:bg-brand-red text-white rounded-xl transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="text-brand-red" />
                  <h2 className="text-xl font-bold">Your Order</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400">
                      <ShoppingBag size={40} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Your cart is empty</h3>
                      <p className="text-neutral-500 text-sm">Add some delicious pizza to start your hunt!</p>
                    </div>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-brand-red text-white rounded-xl font-bold"
                    >
                      Start Ordering
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-20 h-20 rounded-2xl object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm">{item.name}</h4>
                              <span className="font-bold text-sm text-brand-red">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 bg-neutral-100 rounded-lg px-2 py-1">
                                <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-brand-red"><Minus size={14} /></button>
                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-brand-red"><Plus size={14} /></button>
                              </div>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-neutral-400 hover:text-brand-red font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Smart Upsell */}
                    {upsellItem && (
                      <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Star size={16} className="text-brand-orange" fill="currentColor" />
                          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">Recommended for you</span>
                        </div>
                        <div className="flex gap-3">
                          <img src={upsellItem.image} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                          <div className="flex-1">
                            <h5 className="text-sm font-bold">{upsellItem.name}</h5>
                            <p className="text-[10px] text-neutral-500 mb-2">Add this to complete your meal!</p>
                            <button 
                              onClick={() => addToCart(upsellItem)}
                              className="w-full py-2 bg-brand-yellow hover:bg-brand-orange text-brand-dark font-bold text-xs rounded-lg transition-colors"
                            >
                              Add for ${upsellItem.price}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-neutral-100 bg-neutral-50 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Subtotal</span>
                      <span className="font-bold">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Delivery Fee</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl pt-2 border-t border-neutral-200">
                      <span className="font-display font-bold">Total</span>
                      <span className="font-display font-bold text-brand-red">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={orderStatus === 'processing'}
                    className="w-full py-4 bg-brand-red hover:bg-red-700 text-white rounded-2xl font-bold text-lg pizza-shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {orderStatus === 'processing' ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>Checkout Now <ChevronRight size={20} /></>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-medium">
                    <Clock size={12} /> Delivery in 25-30 mins
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderStatus === 'success' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-dark/60 backdrop-blur-md"
              onClick={() => setOrderStatus('idle')}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white rounded-[40px] p-12 max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-3xl font-display font-bold mb-4 text-brand-dark">Order Confirmed!</h2>
              <p className="text-neutral-500 mb-8">
                Your hunt is over. Our chefs are preparing your delicious meal right now.
              </p>
              <div className="bg-brand-yellow/10 rounded-2xl p-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-brand-orange font-bold">
                  <Gift size={20} />
                  <span>+{Math.floor(cartTotal)} Points Earned!</span>
                </div>
              </div>
              <button 
                onClick={() => setOrderStatus('idle')}
                className="w-full py-4 bg-brand-dark text-white rounded-2xl font-bold hover:bg-brand-red transition-all"
              >
                Track My Order
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center text-white">
                  <Pizza size={20} />
                </div>
                <span className="text-xl font-display font-bold">Pizza<span className="text-brand-red">Hunt</span></span>
              </div>
              <p className="text-neutral-400 max-w-sm mb-8">
                The ultimate destination for pizza lovers. We hunt for the finest ingredients so you don't have to.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'Instagram', 'Facebook'].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-red transition-all">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-neutral-400 rounded-sm" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Menu</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Deals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Loyalty Program</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Orders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-neutral-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-16 pt-8 text-center text-neutral-500 text-xs">
            © 2026 Pizza Hunt. All rights reserved. Hunting for perfection since 1998.
          </div>
        </div>
      </footer>
    </div>
  );
}

