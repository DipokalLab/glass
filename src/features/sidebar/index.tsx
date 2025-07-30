import { Package, Menu, CircleQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router";

export const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Lists", icon: Package, path: "/list" },
    { name: "Credit", icon: CircleQuestionMark, path: "/credit" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full text-black dark:text-white mt-4">
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            onClick={() => navigate(item.path)}
            className="flex items-center px-3 hover:px-4 py-2 mt-2 text-sm font-medium rounded-md hover:bg-neutral-200 dark:hover:bg-slate-900 duration-150 cursor-pointer"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block w-64 bg-white border-r border-neutral-200 dark:bg-black dark:border-neutral-800 shrink-0">
        {sidebarContent}
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 text-neutral-800 dark:text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 border-r-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
