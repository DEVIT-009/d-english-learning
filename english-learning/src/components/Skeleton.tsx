// Unified primitives and skeletons
export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-800 ${className}`}
      {...props}
    />
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-t border-zinc-100 dark:border-zinc-800">
          <td className="px-3 py-2">
            <Skeleton className="h-4 w-24" />
          </td>
          <td className="px-3 py-2">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="px-3 py-2">
            <Skeleton className="h-4 w-16" />
          </td>
          <td className="px-3 py-2">
            <Skeleton className="h-4 w-20" />
          </td>
          <td className="px-3 py-2">
            <Skeleton className="h-10 w-10 rounded" />
          </td>
          <td className="px-3 py-2">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-12" />
              <Skeleton className="h-6 w-16" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-4 p-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    </div>
  );
}

export function QuickActionsSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <Skeleton className="mb-2 h-5 w-24" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}
