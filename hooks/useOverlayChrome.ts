"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { pauseSmoothScroll, resumeSmoothScroll } from "@/components/smoothScrollControl";

type UseOverlayChromeOptions = {
  /** Whether the overlay (menu / dialog) is currently open. */
  active: boolean;
  /** The overlay's own container — Tab is trapped to its focusable children. */
  panelRef: RefObject<HTMLElement | null>;
  /** Focused once, right after the overlay opens. */
  initialFocusRef: RefObject<HTMLElement | null>;
  /** Focused once the overlay has fully closed (after `inert` is cleared). */
  restoreFocusRef: RefObject<HTMLElement | null>;
  /** Called on Escape; the caller is responsible for actually closing. */
  onEscape: () => void;
  /**
   * CSS selectors for the rest-of-page landmarks to mark `inert` while open.
   * Pass a module-level constant array, not an inline literal, so the
   * reference is stable across renders.
   */
  inertSelectors: string[];
};

// Shared behavior for the two full-screen overlays on this site (the mobile
// menu and the legal dialog): locks page scroll, pauses Lenis, marks the
// rest of the page `inert`, traps Tab inside the panel, closes on Escape,
// and restores focus to the trigger element once `inert` is cleared again
// (doing it in this same cleanup, after the `inert` reset above it, avoids
// focusing an element that's still inert and therefore unfocusable).
export function useOverlayChrome({
  active,
  panelRef,
  initialFocusRef,
  restoreFocusRef,
  onEscape,
  inertSelectors,
}: UseOverlayChromeOptions) {
  useEffect(() => {
    if (!active) return;

    const inertEls = inertSelectors
      .map((selector) => document.querySelector<HTMLElement>(selector))
      .filter((el): el is HTMLElement => el !== null);

    // Captured now: for both call sites, `.current` is set once right
    // before the overlay opens and doesn't change again while it's open.
    const restoreFocusEl = restoreFocusRef.current;

    inertEls.forEach((el) => {
      el.inert = true;
    });
    document.documentElement.classList.add("modalOpen");
    pauseSmoothScroll();
    initialFocusRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      inertEls.forEach((el) => {
        el.inert = false;
      });
      document.documentElement.classList.remove("modalOpen");
      resumeSmoothScroll();
      window.removeEventListener("keydown", onKeyDown);
      restoreFocusEl?.focus();
    };
  }, [active, panelRef, initialFocusRef, restoreFocusRef, onEscape, inertSelectors]);
}
