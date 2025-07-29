import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MountainIcon } from "lucide-react";
import { Link } from "react-router";

export const Navbar = () => {
  return (
    <header className="flex fixed w-full items-center justify-end h-16 px-6 gap-2 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800 shrink-0">
      <Link to="/" className="flex items-center justify-center hidden lg:block">
        <MountainIcon className="h-6 w-6" />
        <span className="sr-only">MyBrand</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <ModeToggle />

        <Button asChild>
          <Link to="/list">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
};
