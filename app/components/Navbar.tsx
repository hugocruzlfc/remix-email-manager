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
    <header role="banner" className="text-light sticky top-0 bg-secondary">
      <nav
        role="navigation"
        className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 p-4 md:flex-row md:items-center"
      >
        <NavLink to="/">
          <span className="flex flex-wrap items-center gap-2 text-xl md:text-2xl">
            <Mail />
            <p>Email Manager</p>
          </span>
        </NavLink>

        <div className="flex flex-col space-y-1">
          <p className="text-sm md:text-xl">Welcome: {userType}</p>
          <p className="text-xs text-muted-foreground md:text-sm">
            {userTypeMessage}
          </p>
        </div>
      </nav>
    </header>
  );
}
