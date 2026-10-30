export const ICONS = {
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z",
  synergy: "M8 7a4 4 0 1 0 0 8a4 4 0 0 0 0-8ZM16 7a4 4 0 1 0 0 8a4 4 0 0 0 0-8Z",
  growth: "M3 17l6-6 4 4 8-8M15 7h6v6",
  consulting: "M3 8h18v12H3zM8 8V5h8v3M3 13h18",
  shield: "M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6l-8-3ZM9 12l2 2 4-4",
  server: "M3 4h18v6H3zM3 14h18v6H3zM7 7h.01M7 17h.01",
};

export default function Icon({ name, className = "h-6 w-6" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={ICONS[name]} />
    </svg>
  );
}
