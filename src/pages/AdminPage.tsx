import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { CSSProperties, FormEvent } from "react"
import ProductForm from "./ProductForm"
import { deleteStoreProduct, getStoreAdminEmail, isFirebaseConfigured, signInFirebaseAdmin, signOutFirebaseAdmin, useStoreProducts, type Product } from "../data/products"

const adminAuthStorageKey = "black-eagle-admin-auth"
const isBrowser = typeof window !== "undefined"

const readAdminAuth = () => {
  if (!isBrowser) return false
  return window.sessionStorage.getItem(adminAuthStorageKey) === "1"
}

const writeAdminAuth = (value: boolean) => {
  if (!isBrowser) return
  if (value) {
    window.sessionStorage.setItem(adminAuthStorageKey, "1")
    return
  }
  window.sessionStorage.removeItem(adminAuthStorageKey)
}

function AdminPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(() => readAdminAuth())
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isStoreAdminEmailLoading, setIsStoreAdminEmailLoading] = useState(false)
  const { products } = useStoreProducts()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<
    "All Products" | "Recurve Bows" | "Longbows" | "Strings" | "Accessories"
  >("All Products")
  const [page, setPage] = useState(1)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const pageSize = 10

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

  useEffect(() => {
    if (isAuthenticated) return
    writeAdminAuth(false)
  }, [isAuthenticated])

  const handleLogout = () => {
    writeAdminAuth(false)
    setIsAuthenticated(false)
    setIsFormOpen(false)
    setEditingProduct(null)
    setEmail("")
    setPassword("")
    setLoginError(null)
    void signOutFirebaseAdmin()
    navigate("/")
  }

  const handleOpenCreate = () => {
    setEditingProduct(null)
    setIsFormOpen(true)
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingProduct(null)
  }

  const handleOpenDelete = (product: Product) => {
    setDeleteTarget(product)
    setDeleteError(null)
    setIsDeleteOpen(true)
  }

  const handleCloseDelete = () => {
    if (isDeleting) return
    setIsDeleteOpen(false)
    setDeleteTarget(null)
    setDeleteError(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget || isDeleting) return
    setIsDeleting(true)
    setDeleteError(null)
    try {
      await deleteStoreProduct(deleteTarget.id)
      setIsDeleteOpen(false)
      setDeleteTarget(null)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : "Failed to delete product.")
    } finally {
      setIsDeleting(false)
    }
  }

  const handleLoginSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoginError(null)

    const normalizedEmail = email.trim().toLowerCase()
    if (!isFirebaseConfigured()) {
      writeAdminAuth(false)
      setIsAuthenticated(false)
      setLoginError("Firebase is not configured. Check VITE_FIREBASE_* env vars.")
      return
    }

    try {
      setIsStoreAdminEmailLoading(true)
      await signInFirebaseAdmin(normalizedEmail, password)
      const storeAdminEmail = await getStoreAdminEmail()
      if (!storeAdminEmail) {
        await signOutFirebaseAdmin()
        writeAdminAuth(false)
        setIsAuthenticated(false)
        setLoginError("Admin email is missing for this store.")
        return
      }
      if (normalizedEmail !== storeAdminEmail) {
        await signOutFirebaseAdmin()
        writeAdminAuth(false)
        setIsAuthenticated(false)
        setLoginError("Invalid admin credentials.")
        return
      }
    } catch (error) {
      writeAdminAuth(false)
      setIsAuthenticated(false)
      setLoginError(error instanceof Error ? error.message : "Firebase sign-in failed.")
      return
    } finally {
      setIsStoreAdminEmailLoading(false)
    }

    writeAdminAuth(true)
    setIsAuthenticated(true)
    setEmail("")
    setPassword("")
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()
    const filteredByCategory =
      categoryFilter === "All Products" ? products : products.filter((product) => product.category === categoryFilter)

    if (!normalizedQuery) return filteredByCategory

    return filteredByCategory.filter((product) => {
      const haystack = `${product.name} ${product.id} ${product.category}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [categoryFilter, products, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, filteredProducts.length)
  const pageProducts = filteredProducts.slice(startIndex, endIndex)

  if (!isAuthenticated) {
    return (
      <div
        className="font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased"
        style={themeStyle}
      >
        <div className="min-h-screen w-full flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 rounded-2xl shadow-xl p-8">
            <div className="flex flex-col gap-2 mb-6">
              <h1 className="text-2xl font-bold tracking-tight">Admin Login</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sign in to access the admin panel.</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Email
                <input
                  className="w-full rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                  autoComplete="username"
                  inputMode="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                  type="email"
                  value={email}
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Password
                <input
                  className="w-full rounded-lg border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  type="password"
                  value={password}
                />
              </label>

              {loginError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{loginError}</div>
              ) : null}
              <button
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isStoreAdminEmailLoading}
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span className="text-sm font-bold tracking-wide">
                  {isStoreAdminEmailLoading ? "Loading Store Access..." : "Sign In"}
                </span>
              </button>

              <button
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 shadow-sm transition-colors"
                onClick={() => navigate("/")}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                <span className="text-sm font-semibold tracking-wide">Back to Website</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

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
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-stone-300 dark:border-slate-600 text-stone-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-stone-50 dark:hover:bg-slate-700 shadow-sm transition-colors"
                onClick={handleLogout}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">logout</span>
                <span className="text-sm font-semibold tracking-wide">Log out</span>
              </button>
              <button
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
                onClick={handleOpenCreate}
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
                  <input
                    className="block w-full pl-10 pr-3 py-2.5 border-none bg-stone-50 dark:bg-slate-900 rounded-lg text-sm text-slate-900 dark:text-white placeholder-stone-400 focus:ring-2 focus:ring-primary/50 transition-shadow"
                    onChange={(event) => {
                      setSearchQuery(event.target.value)
                      setPage(1)
                    }}
                    placeholder="Search by name, ID, or category..."
                    type="text"
                    value={searchQuery}
                  />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 no-scrollbar">
                  {(["All Products", "Recurve Bows", "Longbows", "Strings", "Accessories"] as const).map((label) => {
                    const isActive = label === categoryFilter
                    return (
                      <button
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs shadow-sm transition-colors ${
                          isActive
                            ? "bg-slate-800 text-white font-semibold"
                            : "bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-slate-300 hover:bg-stone-200 dark:hover:bg-slate-600 font-medium"
                        }`}
                        key={label}
                        onClick={() => {
                          setCategoryFilter(label)
                          setPage(1)
                        }}
                        type="button"
                      >
                        {label}
                      </button>
                    )
                  })}
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
                      {pageProducts.length > 0 ? (
                        pageProducts.map((product) => {
                          const badgeClass =
                            product.category === "Strings"
                              ? "bg-slate-100 text-slate-800 border-slate-200"
                              : product.category === "Accessories"
                                ? "bg-stone-100 text-stone-700 border-stone-200"
                                : "bg-amber-100 text-amber-800 border-amber-200"

                          const stock = typeof product.stockLevel === "number" ? product.stockLevel : null
                          const stockPercent = stock === null ? 0 : Math.min(100, Math.round((stock / 50) * 100))
                          const stockBarClass =
                            stock === null ? "bg-stone-300" : stock <= 5 ? "bg-red-500" : stock <= 15 ? "bg-orange-400" : "bg-green-600"
                          const stockTextClass = stock === null ? "text-stone-500 dark:text-slate-300" : stock <= 5 ? "text-red-600" : stock <= 15 ? "text-orange-600" : "text-stone-600 dark:text-slate-300"

                          return (
                            <tr className="hover:bg-white dark:hover:bg-slate-700/50 transition-colors group" key={product.id}>
                              <td className="px-6 py-4">
                                <div
                                  className="h-12 w-12 rounded-lg bg-stone-200 dark:bg-slate-600 bg-cover bg-center shadow-sm"
                                  data-alt={product.name}
                                  style={{ backgroundImage: `url('${product.image}')` }}
                                ></div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-slate-800 dark:text-white">{product.name}</span>
                                  <span className="text-xs text-stone-500 dark:text-slate-400">ID: {product.id}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}
                                >
                                  {product.category}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                  ${product.price.toFixed(2)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                                    <div className={`h-full ${stockBarClass}`} style={{ width: `${stockPercent}%` }}></div>
                                  </div>
                                  <span className={`text-xs font-medium ${stockTextClass}`}>
                                    {stock === null ? "—" : `${stock} Units`}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                  <button
                                    className="flex items-center justify-center h-8 px-3 rounded bg-chocolate hover:bg-[#3E2723] text-white text-xs font-medium transition-colors shadow-sm"
                                    onClick={() => handleOpenEdit(product)}
                                    type="button"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="flex items-center justify-center h-8 px-3 rounded bg-slate-custom hover:bg-slate-600 text-white text-xs font-medium transition-colors shadow-sm"
                                    onClick={() => handleOpenDelete(product)}
                                    type="button"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td className="px-6 py-10 text-center text-sm text-stone-500 dark:text-slate-400" colSpan={6}>
                            No products found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 border-t border-stone-200 dark:border-slate-700 flex items-center justify-between bg-stone-50/50 dark:bg-slate-900/50">
                  <p className="text-xs text-stone-500 dark:text-slate-400">
                    Showing{" "}
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {filteredProducts.length === 0 ? 0 : startIndex + 1}-{endIndex}
                    </span>{" "}
                    of <span className="font-semibold text-slate-800 dark:text-white">{filteredProducts.length}</span>{" "}
                    products
                  </p>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded hover:bg-stone-50 disabled:opacity-50 shadow-sm"
                      disabled={safePage <= 1}
                      onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                      type="button"
                    >
                      Previous
                    </button>
                    <button
                      className="px-3 py-1 text-xs font-medium text-stone-600 bg-white border border-stone-300 rounded hover:bg-stone-50 disabled:opacity-50 shadow-sm"
                      disabled={safePage >= totalPages}
                      onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isFormOpen ? (
            <div
              className="absolute inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-6 overflow-y-auto"
              onClick={handleCloseForm}
            >
              <div
                className="w-full max-w-6xl"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <ProductForm initialProduct={editingProduct} onClose={handleCloseForm} variant="modal" />
              </div>
            </div>
          ) : null}
          {isDeleteOpen && deleteTarget ? (
            <div
              className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-6"
              onClick={handleCloseDelete}
            >
              <div
                className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-700 shadow-2xl p-6"
                onClick={(event) => {
                  event.stopPropagation()
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Delete Product</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">This action cannot be undone.</p>
                  </div>
                </div>
                <div className="rounded-lg border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-slate-200">
                  Are you sure you want to delete <span className="font-semibold">{deleteTarget.name}</span>?
                </div>
                {deleteError ? (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {deleteError}
                  </div>
                ) : null}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    className="px-4 py-2 rounded-lg border border-stone-300 dark:border-slate-600 text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors"
                    disabled={isDeleting}
                    onClick={handleCloseDelete}
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-70"
                    disabled={isDeleting}
                    onClick={handleConfirmDelete}
                    type="button"
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}

export default AdminPage
