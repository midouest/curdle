import { useRef, useState } from "react";
import { useMount } from "./useMount";

interface Size {
  width: number;
  height: number;
}

export function useWindowSize(): Size {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const observerRef = useRef(
    new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    })
  );

  useMount(() => {
    const observer = observerRef.current;
    observer.observe(document.body);
    return () => observer.disconnect();
  });

  return size;
}
