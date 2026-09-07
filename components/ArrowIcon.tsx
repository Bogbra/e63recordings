export function ArrowIcon({ direction = "external" }: { direction?: "down" | "external" }) {
  const d = direction === "down" ? "M12 4v16M12 20l-6-6M12 20l6-6" : "M7 17L17 7M9 7h8v8";
  return (
    <svg className="arrowIcon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
