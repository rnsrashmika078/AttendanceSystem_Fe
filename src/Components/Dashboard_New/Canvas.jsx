import { useState, useRef, useEffect } from "react";

const DragCanvas = () => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      ctx.fillRect(position.x, position.y, 100, 100);
    };

    draw();
  }, [position]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const { offsetLeft, offsetTop } = canvas;
    const x = e.clientX - offsetLeft;
    const y = e.clientY - offsetTop;

    // Check if mouse is inside the square
    if (
      x >= position.x &&
      x <= position.x + 100 &&
      y >= position.y &&
      y <= position.y + 100
    ) {
      setIsDragging(true);
      setOffset({ x: x - position.x, y: y - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const { offsetLeft, offsetTop } = canvas;
      const x = e.clientX - offsetLeft;
      const y = e.clientY - offsetTop;
      setPosition({ x: x - offset.x, y: y - offset.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ border: "1px solid black" }}
    />
  );
};

export default DragCanvas;
