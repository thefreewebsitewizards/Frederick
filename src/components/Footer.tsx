import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="bg-background-dark text-[#f7f5f8] py-16 px-4 border-t border-white/10 mt-auto">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 text-white">
          <img alt="Black Eagle Archery logo" className="h-6 w-6 object-contain" src="/logo.png" />
          <span className="text-lg font-bold">Black Eagle</span>
        </div>
          <p className="text-sm text-white/60 leading-relaxed">
            Handcrafted traditional bows made in the USA. Preserving history, one shot at a time.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Shop</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li><Link className="hover:text-primary transition-colors" to="/products">Recurve Bows</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/products">Longbows</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/products">Accessories</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/products">Apparel</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Company</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li><Link className="hover:text-primary transition-colors" to="/about">Our Story</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/about">About Freddie</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/">Journal</Link></li>
            <li><Link className="hover:text-primary transition-colors" to="/contact">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4 text-white">Contact</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">location_on</span> Bend, Oregon</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">mail</span> info@blackeagle.com</li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-xs">call</span> (555) 123-4567</li>
          </ul>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
        <p>© 2023 Black Eagle Archery. All rights reserved.</p>
        <div className="flex gap-6">
          <Link className="hover:text-white" to="/">Privacy Policy</Link>
          <Link className="hover:text-white" to="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
