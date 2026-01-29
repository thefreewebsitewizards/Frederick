import type { MouseEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { featuredProducts } from "../data/products"
import { addToCart } from "../utils/cart"

function LandingPage() {
  const navigate = useNavigate()
  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>, productId: string, option: string) => {
    event.stopPropagation()
    addToCart({ productId, quantity: 1, option })
    navigate("/cart")
  }
  return (
    <div className="flex flex-col">
      <section className="relative w-full">
        <div
          className="w-full min-h-[600px] flex flex-col items-center justify-center px-4 py-20 text-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
          data-alt="Misty forest landscape with a traditional wooden bow in foreground"
          style={{
            backgroundImage:
              'linear-gradient(rgba(27, 15, 35, 0.4), rgba(27, 15, 35, 0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCaAK4HM643aTLQmCMZEdteScqiQcWCig6AlBvTRO5kXH2NkEj0EL8tSkDN9ZkGHCip63ay6WE8iq4_-3imNj8vghC32_UPc0WcWd9V0mcZnibsOh1QDeNCRkpY0aZJzoROIYY0gcKkljIh-TWnrCP-_sNd5VrkaVj39u2N0z_cge9yyECHBXWkS_wqrm2VudHOHrBOWnc7jg62lKVUhf297LmWheBSCjmrGjSVbVJKA5vJTyJxcL1QCeGFN-MlUBlWlUnCVk6lLn4")',
          }}
        >
          <div className="relative z-10 max-w-3xl flex flex-col gap-6 items-center animate-fade-in-up">
            <span className="text-[#e5ded0] uppercase tracking-[0.2em] text-sm font-bold">Est. 1982 • Oregon, USA</span>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight drop-shadow-lg">
              Proudly Handcrafted <br /><span className="italic font-medium">in the USA</span>
            </h1>
            <p className="text-[#f7f5f8] text-lg md:text-xl font-normal max-w-xl leading-relaxed opacity-90">
              Preserving the art of traditional archery with ethically sourced woods and centuries-old techniques.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center gap-2 justify-center rounded-lg h-12 px-8 bg-primary hover:bg-[#3a0063] text-white text-base font-bold tracking-wide transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                onClick={() => navigate("/products")}
              >
                <span>Explore Our Bows</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
              <button
                className="flex items-center justify-center rounded-lg h-12 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 text-base font-bold tracking-wide transition-all"
                onClick={() => navigate("/about")}
              >
                Our Story
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-[960px] mx-auto flex flex-col gap-10">
          <div className="text-center space-y-4">
            <h2 className="text-[#160c1d] dark:text-white text-3xl md:text-4xl font-bold leading-tight">The Black Eagle Standard</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
            <p className="text-[#160c1d]/80 dark:text-[#f7f5f8]/80 text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
              We don't just build bows; we craft heirlooms. Every curve is intentional, every piece of wood is hand-selected, and every string is tested for perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white dark:bg-[#25162e] border border-[#e5ded0] dark:border-[#3a2046] shadow-sm">
              <span className="material-symbols-outlined text-4xl text-primary">forest</span>
              <h3 className="text-xl font-bold text-[#160c1d] dark:text-white">Ethically Sourced</h3>
              <p className="text-sm text-[#160c1d]/70 dark:text-[#f7f5f8]/70">We partner with local foresters to find sustainable, high-character timber.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white dark:bg-[#25162e] border border-[#e5ded0] dark:border-[#3a2046] shadow-sm">
              <span className="material-symbols-outlined text-4xl text-primary">handyman</span>
              <h3 className="text-xl font-bold text-[#160c1d] dark:text-white">Hand Carved</h3>
              <p className="text-sm text-[#160c1d]/70 dark:text-[#f7f5f8]/70">No CNC machines. Just rasps, draw knives, and patience.</p>
            </div>
            <div className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-white dark:bg-[#25162e] border border-[#e5ded0] dark:border-[#3a2046] shadow-sm">
              <span className="material-symbols-outlined text-4xl text-primary">verified</span>
              <h3 className="text-xl font-bold text-[#160c1d] dark:text-white">Lifetime Warranty</h3>
              <p className="text-sm text-[#160c1d]/70 dark:text-[#f7f5f8]/70">We stand behind our craftsmanship for the life of the bow.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-[#f0eadd] dark:bg-[#150a1b]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div className="flex flex-col gap-2">
              <span className="text-primary font-bold uppercase tracking-wider text-xs">Shop Collection</span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#160c1d] dark:text-white">Featured Models</h2>
            </div>
            <Link className="hidden md:flex items-center gap-1 text-primary font-bold hover:underline" to="/products">
              View All <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.slice(0, 3).map((product, index) => (
              <div
                className="group flex flex-col bg-background-light dark:bg-[#25162e] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                key={product.id}
                onClick={() => navigate(`/product-details/${product.id}`)}
              >
                <div className="h-64 overflow-hidden relative bg-gray-200">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                    data-alt={product.name}
                    style={{
                      backgroundImage: `url("${product.image}")`,
                    }}
                  ></div>
                  {index === 2 ? (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                      Best Seller
                    </div>
                  ) : null}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white">{product.name}</h3>
                  <p className="text-sm text-[#160c1d]/60 dark:text-[#f7f5f8]/60 mt-1">{product.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
                    <button
                      className="text-[#160c1d] dark:text-white hover:text-primary dark:hover:text-primary"
                      onClick={(event) =>
                        handleAddToCart(event, product.id, product.drawWeightOptions[0] ?? "Standard")
                      }
                    >
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex md:hidden justify-center mt-8">
            <Link className="flex items-center gap-1 text-primary font-bold hover:underline" to="/products">
              View All Models <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-background-light dark:bg-background-dark">
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center bg-white dark:bg-[#25162e] p-8 md:p-12 rounded-2xl shadow-lg border border-[#e5ded0] dark:border-[#3a2046]">
            <div className="w-full md:w-1/3 flex justify-center">
              <div
                className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-cover bg-center border-4 border-primary/20 shadow-inner"
                data-alt="Portrait of an older craftsman in an apron working on a wooden bow"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFRTLd5n06aplfouL_9DImyiXM4c0HErsVa6BZGtZI3kcNYf-9kFDwG8Gt4qWSZJciFToYAf9s1K3gHTRfaL6acOg4HibtR4sdzdIlvkFL0myIC6NboPaAoj7cnDamHbw6YY6H1jT92uYRms5MqHYCzOeFpyln9-fk0ADzgrBG9cZZ8ezfb85RtCcxO3dcyJ_OB32cUe8BvbNCIVvQMwP1ktqc6bR8fdCfkhGrsriBxLcvBqjf0C96_YL056I0G0CPDW0XvLM6B2U")',
                }}
              ></div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="material-symbols-outlined text-primary">history_edu</span>
                <span className="text-sm font-bold uppercase tracking-wider text-[#160c1d]/50 dark:text-white/50">Master Bowyer</span>
              </div>
              <h2 className="text-3xl font-bold text-[#160c1d] dark:text-white">Meet Freddie G.</h2>
              <p className="text-lg text-primary italic font-medium">
                "The wood speaks to you. You just have to be quiet enough to listen."
              </p>
              <p className="text-[#160c1d]/80 dark:text-[#f7f5f8]/80 leading-relaxed">
                With over 40 years of experience in bending wood to his will, Freddie brings a heritage of craftsmanship to every piece he touches. Starting in a small garage in Oregon, his dedication to the "old ways" has made Black Eagle bows sought after by traditional archers worldwide.
              </p>
              <div className="pt-4">
                <Link
                  className="inline-flex items-center text-[#160c1d] dark:text-white font-bold hover:text-primary transition-colors border-b-2 border-primary/30 hover:border-primary pb-0.5"
                  to="/about"
                >
                  Read Freddie&apos;s Full Story
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
        <div className="max-w-2xl mx-auto text-center relative z-10 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold">Join the Tribe</h2>
          <p className="text-white/80 text-lg">Sign up for our newsletter to receive updates on new builds, archery tips, and exclusive heritage stories.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <input className="flex-1 h-12 rounded-lg px-4 bg-white/10 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50" placeholder="Enter your email" type="email" />
            <button className="h-12 px-6 rounded-lg bg-white text-primary font-bold hover:bg-[#f7f5f8] transition-colors">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
