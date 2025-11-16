'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from 'sonner';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, selectedColor?: string | null, selectedMaterial?: string | null, selectedTipShape?: string | null) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number; selectedColor?: string | null; selectedMaterial?: string | null; selectedTipShape?: string | null }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_IS_OPEN'; isOpen: boolean };

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState & { isOpen: boolean }, action: CartAction) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Check if item with same product, color, material, and tip shape already exists
      const existingItem = state.items.find(item => 
        item.product.id === action.product.id &&
        item.selectedColor === action.selectedColor &&
        item.selectedMaterial === action.selectedMaterial &&
        item.selectedTipShape === action.selectedTipShape
      );
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === action.product.id &&
          item.selectedColor === action.selectedColor &&
          item.selectedMaterial === action.selectedMaterial &&
          item.selectedTipShape === action.selectedTipShape
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );

        const total = updatedItems.reduce((sum, item) => sum + ((item.product.price ?? 0) * item.quantity), 0);
        const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

        return { 
          ...state, 
          items: updatedItems, 
          total,
          itemCount
        };
      } else {
        const newItems = [...state.items, { 
          product: action.product, 
          quantity: action.quantity,
          selectedColor: action.selectedColor,
          selectedMaterial: action.selectedMaterial,
          selectedTipShape: action.selectedTipShape
        }];
        const total = newItems.reduce((sum, item) => sum + ((item.product.price ?? 0) * item.quantity), 0);
        const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
        
        return { 
          ...state, 
          items: newItems, 
          total,
          itemCount
        };
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const filteredItems = state.items.filter(item => item.product.id !== action.productId);
      const total = filteredItems.reduce((sum, item) => sum + ((item.product.price ?? 0) * item.quantity), 0);
      const itemCount = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { 
        ...state, 
        items: filteredItems, 
        total,
        itemCount
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', productId: action.productId });
      }
      
      const updatedItems = state.items.map(item =>
        item.product.id === action.productId
          ? { ...item, quantity: action.quantity }
          : item
      );
      
      const total = updatedItems.reduce((sum, item) => sum + ((item.product.price ?? 0) * item.quantity), 0);
      const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { 
        ...state, 
        items: updatedItems, 
        total,
        itemCount
      };
    }
    
    case 'CLEAR_CART':
      return { 
        ...state, 
        items: [], 
        total: 0, 
        itemCount: 0 
      };
    
    case 'SET_IS_OPEN':
      return {
        ...state,
        isOpen: action.isOpen
      };
    
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        parsedCart.items.forEach((item: CartItem) => {
          dispatch({ type: 'ADD_TO_CART', product: item.product, quantity: item.quantity });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify({
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    }));
  }, [state.items, state.total, state.itemCount]);

  const addToCart = (product: Product, quantity: number = 1, selectedColor?: string | null, selectedMaterial?: string | null, selectedTipShape?: string | null) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity, selectedColor, selectedMaterial, selectedTipShape });
    const productName = product.name || product.title || 'Product';
    toast.success(`${quantity} ${productName}${quantity > 1 ? 's' : ''} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    const item = state.items.find(item => item.product.id === productId);
    if (item) {
      dispatch({ type: 'REMOVE_FROM_CART', productId });
      toast.success(`${item.product.name} removed from cart`);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  const setIsOpen = (open: boolean) => {
    dispatch({ type: 'SET_IS_OPEN', isOpen: open });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};