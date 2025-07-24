import { useCallback } from "react";

export const useCanvasImageDownloader = (canvasId: string) => {
  const downloadImage = useCallback(
    (filename: string = "canvas-capture.png") => {
      const canvas = document.querySelector(
        `#${canvasId} > div > canvas`
      ) as HTMLCanvasElement;

      if (!canvas) {
        console.error("Canvas element not found.");
        return;
      }

      const url = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    [canvasId]
  );

  return { downloadImage };
};
