import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
  fadeOut?: boolean;
  children: ReactNode;
}

export const Toast = ({ fadeOut, children }: ToastProps) => {
  const elementRef = useRef(document.getElementById("toast")!);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (fadeOut) {
      const timeoutId = setTimeout(() => setFading(true), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [fadeOut, setFading]);

  return createPortal(
    <div className={`Toast ${fading ? "fade" : ""}`}>{children}</div>,
    elementRef.current
  );
};
