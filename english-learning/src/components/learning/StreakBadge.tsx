type StreakBadgeProps = {
  days: number;
};

export function StreakBadge({ days }: StreakBadgeProps) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/50 dark:text-amber-300">
      <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
      <span className="text-sm font-medium">{days}-day streak</span>
    </div>
  );
}

