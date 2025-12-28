import React from 'react';

const MenuCard = ({ item, onAdd }) => {
    return (
        <div className="bg-cafe-surface rounded-xl overflow-hidden shadow-lg border border-white/5 hover:border-cafe-accent/30 transition-all duration-300 flex flex-col sm:flex-row group">
            {/* Image */}
            <div className="sm:w-32 h-32 sm:h-auto overflow-hidden relative shrink-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow justify-between relative">
                <div className="absolute top-4 right-4 sm:top-auto sm:bottom-4">
                    <div className={`w-3 h-3 rounded-full border ${item.isVeg ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500'} shadow-sm shadow-green-500/50`} />
                </div>

                <div>
                    <h3 className="text-lg font-serif font-bold text-cafe-text group-hover:text-cafe-accent transition-colors">
                        {item.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {item.description}
                    </p>
                </div>

                <div className="mt-3 flex items-end justify-between">
                    <span className="text-lg font-bold text-cafe-accent">
                        ₹{item.price}
                    </span>
                    <button
                        onClick={() => onAdd(item)}
                        className="bg-cafe-accent/10 hover:bg-cafe-accent text-cafe-accent hover:text-cafe-bg p-2 rounded-lg transition-all text-xs font-bold uppercase tracking-wider"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
