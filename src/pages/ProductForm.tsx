import type { CSSProperties } from "react"

type ProductFormProps = {
  variant?: "page" | "modal"
  onClose?: () => void
}

function ProductForm({ variant = "page", onClose }: ProductFormProps) {
  const isModal = variant === "modal"
  const themeStyle: CSSProperties = {
    "--color-primary": "#7311d4",
    "--color-primary-dark": "#5e0eb0",
    "--color-background-light": "#FDFCF5",
    "--color-background-dark": "#191022",
    "--color-border-dark": "#2c2a27",
    "--color-paper-shadow": "rgba(44, 42, 39, 0.1)",
    "--font-display": "Newsreader, serif",
  }

  const wrapperClass = isModal
    ? "w-full"
    : "bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col"
  const mainClass = isModal ? "w-full" : "flex-grow flex items-center justify-center p-6 md:p-10"
  const cardClass = isModal
    ? "w-full bg-white dark:bg-[#1f1a24] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
    : "w-full max-w-6xl bg-white dark:bg-[#1f1a24] rounded-xl shadow-2xl border-[3px] border-[#2c2a27] dark:border-[#4a453e] overflow-hidden flex flex-col"

  return (
    <div className={wrapperClass} style={themeStyle}>
      <main className={mainClass}>
        <div className={cardClass}>
          <div className="px-8 py-6 border-b border-[#ede7f3] dark:border-white/10 bg-[#faf8fc] dark:bg-[#251f2b]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[#140d1b] dark:text-white text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-[#734c9a] dark:text-[#a08cc0] text-base mt-1 italic">Enter the details for the handcrafted bow below.</p>
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
          <form className="p-8 flex flex-col h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div>
                  <label className="block mb-2">
                    <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Product Title</span>
                  </label>
                  <input
                    className="w-full h-14 px-4 rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-white dark:bg-[#251f2b] text-[#140d1b] dark:text-white placeholder:text-[#734c9a]/40 shadow-tactile focus:shadow-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-normal text-lg"
                    placeholder="e.g. The Highland Recurve"
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2">
                      <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Bow Type</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/70 pointer-events-none group-focus-within:text-primary transition-colors">
                        <span className="material-symbols-outlined text-[20px]">category</span>
                      </div>
                      <select
                        className="w-full h-14 pl-12 pr-10 appearance-none rounded-lg border border-[#d1c4e0] dark:border-[#4a3b55] bg-[#f9f7f4] dark:bg-[#251f2b] text-[#140d1b] dark:text-white focus:bg-white dark:focus:bg-[#2e2535] focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary shadow-tactile focus:shadow-none transition-all font-normal text-lg cursor-pointer"
                        defaultValue=""
                      >
                        <option disabled value="">
                          Select Category
                        </option>
                        <option value="longbow">Traditional Longbow</option>
                        <option value="recurve">Recurve Bow</option>
                        <option value="compound">Wooden Compound</option>
                        <option value="arrows">Handcrafted Arrows</option>
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
                        step="0.01"
                        type="number"
                      />
                    </div>
                  </div>
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
                    placeholder="Describe the materials, draw weight, and historical inspiration..."
                  ></textarea>
                  <p className="text-sm text-[#734c9a]/80 mt-2 text-right italic">Suggested length: 150-300 words for optimal storytelling.</p>
                </div>
              </div>
              <div className="lg:col-span-1 flex flex-col h-full">
                <label className="block mb-2">
                  <span className="text-[#140d1b] dark:text-white text-lg font-bold leading-normal">Product Photography</span>
                </label>
                <div className="flex-grow flex flex-col gap-4 rounded-xl border border-[#d1c4e0] dark:border-[#4a3b55] bg-[#faf8fc] dark:bg-[#251f2b] p-4 shadow-sm">
                  <div className="group relative flex flex-col items-center justify-center flex-grow min-h-[220px] border-2 border-dashed border-[#dbcfe7] dark:border-[#4a3b55] rounded-lg bg-white/50 dark:bg-[#1f1a24]/50 hover:bg-white dark:hover:bg-[#1f1a24] hover:border-primary transition-all cursor-pointer">
                    <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" type="file" />
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                        <span className="material-symbols-outlined text-primary text-3xl">add_photo_alternate</span>
                      </div>
                      <p className="mb-1 text-lg font-medium text-[#140d1b] dark:text-white">Upload Image</p>
                      <p className="text-xs text-[#734c9a] dark:text-[#a08cc0]">Drag &amp; drop or click to browse</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#734c9a] dark:text-[#a08cc0] pl-1">Previews</p>
                    <div className="relative group/image flex items-center gap-3 p-2 bg-white dark:bg-[#1f1a24] border border-[#ede7f3] dark:border-[#4a3b55] rounded-lg shadow-sm">
                      <div className="size-16 rounded overflow-hidden shrink-0 border border-[#ede7f3] dark:border-white/5">
                        <img
                          alt="Preview thumbnail of a wooden bow detail"
                          className="w-full h-full object-cover"
                          data-alt="Preview thumbnail of a wooden bow detail"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqTcYkzVx2tfeCEpIpvgPYAcNRNUYmo9xhDQhF0dg0iWmiJkh-1oCtdRDPEKAgcSTRfHnhySKKXbFchdju2jQL-vjTRttKDtwCG91-j09q02n91zODmK6Z8THv24kLvFZJgUPoEjaKju1qsamLvBX9AwOhcoVY6ml540XWa6UjzYPdoYNRyE3tjE4U1CQTKFJ1zuF4Sj5JQOrDTtdqzhGNk8mckXl4Z_wHvc0QkrmUSrjq6mx6gKgw12haYX-Uvwz-DH1JjlmaP0I"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium truncate text-[#140d1b] dark:text-white">highland_recurve_detail.jpg</p>
                        <p className="text-xs text-[#734c9a] dark:text-[#a08cc0]">2.4 MB</p>
                      </div>
                      <button className="text-red-400 hover:text-red-600 p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors" type="button">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-[#ede7f3] dark:border-white/10 flex flex-col-reverse sm:flex-row items-center justify-end gap-4">
              <button
                className="w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-[#dbcfe7] dark:border-[#4a3b55] text-[#140d1b] dark:text-white font-bold hover:bg-[#ede7f3] dark:hover:bg-[#352b3e] hover:border-[#bfb3cc] transition-all"
                onClick={onClose}
                type="button"
              >
                Discard Changes
              </button>
              <button
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary text-white font-bold shadow-md hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 focus:ring-4 focus:ring-primary/30 transition-all flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">save</span>
                Save Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

export default ProductForm
