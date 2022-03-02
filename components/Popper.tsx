import { useEffect, useState } from "react";

export interface PopperOptions {
  parentRect?: DOMRect;
}

export default function usePopper(options: PopperOptions = {}) {
  const [popper, setPoppper] = useState<HTMLElement | null>(null);
  const [popperTarget, setPoppperTarget] = useState<HTMLElement | null>(null);

  useEffect(change, [popper, popperTarget, options.parentRect]);

  function change() {
    if (!popper) return;
    if (!popperTarget) return;
    attach();
    update();
    return detach;
  }

  function update() {
    if (!popper) return;
    if (!popperTarget) return;

    const sourceRect = popper.getBoundingClientRect();
    const targetRect = popperTarget.getBoundingClientRect();
    const parentRect =
      options.parentRect ||
      new DOMRect(0, 0, window.innerWidth, window.innerHeight);

    let x = targetRect.left;
    let y = targetRect.bottom;

    if (x < parentRect.left) x = parentRect.left;
    if (y < parentRect.top) y = parentRect.top;
    if (x + sourceRect.width > parentRect.right)
      x = parentRect.right - sourceRect.width;
    if (y + sourceRect.height > parentRect.bottom)
      y = parentRect.bottom - sourceRect.height;

    popper.style.left = `${x}px`;
    popper.style.top = `${y}px`;
  }

  function attach() {
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update);
  }

  function detach() {
    window.removeEventListener("resize", update);
    document.removeEventListener("scroll", update);
  }

  return {
    setPoppper: (v: any) => {
      setPoppper(v);
    },
    setPoppperTarget: (v: any) => {
      setPoppperTarget(v);
    },
  };
}
