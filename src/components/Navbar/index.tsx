import AuthButton from "./AuthButton"
import NavbarMenu from "./NavbarMenu"
import NavbarLogo from "./NavbarLogo"
import { createClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return(
    <nav className="py-4 flex justify-between items-center">
      <NavbarLogo/>
      <div className="text-sm lg:text-base flex flex-row">
        <NavbarMenu href="/" text="Article" />
        <NavbarMenu href="/" text="About" />
        {user ? <NavbarMenu href="/profile" text="Profile" /> : null}
        <AuthButton/>
      </div>
    </nav>
  )
}