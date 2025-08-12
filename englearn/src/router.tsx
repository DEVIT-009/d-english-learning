import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppShell } from "@/components/layout/app-shell"
import Home from "@/pages/Home"
import Lessons from "@/pages/Lessons"
import Practice from "@/pages/Practice"
import Speak from "@/pages/Speak"
import Vocab from "@/pages/Vocab"
import Quiz from "@/pages/Quiz"
import Progress from "@/pages/Progress"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="lessons" element={<Lessons />} />
          <Route path="practice" element={<Practice />} />
          <Route path="speak" element={<Speak />} />
          <Route path="vocab" element={<Vocab />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="progress" element={<Progress />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}