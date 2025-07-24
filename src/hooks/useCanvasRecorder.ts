import { useState, useCallback, useRef } from "react";

export const useCanvasRecorder = (canvasId: string) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  const handleDownload = useCallback(() => {
    if (recordedChunksRef.current.length === 0) {
      console.error("No data recorded.");
      return;
    }
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "r3f-canvas-recording.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    recordedChunksRef.current = [];
  }, []);

  const startRecording = useCallback(
    (durationInMs: number) => {
      const canvas = document.querySelector(
        `#${canvasId} > div > canvas`
      ) as HTMLCanvasElement;
      if (!canvas || isRecording) {
        console.error("Canvas element not found or already recording.");
        return;
      }

      const options = {
        mimeType: "",
      };

      const MimeTypes = [
        "video/webm;codecs=vp9",
        "video/webm;codecs=vp8",
        "video/webm",
      ];

      const supportedMimeType = MimeTypes.find((type) =>
        MediaRecorder.isTypeSupported(type)
      );

      if (!supportedMimeType) {
        console.error("No supported MIME type found for MediaRecorder");
        return;
      }

      options.mimeType = supportedMimeType;
      setIsRecording(true);
      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, options);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data.size > 0) {
          recordedChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        handleDownload();
        setIsRecording(false);
      };

      recorder.start();

      setTimeout(() => {
        if (mediaRecorderRef.current?.state === "recording") {
          mediaRecorderRef.current.stop();
        }
      }, durationInMs);
    },
    [canvasId, isRecording, handleDownload]
  );

  return { isRecording, startRecording };
};
