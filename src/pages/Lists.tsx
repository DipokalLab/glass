import { Navbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";

export default function ListsPage() {
  const imageItems = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <div className="flex w-screen h-screen bg-white dark:bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Navbar />

        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {imageItems.map((id) => (
              <div
                key={id}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`https://picsum.photos/seed/${id}/500/500`}
                  alt={`임의의 이미지 ${id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
