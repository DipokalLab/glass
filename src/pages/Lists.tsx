import { Navbar } from "@/features/navbar";
import { Sidebar } from "@/features/sidebar";
import { useNavigate } from "react-router";

export default function ListsPage() {
  const navigate = useNavigate();
  const textItems = ["glow", "glass"];

  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-white dark:bg-black pt-15">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {textItems.map((id) => (
                <div
                  key={id}
                  className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                >
                  <img
                    src={`/imglist/${id}.png`}
                    alt={`임의의 이미지 ${id}`}
                    onClick={() => navigate(`/capture/${id}`)}
                    className="w-full h-full object-cover rounded-lg hover:border-3 border-1 duration-200 border-gray-900"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
