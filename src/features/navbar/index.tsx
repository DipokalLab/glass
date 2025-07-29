import { ModeToggle } from "@/components/mode-toggle";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-end h-16 px-6 gap-2 bg-white border-b border-gray-200 dark:bg-black dark:border-gray-800 shrink-0">
      <ModeToggle />
    </header>
  );
};
