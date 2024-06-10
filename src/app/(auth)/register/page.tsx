import { TextField } from "@mui/material";
import { Heading } from "../(components)/Heading";
import { SubmitButton } from "../(components)/SubmitButton";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CheckUser from "../(components)/CheckUser";

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
        <TextField label="Email" name="email" variant="outlined" type="email" required className="w-full mb-4" />
        <TextField label="Password" name="password" variant="outlined" type="password" required className="w-full mb-6" />
        
        <SubmitButton formAction={signUp} pendingText="Signing Up..." className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full text-white">
          Sign Up
        </SubmitButton>
        
        <center className="text-xs">
          Have an account?
          <Link href={'/login'} className="text-blue-600 hover:underline"> Sign In</Link>
        </center>
      </form>
    </>
  )
}