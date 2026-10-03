const FADE =
  "radial-gradient(ellipse 80% 70% at 50% 30%, #000 40%, transparent 100%)";

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: FADE,
        WebkitMaskImage: FADE,
      }}
    />
  );
}
