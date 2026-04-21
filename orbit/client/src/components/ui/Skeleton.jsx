export function SkeletonBlock({ height = 40, width = "100%", radius = 8 }) {
  return (
    <div
      className="skeleton"
      style={{ height, width, borderRadius: radius }}
    />
  );
}

export function SkeletonRows({ count = 6 }) {
  return (
    <div style={{ 
      padding: "24px", 
      display: "flex", 
      flexDirection: "column", 
      gap: "12px" 
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock key={i} height={40} radius={6} />
      ))}
    </div>
  );
}

export function SkeletonChart({ height = 220 }) {
  return <SkeletonBlock height={height} />;
}
