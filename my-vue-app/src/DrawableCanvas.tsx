import * as fabric from "fabric"; // v6
import { useEffect, useRef, useState } from "react";

export const FabricJSCanvas = () => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas>(null);
  const [time, setTime] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => setTime(time - 1), 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const options = {};
    const canvas = new fabric.Canvas(canvasEl.current, { isDrawingMode: true });

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.freeDrawingBrush.width = 1;
    canvas.freeDrawingBrush.color = "#ff0000";
    fabricCanvas.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, []);

  if (time == 0) {
    const result = fabricCanvas.current?.toBlob({
        format: "png",
        multiplier: 2,
      })
    globalThis.wawa(result)
  }

  return (
    <>
      {time}
      <canvas width="100px" height="100px" ref={canvasEl} />
    </>
  );
};
