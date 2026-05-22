"use client";

// Spline integration removed — scene URLs require creator to publish publicly.
// Replace `scene` prop with a valid public Spline URL if you create your own scene.
// See: https://spline.design → Share → "Make public"

export function SplineScene({ className }: { scene: string; className?: string }) {
  return (
    <div className={className} />
  );
}
