import { Package, Menu, CircleQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router";
import { useState } from "react";

type EffectItem = { id: string; title: string };

export const Sidebar = ({
  effects,
  selectedEffectId,
  onSelectEffect,
  mobileOnly = false,
}: {
  effects?: EffectItem[];
  selectedEffectId?: string;
  onSelectEffect?: (id: string) => void;
  mobileOnly?: boolean;
} = {}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Editor", icon: Package, path: "/" },
    { name: "Credit", icon: CircleQuestionMark, path: "/credit" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full text-black dark:text-white mt-4">
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            onClick={() => {
              navigate(item.path);
              setOpen(false);
            }}
            className="flex items-center px-3 hover:px-4 py-2 mt-2 text-sm font-medium rounded-md hover:bg-neutral-200 dark:hover:bg-slate-900 duration-150 cursor-pointer"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </a>
        ))}

        {effects && effects.length > 0 && (
          <div className="mt-4">
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Effects
            </p>
            {effects.map((effect) => (
              <a
                key={effect.id}
                onClick={() => {
                  onSelectEffect?.(effect.id);
                  setOpen(false);
                }}
                className={`flex items-center gap-3 px-3 hover:px-4 py-2 mt-1 text-sm font-medium rounded-md hover:bg-neutral-200 dark:hover:bg-slate-900 duration-150 cursor-pointer ${
                  selectedEffectId === effect.id
                    ? "bg-neutral-200 dark:bg-slate-900"
                    : ""
                }`}
              >
                <img
                  src={`/imglist/${effect.id}.png`}
                  alt={effect.title}
                  className="h-8 w-8 rounded-md object-cover"
                />
                {effect.title}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );

  return (
    <>
      {!mobileOnly && (
        <>
          <div className="hidden  lg:block w-64 shrink-0"></div>
          <div className="hidden fixed h-full lg:block w-64 bg-white border-r border-neutral-200 dark:bg-black dark:border-neutral-800 shrink-0">
            {sidebarContent}
          </div>
        </>
      )}
      <div className="lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
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
