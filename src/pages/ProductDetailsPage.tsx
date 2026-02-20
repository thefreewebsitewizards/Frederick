import type { CSSProperties } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { type Product, useStoreProduct } from "../data/products"
import { addToCart } from "../utils/cart"

function ProductDetailsPage() {
  const { productId } = useParams()
  const { product: remoteProduct, loading } = useStoreProduct(productId)

  if (loading && !remoteProduct) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-[#140d1b] dark:text-white font-display">
        <div className="layout-container flex justify-center w-full py-24">
          <div className="layout-content-container w-full max-w-[1280px] px-4 md:px-10">
            <div className="text-[#734c9a] text-lg font-medium">Loading product…</div>
          </div>
        </div>
      </div>
    )
  }

  if (!remoteProduct) {
    return (
      <div className="bg-background-light dark:bg-background-dark text-[#140d1b] dark:text-white font-display">
        <div className="layout-container flex justify-center w-full py-24">
          <div className="layout-content-container w-full max-w-[1280px] px-4 md:px-10">
            <div className="text-[#734c9a] text-lg font-medium">Product not found.</div>
            <Link className="mt-4 inline-flex text-[#734c9a] text-sm font-medium hover:underline" to="/products">
              Back to products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <ProductDetailsContent key={remoteProduct.id} product={remoteProduct} />
}

function ProductDetailsContent({ product }: { product: Product }) {
  const navigate = useNavigate()
  const galleryImages = product.images.length > 0 ? product.images : [product.image]
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState(() => product.drawWeightOptions[0] ?? "Standard")
  const themeStyle = {
    "--color-primary": "#7311d4",
    "--color-background-light": "#f7f6f8",
    "--color-background-dark": "#191022",
    "--color-parchment": "#fdfbf7",
    "--color-chocolate": "#4a3b32",
    "--color-rope": "#d4c5b0",
    "--font-display": "Newsreader, serif",
    "--font-serif": "Newsreader, serif",
  } as CSSProperties

  return (
    <div
      className="bg-background-light dark:bg-background-dark text-[#140d1b] dark:text-white font-display"
      style={themeStyle}
    >
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex justify-center w-full bg-[#faf8fc]">
          <div className="layout-content-container flex flex-col w-full max-w-[1280px] px-4 md:px-10">
            <div className="flex flex-wrap gap-2 py-4 items-center">
              <Link className="text-[#734c9a] text-sm font-medium leading-normal hover:underline" to="/">
                Home
              </Link>
              <span className="text-[#734c9a] text-sm font-medium leading-normal">/</span>
              <Link className="text-[#734c9a] text-sm font-medium leading-normal hover:underline" to="/products">
                Handcrafted Bows
              </Link>
              <span className="text-[#734c9a] text-sm font-medium leading-normal">/</span>
              <span className="text-[#140d1b] text-sm font-medium leading-normal">{product.name}</span>
            </div>
          </div>
        </div>
        <div className="layout-container flex grow justify-center w-full py-6 md:py-10 bg-[#faf8fc]">
          <div className="layout-content-container flex flex-col lg:flex-row gap-10 w-full max-w-[1280px] px-4 md:px-10">
            <div className="flex flex-col w-full lg:w-3/5 gap-4">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#ede7f3]">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700"
                  data-alt={product.name}
                  style={{
                    backgroundImage: `url("${galleryImages[selectedImageIndex] ?? product.image}")`,
                  }}
                ></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.slice(0, 4).map((image, index) => {
                  const isActive = index === selectedImageIndex
                  return (
                    <button
                      className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-opacity ${
                        isActive ? "border-2 border-primary" : "opacity-70 hover:opacity-100"
                      }`}
                      key={`${image}-${index}`}
                      onClick={() => setSelectedImageIndex(index)}
                      type="button"
                    >
                      <div
                        className="w-full h-full bg-center bg-no-repeat bg-cover"
                        data-alt={product.name}
                        style={{
                          backgroundImage: `url("${image}")`,
                        }}
                      ></div>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-2/5">
              <div className="bg-parchment p-8 rounded-lg border border-[#e3dac9] shadow-sm relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDseb7quKIzgjsa8wlBUS6SS83kOIu-jjrBXK5e_B4XaqkZW194-bIuwXeCgPZPLWWkbfr7D-eYzgZYDP_9Hz0Xyh2T-fqXTMJ0MZoUgA08GpsC6QfaamhWoALcgONj8_9DYJYgWytlvCmAIrH_z3PcHdY87T4ZcvpDwuNgonO3LYY5ZxKX4hIKp50csklQejyGnJFW8rr-22I50hinT4aoDH0kkG7-5tZh5vKABdPYiElHyT2sXe9vOal2yQosfcRs1Pwwc3G-_40')",
                  }}
                ></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold tracking-widest uppercase text-chocolate/60">{product.typeLabel}</span>
                    <div className="flex gap-1 text-yellow-600">
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star_half</span>
                    </div>
                  </div>
                  <h1 className="text-[#140d1b] tracking-tight text-4xl font-bold leading-tight mb-4 font-serif text-chocolate">
                    {product.name}
                  </h1>
                  <p className="text-3xl font-medium text-chocolate mb-6">${product.price.toFixed(2)}</p>
                  <div className="rope-divider w-full mb-6"></div>
                  <p className="text-[#4a3b32] text-lg leading-relaxed mb-8 font-normal">{product.description}</p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9]">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Draw Weight
                      </span>
                      <span className="text-lg font-semibold text-chocolate">{product.drawWeight}</span>
                    </div>
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9]">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Length
                      </span>
                      <span className="text-lg font-semibold text-chocolate">{product.length}</span>
                    </div>
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9] col-span-2">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Material
                      </span>
                      <span className="text-lg font-semibold text-chocolate">{product.material}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Quantity</label>
                        <div className="relative flex items-center">
                          <button
                            className="absolute left-0 w-8 h-full text-chocolate hover:bg-black/5 rounded-l"
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            type="button"
                          >
                            -
                          </button>
                          <input
                            className="w-full text-center border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                            readOnly
                            type="text"
                            value={quantity}
                          />
                          <button
                            className="absolute right-0 w-8 h-full text-chocolate hover:bg-black/5 rounded-r"
                            onClick={() => setQuantity((prev) => prev + 1)}
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-2/3">
                        <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Draw Weight Option</label>
                        <select
                          className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                          onChange={(event) => setSelectedOption(event.target.value)}
                          value={selectedOption}
                        >
                          {product.drawWeightOptions.map((option) => (
                            <option key={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-14 bg-primary hover:bg-[#600eb3] text-white gap-3 text-lg font-bold leading-normal tracking-wide shadow-md transition-all transform hover:-translate-y-0.5"
                      onClick={() => {
                        addToCart({
                          productId: product.id,
                          quantity,
                          option: selectedOption,
                          note: product.summary,
                        })
                        navigate("/cart")
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined">shopping_cart</span>
                      Add to Quiver
                    </button>
                    <p className="text-xs text-center text-chocolate/50 mt-2 italic">
                      Crafted to order. Expect 3-4 weeks for delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-container flex justify-center w-full py-16 bg-[#faf8fc]">
          <div className="layout-content-container max-w-[960px] px-4 md:px-10">
            <div className="relative border-t border-b border-[#e3dac9] py-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf8fc] px-4">
                <span className="material-symbols-outlined text-4xl text-rope">history_edu</span>
              </div>
              <h3 className="text-3xl font-bold text-center text-chocolate mb-10 font-serif">Craftsman's Notes</h3>
              <div className="grid md:grid-cols-2 gap-12 text-[#4a3b32] text-lg leading-relaxed font-serif">
                <div className="drop-cap">
                  The design of this longbow is steeped in the martial traditions of the 14th century. While modern
                  materials have their place, there is a soul in Yew wood that fiberglass cannot replicate. We source
                  our timber from high-altitude groves where the slow growth creates tight, dense grain rings—essential
                  for the snap and power of a true self-bow.
                </div>
                <div>
                  <p className="mb-4">
                    Every bow is worked by hand, following the natural grain of the stave rather than forcing a shape
                    upon it. This ensures that the weapon is not only beautiful but durable. The horn nocks are
                    hand-carved from water buffalo horn, polished to a glass-like finish to protect the string loops
                    from abrasion.
                  </p>
                  <p className="italic text-primary/80">
                    "A bow is life in tension." — Master Bowyer, Elden Thorne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
