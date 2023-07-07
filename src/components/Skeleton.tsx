export default function Skeleton({ width = "100%" }: { width?: string }) {
  return (
    <div
      className={`flex max-w-full h-4 ${width} rounded-lg bg-light-skeleton-gradient dark:bg-skeleton-gradient animate-left-to-right`}
    ></div>
  );
}
