import type { CSSProperties } from "react"

function CartPage() {
  const themeStyle = {
    "--color-primary": "#7311d4",
    "--color-background-light": "#f7f6f8",
    "--color-background-dark": "#191022",
    "--color-sand": "#F5F1E8",
    "--color-parchment": "#FAF7F0",
    "--color-text-dark": "#140d1b",
    "--color-text-light": "#e0dce8",
    "--font-display": "Newsreader, serif",
    "--font-serif": "Newsreader, serif",
  } as CSSProperties

  return (
    <div
      className="cart-page bg-background-light dark:bg-background-dark font-display text-text-dark dark:text-text-light antialiased transition-colors duration-300"
      style={themeStyle}
    >
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1 px-4 py-8 md:px-8 lg:px-12 xl:px-40">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8">
              <h1 className="text-4xl font-black italic tracking-tight text-text-dark dark:text-white sm:text-5xl">
                Your Quiver
              </h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Review your handcrafted selections.</p>
            </div>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
              <div className="flex flex-col gap-8 lg:col-span-8">
                <div className="hidden border-b border-gray-200 pb-2 text-sm font-medium uppercase tracking-wide text-gray-500 dark:border-gray-700 dark:text-gray-400 sm:flex">
                  <span className="flex-1">Product</span>
                  <span className="w-32 text-center">Quantity</span>
                  <span className="w-24 text-right">Total</span>
                </div>
                <div className="group relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-[#251b30] sm:flex-row sm:items-center">
                  <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#322840]">
                    <img
                      alt="The Black Eagle Recurve"
                      className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal"
                      data-alt="Close up of wooden recurve bow riser"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between sm:block">
                      <h3 className="text-xl font-bold text-text-dark dark:text-white">The Black Eagle Recurve</h3>
                      <p className="block text-lg font-bold text-primary sm:hidden">$450.00</p>
                    </div>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">45lb Draw • Walnut Finish</p>
                    <button className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-red-500 hover:underline">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Return to Shelf
                    </button>
                  </div>
                  <div className="flex items-center justify-between sm:gap-6">
                    <div className="flex items-center rounded-full bg-[#f7f6f8] p-1 dark:bg-[#191022] dark:border dark:border-gray-700">
                      <button className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-8 text-center text-base font-medium text-text-dark dark:text-white">1</span>
                      <button className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    <p className="hidden text-right text-lg font-bold text-text-dark dark:text-white sm:block w-24">$450.00</p>
                  </div>
                </div>
                <div className="bowstring-divider w-full"></div>
                <div className="group relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-[#251b30] sm:flex-row sm:items-center">
                  <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#322840]">
                    <img
                      alt="Traditional Leather Arm Guard"
                      className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal"
                      data-alt="Brown leather bracer or arm guard texture"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between sm:block">
                      <h3 className="text-xl font-bold text-text-dark dark:text-white">Leather Arm Guard</h3>
                      <p className="block text-lg font-bold text-primary sm:hidden">$35.00</p>
                    </div>
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">Aged Brown • Standard Fit</p>
                    <button className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-red-500 hover:underline">
                      <span className="material-symbols-outlined text-[16px]">delete</span>
                      Return to Shelf
                    </button>
                  </div>
                  <div className="flex items-center justify-between sm:gap-6">
                    <div className="flex items-center rounded-full bg-[#f7f6f8] p-1 dark:bg-[#191022] dark:border dark:border-gray-700">
                      <button className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">remove</span>
                      </button>
                      <span className="w-8 text-center text-base font-medium text-text-dark dark:text-white">1</span>
                      <button className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                      </button>
                    </div>
                    <p className="hidden text-right text-lg font-bold text-text-dark dark:text-white sm:block w-24">$35.00</p>
                  </div>
                </div>
                <div className="mt-12 rounded-xl border border-[#ede7f3] bg-[#fdfbf7] p-8 dark:border-gray-700 dark:bg-[#1f1629]">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">auto_fix</span>
                    <h3 className="text-xl font-bold text-text-dark dark:text-white">Essentials for your Quiver</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="group flex cursor-pointer flex-col rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md dark:bg-[#2d2438]">
                      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          data-alt="Close up of bowstring wax or soap"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E"
                        />
                        <button className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white dark:bg-[#191022]">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-text-dark dark:text-white">Bowstring Wax</h4>
                      <p className="text-xs text-primary">$8.00</p>
                    </div>
                    <div className="group flex cursor-pointer flex-col rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md dark:bg-[#2d2438]">
                      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          data-alt="Bundle of archery arrows or strings"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc"
                        />
                        <button className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white dark:bg-[#191022]">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-text-dark dark:text-white">Spare String</h4>
                      <p className="text-xs text-primary">$18.00</p>
                    </div>
                    <div className="group flex cursor-pointer flex-col rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md dark:bg-[#2d2438]">
                      <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                        <img
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          data-alt="Leather finger tab for archery"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE"
                        />
                        <button className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white dark:bg-[#191022]">
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-text-dark dark:text-white">Finger Tab</h4>
                      <p className="text-xs text-primary">$12.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4">
                <div className="sticky top-28 rounded-xl bg-parchment p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#251b30] dark:ring-white/10 dark:shadow-2xl">
                  <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-600">
                    <h2 className="text-2xl font-bold text-text-dark dark:text-white">Order Summary</h2>
                    <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                  </div>
                  <div className="mb-6 flex flex-col gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="font-bold text-text-dark dark:text-white">$485.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping Estimate</span>
                      <span className="italic text-gray-400">Calculated at next step</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span className="font-bold text-text-dark dark:text-white">$0.00</span>
                    </div>
                  </div>
                  <div className="mb-6 border-t border-dashed border-gray-400 pt-4 dark:border-gray-500">
                    <div className="flex items-end justify-between">
                      <span className="text-base font-bold text-text-dark dark:text-white">Total</span>
                      <span className="text-3xl font-black text-primary">$485.00</span>
                    </div>
                  </div>
                  <button className="group relative w-full overflow-hidden rounded-lg bg-primary py-4 text-white shadow-lg transition-transform active:scale-[0.99]">
                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-bold tracking-wide">
                      Proceed to Checkout
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                    <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                  </button>
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Secure Checkout by Black Eagle
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default CartPage
