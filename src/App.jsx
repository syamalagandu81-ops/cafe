import React, { useState, useEffect } from 'react';
import StickyNav from './components/StickyNav';
import MenuCard from './components/MenuCard';
import CartSidebar from './components/CartSidebar';

function App() {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/menu.json')
      .then(res => res.json())
      .then(data => {
        setMenuData(data);
        const cats = data.map(c => c.category);
        setCategories(['All', ...cats]);
        setActiveCategory('All');
        setLoading(false);
      })
      .catch(err => console.error("Failed to load menu", err));
  }, []);

  const filteredData = menuData.map(category => {
    const items = category.items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVeg = isVegOnly ? item.isVeg : true;
      return matchesSearch && matchesVeg;
    });
    return { ...category, items };
  }).filter(cat => cat.items.length > 0);

  const displayData = activeCategory === 'All'
    ? filteredData
    : filteredData.filter(c => c.category === activeCategory);

  const scrollToCategory = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(cat);
    if (element) {
      const offset = 180; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  if (loading) return <div className="min-h-screen bg-cafe-bg flex items-center justify-center text-cafe-accent animate-pulse">Loading Menu...</div>;

  return (
    <div className="min-h-screen bg-cafe-bg pb-20">
      {/* Hero Header */}
      <header className="pt-10 pb-6 px-4 text-center">
        <h1 className="text-4xl font-serif font-bold text-cafe-accent mb-2">Cafe Au Lait</h1>
        <p className="text-gray-400 text-sm tracking-widest uppercase">Premium Coffee & Snacks</p>
      </header>

      {/* Navigation */}
      <StickyNav
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={scrollToCategory}
        onSearch={setSearchQuery}
        onFilterVeg={setIsVegOnly}
        isVegOnly={isVegOnly}
      />

      {/* Floating Cart Button (Mobile/Desktop) */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-cafe-accent text-cafe-bg p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-2"
        aria-label="Open Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <span className="font-bold flex items-center justify-center bg-cafe-bg text-cafe-accent w-6 h-6 rounded-full text-xs">
          {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        </span>
      </button>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      {/* Menu Sections */}
      <div className="container mx-auto px-4 mt-6 space-y-10">
        {displayData.map((category) => (
          <section key={category.category} id={category.category} className="scroll-mt-48">
            <h2 className="text-2xl font-serif font-bold text-cafe-text mb-6 pl-2 border-l-4 border-cafe-accent">
              {category.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map(item => (
                <MenuCard key={item.id} item={item} onAdd={addToCart} />
              ))}
            </div>
          </section>
        ))}

        {displayData.length === 0 && (
          <div className="text-center text-gray-500 py-20">No items found</div>
        )}
      </div>
    </div>
  );
}

export default App;
