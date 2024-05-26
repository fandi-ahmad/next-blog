import { TextField } from "@mui/material";
import { Heading } from "../(components)/Heading";
import { SubmitButton } from "../(components)/SubmitButton";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Heading>Sign Up</Heading>
      <form className="max-w-fit mx-auto">
        <TextField label="Email" name="email" variant="outlined" type="email" required className="w-full mb-4" />
        <TextField label="Password" name="password" variant="outlined" type="password" required className="w-full mb-6" />
        
        <SubmitButton pendingText="Signing Up..." className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 w-full text-white">
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