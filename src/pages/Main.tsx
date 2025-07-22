import React from "react";
import { Home, Package, Menu, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { EquirectangularReflectionMapping, TextureLoader } from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import GlassText from "@/components/three/Text";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: Home },
    { name: "Products", icon: Package },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full text-white mt-4">
      <nav className="flex-1 px-2">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className="flex items-center px-4 py-2 mt-2 text-sm font-medium rounded-md hover:bg-gray-700"
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
      <div className="hidden lg:block w-64 bg-black border-r border-gray-800 shrink-0">
        {sidebarContent}
      </div>
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="fixed top-4 left-4 z-50 text-gray-800 dark:text-white"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-gray-800 p-0 border-r-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <header className="flex items-center justify-end h-16 px-6 bg-black border-b border-gray-800 dark:bg-gray-800 dark:border-gray-700 shrink-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default">
            <Download />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

const ThreeScene = () => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;

  return (
    <Canvas
      camera={{ position: [0, 0, 7] }}
      className="rounded-lg border-2 border-gray-800"
      style={{ width: "512px", height: "512px" }}
    >
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.5} color={"#ffffff"} />
      <directionalLight
        position={[0, 100, 60]}
        intensity={30}
        color={"#ffffff"}
      />
      <Environment>
        <Lightformer
          form="rect"
          intensity={4}
          position={[-5, 5, -5]}
          scale={4}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[5, 10, 5]}
          scale={10}
          map={texture}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[5, -5, 5]}
          scale={10}
          map={texture}
        />
        <Lightformer
          form="rect"
          intensity={4}
          position={[-5, 0, 15]}
          scale={30}
          map={texture}
        />
      </Environment>
      <GlassText text="3D TEXT" />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.025}
          mipmapBlur
        />
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
      <OrbitControls />
    </Canvas>
  );
};

export default function HomePage() {
  return (
    <div className="flex w-screen h-screen bg-black dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-6">
          <div className="flex w-full h-full justify-center p-4 bg-black rounded-lg shadow-md dark:bg-gray-900">
            <ThreeScene />
          </div>
        </main>
      </div>
    </div>
  );
}
