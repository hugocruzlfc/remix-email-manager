import { NavLink, useLocation } from "@remix-run/react";
import { Mail } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();

  const createPathname = pathname === "/admin-dashboard";

  const userType = createPathname ? "Admin" : "User";

  const userTypeMessage = createPathname
    ? "Manage and oversee email operations with ease and efficiency"
    : "Enjoy simple and easy sending of emails";

  return (
    <header role="banner" className="text-light sticky bg-secondary">
      <nav
        role="navigation"
        className="mx-auto flex max-w-7xl justify-between p-4"
      >
        <NavLink to="/">
          <span className="flex flex-wrap items-center gap-2 text-2xl">
            <Mail />
            <p>Email Manager</p>
          </span>
        </NavLink>
        <div>
          <div className="space-y-1">
            <p className="text-xl">Welcome: {userType}</p>
            <p className="text-sm text-muted-foreground">{userTypeMessage}</p>
          </div>
        </div>
      </nav>
    </header>
  );
}
