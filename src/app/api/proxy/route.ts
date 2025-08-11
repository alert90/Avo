// src/app/api/proxy/route.ts
import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';

const API_BASE_URL = process.env.API_BASE_URL || 'https://avoguide.com/api/';

export async function POST(req: Request) {
  try {
    const { endpoint, data } = await req.json();
    
    const apiResponse = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const responseData: ApiResponse<unknown> = await apiResponse.json();
    
    return NextResponse.json(responseData);
  } catch (error) {
    return NextResponse.json(
      { status: 500, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}