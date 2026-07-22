import { useEffect, useRef } from "react";

type BackgroundPoint = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  velocityX: number;
  velocityY: number;
  depth: number;
  size: number;
};

const CONNECTION_DISTANCE = 220;
const CURSOR_RADIUS = 340;

export default function SiteBackgroundNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const brickGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const brickGlow = brickGlowRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !brickGlow || !context || window.matchMedia("(max-width: 700px)").matches) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const staticExperience = reducedMotion || coarsePointer;

    let width = 0;
    let height = 0;
    let density = 1;
    let animationFrame = 0;
    let pointerFrame = 0;
    let isDocumentVisible = !document.hidden;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let pendingMouseX = mouseX;
    let pendingMouseY = mouseY;
    let isHovering = false;
    let points: BackgroundPoint[] = [];

    const seededRandom = (() => {
      let seed = 13579;
      return () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
    })();

    const createPoints = () => {
      const count = Math.max(46, Math.min(78, Math.round((width * height) / 19000)));
      points = Array.from({ length: count }, () => {
        const x = seededRandom() * width;
        const y = seededRandom() * height;
        return { x, y, originX: x, originY: y, velocityX: (seededRandom() - 0.5) * 0.12, velocityY: (seededRandom() - 0.5) * 0.12, depth: 0.35 + seededRandom() * 0.7, size: 0.55 + seededRandom() * 0.85 };
      });
    };

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      density = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * density);
      canvas.height = Math.round(height * density);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      createPoints();
    };

    const movePoints = () => {
      const horizontalParallax = isHovering ? (mouseX / width - 0.5) * 28 : 0;
      const verticalParallax = isHovering ? (mouseY / height - 0.5) * 20 : 0;
      for (const point of points) {
        point.originX += point.velocityX;
        point.originY += point.velocityY;
        if (point.originX < -24) point.originX = width + 24;
        if (point.originX > width + 24) point.originX = -24;
        if (point.originY < -24) point.originY = height + 24;
        if (point.originY > height + 24) point.originY = -24;
        let cursorPullX = 0;
        let cursorPullY = 0;
        if (isHovering) {
          const deltaX = mouseX - point.originX;
          const deltaY = mouseY - point.originY;
          const distance = Math.hypot(deltaX, deltaY);
          if (distance < CURSOR_RADIUS) {
            const influence = (1 - distance / CURSOR_RADIUS) ** 2;
            cursorPullX = deltaX * influence * 0.065;
            cursorPullY = deltaY * influence * 0.065;
          }
        }
        const targetX = point.originX + horizontalParallax * point.depth + cursorPullX;
        const targetY = point.originY + verticalParallax * point.depth + cursorPullY;
        point.x += (targetX - point.x) * 0.065;
        point.y += (targetY - point.y) * 0.065;
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
          const alpha = (1 - distance / CONNECTION_DISTANCE) * (0.2 + cursorEmphasis * 0.5);
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = cursorEmphasis > 0.05 ? `rgba(216, 32, 43, ${alpha * 0.78})` : `rgba(213, 221, 228, ${alpha * 0.42})`;
          context.lineWidth = 0.65 + cursorEmphasis * 0.38;
          context.stroke();
        }
      }
      for (const point of points) {
        const cursorDistance = isHovering ? Math.hypot(mouseX - point.x, mouseY - point.y) : CURSOR_RADIUS;
        const cursorEmphasis = Math.max(0, 1 - cursorDistance / CURSOR_RADIUS);
        context.beginPath();
        context.arc(point.x, point.y, point.size + cursorEmphasis * 0.45, 0, Math.PI * 2);
        context.fillStyle = cursorEmphasis > 0.08 ? `rgba(229, 50, 61, ${0.2 + cursorEmphasis * 0.5})` : "rgba(226, 232, 237, 0.18)";
        context.fill();
      }
    };

    const render = () => {
      if (!isDocumentVisible) { animationFrame = 0; return; }
      if (!staticExperience) movePoints();
      drawNetwork();
      if (!staticExperience) animationFrame = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (staticExperience) return;
      pendingMouseX = event.clientX;
      pendingMouseY = event.clientY;
      isHovering = true;
      brickGlow.classList.add("is-active");
      if (!pointerFrame) {
        pointerFrame = window.requestAnimationFrame(() => {
          mouseX = pendingMouseX;
          mouseY = pendingMouseY;
          brickGlow.style.setProperty("--brick-glow-x", `${mouseX}px`);
          brickGlow.style.setProperty("--brick-glow-y", `${mouseY}px`);
          pointerFrame = 0;
        });
      }
    };

    const handleMouseLeave = () => { isHovering = false; brickGlow.classList.remove("is-active"); };
    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible && !staticExperience && !animationFrame) animationFrame = window.requestAnimationFrame(render);
    };

    resizeCanvas();
    drawNetwork();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (!staticExperience) animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <>
      <div ref={brickGlowRef} className="site-background-brick-glow" aria-hidden="true" />
      <canvas ref={canvasRef} className="site-background-network" aria-hidden="true" />
    </>
  );
}
