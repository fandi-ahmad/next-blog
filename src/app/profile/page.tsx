import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileData from "./ProfileData";

export default async function Profile() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/')
  }

  return(
    <div>
      <ProfileData/>
    </div>
  )
}