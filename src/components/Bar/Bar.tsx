import React, { useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";

const StyledBar = styled.div`
  grid-area: bar;
  width: 100%;
  height: 4rem;
  background-color: lightgray;
  box-shadow: inset 0 0 10px #000000;
  border: 4px solid black;
  border-radius: 2rem;
`;

interface CanvasProps {
  setContextRef(context: CanvasRenderingContext2D | null): void;
}

const Canvas: React.FC<CanvasProps> = React.memo(({ setContextRef, children }) => {
  const { width, height, ref } = useResizeDetector();

  return (
    <StyledBar ref={ref}>
      <canvas
        ref={(node) => (node ? setContextRef(node.getContext("2d")) : null)}
        width={width}
        height={height}
      >
        {children}
      </canvas>
    </StyledBar>
  );
});

const useAnimateCircle = (speed: number, startX: number, endX: number) => {
  const [xValue, setXValue] = useState(0);
  const [rAF, setRAF] = useState<number | null>(null);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const updateAnimationState = () => {
    if (direction === "forward") {
      if ((xValue + speed) > (endX - 64)) {
        setXValue(endX - 64);
        setDirection("backward");
      } else {
        setXValue((prevState) => (prevState + speed));
      }
    } else if (direction === "backward") {
      if ((xValue - speed) < startX) {
        setXValue(startX);
        setDirection("forward");
      } else {
        setXValue((prevState) => prevState - speed);
      }
    }
    setRAF(requestAnimationFrame(updateAnimationState));
  };

  useEffect(() => {
    setRAF(requestAnimationFrame(updateAnimationState));
    return () => cancelAnimationFrame(rAF as number);
  }, [xValue, speed, startX, endX]);

  return xValue;
};

const Circle: React.FC = () => {
  const [contextRef, setContextRef] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);

  const x = useAnimateCircle(2, 0, canvasWidth);

  const saveContextRef = (context: CanvasRenderingContext2D) => {
    setContextRef(context);
    setCanvasWidth(context.canvas.width);
  };

  useEffect(() => {
    if (contextRef) {
      contextRef.clearRect(0, 0, canvasWidth, contextRef.canvas.height);
      contextRef.fillStyle = "#000000";
      const circle = new Path2D();
      circle.arc(32 + x, 32, 32, 0, 2 * Math.PI);
      contextRef.fill(circle);
    }
  }, [contextRef, canvasWidth, x]);

  return (
    <Canvas setContextRef={saveContextRef} />
  );
};

export default Circle;
