import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#e5ded0] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm shadow-sm">
      <div className="px-4 md:px-10 py-3 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="size-8 flex items-center justify-center">
            <img alt="Black Eagle Archery logo" className="h-8 w-8 object-contain" src="/logo.png" />
          </div>
          <h2 className="text-[#160c1d] dark:text-white text-xl font-bold tracking-tight">Black Eagle Archery</h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/">Home</Link>
          <Link className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/products">Shop</Link>
          <Link className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/about">About Freddie</Link>
          <Link className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/contact">Contact</Link>
          <Link className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors" to="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-[#160c1d] dark:text-white"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            type="button"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? "close" : "menu"}</span>
          </button>
          <Link className="flex items-center justify-center rounded-lg h-10 w-10 bg-primary/10 hover:bg-primary/20 text-primary transition-colors relative" to="/cart">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Link>
        </div>
      </div>
      {isMenuOpen ? (
        <div className="md:hidden border-t border-[#e5ded0] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
          <nav className="px-4 py-4 flex flex-col gap-3 max-w-7xl mx-auto">
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/products"
            >
              Shop
            </Link>
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/about"
            >
              About Freddie
            </Link>
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/contact"
            >
              Contact
            </Link>
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/admin"
            >
              Admin
            </Link>
            <Link
              className="text-[#160c1d] dark:text-[#e0e0e0] text-base font-medium hover:text-primary dark:hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
              to="/cart"
            >
              Cart
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default Navbar
