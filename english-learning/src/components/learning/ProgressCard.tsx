type ProgressCardProps = {
  title?: string;
  percent: number;
  subtitle?: string;
};

export function ProgressCard({
  title = "Learning Progress",
  percent,
  subtitle,
}: ProgressCardProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-medium">{title}</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          {clamped}%
        </div>
      </div>
      <div className="h-2 w-full overflow-hidden rounded bg-zinc-200 dark:bg-zinc-800">
        <div className="h-full bg-blue-600" style={{ width: `${clamped}%` }} />
      </div>
      {subtitle && (
        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          {subtitle}
        </div>
      )}
    </div>
  );
}

