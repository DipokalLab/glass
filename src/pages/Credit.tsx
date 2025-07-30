import { Navbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";

export default function CreditPage() {
  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-white dark:bg-black  pt-15">
        <Sidebar />

        <div className="flex flex-col flex-1 ">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="font-bold text-2xl">
              Glass - A collection of 3D typo effects
            </h1>
            <br />
            <a
              href="https://github.com/DipokalLab/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-1"
            >
              H. Jun Huh (Maker)
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
