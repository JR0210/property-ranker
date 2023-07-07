export default function Skeleton({ width = 'w-full' }: { width?: string }) {
  return (
    <div
      className={`h-4 ${width} rounded-lg bg-light-skeleton-gradient dark:bg-skeleton-gradient animate-left-to-right`}
    ></div>
  );
}
