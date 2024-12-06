import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-secondary p-4 py-8", className)}>
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between md:flex-row">
        {/* Links */}
        <div className="mb-4 md:mb-0">
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://github.com/hugocruzlfc/remix-email-manager"
                className="flex items-center gap-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                Project repo
              </a>
            </li>
          </ul>
        </div>

        <div className="text-sm">
          &copy; {new Date().getFullYear()} Email Manager by Hugo Cruz. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
