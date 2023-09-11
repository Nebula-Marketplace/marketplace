import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { type } from 'os';

type Maintenance = {
    enabled: boolean
  }

export async function GET(request: Request){
    const maint : Maintenance = {
        enabled: Boolean(process.env.NEXT_MAINTENANCE)
    }
    return NextResponse.json(maint);
}