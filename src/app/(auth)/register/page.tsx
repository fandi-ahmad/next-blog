import { Heading } from "../(components)/Heading";
import { SubmitButton } from "../(components)/SubmitButton";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckUser from "../(components)/CheckUser";
import InputField from '@/components/InputField';

export default function Register() {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    console.log(error, '<-- ERROR REGSTER');

    if (error) {
      return redirect("/register?message=Could not authenticate user");
    }

    return redirect("/register?message=Check email to continue sign in process");
  };

  return (
    <>
      <CheckUser/>
      <Heading>Sign Up</Heading>
      <form className="max-w-fit mx-auto">
        <InputField label='Email' name='email' type='email' />
        <InputField label='Password' name='password' type='password' />

        <SubmitButton formAction={signUp} pendingText="Signing Up..." className="bg-blue-600 hover:bg-blue-500 rounded-md px-4 py-2 text-foreground my-2 w-full text-white transition-all duration-100">
          Sign Up
        </SubmitButton>
        
        <center className="text-xs">
          Have an account?
          <Link href={'/login'} className="text-blue-300 hover:underline"> Sign In</Link>
        </center>
      </form>
    </>
  )
}