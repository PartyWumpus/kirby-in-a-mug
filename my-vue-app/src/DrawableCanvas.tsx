import * as fabric from "fabric"; // v6
import { useEffect, useRef, useState } from "react";

export const FabricJSCanvas = (props: { onTimeout: () => void }) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas>(null);
  const [time, setTime] = useState(15);
  useEffect(() => {
    const interval = setInterval(() => setTime(time - 1), 500);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const colours = ["#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"];

    let keys = Object.keys(colours);
    const idx = keys[(keys.length * Math.random()) << 0];
    const canvas = new fabric.Canvas(canvasEl.current, {
      isDrawingMode: true,
      backgroundColor: colours[idx],
    });

    keys = keys.filter((item) => item !== idx);

    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

    canvas.freeDrawingBrush.width = 1;
    canvas.freeDrawingBrush.color =
      colours[keys[(keys.length * Math.random()) << 0]];
    fabricCanvas.current = canvas;
    return () => {
      canvas.dispose();
    };
  }, []);

  if (time == 0) {
    (async () => {
      const result = await fabricCanvas.current?.toBlob({
        format: "png",
        multiplier: 2,
      });
      globalThis.wawa(result);
      props.onTimeout();
    })();
  }

  return (
    <>
      {time}
      <canvas width="100px" height="100px" ref={canvasEl} />
    </>
  );
};
