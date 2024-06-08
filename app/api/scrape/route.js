import { NextResponse } from 'next/server';
import scrapeSite from '../../../lib/scraper';

export async function POST(req) {
  const { url, primarySelector, link, secondarySelector, dateSelector } = await req.json();

  if (!url || !primarySelector || !secondarySelector || !dateSelector) {
    return NextResponse.json({ error: 'URL, primary selector, and secondary selector are required' }, { status: 400 });
  }

  try {
    const data = await scrapeSite(url, primarySelector, link, secondarySelector, dateSelector);
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
