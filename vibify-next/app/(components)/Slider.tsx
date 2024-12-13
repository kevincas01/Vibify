import React, { useRef, useState } from "react";

interface SliderProps {
  maxMs: number;
  currentMs: number;
}

const Slider = ({ maxMs, currentMs }: SliderProps) => {
  const [dragging, setDragging] = useState(false); // To track if dragging is happening
  const [currentTime, setCurrentTime] = useState(0); // Current position in ms
  const [hoverPosition, setHoverPosition] = useState<number | null>(null); // To track the hover position
  const progressBarRef = useRef<HTMLDivElement | null>(null); // Reference to the progress bar div

  // Function to calculate position based on the mouse position
  const calculatePosition = (event: MouseEvent): number => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return 0;

    const progressBarRect = progressBar.getBoundingClientRect();
    const x = event.clientX - progressBarRect.left; // Mouse X position relative to the bar

    // Calculate the progress (percentage) and convert it to time in ms
    const percentage = Math.min(Math.max(x / progressBarRect.width, 0), 1);
    return percentage * maxMs;
  };

  // Mouse down handler
  const handleMouseDown = (event: React.MouseEvent): void => {
    setDragging(true);
    const newPosition = calculatePosition(event.nativeEvent);
    setCurrentTime(newPosition);
  };

  // Mouse move handler (only when dragging or hovering)
  const handleMouseMove = (event: React.MouseEvent): void => {
    if (!dragging) {
      const newHoverPosition = calculatePosition(event.nativeEvent);
      setHoverPosition(newHoverPosition);
    } else {
      const newPosition = calculatePosition(event.nativeEvent);
      setCurrentTime(newPosition);
    }
  };

  // Mouse up handler (to stop dragging)
  const handleMouseUp = (): void => {
    setDragging(false);
  };



  return (
    <>
      {currentMs}
      <div
        className="progress-bar-container group-hover:bg-main rounded-full overflow-hidden cursor-pointer bg-"
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#e0e0e0",
          position: "relative",
        }}
        ref={progressBarRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* The progress bar */}
        <div
          className="h-full bg-main"
          style={{
            width: `${(currentTime / maxMs) * 100}%`, // Current progress in blue
          }}
        />
        
        {/* If hovering, show the hover portion in bg-main color */}
        {hoverPosition !== null && (
          <div
            className="h-full bg-main"
            style={{
              width: `${(hoverPosition / maxMs) * 100}%`, // Hover progress
            }}
          />
        )}

        {/* The draggable slider thumb */}
        <div
          className="h-6 w-6 absolute bg-white"
          style={{
            left: `${(currentTime / maxMs) * 100}%`,
          }}
        ></div>

      </div>
      {maxMs}
    </>
  );
};

export default Slider;
