import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemove }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-cafe-surface border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">

                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between">
                        <h2 className="text-2xl font-serif font-bold text-cafe-accent">Your Order</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                <p>Your cart is empty</p>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="flex gap-4 items-center bg-white/5 p-3 rounded-lg">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-cafe-text">{item.name}</h3>
                                        <p className="text-cafe-accent font-bold">₹{item.price}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="flex items-center gap-2 bg-black/20 rounded-lg p-1">
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, -1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                            >
                                                -
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => onUpdateQuantity(item.id, 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
