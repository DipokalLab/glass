import { Navbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";

export default function CreditPage() {
  return (
    <div className="flex w-screen h-screen bg-white dark:bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Navbar />

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <h1>Glass</h1>
        </div>
      </div>
    </div>
  );
}
