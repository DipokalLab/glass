import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { Canvas, useLoader } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { EquirectangularReflectionMapping, TextureLoader } from "three";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import GlassText from "@/components/three/Text";
import { Input } from "@/components/ui/input";
import { useCanvasRecorder } from "@/hooks/useCanvasRecorder";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Sidebar } from "@/features/sidebar";
import { Navbar } from "@/features/navbar";
import { useCanvasImageDownloader } from "@/hooks/useCanvasImage";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GlassScene } from "@/components/three/Glass";

const ThreeScene = ({ text, size = 512 }: { text: string; size: number }) => {
  const texture = useLoader(TextureLoader, "/image/texture.png");
  texture.mapping = EquirectangularReflectionMapping;

  const displaySize = 1024;

  return (
    <div style={{ width: "512px", height: "512px" }}>
      <Canvas
        id="maincanvas"
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 7] }}
        className="rounded-lg border-1 border-gray-900"
        dpr={size / displaySize}
        style={{ width: "100%", height: "100%" }}
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
        <GlassText text={text} />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.025}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
};

export default function HomePage() {
  const [text, setText] = useState("Glass");
  const [duration, setDuration] = useState(2000);
  const [isRecording, setIsRecording] = useState(false);
  const [size, setSize] = useState(1024);
  const [progress, setProgress] = useState(0);
  const { startRecording } = useCanvasRecorder("maincanvas");
  const { downloadImage } = useCanvasImageDownloader("maincanvas");

  const handleStartRecording = () => {
    if (isRecording) return;

    setIsRecording(true);
    setProgress(0);
    startRecording(duration);

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const currentProgress = (elapsedTime / duration) * 100;

      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsRecording(false);
          setProgress(0);
        }, 500);
      } else {
        setProgress(currentProgress);
      }
    }, 50);
  };

  const handleCapture = () => {
    downloadImage();
  };

  return (
    <div className="flex w-screen h-screen bg-white dark:bg-black">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        <Navbar />
        <main className="flex flex-col p-6 gap-2">
          <div className="flex w-full justify-center p-4">
            <ThreeScene text={text} size={size} />
            <GlassScene text={text} />
          </div>
          <Input
            type="text"
            placeholder="Text"
            onChange={(e) => setText(e.target.value)}
          />
          <Slider
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
            min={1000}
            max={10000}
            step={500}
          />
          {duration}

          <Button onClick={handleStartRecording}>Record</Button>
          <Button onClick={handleCapture}>Capture</Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>Set Size</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSize(128)}>
                128x128
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSize(512)}>
                512x512
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSize(1024)}>
                1024x1024
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {size}

          <Dialog open={isRecording} onOpenChange={setIsRecording}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Recoding</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Progress value={progress} />
              </div>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
