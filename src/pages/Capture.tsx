import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useCanvasRecorder } from "@/hooks/useCanvasRecorder";
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
import { GlassScene } from "@/components/three/GlassText";
import { GlowScene, type GlowOptions } from "@/components/three/GlowText";
import {
  DistortScene,
  type DistortOptions,
} from "@/components/three/DistortText";
import { Download, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { calculateAspectRatio } from "@/lib/utils";
import { useResolutionStore } from "@/features/canvas/store";
import { FlatScene } from "@/components/three/FlatText";

export default function CapturePage() {
  const [textId, setTextId] = useState("");
  const [text, setText] = useState("Glass");
  const [duration] = useState(2000);
  const [isRecording, setIsRecording] = useState(false);
  const [size] = useState(1024);
  const { width, height, setResolution } = useResolutionStore();
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState({});
  const { startRecording } = useCanvasRecorder("maincanvas");
  const { downloadImage } = useCanvasImageDownloader("maincanvas");

  useEffect(() => {
    const split = window.location.pathname.split("/");
    const id = split[split.length - 1];
    setOptionsMatch(id);
    setTextId(id);
  }, []);

  const setOptionsMatch = (id: string) => {
    if (id == "glow") {
      setOptions({
        bloomIntensity: 1.5,
        chromaticAberration: 0.001,
      });
    }

    if (id == "distort") {
      setOptions({
        bloomIntensity: 1.5,
        chromaticAberration: 0.001,
        distortSpeed: 5,
      });
    }
  };

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

  const handleSetResolution = (w: number, h: number) => {
    setResolution(w, h);
  };

  const handleCapture = () => {
    downloadImage();
  };

  const handleOptionChange = (
    key: string,
    value: string | number | boolean
  ) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const renderInput = (key: string, value: string | number | boolean) => {
    const valueType = typeof value;

    switch (valueType) {
      case "number":
        return (
          <Input
            type="number"
            id={key}
            value={value as number}
            onChange={(e) =>
              handleOptionChange(key, parseFloat(e.target.value) || 0)
            }
            className="col-span-2 h-8"
          />
        );
      case "string":
        return (
          <Input
            type="text"
            id={key}
            value={value as string}
            onChange={(e) => handleOptionChange(key, e.target.value)}
            className="col-span-2 h-8"
          />
        );
      case "boolean":
        return (
          <div className="col-span-2 flex items-center h-8">
            <Switch
              id={key}
              checked={value as boolean}
              onCheckedChange={(checked: boolean) =>
                handleOptionChange(key, checked)
              }
            />
          </div>
        );
      default:
        return (
          <p className="col-span-2 text-sm text-muted-foreground">
            Unsupported type: {valueType}
          </p>
        );
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex w-screen h-screen bg-white dark:bg-black  pt-15">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <main className="flex flex-col p-6 justify-center items-center gap-2">
            <div className="flex w-full justify-center p-4">
              {textId == "glow" && (
                <GlowScene
                  text={text}
                  size={size}
                  options={options as GlowOptions}
                />
              )}
              {textId == "glass" && <GlassScene text={text} />}
              {textId == "distort" && (
                <DistortScene text={text} options={options as DistortOptions} />
              )}
              {textId == "flat" && <FlatScene text={text} />}
            </div>

            <div className="flex w-full justify-center">
              <div className="flex items-center justify-center gap-2 w-[512px]">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon">
                      <SlidersHorizontal />
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Options</SheetTitle>

                      <div className="grid gap-4">
                        {Object.entries(options).map(([key, value]) => (
                          <div
                            key={key}
                            className="grid grid-cols-3 items-center gap-4"
                          >
                            <Label htmlFor={key} className="capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </Label>
                            {renderInput(
                              key,
                              value as string | number | boolean
                            )}
                          </div>
                        ))}
                      </div>
                    </SheetHeader>
                  </SheetContent>
                </Sheet>
                <Input
                  type="text"
                  placeholder="Text"
                  onChange={(e) => setText(e.target.value)}
                />
                <Button onClick={handleCapture}>
                  <Download /> Image
                </Button>
              </div>
            </div>

            <Button onClick={handleStartRecording} className="hidden">
              <Download /> Image
            </Button>

            <div className="flex w-full justify-center">
              <div className="flex items-center justify-start gap-2 w-[512px]">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Ratio {calculateAspectRatio(width, height)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleSetResolution(512, 512)}
                    >
                      1:1
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSetResolution(800, 600)}
                    >
                      4:3
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleSetResolution(1280, 720)}
                    >
                      16:9
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* <Slider
              value={[duration]}
              onValueChange={(value) => setDuration(value[0])}
              min={1000}
              max={10000}
              step={500}
            />
            {duration} */}

            {/* <Button onClick={handleStartRecording}>Record</Button> */}

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
