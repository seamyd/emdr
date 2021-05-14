import React, { useEffect, useRef, useState } from "react";
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

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  draw(): void;
  setX(amount: number): void;
  setColor(color: string): void;
}

function circleFactory(
  context: CanvasRenderingContext2D,
): Circle {
  return ({
    x: 32,
    y: 32,
    radius: 32,
    color: "#000",
    draw() {
      context.fillStyle = this.color;
      const circle = new Path2D();
      circle.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      context.fill(circle);
    },
    setX(amount: number) {
      this.x = amount;
    },
    setColor(color: string) {
      this.color = color;
    },
  });
}

const CircleAnimation: React.FC<{speed: number, color: string}> = ({ speed, color }) => {
  const [contextRef, setContextRef] = useState<CanvasRenderingContext2D | null>(null);
  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);
  const rAF = useRef<number>(0);
  const direction = useRef<"forward" | "backward">("forward");

  const saveContextRef = (context: CanvasRenderingContext2D) => {
    setContextRef(context);
    setCanvasWidth(context.canvas.width);
    setCanvasHeight(context.canvas.height);
  };

  useEffect(() => {
    if (contextRef) {
      const circle = circleFactory(contextRef);
      circle.setColor(color);
      circle.draw();
      const animate = () => {
        contextRef.clearRect(0, 0, canvasWidth, canvasHeight);
        circle.draw();
        if (direction.current === "forward") {
          if ((circle.x + speed) > (canvasWidth - circle.radius)) {
            circle.setX(canvasWidth - circle.radius);
            direction.current = "backward";
          } else {
            circle.setX(circle.x + speed);
          }
        } else if (direction.current === "backward") {
          if ((circle.x - speed) < circle.radius) {
            circle.setX(circle.radius);
            direction.current = "forward";
          } else {
            circle.setX(circle.x - speed);
          }
        }
        rAF.current = window.requestAnimationFrame(animate);
      };
      rAF.current = window.requestAnimationFrame(animate);
    }
    return () => window.cancelAnimationFrame(rAF.current);
  }, [contextRef, canvasWidth, color, speed]);

  return (
    <Canvas setContextRef={saveContextRef} />
  );
};

export default CircleAnimation;
