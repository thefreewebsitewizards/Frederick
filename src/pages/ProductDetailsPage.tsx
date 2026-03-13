import type { CSSProperties } from "react"
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { type Product, useStoreProduct, useStoreProducts } from "../data/products"
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
  const { products: storeProducts } = useStoreProducts()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedOption, setSelectedOption] = useState(() => product.drawWeightOptions[0] ?? "Standard")
  const isStringProduct = product.category === "Strings"
  const isBowProduct = product.category === "Recurve Bows" || product.category === "Longbows"
  const bowModels = storeProducts.filter(
    (item) => item.category === "Recurve Bows" || item.category === "Longbows",
  )
  const [baseModelId, setBaseModelId] = useState(product.id)
  const baseModelName = (bowModels.find((model) => model.id === baseModelId) ?? product).name
  const nockOptions = ["Horn", "Antler", "Self Nocks", "Maple", "Black Micarta"]
  const gripOptions = ["Leather Wrap", "Buckskin", "Cord Wrap", "Suede", "No Wrap"]
  const bowLengthOptions = ["58 in", "60 in", "62 in", "64 in", "66 in", "68 in", "70 in"]
  const drawWeightOptions = product.drawWeightOptions.length > 0 ? product.drawWeightOptions : ["35 lbs", "40 lbs", "45 lbs", "50 lbs", "55 lbs", "60 lbs"]
  const drawLengthOptions = ["26 in", "27 in", "28 in", "29 in", "30 in", "31 in"]
  const [selectedNock, setSelectedNock] = useState(nockOptions[0])
  const [selectedGrip, setSelectedGrip] = useState(gripOptions[0])
  const [selectedBowLength, setSelectedBowLength] = useState(bowLengthOptions[2])
  const [selectedDrawWeight, setSelectedDrawWeight] = useState(drawWeightOptions[0])
  const [selectedDrawLength, setSelectedDrawLength] = useState(drawLengthOptions[2])
  const stringColorOptions = [
    { name: "Black", value: "#111827" },
    { name: "Buckskin", value: "#E4CFA1" },
    { name: "Green", value: "#0F766E" },
    { name: "Dark Brown", value: "#4B2E1F" },
    { name: "White", value: "#F8FAFC" },
    { name: "Red", value: "#DC2626" },
    { name: "Orange", value: "#F97316" },
    { name: "Yellow", value: "#FACC15" },
    { name: "Pink", value: "#EC4899" },
    { name: "Purple", value: "#7C3AED" },
    { name: "Blue", value: "#2563EB" },
    { name: "Gray", value: "#9CA3AF" },
  ]
  const [primaryColor, setPrimaryColor] = useState(stringColorOptions[0])
  const [secondaryColor, setSecondaryColor] = useState(stringColorOptions[2])
  const [tertiaryColor, setTertiaryColor] = useState<(typeof stringColorOptions)[number] | null>(null)
  const [loopStyle, setLoopStyle] = useState<"bare" | "served">("bare")
  const [stringLength, setStringLength] = useState("")
  const [specialRequest, setSpecialRequest] = useState("")
  const servedLoopUpcharge = 5
  const loopUpcharge = isStringProduct && loopStyle === "served" ? servedLoopUpcharge : 0
  const displayPrice = product.price + loopUpcharge
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
                  <div className="mb-6">
                    <p className="text-3xl font-medium text-chocolate">${displayPrice.toFixed(2)}</p>
                    {loopUpcharge > 0 ? (
                      <p className="text-sm text-chocolate/70 mt-1">
                        Base ${product.price.toFixed(2)} + ${servedLoopUpcharge.toFixed(2)} served loops
                      </p>
                    ) : null}
                  </div>
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
                      {!isBowProduct ? (
                        <div className="w-2/3">
                          <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">
                            {isStringProduct ? "Bow Length" : "Draw Weight Option"}
                          </label>
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
                      ) : null}
                    </div>
                    {isBowProduct ? (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-2">Base Model</p>
                          <select
                            className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                            onChange={(event) => {
                              const nextId = event.target.value
                              setBaseModelId(nextId)
                              if (nextId && nextId !== product.id) {
                                navigate(`/products/${nextId}`)
                              }
                            }}
                            value={baseModelId}
                          >
                            {[product, ...bowModels.filter((item) => item.id !== product.id)].map((model) => (
                              <option key={model.id} value={model.id}>
                                {model.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Nocks</label>
                            <select
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                              onChange={(event) => setSelectedNock(event.target.value)}
                              value={selectedNock}
                            >
                              {nockOptions.map((option) => (
                                <option key={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Grip Material</label>
                            <select
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                              onChange={(event) => setSelectedGrip(event.target.value)}
                              value={selectedGrip}
                            >
                              {gripOptions.map((option) => (
                                <option key={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Bow Length</label>
                            <select
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                              onChange={(event) => setSelectedBowLength(event.target.value)}
                              value={selectedBowLength}
                            >
                              {bowLengthOptions.map((option) => (
                                <option key={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Draw Weight</label>
                            <select
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                              onChange={(event) => setSelectedDrawWeight(event.target.value)}
                              value={selectedDrawWeight}
                            >
                              {drawWeightOptions.map((option) => (
                                <option key={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Draw Length</label>
                            <select
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                              onChange={(event) => setSelectedDrawLength(event.target.value)}
                              value={selectedDrawLength}
                            >
                              {drawLengthOptions.map((option) => (
                                <option key={option}>{option}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {isStringProduct ? (
                      <div className="flex flex-col gap-5">
                        <div>
                          <p className="text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-2">Loop Style</p>
                          <div className="flex gap-3">
                            <button
                              className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                                loopStyle === "bare"
                                  ? "border-primary bg-primary/10 text-chocolate"
                                  : "border-[#e3dac9] bg-[#f5f1e8] text-chocolate/70 hover:text-chocolate"
                              }`}
                              onClick={() => setLoopStyle("bare")}
                              type="button"
                            >
                              Regular - Flemish Loops
                            </button>
                            <button
                              className={`flex-1 rounded-lg border px-4 py-2 text-sm font-semibold transition ${
                                loopStyle === "served"
                                  ? "border-primary bg-primary/10 text-chocolate"
                                  : "border-[#e3dac9] bg-[#f5f1e8] text-chocolate/70 hover:text-chocolate"
                              }`}
                              onClick={() => setLoopStyle("served")}
                              type="button"
                            >
                              Invincible - Served Loops (+${servedLoopUpcharge.toFixed(2)})
                            </button>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-2">Color #1</p>
                          <div className="grid grid-cols-6 gap-2">
                            {stringColorOptions.map((color) => {
                              const isSelected = primaryColor.name === color.name
                              return (
                                <button
                                  key={`primary-${color.name}`}
                                  className={`h-10 rounded-md border transition ${
                                    isSelected ? "border-primary ring-2 ring-primary/40" : "border-[#e3dac9]"
                                  }`}
                                  onClick={() => setPrimaryColor(color)}
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                  type="button"
                                />
                              )
                            })}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-2">Color #2</p>
                          <div className="grid grid-cols-6 gap-2">
                            {stringColorOptions.map((color) => {
                              const isSelected = secondaryColor.name === color.name
                              return (
                                <button
                                  key={`secondary-${color.name}`}
                                  className={`h-10 rounded-md border transition ${
                                    isSelected ? "border-primary ring-2 ring-primary/40" : "border-[#e3dac9]"
                                  }`}
                                  onClick={() => setSecondaryColor(color)}
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                  type="button"
                                />
                              )
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-2">
                              Optional Extra Color
                            </p>
                            <button
                              className="text-xs font-semibold text-primary hover:underline"
                              onClick={() => setTertiaryColor(null)}
                              type="button"
                            >
                              No third color
                            </button>
                          </div>
                          <div className="grid grid-cols-6 gap-2">
                            {stringColorOptions.map((color) => {
                              const isSelected = tertiaryColor?.name === color.name
                              return (
                                <button
                                  key={`tertiary-${color.name}`}
                                  className={`h-10 rounded-md border transition ${
                                    isSelected ? "border-primary ring-2 ring-primary/40" : "border-[#e3dac9]"
                                  }`}
                                  onClick={() => setTertiaryColor(color)}
                                  style={{ backgroundColor: color.value }}
                                  title={color.name}
                                  type="button"
                                />
                              )
                            })}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">
                              Actual Bow String Length
                            </label>
                            <input
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2 px-3"
                              onChange={(event) => setStringLength(event.target.value)}
                              placeholder="Enter bowstring length"
                              value={stringLength}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Special Request</label>
                            <input
                              className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2 px-3"
                              onChange={(event) => setSpecialRequest(event.target.value)}
                              placeholder="Optional"
                              value={specialRequest}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <button
                      className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-14 bg-primary hover:bg-[#600eb3] text-white gap-3 text-lg font-bold leading-normal tracking-wide shadow-md transition-all transform hover:-translate-y-0.5"
                      onClick={() => {
                        const optionParts = isStringProduct
                          ? [
                              selectedOption ? `Length: ${selectedOption}` : null,
                              `Primary: ${primaryColor.name}`,
                              `Secondary: ${secondaryColor.name}`,
                              tertiaryColor ? `Tertiary: ${tertiaryColor.name}` : null,
                              loopStyle === "served" ? "Loop: Served" : "Loop: Bare",
                              stringLength.trim() ? `Actual Length: ${stringLength.trim()}` : null,
                              specialRequest.trim() ? `Request: ${specialRequest.trim()}` : null,
                            ].filter((part): part is string => Boolean(part))
                          : isBowProduct
                            ? [
                                `Model: ${baseModelName}`,
                                selectedNock ? `Nocks: ${selectedNock}` : null,
                                selectedGrip ? `Grip: ${selectedGrip}` : null,
                                selectedBowLength ? `Bow Length: ${selectedBowLength}` : null,
                                selectedDrawWeight ? `Draw Weight: ${selectedDrawWeight}` : null,
                                selectedDrawLength ? `Draw Length: ${selectedDrawLength}` : null,
                              ].filter((part): part is string => Boolean(part))
                            : [selectedOption].filter((part): part is string => Boolean(part))
                        const optionLabel = optionParts.join(" • ")
                        addToCart({
                          productId: product.id,
                          quantity,
                          option: optionLabel,
                          note: specialRequest.trim() || product.summary,
                          priceAdjustment: loopUpcharge,
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
