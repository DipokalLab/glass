import { useState } from "react";
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
import { Render } from "@/features/render";
import { CircularSelect } from "@/features/circular-select";

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
  {
    id: "flat",
    title: "Flat",
    description: "Flat 3d text image.",
  },
  {
    id: "chrome",
    title: "Chrome",
    description: "Reflective metallic chrome.",
  },
  {
    id: "gold",
    title: "Gold Foil",
    description: "Warm luxurious gold metal.",
  },
  {
    id: "holographic",
    title: "Holographic",
    description: "Iridescent rainbow sheen.",
  },
  {
    id: "neon",
    title: "Neon",
    description: "Glowing neon tubes on dark.",
  },
  {
    id: "toon",
    title: "Toon",
    description: "Cel-shaded cartoon outline.",
  },
  {
    id: "matcap",
    title: "Matcap",
    description: "Baked-lighting stylized look.",
  },
  {
    id: "wobble",
    title: "Wobble",
    description: "Gooey jelly wobble animation.",
  },
  {
    id: "glitch",
    title: "Glitch",
    description: "Digital RGB-shift glitch.",
  },
  {
    id: "pixel",
    title: "Pixel",
    description: "Retro pixelated CRT look.",
  },
];

const optionsForId = (id: string) => {
  if (id == "glow") {
    return {
      bloomIntensity: 1.5,
      chromaticAberration: 0.001,
    };
  }

  if (id == "distort") {
    return {
      bloomIntensity: 1.5,
      chromaticAberration: 0.001,
      distortSpeed: 5,
    };
  }

  if (id == "chrome") {
    return { roughness: 0.1 };
  }

  if (id == "gold") {
    return { roughness: 0.25 };
  }

  if (id == "holographic") {
    return { iridescenceIOR: 1.8, roughness: 0.2 };
  }

  if (id == "neon") {
    return { glowIntensity: 2.5, color: "#39ff14" };
  }

  if (id == "toon") {
    return { color: "#ff6090", outlineThickness: 0.025 };
  }

  if (id == "wobble") {
    return { factor: 0.6, speed: 1 };
  }

  if (id == "pixel") {
    return { granularity: 8 };
  }

  return {};
};

export default function EditorPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [text, setText] = useState("Glass");
  const [duration] = useState(2000);
  const [isRecording, setIsRecording] = useState(false);
  const [size] = useState(1024);
  const { width, height, setResolution } = useResolutionStore();
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<object>(optionsForId(items[0].id));
  const { startRecording } = useCanvasRecorder("maincanvas");
  const { downloadImage } = useCanvasImageDownloader("maincanvas");

  const textId = items[selectedIndex].id;

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    setOptions(optionsForId(items[index].id));
  };

  const handleSelectById = (id: string) => {
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) handleSelect(index);
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
      <div className="relative w-screen h-screen bg-white dark:bg-black pt-15">
        <Sidebar
          mobileOnly
          effects={items}
          selectedEffectId={textId}
          onSelectEffect={handleSelectById}
        />
        <div className="absolute left-0 top-15 bottom-0 z-10 hidden w-32 sm:w-44 lg:block">
          <CircularSelect
            items={items}
            value={selectedIndex}
            onChange={handleSelect}
          />
        </div>
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <main className="flex flex-col p-6 justify-center items-center gap-2">
            <div className="flex w-full justify-center p-4">
              <Render
                textId={textId}
                text={text}
                size={size}
                options={options}
                isRender={false}
              />
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
