import { useAppSelector } from "../hooks/useAppStore";
import { useMemo, useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ProfileCardSkeleton,
  QuickActionsSkeleton,
} from "../components/Skeleton";
import { ProgressCard } from "../components/learning/ProgressCard";
import { StreakBadge } from "../components/learning/StreakBadge";
import { RecommendedList } from "../components/learning/RecommendedList";

export default function Dashboard() {
  const name = useAppSelector((s) => s.auth.name) || "User";
  const email = useAppSelector((s) => s.auth.email) || "user@example.com";
  const [loading, setLoading] = useState(true);

  const chartData = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        month: new Date(2025, i, 1).toLocaleString("en", { month: "short" }),
        value: Math.round(50 + Math.random() * 100),
      })),
    []
  );

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-4">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          <ProfileCardSkeleton />
          <QuickActionsSkeleton />
        </div>
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-2 h-5 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-64 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Profile card */}
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4 p-4">
            <div className="h-16 w-16 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
            <div>
              <div className="text-lg font-medium">{name}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {email}
              </div>
            </div>
          </div>
        </div>

        {/* Progress + Streak */}
        <div className="space-y-3">
          <ProgressCard percent={68} subtitle="Keep it up!" />
          <StreakBadge days={5} />
        </div>
      </div>

      {/* Recent activity (chart) */}
      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-2 font-medium">Monthly Activity</div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="currentColor"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="currentColor" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--tw-prose-body)",
                  border: "1px solid var(--tw-prose-hr)",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                fill="url(#grad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recommended lessons */}
      <RecommendedList
        items={[
          { id: "l-1", title: "Present Simple", meta: "Grammar • 10 min" },
          { id: "l-2", title: "Food Vocabulary", meta: "Vocabulary • 8 min" },
          { id: "l-3", title: "Ordering at a Cafe", meta: "Speaking • 12 min" },
        ]}
      />
    </div>
  );
}
