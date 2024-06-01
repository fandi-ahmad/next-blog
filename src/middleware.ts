import { NextResponse, NextRequest } from 'next/server'
import { createClient } from './lib/supabase/server';

export async function middleware(request: NextRequest) {

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

}


export const config = {
  matcher: ['/profile']
}