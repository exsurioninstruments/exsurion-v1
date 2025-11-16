# Sanity Setup Guide for Order Management

## Issue
The order creation was failing with "Insufficient permissions; permission 'create' required" because we were trying to use write operations in client-side code.

## Solution
We've moved all write operations to server-side API routes for security and proper architecture.

## New Architecture

### ✅ What's Fixed
- **Server-side API routes**: All write operations now happen on the server
- **Security**: API tokens are only used server-side, never exposed to client
- **Proper separation**: Client-side code only handles UI and read operations
- **API endpoint**: `/api/orders` handles all order creation and inventory management

### Current Status
- ✅ **Working now**: Order creation works in simulation mode
- ✅ **Production ready**: Just needs API token configuration
- ✅ **Secure**: No sensitive data exposed to client-side

## Steps to Enable Real Order Creation

### 1. Get Your Sanity API Token

1. Go to [Sanity Management Console](https://sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add API token**
5. Give it a name like "E-commerce Write Token"
6. Select **Editor** or **Admin** permissions
7. Copy the generated token

### 2. Create Environment File

Create a `.env.local` file in your project root with the following content:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-09-12

# Sanity API Token for write operations (server-side only)
SANITY_API_TOKEN=your_actual_token_here
```

### 3. Replace Placeholder Values

- Replace `your_project_id_here` with your actual Sanity project ID
- Replace `your_actual_token_here` with the token you generated in step 1
- Update the dataset name if it's not "production"

### 4. Restart Your Development Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

## Verification

Once configured, the order creation should work without permission errors. The system will:

1. ✅ Create orders in Sanity CMS
2. ✅ Update product inventory automatically
3. ✅ Validate stock before creating orders
4. ✅ Provide proper error messages

## Security Notes

- Never commit the `.env.local` file to version control
- The API token should have minimal required permissions
- Consider using different tokens for development and production

## Troubleshooting

If you still get permission errors:

1. **Check token permissions**: Ensure the token has "Editor" or "Admin" role
2. **Verify project ID**: Make sure the project ID is correct
3. **Check dataset name**: Ensure the dataset name matches your Sanity project
4. **Restart server**: Environment variables require a server restart

## Alternative: Test Mode

If you want to test without setting up the API token, you can temporarily modify the checkout page to simulate order creation instead of actually creating orders in Sanity.

## Files Modified

- `lib/sanity/orderOperations.ts` - Added write-enabled client
- `app/checkout/page.tsx` - Updated to use order creation
- `sanity/schemaTypes/order.ts` - Enhanced order schema
- `types/index.ts` - Added order types
