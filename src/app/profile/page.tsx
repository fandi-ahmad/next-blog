import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/')
  }

  return(
    <div>
      <p>this is a Profile page</p>
    </div>
  )
}