import React from 'react';
import Link from "next/link"
import { SubmitButton } from "../(components)/SubmitButton"
import { Heading } from "../(components)/Heading"
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CheckUser from '../(components)/CheckUser';
import InputField from '@/components/InputField';

export default function Login() {

  const signIn = async (formData: FormData) => {
    "use server"
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();
  
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
  
    if (error) {
      return redirect("/login?message=Email or password is wrong");
    }
  
    return redirect("/");
  }

  return (
    <>
      <CheckUser/>
      <Heading>Sign In</Heading>
      <form className="max-w-fit mx-auto">
        <InputField label='Email' name='email' type='email' />
        <InputField label='Password' name='password' type='password' />

        <SubmitButton formAction={signIn} pendingText="Signing In..." className="bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-2 text-foreground my-2 w-full text-white transition-all duration-100">
          Sign In
        </SubmitButton>
        
        <center className="text-xs">
          <span>Don&lsquo;t have an account?</span>
          {/* `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
          <Link href={'/register'} className="text-blue-300 hover:underline"> Sign Up</Link>
        </center>
      </form>
    </>
  )
}