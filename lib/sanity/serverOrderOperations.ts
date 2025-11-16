import { createClient } from 'next-sanity';
import { Order, OrderItem } from '@/types';

// Server-side Sanity client with write permissions
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-12',
  useCdn: false, // Disable CDN for write operations
  token: process.env.SANITY_API_TOKEN, // Server-side environment variable
});

// Generate a unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp}-${random}`;
}

// Create a new order in Sanity (server-side)
export async function createOrder(orderData: Omit<Order, '_id' | 'orderNumber'>): Promise<Order> {
  // Check if API token is configured
  if (!process.env.SANITY_API_TOKEN) {
    console.warn('SANITY_API_TOKEN not configured. Simulating order creation for testing.');
    return simulateOrderCreation(orderData);
  }
  
  const orderNumber = generateOrderNumber();
  
  const order = {
    _type: 'order',
    orderNumber,
    ...orderData,
  };

  try {
    const createdOrder = await serverClient.create(order);
    return {
      _id: createdOrder._id,
      orderNumber,
      ...orderData,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    if (error instanceof Error && error.message.includes('permission')) {
      throw new Error(
        'Insufficient permissions to create orders. Please check your SANITY_API_TOKEN has "Editor" or "Admin" permissions.'
      );
    }
    throw new Error('Failed to create order');
  }
}

// Fallback function for testing without API token
function simulateOrderCreation(orderData: Omit<Order, '_id' | 'orderNumber'>): Order {
  const orderNumber = generateOrderNumber();
  return {
    _id: `simulated-${Date.now()}`,
    orderNumber,
    ...orderData,
  };
}

// Update product stock after order (server-side)
export async function updateProductStock(items: OrderItem[]): Promise<void> {
  // Check if API token is configured
  if (!process.env.SANITY_API_TOKEN) {
    console.warn('SANITY_API_TOKEN not configured. Skipping inventory update for testing.');
    return;
  }
  
  try {
    // Process each item in the order
    for (const item of items) {
      // Get current product stock
      const product = await serverClient.getDocument(item.product._ref);
      
      if (!product) {
        throw new Error(`Product with ID ${item.product._ref} not found`);
      }

      const currentStock = product.stock || 0;
      const newStock = currentStock - item.quantity;

      if (newStock < 0) {
        throw new Error(`Insufficient stock for product ${product.title}. Available: ${currentStock}, Requested: ${item.quantity}`);
      }

      // Update the product stock
      await serverClient
        .patch(item.product._ref)
        .set({ stock: newStock })
        .commit();
    }
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw new Error('Failed to update product stock');
  }
}

// Create order and update inventory in a transaction-like manner (server-side)
export async function processOrder(orderData: Omit<Order, '_id' | 'orderNumber'>): Promise<Order> {
  try {
    // If API token is not configured, skip stock validation and create simulated order
    if (!process.env.SANITY_API_TOKEN) {
      console.warn('SANITY_API_TOKEN not configured. Creating simulated order without stock validation.');
      return await createOrder(orderData);
    }

    // First, check if all products have sufficient stock
    for (const item of orderData.items) {
      const product = await serverClient.getDocument(item.product._ref);
      
      if (!product) {
        throw new Error(`Product with ID ${item.product._ref} not found`);
      }

      const currentStock = product.stock || 0;
      if (currentStock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.title}. Available: ${currentStock}, Requested: ${item.quantity}`);
      }
    }

    // If all products have sufficient stock, create the order
    const order = await createOrder(orderData);

    // Then update the inventory
    await updateProductStock(orderData.items);

    return order;
  } catch (error) {
    console.error('Error processing order:', error);
    throw error;
  }
}

// Get order by ID (server-side)
export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const order = await serverClient.getDocument(orderId);
    return order as unknown as Order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
}

// Get orders by customer email (server-side)
export async function getOrdersByCustomer(email: string): Promise<Order[]> {
  try {
    const orders = await serverClient.fetch(
      `*[_type == "order" && customer.email == $email] | order(orderDate desc)`,
      { email }
    );
    return orders as unknown as Order[];
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    return [];
  }
}
