import { NextRequest, NextResponse } from 'next/server';
import { processOrder } from '@/lib/sanity/serverOrderOperations';
import { Order } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const orderData: Omit<Order, '_id' | 'orderNumber'> = await request.json();
    
    // Validate required fields
    if (!orderData.customer?.email || !orderData.items?.length) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      );
    }
    // Process the order on the server
    const createdOrder = await processOrder(orderData);
    
    return NextResponse.json(createdOrder);
  } catch (error) {
    console.error('Order API error:', error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}

// Optional: Add GET endpoint to retrieve orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    // This would require implementing getOrdersByCustomer in the server-side order operations
    // For now, return empty array
    return NextResponse.json([]);
  } catch (error) {
    console.error('Get orders API error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve orders' },
      { status: 500 }
    );
  }
}
