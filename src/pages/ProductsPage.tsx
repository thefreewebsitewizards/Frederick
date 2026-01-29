import type { MouseEvent } from "react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { products } from "../data/products"

const categories = ["All Products", "Recurve Bows", "Longbows", "Strings", "Accessories"] as const

function ProductsPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All Products")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 4

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Products") {
      return products
    }
    return products.filter((product) => product.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const pageProducts = filteredProducts.slice((safePage - 1) * pageSize, safePage * pageSize)

  const handleCategorySelect = (category: (typeof categories)[number]) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handleViewDetails = (event: MouseEvent<HTMLButtonElement>, productId: string) => {
    event.stopPropagation()
    navigate(`/product-details/${productId}`)
  }

  const handleCardClick = (productId: string) => {
    navigate(`/product-details/${productId}`)
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#160c1d] dark:text-[#f3f0f5]">
      <div className="relative flex h-auto w-full flex-col overflow-x-hidden">
        <main className="w-full flex justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1280px] px-4 md:px-10 py-8 md:py-12">
            <div className="flex flex-wrap justify-between gap-6 mb-8 items-end">
              <div className="flex flex-col gap-3 max-w-2xl">
                <p className="text-[#160c1d] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Handcrafted for the Traditional Archer</p>
                <p className="text-[#7a45a1] dark:text-[#bcaaa4] text-lg font-normal leading-normal max-w-lg">Discover our collection of premium traditional bows, custom strings, and leather accessories.</p>
              </div>
            </div>
            <div className="mb-10 overflow-x-auto">
              <div className="flex border-b border-[#decdea] dark:border-[#3a2a45] min-w-max">
                {categories.map((category) => {
                  const isActive = activeCategory === category
                  return (
                    <button
                      className={`group flex flex-col items-center justify-center border-b-[3px] px-6 pb-3 pt-4 cursor-pointer transition-colors ${
                        isActive ? "border-b-primary" : "border-b-transparent hover:border-b-primary/30"
                      }`}
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      type="button"
                    >
                      <p
                        className={`text-base leading-normal tracking-[0.015em] transition-colors ${
                          isActive
                            ? "text-[#160c1d] dark:text-white font-bold"
                            : "text-[#7a45a1] dark:text-[#a594b5] group-hover:text-primary dark:group-hover:text-[#d1c4e9] font-medium"
                        }`}
                      >
                        {category}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {pageProducts.map((product) => (
                <div
                  className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt={product.name}
                      src={product.image}
                    />
                    {product.badge ? (
                      <div className="absolute top-3 right-3">
                        <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                          {product.badge}
                        </span>
                      </div>
                    ) : null}
                  </div>
                  <div className="p-5 flex flex-col flex-1 gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">{product.name}</h3>
                    </div>
                    <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">
                      {product.summary}
                    </p>
                    <div className="mt-auto flex flex-col gap-3">
                      <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                        onClick={(event) => handleViewDetails(event, product.id)}
                      >
                        <span>View Details</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center p-8 mt-6">
              <button
                className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0e0e0] dark:hover:bg-[#3a2a45] transition-colors"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                type="button"
              >
                <span className="material-symbols-outlined text-[#160c1d] dark:text-white text-lg">chevron_left</span>
              </button>
              {[1, 2, 3, 4].map((page) => {
                const isActive = page === safePage
                return (
                  <button
                    className={`text-sm leading-normal flex size-10 items-center justify-center rounded-full mx-1 shadow-md transition-colors ${
                      isActive
                        ? "font-bold text-white bg-primary"
                        : "font-normal text-[#160c1d] dark:text-white hover:bg-[#eee6f4] dark:hover:bg-[#3a2a45]"
                    }`}
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    type="button"
                  >
                    {page}
                  </button>
                )
              })}
              <button
                className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0e0e0] dark:hover:bg-[#3a2a45] transition-colors"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                type="button"
              >
                <span className="material-symbols-outlined text-[#160c1d] dark:text-white text-lg">chevron_right</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductsPage
