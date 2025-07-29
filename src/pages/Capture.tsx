import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
import { ThreeScene } from "@/components/three/Text";
import { GlassScene } from "@/components/three/Glass";

export default function CapturePage() {
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("Glass");
  const [duration, setDuration] = useState(2000);
  const [isRecording, setIsRecording] = useState(false);
  const [size, setSize] = useState(1024);
  const [progress, setProgress] = useState(0);
  const { startRecording } = useCanvasRecorder("maincanvas");
  const { downloadImage } = useCanvasImageDownloader("maincanvas");

  useEffect(() => {
    const split = window.location.pathname.split("/");
    const id = split[split.length - 1];
    setTextId(id);
  }, []);

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
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-white dark:bg-black">
        <Sidebar />
        <div className="flex flex-col flex-1 ">
          <main className="flex flex-col p-6 gap-2">
            <div className="flex w-full justify-center p-4">
              {textId == "glow" && <ThreeScene text={text} size={size} />}
              {textId == "glass" && <GlassScene text={text} />}
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
    </>
  );
}
