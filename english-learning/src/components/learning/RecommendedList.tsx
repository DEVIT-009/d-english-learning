type Item = { id: string; title: string; meta?: string };

export function RecommendedList({
  items,
  title = "Recommended for you",
}: {
  items: Item[];
  title?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-2 font-medium">{title}</div>
      {items.length === 0 ? (
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          No recommendations yet.
        </div>
      ) : (
        <ul className="divide-y divide-zinc-200 text-sm dark:divide-zinc-800">
          {items.map((it) => (
            <li key={it.id} className="flex items-center justify-between py-2">
              <div>
                <div className="font-medium">{it.title}</div>
                {it.meta && (
                  <div className="text-zinc-600 dark:text-zinc-300">
                    {it.meta}
                  </div>
                )}
              </div>
              <button className="rounded-md border border-zinc-200 px-2 py-1 text-xs hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Start
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

