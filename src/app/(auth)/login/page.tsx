import React from 'react';
import Link from "next/link"
import { SubmitButton } from "../(components)/SubmitButton"
import { Heading } from "../(components)/Heading"
import { TextField } from "@mui/material"
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import CheckUser from '../(components)/CheckUser';

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
        <TextField label="Email" name="email" variant="outlined" type="email" required className="w-full mb-4" />
        <TextField label="Password" name="password" variant="outlined" type="password" required className="w-full mb-6" />

        <SubmitButton formAction={signIn} pendingText="Signing In..." className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full text-white">
          Sign In
        </SubmitButton>
        
        <center className="text-xs">
          <span>Don&apos;t have an account?</span>
          <Link href={'/register'} className="text-blue-600 hover:underline"> Sign Up</Link>
        </center>
      </form>
    </>
  )
}