import React, { useState, useEffect } from 'react';

const StickyNav = ({ categories, activeCategory, onCategorySelect, onSearch, onFilterVeg, isVegOnly }) => {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-50 transition-all duration-300 ${isSticky ? 'bg-cafe-surface/90 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 space-y-3">
                {/* Search & Filter */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search items..."
                        className="w-full px-4 py-2 rounded-lg bg-cafe-bg border border-cafe-accent/20 focus:border-cafe-accent outline-none text-cafe-text placeholder-gray-500 transition-all"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                    <button
                        onClick={() => onFilterVeg(!isVegOnly)}
                        className={`px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${isVegOnly ? 'bg-green-800 border-green-600 text-white' : 'border-cafe-accent/20 text-cafe-accent'}`}
                    >
                        {isVegOnly ? 'Veg Only' : 'Veg/Non'}
                    </button>
                </div>

                {/* Categories */}
                <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-3 no-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategorySelect(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-cafe-accent text-cafe-bg shadow-md'
                                    : 'bg-cafe-surface border border-cafe-accent/10 text-gray-400 hover:text-cafe-accent'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StickyNav;
