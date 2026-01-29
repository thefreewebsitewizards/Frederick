import { Outlet, useLocation } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith("/admin")

  return (
    <div className="bg-background-light dark:bg-background-dark text-[#160c1d] dark:text-[#f7f5f8] font-display overflow-x-hidden flex flex-col min-h-screen">
      {isAdminRoute ? null : <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
      {isAdminRoute ? null : <Footer />}
    </div>
  )
}

export default App
