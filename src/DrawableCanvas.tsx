import * as fabric from "fabric"; // v6
import { useEffect, useRef, useState } from "react";
import { Progress } from "./App";

export const FabricJSCanvas = (props: { onTimeout: () => void }) => {
  const maxTime = 15
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const fabricCanvas = useRef<fabric.Canvas>(null);
  const [time, setTime] = useState(maxTime);
  useEffect(() => {
    const interval = setInterval(() => setTime(time - 0.1), 100);
    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    if (time <= 0) {
      (async () => {
        const result = await fabricCanvas.current?.toBlob({
          format: "png",
          multiplier: 2,
        });
        globalThis.wawa(result);
        props.onTimeout();
      })();
    }
  }, [time, props]);

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

  return (
    <>
      <Progress max={maxTime} current={time}/>
      <canvas width="100px" height="100px" ref={canvasEl} />
    </>
  );
};
