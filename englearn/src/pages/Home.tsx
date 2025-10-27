import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="grid gap-6">
      <section className="rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-8 text-white">
        <h1 className="text-3xl font-bold">Learn English the friendly way</h1>
        <p className="mt-2 text-indigo-100">Practice lessons, vocabulary, speaking, and quizzes — all in one place.</p>
        <Button asChild className="mt-4 bg-white text-indigo-700 hover:opacity-90">
          <Link to="/lessons">Start Learning</Link>
        </Button>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to EngLearn</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Use the navigation to explore lessons and practice modules.</p>
        </CardContent>
      </Card>
    </div>
  )
}