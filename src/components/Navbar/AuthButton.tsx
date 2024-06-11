import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <form action={signOut} className="ms-4 sm:ms-6 cursor-pointer font-medium hover:text-blue-200">
      <button>Logout</button>
    </form>
  ) : (
    <Link href={'/login'} className="ms-4 sm:ms-6 cursor-pointer font-medium hover:text-blue-200">Login</Link>
  )
}