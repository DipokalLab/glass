import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { TypeOutline } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";
export const Navbar = ({ isShowLogo = false }: { isShowLogo?: boolean }) => {
  return (
    <header className="flex fixed w-full items-center justify-end z-20 h-16 px-6 gap-2 bg-white border-b border-neutral-200 dark:bg-black dark:border-neutral-800 shrink-0">
      {isShowLogo ? (
        <Link to="/" className="flex items-center justify-center">
          <TypeOutline className="h-6 w-6" />
          <span className="sr-only">MyBrand</span>
        </Link>
      ) : (
        <Link to="/" className="items-center justify-center hidden lg:block">
          <TypeOutline className="h-6 w-6" />
          <span className="sr-only">MyBrand</span>
        </Link>
      )}
      <nav className="ml-auto flex gap-2 sm:gap-3">
        <ModeToggle />

        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open("https://github.com/DipokalLab/glass")}
        >
          <FaGithub />
        </Button>

        <Button asChild>
          <Link to="/list">Get Started</Link>
        </Button>
      </nav>
    </header>
  );
};
