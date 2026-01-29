import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { CSSProperties } from "react"
import ProductForm from "./ProductForm"

function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const navigate = useNavigate()
  const themeStyle = {
    "--color-primary": "#840bda",
    "--color-background-light": "#FAF9F6",
    "--color-background-dark": "#1b1022",
    "--color-rustic-dark": "#1e1b18",
    "--color-chocolate": "#4E342E",
    "--color-slate-custom": "#475569",
    "--color-parchment": "#fdfbf7",
    "--font-display": "Inter, sans-serif",
  } as CSSProperties

  return (
    <div
      className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-hidden"
      style={themeStyle}
    >
      <div className="flex h-screen w-full">
        <aside className="w-64 flex-shrink-0 flex flex-col justify-between bg-rustic-dark border-r border-stone-800/50">
          <div>
            <div className="h-20 flex items-center px-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined">api</span>
                </div>
                <div>
                  <h1 className="text-white text-base font-bold leading-tight tracking-wide">Heritage Bows</h1>
                  <p className="text-stone-400 text-xs font-normal">Admin Panel</p>
                </div>
              </div>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              <a className="flex items-center gap-3 px-3 py-3 rounded-lg bg-primary/20 text-white border border-primary/30 shadow-sm relative overflow-hidden group" href="#">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r"></div>
                <span className="material-symbols-outlined text-primary fill-current">inventory_2</span>
                <span className="text-sm font-medium">Inventory</span>
              </a>
            </nav>
          </div>
          <div className="p-4 border-t border-white/10">
            <a className="flex items-center gap-3 px-3 py-3 rounded-lg text-stone-300 hover:bg-white/5 hover:text-white transition-colors" href="#">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full w-8 h-8 border border-stone-600"
                data-alt="Admin user profile picture"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC085wp4yXiKK0HqJEirxFHDturdw66BxPlWcRDyolaQ-dLs6WwBUcj45tZlS4q4U9Syd5luYybaIaL-7piPm3YWecgyVn0gc9HXuJkXCrRYmwQersNoqvCWtwxsg-GwqPh903N55FPL_ZiMEgFWHZ3DmqgqJ2o7ZlkjPCpls2uyZ4X4vHq4y8bI-ag752sRcPnGagNJtoVsekZk9HF4dd9oHFad-6Ly2J_33B-KS3BrU40Jg2tCeHT4F8Tl5OO0jhyB9Yg09lTZb0")',
                }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Eleanor Woods</p>
                <p className="text-xs text-stone-500 truncate">Store Manager</p>
              </div>
              <span className="material-symbols-outlined text-stone-500 text-[20px]">settings</span>
            </a>
          </div>
        </aside>
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <header className="flex-shrink-0 px-8 py-8 flex flex-wrap justify-between items-end gap-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">Product Management</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xl">Manage your handcrafted inventory, track stock levels, and organize product listings.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-stone-300 dark:border-slate-600 text-stone-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 shadow-sm transition-colors"
                onClick={() => navigate("/")}
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                <span className="text-sm font-semibold tracking-wide">Back to Website</span>
              </button>
              <button
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
                onClick={() => setIsFormOpen(true)}
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
                <span className="text-sm font-bold tracking-wide">Add New Product</span>
              </button>
            </div>
          </header>
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="w-full max-w-[1400px] flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-stone-200 dark:border-slate-700">
                <div className="relative w-full md:w-96 group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-stone-400 group-focus-within:text-primary">search</span>
                  </div>
                  <input className="block w-full pl-10 pr-3 py-2.5 border-none bg-stone-50 dark:bg-slate-900 rounded-lg text-sm text-slate-900 dark:text-white placeholder-stone-400 focus:ring-2 focus:ring-primary/50 transition-shadow" placeholder="Search by name, SKU, or category..." type="text" />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 no-scrollbar">
                  <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-slate-800 text-white text-xs font-semibold shadow-sm">All Products</button>
                  <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600 text-xs font-medium transition-colors">Bows</button>
                  <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600 text-xs font-medium transition-colors">Strings</button>
                  <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600 text-xs font-medium transition-colors">Quivers</button>
                  <button className="whitespace-nowrap px-4 py-1.5 rounded-full bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600 text-xs font-medium transition-colors">Accessories</button>
                </div>
              </div>
              <div className="bg-parchment dark:bg-slate-800 rounded-xl shadow-md border border-stone-200 dark:border-slate-700 overflow-hidden relative">
                <div className="h-1 w-full bg-gradient-to-r from-stone-300 via-stone-100 to-stone-300 dark:from-slate-600 dark:via-slate-700 dark:to-slate-600 opacity-50"></div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-stone-100/50 dark:bg-slate-900/50 border-b border-stone-200 dark:border-slate-600 text-xs uppercase tracking-wider text-stone-500 dark:text-slate-400 font-semibold">
                        <th className="px-6 py-4 w-20">Image</th>
                        <th className="px-6 py-4">Product Name</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4 text-right">Price</th>
                        <th className="px-6 py-4">Stock Level</th>
                        <th className="px-6 py-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-slate-700">
                      <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm" data-alt="Traditional wooden longbow close up" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCgvwPewR8Xcbsd9vlAXuuYtT_BbBYRWSZfB9OwSOpMYPEu4fBnCnf4uDqbmhsQ-Vv1CsHezPo6M2fFLVy1v3lIfosj1kQM5YDCPItzOVejG4NCgReeSGItlFcvY-8IafE6IZ9BgbAXN_Ewv7PLoNvk7GiUQjuqWRmZL2dyEC2hsZczHrkDeWnXU96gzaSPsQLCZNilhVOJF193hG0RL1CQzEO3ejNugfG2cAg5USK0Enc0YubbCi7ciaDraMya-SyY_erZgfUYmHg')" }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Longbow - The Ranger</span>
                            <span className="text-xs text-stone-500 dark:text-slate-400">SKU: LB-001-RN</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Bow</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">$450.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-600 w-[40%]"></div>
                            </div>
                            <span className="text-xs font-medium text-stone-600 dark:text-slate-300">12 Units</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm">Edit</button>
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm" data-alt="Twisted bow string detail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCONDc6D4m2cQTsyKHNpN8Iw2f3c7q7amsJOYXErdzA4dsP_8ZvnK9tTfCQdEmtDwOP6DfnV6nWbvna5m8buODD3EOR3s4DeuXB_FiHu5aqNAh6McNHNOpRl6n4p-852DyPXYNRUuQFcX24JM4VAxlJCFLsjfUEZtT5qo1fjkWBXbJB_QYquIXnSTk0VL6XoGTGainBLHWdorMZkVWsudJ0DKeG_SF1q-8CRpqo_4QVcWUXWcnJWN6sDPZQwMwvlZaoy3uVfyXb1dM')" }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Flemish Twist String</span>
                            <span className="text-xs text-stone-500 dark:text-slate-400">SKU: ST-042-FL</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">String</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">$25.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-600 w-[85%]"></div>
                            </div>
                            <span className="text-xs font-medium text-stone-600 dark:text-slate-300">50 Units</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm">Edit</button>
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm" data-alt="Recurve bow handle detail" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmsT0i0kvncXL7ivSCYlpbuJdOpkCcu-D0avS5fqnk8EurpRbBA284r6Jraq2y4WXrNTq-spiOAcXTgTghm1RB928aMh7jsG2oKfful8FwkeS7gsoaTe2K-cja3HqLnmx25NL_SFb4xwLbpoGZqpRCms0Xs014aQE8pGiE04X_nJCzAowXhuGdhJnC5gkOhs-j0QM7yaO6b294U8pgOgjQw95muRfoi94k7g3crR_PexoYDIwrCWSYa5-nZ1f4QsOU7JPEQapIz1g')" }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Recurve - The Hunter</span>
                            <span className="text-xs text-stone-500 dark:text-slate-400">SKU: RC-009-HN</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">Bow</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">$600.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 w-[10%]"></div>
                            </div>
                            <span className="text-xs font-medium text-red-600">3 Units</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm">Edit</button>
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm" data-alt="Leather back quiver with arrows" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpOyvpflJdsXm881TP5YTTrnQxmTotmUmKw7T441T5MbcoH-sBemE_G3LgikM30wnHO-tr9beloWUZEoQ1ovpUpkMs5XK3khyO9TVJkDEkNNDuasU1uH0xG0RWAbuRTOfURxPt4ijI6TPGCglXr_DwpPsYts-TjI6ss1JiZpo2F8NTozJZI69Rn_hqH0ynVuBaf4cJVWiPQkpReczpefgHlCQQdCF4aRCCvZExcQIjkSEqMrFazPKZeF2XW61CzD2qotv-Uuv0_QM')" }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Leather Back Quiver</span>
                            <span className="text-xs text-stone-500 dark:text-slate-400">SKU: QV-102-LB</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">Accessory</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">$120.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-orange-400 w-[20%]"></div>
                            </div>
                            <span className="text-xs font-medium text-orange-600">8 Units</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm">Edit</button>
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm" data-alt="Small tin of bowstring wax" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjFJXItF8b_DhLNzMMiqmzZVEAc_0Vo2aqY_KqwwQAHgTrYZiO6b7qvwDvq-vAAsDjqA7asquFkiWEgeQeR4bWeFQQCE42gBSweTeWybXTV3IP2wyFFcHeM6HeR2PiD7dqMtAtRHxwMfwgK3FFOe_K0PdEp8XE2PG5AiVnkF2EOoByfmtbi0O-Oo4WlXxSMfSbflzlV7faoljzvgjZHHBiFcLa_oCkbAU14NZHLcdpTl1RToC1pekt2U-YS8WqmioRzVZXPSETAHk')" }}></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-white">Bowstring Wax</span>
                            <span className="text-xs text-stone-500 dark:text-slate-400">SKU: MT-505-WX</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">Maintenance</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">$15.00</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                              <div className="h-full bg-green-600 w-full"></div>
                            </div>
                            <span className="text-xs font-medium text-stone-600 dark:text-slate-300">100 Units</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm">Edit</button>
                            <button className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm">Delete</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-stone-200 dark:border-slate-700 flex items-center justify-between bg-stone-50/50 dark:bg-slate-900/50">
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    Showing <span className="font-semibold text-slate-800 dark:text-white">1-5</span> of <span className="font-semibold text-slate-800 dark:text-white">48</span> products
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded hover:bg-stone-50 disabled:opacity-50 shadow-sm" disabled>
                      Previous
                    </button>
                    <button className="px-3 py-1 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded hover:bg-stone-50 shadow-sm">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isFormOpen ? (
            <div
              className="absolute inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-6 overflow-y-auto"
              onClick={() => setIsFormOpen(false)}
            >
              <div
                className="w-full max-w-6xl"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <ProductForm
                  onClose={() => setIsFormOpen(false)}
                  variant="modal"
                />
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default AdminPage
