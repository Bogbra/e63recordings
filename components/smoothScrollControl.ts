// Typed pause/resume signal for the Lenis instance owned by SmoothScroll.tsx.
// It's a window CustomEvent rather than a prop/context because the caller
// (e.g. a modal opening) and SmoothScroll are unrelated siblings in the tree —
// these helpers just keep the event names in one place instead of repeated
// string literals at each call site.
const PAUSE_EVENT = "smoothscroll:pause";
const RESUME_EVENT = "smoothscroll:resume";

export function pauseSmoothScroll() {
  window.dispatchEvent(new Event(PAUSE_EVENT));
}

export function resumeSmoothScroll() {
  window.dispatchEvent(new Event(RESUME_EVENT));
}

export function onSmoothScrollPause(handler: () => void) {
  window.addEventListener(PAUSE_EVENT, handler);
  return () => window.removeEventListener(PAUSE_EVENT, handler);
}

export function onSmoothScrollResume(handler: () => void) {
  window.addEventListener(RESUME_EVENT, handler);
  return () => window.removeEventListener(RESUME_EVENT, handler);
}
