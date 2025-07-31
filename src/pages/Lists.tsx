import { Button } from "@/components/ui/button";
import { Navbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaGithub } from "react-icons/fa";

export default function ListsPage() {
  const navigate = useNavigate();
  const items = [
    {
      id: "glow",
      title: "Glow Effect",
      description: "A subtle and radiant glow effect.",
    },
    {
      id: "glass",
      title: "Glassmorphism",
      description: "An effect that mimics a frosted glass texture.",
    },
    {
      id: "distort",
      title: "Distortion Effect",
      description: "An effect that warps and distorts the image.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-white dark:bg-black pt-15">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/capture/${item.id}`)}
                  className="group cursor-pointer overflow-hidden  shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={`/imglist/${item.id}.png`}
                      alt={item.title}
                      className="w-full h-full object-cover aspect-square rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="pt-4 ">
                    <h3 className="text-lg font-semibold text-black dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-center pt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Explore More?</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Explore More</DialogTitle>
                    <DialogDescription>
                      We are working on all projects as open source.
                      <br /> While some complex features will be monetized under
                      an open-core model, most effects and models are completely
                      free. If you want to access more content quickly, please
                      visit our GitHub below. By giving us a star, you can
                      support this project and receive faster update
                      notifications.
                    </DialogDescription>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() =>
                        window.open("https://github.com/DipokalLab/glass")
                      }
                    >
                      <FaGithub /> GitHub
                    </Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
