import AuthButton from "./AuthButton"
import NavbarMenu from "./NavbarMenu"
import NavbarLogo from "./NavbarLogo"
import { createClient } from "@/lib/supabase/server";
import NavbarLayout from "./NavbarLayout";
import GetUserData from "@/utils/GetUserData";
import NavbarMenuProfile from "./NavbarMenuProfile";

export default async function Navbar() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return(
    <NavbarLayout>
      {user ? <GetUserData/> : null}
      <nav className="py-4 flex justify-between items-center">
        <NavbarLogo/>
        <div className="text-sm lg:text-base flex flex-row">
          <NavbarMenu href="/" text="Article" />
          <NavbarMenu href="/about" text="About" />
          {user ? <NavbarMenuProfile user={user} /> : null}
          <AuthButton/>
        </div>
      </nav>
    </NavbarLayout>
  )
}