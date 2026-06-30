"use client";

import { useEffect, useState } from "react";

export default function CursorReticle() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Check if device supports touch only
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => {
      setClicked(true);
    };

    const handleMouseUp = () => {
      setClicked(false);
    };

    // Track when hovering over clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.onclick ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "20px",
        height: "20px",
        transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
        pointerEvents: "none",
        zIndex: 10000,
        transition: "transform 0.05s linear, opacity 0.2s ease, width 0.2s ease, height 0.2s ease",
        opacity: visible ? 1 : 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Horizontal Crosshair Line */}
      <div
        style={{
          position: "absolute",
          width: hovered ? "24px" : "14px",
          height: "1px",
          backgroundColor: clicked ? "var(--text-primary)" : "var(--accent-primary)",
          transition: "width 0.2s ease, background-color 0.1s ease",
        }}
      />
      {/* Vertical Crosshair Line */}
      <div
        style={{
          position: "absolute",
          width: "1px",
          height: hovered ? "24px" : "14px",
          backgroundColor: clicked ? "var(--text-primary)" : "var(--accent-primary)",
          transition: "height 0.2s ease, background-color 0.1s ease",
        }}
      />
      {/* Center Target Dot */}
      <div
        style={{
          position: "absolute",
          width: "3px",
          height: "3px",
          borderRadius: "50%",
          backgroundColor: clicked ? "var(--text-primary)" : "var(--accent-primary)",
          opacity: hovered ? 0.3 : 1,
          transition: "opacity 0.2s ease",
        }}
      />
      {/* Outer Reticle Ring */}
      <div
        style={{
          position: "absolute",
          width: hovered ? "16px" : "8px",
          height: hovered ? "16px" : "8px",
          border: `1px solid ${clicked ? "var(--text-primary)" : "var(--accent-primary)"}`,
          borderRadius: "50%",
          opacity: hovered ? 0.6 : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
    </div>
  );
}
