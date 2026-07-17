"use client";

import { useEffect, useRef } from "react";

type NetworkPoint = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  velocityX: number;
  velocityY: number;
  depth: number;
  size: number;
};

const CONNECTION_DISTANCE = 188;
const CURSOR_RADIUS = 280;

export default function HeroSpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".hero");
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)");
    const staticExperience = reducedMotion.matches || coarsePointer.matches;

    let width = 0;
    let height = 0;
    let density = 1;
    let animationFrame = 0;
    let pointerFrame = 0;
    let isVisible = true;
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let pendingMouseX = 0;
    let pendingMouseY = 0;
    let points: NetworkPoint[] = [];

    const seededRandom = (() => {
      let seed = 7419;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    })();

    const makePoints = () => {
      const count = Math.max(56, Math.min(92, Math.round((width * height) / 10800)));
      points = Array.from({ length: count }, () => {
        const x = seededRandom() * width;
        const y = 106 + seededRandom() * Math.max(1, height - 106);
        return {
          x,
          y,
          originX: x,
          originY: y,
          velocityX: (seededRandom() - 0.5) * 0.18,
          velocityY: (seededRandom() - 0.5) * 0.18,
          depth: 0.35 + seededRandom() * 0.75,
          size: 0.75 + seededRandom() * 1.35,
        };
      });
    };

    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      density = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      mouseX = width / 2;
      mouseY = height / 2;
      makePoints();
    };

    const movePoints = () => {
      const horizontalParallax = isHovering ? (mouseX / width - 0.5) * 20 : 0;
      const verticalParallax = isHovering ? (mouseY / height - 0.5) * 14 : 0;

      for (const point of points) {
        point.originX += point.velocityX;
        point.originY += point.velocityY;

        if (point.originX < -20) point.originX = width + 20;
        if (point.originX > width + 20) point.originX = -20;
        if (point.originY < 96) point.originY = height + 12;
        if (point.originY > height + 20) point.originY = 106;

        let cursorPullX = 0;
        let cursorPullY = 0;

        if (isHovering) {
          const deltaX = mouseX - point.originX;
          const deltaY = mouseY - point.originY;
          const distance = Math.hypot(deltaX, deltaY);

          if (distance < CURSOR_RADIUS) {
            const influence = (1 - distance / CURSOR_RADIUS) ** 2;
            cursorPullX = deltaX * influence * 0.085;
            cursorPullY = deltaY * influence * 0.085;
          }
        }

        const targetX = point.originX + horizontalParallax * point.depth + cursorPullX;
        const targetY = point.originY + verticalParallax * point.depth + cursorPullY;
        point.x += (targetX - point.x) * 0.075;
        point.y += (targetY - point.y) * 0.075;
      }
    };

    const drawNetwork = () => {
      context.clearRect(0, 0, width, height);

      for (let firstIndex = 0; firstIndex < points.length; firstIndex += 1) {
        const first = points[firstIndex];

        for (let secondIndex = firstIndex + 1; secondIndex < points.length; secondIndex += 1) {
          const second = points[secondIndex];
          const distance = Math.hypot(first.x - second.x, first.y - second.y);
          if (distance > CONNECTION_DISTANCE) continue;

          const midpointX = (first.x + second.x) / 2;
          const midpointY = (first.y + second.y) / 2;
          const cursorDistance = isHovering ? Math.hypot(mouseX - midpointX, mouseY - midpointY) : CURSOR_RADIUS;
          const cursorEmphasis = Math.max(0, 1 - cursorDistance / CURSOR_RADIUS);
          const alpha = (1 - distance / CONNECTION_DISTANCE) * (0.22 + cursorEmphasis * 0.38);

          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = cursorEmphasis > 0.08
            ? `rgba(190, 31, 43, ${alpha})`
            : `rgba(117, 42, 49, ${alpha * 0.72})`;
          context.lineWidth = 0.7 + cursorEmphasis * 0.35;
          context.stroke();
        }
      }

      for (const point of points) {
        const cursorDistance = isHovering ? Math.hypot(mouseX - point.x, mouseY - point.y) : CURSOR_RADIUS;
        const cursorEmphasis = Math.max(0, 1 - cursorDistance / CURSOR_RADIUS);
        context.beginPath();
        context.arc(point.x, point.y, point.size + cursorEmphasis * 0.75, 0, Math.PI * 2);
        context.fillStyle = cursorEmphasis > 0.06
          ? `rgba(216, 32, 43, ${0.28 + cursorEmphasis * 0.48})`
          : "rgba(142, 45, 54, 0.34)";
        context.fill();
      }
    };

    const render = () => {
      if (!isVisible) {
        animationFrame = 0;
        return;
      }

      if (!staticExperience) movePoints();
      drawNetwork();

      if (!staticExperience) animationFrame = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pendingMouseX = x;
      pendingMouseY = y;

      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(() => {
          mouseX = pendingMouseX;
          mouseY = pendingMouseY;
          pointerFrame = 0;
        });
      }
    };

    const handleMouseEnter = () => {
      isHovering = true;
      canvas.classList.add("is-active");
    };

    const handleMouseLeave = () => {
      isHovering = false;
      canvas.classList.remove("is-active");
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !staticExperience && !animationFrame) animationFrame = window.requestAnimationFrame(render);
    });

    resizeCanvas();
    drawNetwork();
    resizeObserver.observe(hero);
    visibilityObserver.observe(hero);

    if (!staticExperience) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseenter", handleMouseEnter);
      hero.addEventListener("mouseleave", handleMouseLeave);
      animationFrame = window.requestAnimationFrame(render);
    }

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseenter", handleMouseEnter);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-network-canvas" aria-hidden="true" />;
}
