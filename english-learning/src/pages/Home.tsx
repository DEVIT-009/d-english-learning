export default function Home() {
  return (
    <div className="p-4">
      {/* Hero */}
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Master English with confidence
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
          Personalized courses, quizzes, and practice sessions to help you
          improve your grammar, vocabulary, speaking, and listening.
        </p>
        <div className="mt-5 flex justify-center gap-3">
          <a
            href="/dashboard"
            className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            Start Learning
          </a>
          <a
            href="/quizzes"
            className="rounded-md border border-zinc-200 px-4 py-2 font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Take Test
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Grammar", href: "/courses" },
          { label: "Vocabulary", href: "/vocabulary" },
          { label: "Speaking", href: "/speaking" },
          { label: "Listening", href: "/listening" },
        ].map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="rounded-lg border border-zinc-200 p-4 text-center hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <div className="text-sm font-medium">{c.label}</div>
          </a>
        ))}
      </section>
    </div>
  );
}
