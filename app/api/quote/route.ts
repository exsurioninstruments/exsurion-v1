import { NextRequest, NextResponse } from 'next/server';
import sendEmail from '@/lib/sendEmail';

interface QuoteRequest {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: Array<{
    productId: string;
    productName: string;
    sku?: string;
    productCode?: string;
    quantity: number;
    color?: string;
    material?: string;
    tipShape?: string;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const quoteData: QuoteRequest = await request.json();
    
    // Validate required fields
    if (!quoteData.customer?.email || !quoteData.items?.length) {
      return NextResponse.json(
        { error: 'Missing required quote data' },
        { status: 400 }
      );
    }

    const supplierEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;
    if (!supplierEmail) {
      return NextResponse.json(
        { error: 'Supplier email not configured' },
        { status: 500 }
      );
    }

    const formatItemDetailsText = (item: QuoteRequest['items'][number]) => {
      const details = [`- ${item.productName} (Quantity: ${item.quantity})`];
      if (item.productCode) details.push(`  Product Code: ${item.productCode}`);
      if (item.sku) details.push(`  SKU: ${item.sku}`);
      if (item.color) details.push(`  Color: ${item.color}`);
      if (item.material) details.push(`  Material: ${item.material}`);
      if (item.tipShape) details.push(`  Tip Shape: ${item.tipShape}`);
      return details.join('\n');
    };

    const formatItemDetailsHtml = (item: QuoteRequest['items'][number]) => {
      const extraDetails = [
        item.productCode ? `<p style="margin: 2px 0;">Product Code: ${item.productCode}</p>` : '',
        item.sku ? `<p style="margin: 2px 0;">SKU: ${item.sku}</p>` : '',
        item.color ? `<p style="margin: 2px 0;">Color: ${item.color}</p>` : '',
        item.material ? `<p style="margin: 2px 0;">Material: ${item.material}</p>` : '',
        item.tipShape ? `<p style="margin: 2px 0;">Tip Shape: ${item.tipShape}</p>` : '',
      ].filter(Boolean).join('');

      return `
        <li style="padding: 8px 0; border-bottom: 1px solid #ddd;">
          <strong>${item.productName}</strong> - Quantity: ${item.quantity}
          ${extraDetails ? `<div style="margin-top: 6px; color: #555;">${extraDetails}</div>` : ''}
        </li>
      `;
    };

    // Prepare quote request email for supplier
    const itemsList = quoteData.items.map(formatItemDetailsText).join('\n');
    const itemsListHtml = quoteData.items.map(formatItemDetailsHtml).join('');

    const supplierEmailSubject = `New Quote Request from ${quoteData.customer.firstName} ${quoteData.customer.lastName}`;
    const supplierEmailText = `
New Quote Request Received

Customer Information:
- Name: ${quoteData.customer.firstName} ${quoteData.customer.lastName}
- Email: ${quoteData.customer.email}
- Phone: ${quoteData.customer.phone}

Shipping Address:
- Address: ${quoteData.shippingAddress.address}
- City: ${quoteData.shippingAddress.city}
- State: ${quoteData.shippingAddress.state}
- ZIP Code: ${quoteData.shippingAddress.zipCode}

Requested Items:
${itemsList}

Please provide a quote for the above items.
    `;

    const supplierEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Quote Request Received</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Customer Information</h3>
          <p><strong>Name:</strong> ${quoteData.customer.firstName} ${quoteData.customer.lastName}</p>
          <p><strong>Email:</strong> ${quoteData.customer.email}</p>
          <p><strong>Phone:</strong> ${quoteData.customer.phone}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Shipping Address</h3>
          <p><strong>Address:</strong> ${quoteData.shippingAddress.address}</p>
          <p><strong>City:</strong> ${quoteData.shippingAddress.city}</p>
          <p><strong>State:</strong> ${quoteData.shippingAddress.state}</p>
          <p><strong>ZIP Code:</strong> ${quoteData.shippingAddress.zipCode}</p>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Requested Items</h3>
          <ul style="list-style: none; padding: 0;">
            ${itemsListHtml}
          </ul>
        </div>

        <p style="color: #666; margin-top: 20px;">Please provide a quote for the above items.</p>
      </div>
    `;

    // Prepare thank you email for customer
    const customerEmailSubject = 'Thank You for Your Quote Request - Exsurion';
    const customerEmailText = `
Dear ${quoteData.customer.firstName},

Thank you for your interest in our surgical instruments. We have received your quote request and our team will review it shortly.

Requested Items:
${itemsList}

We will contact you within 24-48 hours with a detailed quote.

If you have any questions, please don't hesitate to contact us.

Best regards,
Exsurion Team
    `;

    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Thank You for Your Quote Request</h2>
        
        <p>Dear ${quoteData.customer.firstName},</p>
        
        <p>Thank you for your interest in our surgical instruments. We have received your quote request and our team will review it shortly.</p>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #555;">Your Requested Items</h3>
          <ul style="list-style: none; padding: 0;">
            ${itemsListHtml}
          </ul>
        </div>

        <p>We will contact you within 24-48 hours with a detailed quote.</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>

        <p style="margin-top: 30px;">Best regards,<br>Exsurion Team</p>
      </div>
    `;

    // Send emails
    await Promise.all([
      // Send quote request to supplier
      sendEmail(
        supplierEmail,
        supplierEmailSubject,
        supplierEmailText,
        supplierEmailHtml
      ),
      // Send thank you email to customer
      sendEmail(
        quoteData.customer.email,
        customerEmailSubject,
        customerEmailText,
        customerEmailHtml
      )
    ]);

    return NextResponse.json({ 
      success: true,
      message: 'Quote request submitted successfully' 
    });
  } catch (error) {
    console.error('Quote API error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}



