"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, summary, input, textarea, select, [role='button'], [role='tab']";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const positionRef = useRef({ x: -40, y: -40 });
  const [interactive, setInteractive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const paint = () => {
      frameRef.current = null;
      cursorRef.current?.style.setProperty(
        "transform",
        `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`,
      );
    };
    const move = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY };
      setVisible(true);
      if (frameRef.current === null) frameRef.current = requestAnimationFrame(paint);
    };
    const updateTarget = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      setInteractive(Boolean(target?.closest(INTERACTIVE_SELECTOR)));
    };
    const hide = () => setVisible(false);
    const press = () => setPressed(true);
    const release = () => setPressed(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", updateTarget, { passive: true });
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("blur", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", updateTarget);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("blur", hide);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div ref={cursorRef} className={`custom-cursor${visible ? " is-visible" : ""}${interactive ? " is-interactive" : ""}${pressed ? " is-pressed" : ""}`} aria-hidden="true">
      <span />
    </div>
  );
}
