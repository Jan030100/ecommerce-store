import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Shoply E-commerce API',
    version: '1.0',
    endpoints: {
      products: '/api/products',
    },
    documentation: 'Use /api/products to fetch product data'
  });
}
