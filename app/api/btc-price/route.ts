import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // CoinGecko public API - no key required
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      {
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data = await response.json();
    const price = data.bitcoin?.usd;

    if (!price) {
      throw new Error('Price not found in response');
    }

    // Format as currency with commas
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

    return NextResponse.json({
      price: formattedPrice,
      raw: price,
      source: 'coingecko',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching BTC price:', error);

    // Fallback price
    return NextResponse.json({
      price: '$200,020.48',
      raw: 200020.48,
      source: 'fallback',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
