import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, DragEvent, FormEvent } from "react"
import { addStoreProduct, buildProductFromForm, productCategories, type Product, updateStoreProduct } from "../data/products"

type ProductFormProps = {
  variant?: "page" | "modal"
  onClose?: () => void
  initialProduct?: Product | null
}

function ProductForm({ variant = "page", onClose, initialProduct }: ProductFormProps) {
  const isModal = variant === "modal"
  const isEdit = Boolean(initialProduct)
  const [name, setName] = useState("")
  const [category, setCategory] = useState<Product["category"] | "">("")
  const [price, setPrice] = useState<string>("")
  const [summary, setSummary] = useState("")
  const [description, setDescription] = useState("")
  const [typeLabel, setTypeLabel] = useState("")
  const [drawWeight, setDrawWeight] = useState("")
  const [length, setLength] = useState("")
  const [material, setMaterial] = useState("")
  const [drawWeightOptions, setDrawWeightOptions] = useState("")
  const [badge, setBadge] = useState("")
  const [featured, setFeatured] = useState(false)
  const [stockLevel, setStockLevel] = useState<string>("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [isDragActive, setIsDragActive] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const themeStyle = {
    "--color-primary": "#7311d4",
    "--color-primary-dark": "#5e0eb0",
    "--color-background-light": "#FDFCF5",
    "--color-background-dark": "#191022",
    "--color-border-dark": "#2c2a27",
    "--color-paper-shadow": "rgba(44, 42, 39, 0.1)",
    "--font-display": "Newsreader, serif",
  } as CSSProperties

  const wrapperClass = isModal
    ? "w-full"
    : "bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col"
  const mainClass = isModal ? "w-full" : "flex-grow flex items-center justify-center p-6 md:p-10"
  const cardClass = isModal
    ? "w-full bg-white dark:bg-[#1f1a24] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    : "w-full max-w-6xl bg-white dark:bg-[#1f1a24] rounded-xl shadow-2xl border-[3px] border-[#2c2a27] dark:border-[#4a453e] overflow-hidden flex flex-col"

  const canDiscard = Boolean(onClose)

  useEffect(() => {
    if (!initialProduct) return
    setName(initialProduct.name)
    setCategory(initialProduct.category)
    setPrice(initialProduct.price.toString())
    setSummary(initialProduct.summary)
    setDescription(initialProduct.description)
    setTypeLabel(initialProduct.typeLabel)
    setDrawWeight(initialProduct.drawWeight)
    setLength(initialProduct.length)
    setMaterial(initialProduct.material)
    setDrawWeightOptions(initialProduct.drawWeightOptions.join(", "))
    setBadge(initialProduct.badge ?? "")
    setFeatured(Boolean(initialProduct.featured))
    setStockLevel(typeof initialProduct.stockLevel === "number" ? initialProduct.stockLevel.toString() : "")
    setImageFiles([])
    setExistingImages([initialProduct.image, ...initialProduct.images].filter((item) => item.length > 0))
  }, [initialProduct])

  const filePreviewUrls = useMemo(
    () => imageFiles.slice(0, 4).map((file) => URL.createObjectURL(file)),
    [imageFiles],
  )
  const previewImages = filePreviewUrls.length > 0 ? filePreviewUrls : existingImages.slice(0, 4)

  useEffect(() => {
    return () => {
      filePreviewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [filePreviewUrls])

  const handleDiscard = () => {
    if (!onClose) return
    onClose()
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    const selected = Array.from(files).filter((file) => file.type.startsWith("image/"))
    if (selected.length === 0) {
      setSaveError("Please select at least one image file.")
      return
    }
    setSaveError(null)
    setImageFiles(selected.slice(0, 4))
    setExistingImages([])
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  const handlePickClick = () => {
    fileInputRef.current?.click()
  }

  const loadImage = (file: File) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const url = URL.createObjectURL(file)
      const image = new Image()
      image.onload = () => {
        URL.revokeObjectURL(url)
        resolve(image)
      }
      image.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error("Failed to read image file."))
      }
      image.src = url
    })

  const compressImage = async (file: File) => {
    const image = await loadImage(file)
    const maxDimension = 1200
    const ratio = Math.min(1, maxDimension / image.width, maxDimension / image.height)
    const width = Math.max(1, Math.round(image.width * ratio))
    const height = Math.max(1, Math.round(image.height * ratio))
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext("2d")
    if (!context) {
      throw new Error("Failed to process image file.")
    }
    context.drawImage(image, 0, 0, width, height)

    const targetBytes = 1_048_487
    const qualities = [0.9, 0.8, 0.7, 0.6, 0.5]
    for (const quality of qualities) {
      const dataUrl = canvas.toDataURL("image/jpeg", quality)
      if (dataUrl.length <= targetBytes) {
        return dataUrl
      }
    }

    throw new Error('Image is too large. Please choose a smaller image or fewer images.')
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (isSaving) return

    setSaveError(null)

    if (!name.trim()) {
      setSaveError("Product Title is required.")
      return
    }
    if (!category) {
      setSaveError("Please select a Category.")
      return
    }
    const numericPrice = Number(price)
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setSaveError("Unit Price must be a number greater than 0.")
      return
    }
    if (!summary.trim()) {
      setSaveError("Summary is required.")
      return
    }
    if (!description.trim()) {
      setSaveError("Craftsmanship Details are required.")
      return
    }
    if (imageFiles.length === 0 && existingImages.length === 0) {
      setSaveError("At least one product image is required.")
      return
    }
    if (!typeLabel.trim() || !drawWeight.trim() || !length.trim() || !material.trim()) {
      setSaveError("Type Label, Draw Weight, Length, and Material are required.")
      return
    }
    if (!drawWeightOptions.trim()) {
      setSaveError("Draw Weight Options are required (comma-separated).")
      return
    }

    let numericStock: number | undefined
    if (stockLevel.trim().length > 0) {
      numericStock = Number(stockLevel)
      if (!Number.isFinite(numericStock) || numericStock < 0) {
        setSaveError("Stock Level must be a number 0 or greater.")
        return
      }
    }

    setIsSaving(true)
    try {
      const imageDataUrls =
        imageFiles.length > 0 ? await Promise.all(imageFiles.map((file) => compressImage(file))) : []
      const imageSources = imageDataUrls.length > 0 ? imageDataUrls : existingImages
      const [mainImage, ...additionalImages] = imageSources.filter((url) => url.length > 0)
      if (!mainImage) {
        throw new Error("Failed to process image files.")
      }
      const product = buildProductFromForm({
        name,
        category,
        price: numericPrice,
        summary,
        description,
        badge,
        featured,
        typeLabel,
        drawWeight,
        length,
        material,
        drawWeightOptions,
        image: mainImage,
        images: additionalImages,
        stockLevel: numericStock,
      })
      if (isEdit && initialProduct) {
        await updateStoreProduct(initialProduct.id, product)
      } else {
        await addStoreProduct(product)
      }
      if (onClose) onClose()
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save product.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={wrapperClass} style={themeStyle}>
      <main className={mainClass}>
        <div className={cardClass}>
          <div className="px-8 py-6 border-b border-[#ede7f3] dark:border-white/10 bg-[#faf8fc] dark:bg-[#251f2b]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[#140d1b] dark:text-white text-3xl font-bold tracking-tight">
                  {isEdit ? "Edit Product" : "Add New Product"}
                </h1>
                <p className="text-[#734c9a] dark:text-[#a08cc0] text-base mt-1 italic">
                  {isEdit ? "Update the details for this handcrafted item." : "Enter the details for the handcrafted bow below."}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-3xl">add_circle</span>
                </div>
                {isModal && onClose ? (
                  <button
                    className="flex items-center justify-center size-10 rounded-full border border-[#ede7f3] dark:border-white/10 text-[#734c9a] dark:text-[#a08cc0] hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-colors"
                    onClick={onClose}
                    type="button"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
          <form className="p-8 flex flex-col h-full" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div>
                  <label className="block mb-2">
                    <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Product Title</span>
                  </label>
                  <input
                    className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                    placeholder="e.g. The Highland Recurve"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Category</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">category</span>
                      </div>
                      <select
                        className="w-full h-14 pl-12 pr-10 appearance-none rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-[#f9f7f4] dark:bg-[#251f2b] text-[#140d1b] dark:text-white focus:bg-white dark:focus:bg-[#2e2535] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-tactile focus:shadow-none transition-all font-normal text-lg cursor-pointer"
                        onChange={(event) => setCategory(event.target.value as Product["category"] | "")}
                        value={category}
                      >
                        <option disabled value="">
                          Select Category
                        </option>
                        {productCategories.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#734c9a] pointer-events-none">
                        <span className="material-symbols-outlined">expand_more</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Unit Price</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center bg-[#ede7f3] dark:bg-[#352b3e] rounded-l-lg border-y border-l border-[#d1c4e0] dark:border-[#4a3b55] group-focus-within:border-primary group-focus-within:bg-primary/10 transition-colors">
                        <span className="text-[#734c9a] font-bold text-lg">$</span>
                      </div>
                      <input
                        className="w-full h-14 pl-16 pr-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-[#f9f7f4] dark:bg-[#251f2b] text-[#140d1b] dark:text-white focus:bg-white dark:focus:bg-[#2e2535] placeholder:text-[#734c9a]/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-tactile focus:shadow-none transition-all font-normal text-lg"
                        min="0"
                        placeholder="0.00"
                        onChange={(event) => setPrice(event.target.value)}
                        step="0.01"
                        type="number"
                        value={price}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block mb-2">
                    <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Summary</span>
                  </label>
                  <input
                    className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                    onChange={(event) => setSummary(event.target.value)}
                    placeholder="Short description shown on product cards"
                    type="text"
                    value={summary}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <label className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Craftsmanship Details</label>
                    <div className="group/tooltip relative flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#734c9a] text-[18px] cursor-help opacity-70 hover:opacity-100 transition-opacity">help</span>
                      <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 w-64 p-3 bg-[#191022] text-white text-sm rounded shadow-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10 pointer-events-none">
                        <p className="italic leading-relaxed">Include wood type (e.g., Yew, Osage), draw weight range, and historical inspiration for this piece.</p>
                        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#191022]"></div>
                      </div>
                    </div>
                  </div>
                  <textarea
                    className="w-full min-h-[200px] p-5 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg resize-y leading-relaxed"
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe the materials, draw weight, and historical inspiration..."
                    value={description}
                  ></textarea>
                  <p className="text-sm text-[#734c9a]/80 mt-2 text-right italic">Suggested length: 150-300 words for optimal storytelling.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Type Label</span>
                    </label>
                    <input
                      className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                      onChange={(event) => setTypeLabel(event.target.value)}
                      placeholder='e.g. "Traditional Recurve"'
                      type="text"
                      value={typeLabel}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Stock Level</span>
                    </label>
                    <input
                      className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                      min="0"
                      onChange={(event) => setStockLevel(event.target.value)}
                      placeholder="0"
                      type="number"
                      value={stockLevel}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Draw Weight</span>
                    </label>
                    <input
                      className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                      onChange={(event) => setDrawWeight(event.target.value)}
                      placeholder="e.g. 40 - 55 lbs"
                      type="text"
                      value={drawWeight}
                    />
                  </div>
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Length</span>
                    </label>
                    <input
                      className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                      onChange={(event) => setLength(event.target.value)}
                      placeholder="e.g. 60 Inches"
                      type="text"
                      value={length}
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2">
                    <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Material</span>
                  </label>
                  <input
                    className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                    onChange={(event) => setMaterial(event.target.value)}
                    placeholder="e.g. Maple Core & Fiberglass"
                    type="text"
                    value={material}
                  />
                </div>
                <div>
                  <label className="block mb-2">
                    <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Draw Weight Options</span>
                  </label>
                  <input
                    className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                    onChange={(event) => setDrawWeightOptions(event.target.value)}
                    placeholder="e.g. 40 lbs (Target), 45 lbs (Field), 55 lbs (Hunting)"
                    type="text"
                    value={drawWeightOptions}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Badge</span>
                    </label>
                    <input
                      className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                      onChange={(event) => setBadge(event.target.value)}
                      placeholder="Optional"
                      type="text"
                      value={badge}
                    />
                  </div>
                  <div className="flex flex-col justify-end gap-2">
                    <label className="flex items-center gap-3 text-[#140d1b] dark:text-white text-lg font-bold leading-normal">
                      <input
                        checked={featured}
                        className="h-5 w-5 accent-primary"
                        onChange={(event) => setFeatured(event.target.checked)}
                        type="checkbox"
                      />
                      Featured Model
                    </label>
                    <span className="text-sm text-[#734c9a] dark:text-[#a08cc0]">Show in the landing page Featured Models.</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col h-full">
                <label className="block mb-2">
                  <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Product Photography</span>
                </label>
                <div className="flex-grow flex flex-col gap-4 rounded-xl border border-[#d1c4e0] dark:border-[#4a3b55] bg-[#faf8fc] dark:bg-[#251f2b] p-4 shadow-sm">
                  <div className="flex flex-col gap-3">
                    <input
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={(event) => handleFiles(event.target.files)}
                      ref={fileInputRef}
                      type="file"
                    />
                    <div
                      className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors cursor-pointer ${
                        isDragActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#1f1a24] text-[#734c9a] dark:text-[#a08cc0]"
                      }`}
                      onClick={handlePickClick}
                      onDragLeave={() => setIsDragActive(false)}
                      onDragOver={(event) => {
                        event.preventDefault()
                        setIsDragActive(true)
                      }}
                      onDrop={handleDrop}
                      role="button"
                      tabIndex={0}
                    >
                      <span className="material-symbols-outlined text-3xl">photo_library</span>
                      <div className="text-sm font-semibold">Drag & drop or click to select</div>
                      <div className="text-xs opacity-80">Up to 4 images (PNG, JPG, WEBP)</div>
                    </div>
                    {imageFiles.length > 0 ? (
                      <div className="flex items-center justify-between text-xs text-[#734c9a] dark:text-[#a08cc0]">
                        <span>{imageFiles.length} image{imageFiles.length === 1 ? "" : "s"} selected</span>
                        <button
                          className="text-[#734c9a] dark:text-[#a08cc0] hover:text-primary transition-colors"
                          onClick={() => {
                            setImageFiles([])
                            setExistingImages([])
                          }}
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                    ) : existingImages.length > 0 ? (
                      <div className="flex items-center justify-between text-xs text-[#734c9a] dark:text-[#a08cc0]">
                        <span>{existingImages.length} image{existingImages.length === 1 ? "" : "s"} saved</span>
                        <button
                          className="text-[#734c9a] dark:text-[#a08cc0] hover:text-primary transition-colors"
                          onClick={() => setExistingImages([])}
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#734c9a] dark:text-[#a08cc0] pl-1">Previews</p>
                    {previewImages.length > 0 ? (
                      <div className="grid grid-cols-2 gap-3">
                        {previewImages.map((preview) => (
                          <div
                            className="aspect-square rounded-lg overflow-hidden border border-[#ede7f3] dark:border-[#4a3b55] bg-white dark:bg-[#1f1a24]"
                            key={preview}
                          >
                            <img alt="Product preview" className="w-full h-full object-cover" src={preview} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-[#734c9a] dark:text-[#a08cc0]">Add images to see previews.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {saveError ? (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{saveError}</div>
            ) : null}
            <div className="mt-10 pt-6 border-t border-[#ede7f3] dark:border-white/10 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
              <button
                className={`w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-[#dbcfe7] dark:border-[#4a3b55] text-[#140d1b] dark:text-white font-bold transition-all ${
                  canDiscard
                    ? "hover:bg-[#ede7f3] dark:hover:bg-[#352b3e] hover:border-[#bfb3cc]"
                    : "opacity-60 cursor-not-allowed"
                }`}
                disabled={!canDiscard || isSaving}
                onClick={handleDiscard}
                type="button"
              >
                Discard Changes
              </button>
              <button
                className={`w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-md focus:ring-4 focus:ring-primary/30 transition-all flex items-center justify-center gap-2 ${
                  isSaving ? "opacity-80 cursor-not-allowed" : "hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5"
                }`}
                disabled={isSaving}
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                {isSaving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default ProductForm
