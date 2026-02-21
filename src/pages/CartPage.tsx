import type { ChangeEvent, CSSProperties } from "react"
import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  createCartCheckoutSession,
  createOrderForFrederick,
  getShippingRatesForFrederick,
  type ShippingAddress,
  type ShippingRate,
  useStoreProducts,
} from "../data/products"
import { addToCart, removeFromCart, updateCartItemQuantity, useCart } from "../utils/cart"

const SHIPPING_MARKUP = 1.35

const toCents = (value: number) => Math.round(value * 100)

const parseAmount = (rawAmount: string) => {
  const sanitized = rawAmount.replace(/[^0-9.]+/g, "")
  if (!sanitized) return NaN
  return Number(sanitized)
}

const getMarkedUpAmount = (rawAmount: string) => {
  const base = parseAmount(rawAmount)
  if (!Number.isFinite(base) || base < 0) return 0
  const baseCents = toCents(base)
  const markedUpCents = Math.round(baseCents * SHIPPING_MARKUP)
  return markedUpCents / 100
}

const getDisplayAmount = (rate: ShippingRate) => {
  const baseSource = rate.baseAmount ?? rate.amount
  const markedUp = getMarkedUpAmount(baseSource)
  const parsed = parseAmount(rate.amount)
  if (Number.isFinite(parsed) && parsed > 0) {
    return parsed > markedUp ? parsed : markedUp
  }
  return markedUp
}

function CartPage() {
  const cartItems = useCart()
  const { products } = useStoreProducts()
  const productMap = useMemo(() => new Map(products.map((product) => [product.id, product])), [products])
  const lineItems = useMemo(
    () =>
      cartItems.map((item) => {
        const product = productMap.get(item.productId)
        const title = product?.name ?? "Unavailable item"
        const image = product?.image ?? ""
        const price = product?.price ?? 0
        const option = item.option ?? ""
        const note = item.note ?? ""
        const detail = option || note || product?.summary || ""
        return {
          key: `${item.productId}-${item.option ?? ""}`,
          item,
          product,
          title,
          image,
          price,
          detail,
          total: price * item.quantity,
        }
      }),
    [cartItems, productMap],
  )
  const suggestedProducts = useMemo(() => {
    const inCart = new Set(cartItems.map((item) => item.productId))
    return products.filter((product) => !inCart.has(product.id)).slice(0, 3)
  }, [cartItems, products])
  const subtotal = useMemo(() => lineItems.reduce((sum, item) => sum + item.total, 0), [lineItems])
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: "",
    company: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    email: "",
  })
  const [shipmentId, setShipmentId] = useState("")
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([])
  const [selectedRateId, setSelectedRateId] = useState("")
  const [isFetchingRates, setIsFetchingRates] = useState(false)
  const [shippingError, setShippingError] = useState<string | null>(null)
  const selectedRate = useMemo(
    () => shippingRates.find((rate) => rate.rateId === selectedRateId) ?? null,
    [selectedRateId, shippingRates],
  )
  const shippingAmount = selectedRate ? getDisplayAmount(selectedRate) : 0
  const total = subtotal + (Number.isFinite(shippingAmount) ? shippingAmount : 0)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
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

  const handleShippingChange = (field: keyof ShippingAddress) => (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = event.target.value
    setShippingAddress((prev) => ({ ...prev, [field]: value }))
    setShippingRates([])
    setSelectedRateId("")
    setShipmentId("")
    setShippingError(null)
  }

  const isShippingAddressComplete = useMemo(() => {
    const requiredFields: (keyof ShippingAddress)[] = [
      "name",
      "street1",
      "city",
      "state",
      "zip",
      "country",
      "phone",
      "email",
    ]
    return requiredFields.every((field) => String(shippingAddress[field] ?? "").trim().length > 0)
  }, [shippingAddress])

  const handleFetchRates = async () => {
    if (isFetchingRates) return
    setShippingError(null)
    if (!isShippingAddressComplete) {
      setShippingError("Please complete the shipping address to get rates.")
      return
    }

    setIsFetchingRates(true)
    try {
      const result = await getShippingRatesForFrederick(shippingAddress)
      const sortedRates = [...result.rates].sort((a, b) => getDisplayAmount(a) - getDisplayAmount(b))
      setShipmentId(result.shipmentId)
      setShippingRates(sortedRates)
      const fallbackRateId = sortedRates[0]?.rateId ?? ""
      setSelectedRateId(fallbackRateId)
    } catch (error) {
      setShippingError(error instanceof Error ? error.message : "Unable to fetch shipping rates.")
      setShippingRates([])
      setSelectedRateId("")
      setShipmentId("")
    } finally {
      setIsFetchingRates(false)
    }
  }

  const handleCheckout = async () => {
    if (isCheckingOut) return
    setCheckoutError(null)
    if (lineItems.length === 0) {
      setCheckoutError("Your quiver is empty.")
      return
    }
    if (!isShippingAddressComplete) {
      setCheckoutError("Please provide a shipping address.")
      return
    }
    if (!selectedRateId) {
      setCheckoutError("Please select a shipping option.")
      return
    }

    setIsCheckingOut(true)
    try {
      const items = lineItems
        .filter((lineItem) => Boolean(lineItem.product))
        .map((lineItem) => ({
          productId: lineItem.item.productId,
          name: lineItem.title,
          price: lineItem.price,
          quantity: lineItem.item.quantity,
          imageUrl: lineItem.image,
          option: lineItem.item.option,
          note: lineItem.item.note,
        }))
      const orderId = await createOrderForFrederick({
        items,
        customer: shippingAddress,
        shipping: {
          selectedRateId,
          shipmentId: shipmentId || undefined,
        },
      })
      const checkoutUrl = await createCartCheckoutSession(items, {
        successUrl: `${window.location.origin}/cart?checkout=success`,
        cancelUrl: `${window.location.origin}/cart?checkout=cancel`,
        orderId,
      })
      window.location.assign(checkoutUrl)
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "Unable to start checkout.")
      setIsCheckingOut(false)
    }
  }

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
                {lineItems.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#d8cde4] bg-white p-10 text-center text-lg text-gray-500 dark:border-[#3a2a45] dark:bg-[#251b30] dark:text-gray-300">
                    <p>Your quiver is empty.</p>
                    <Link className="mt-4 inline-flex text-primary font-bold hover:underline" to="/products">
                      Browse products
                    </Link>
                  </div>
                ) : (
                  lineItems.map((lineItem, index) => (
                    <div key={lineItem.key}>
                      <div className="group relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-[#251b30] sm:flex-row sm:items-center">
                        <div className="relative aspect-square size-24 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f5] dark:bg-[#322840]">
                          {lineItem.image ? (
                            <img
                              alt={lineItem.title}
                              className="h-full w-full object-cover mix-blend-multiply dark:mix-blend-normal"
                              data-alt={lineItem.title}
                              src={lineItem.image}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">No image</div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <div className="flex items-start justify-between sm:block">
                            <h3 className="text-xl font-bold text-text-dark dark:text-white">{lineItem.title}</h3>
                            <p className="block text-lg font-bold text-primary sm:hidden">${lineItem.price.toFixed(2)}</p>
                          </div>
                          {lineItem.detail ? (
                            <p className="text-sm italic text-gray-500 dark:text-gray-400">{lineItem.detail}</p>
                          ) : null}
                          <button
                            className="mt-2 flex w-fit items-center gap-1 text-xs font-medium text-gray-400 transition-colors hover:text-red-500 hover:underline"
                            onClick={() => removeFromCart(lineItem.item.productId, lineItem.item.option)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                            Return to Shelf
                          </button>
                        </div>
                        <div className="flex items-center justify-between sm:gap-6">
                          <div className="flex items-center rounded-full bg-[#f7f6f8] p-1 dark:bg-[#191022] dark:border dark:border-gray-700">
                            <button
                              className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95"
                              onClick={() =>
                                updateCartItemQuantity(lineItem.item.productId, lineItem.item.option, lineItem.item.quantity - 1)
                              }
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">remove</span>
                            </button>
                            <span className="w-8 text-center text-base font-medium text-text-dark dark:text-white">
                              {lineItem.item.quantity}
                            </span>
                            <button
                              className="flex size-8 items-center justify-center rounded-full text-gray-500 hover:bg-white hover:text-primary hover:shadow-sm dark:hover:bg-gray-800 dark:hover:text-primary transition-all active:scale-95"
                              onClick={() =>
                                updateCartItemQuantity(lineItem.item.productId, lineItem.item.option, lineItem.item.quantity + 1)
                              }
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                            </button>
                          </div>
                          <p className="hidden text-right text-lg font-bold text-text-dark dark:text-white sm:block w-24">
                            ${lineItem.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      {index < lineItems.length - 1 ? <div className="bowstring-divider w-full"></div> : null}
                    </div>
                  ))
                )}
                {suggestedProducts.length > 0 ? (
                  <div className="mt-12 rounded-xl border border-[#ede7f3] bg-[#fdfbf7] p-8 dark:border-gray-700 dark:bg-[#1f1629]">
                    <div className="mb-6 flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">auto_fix</span>
                      <h3 className="text-xl font-bold text-text-dark dark:text-white">Essentials for your Quiver</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {suggestedProducts.map((product) => (
                        <div className="group flex flex-col rounded-lg bg-white p-3 shadow-sm transition-all hover:shadow-md dark:bg-[#2d2438]" key={product.id}>
                          <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-gray-100">
                            <img
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              data-alt={product.name}
                              src={product.image}
                            />
                            <button
                              className="absolute bottom-2 right-2 flex size-8 items-center justify-center rounded-full bg-white text-primary shadow-sm hover:bg-primary hover:text-white dark:bg-[#191022]"
                              onClick={() =>
                                addToCart({
                                  productId: product.id,
                                  quantity: 1,
                                  option: product.drawWeightOptions[0] ?? "Standard",
                                  note: product.summary,
                                })
                              }
                              type="button"
                            >
                              <span className="material-symbols-outlined text-[18px]">add</span>
                            </button>
                          </div>
                          <h4 className="text-sm font-bold text-text-dark dark:text-white">{product.name}</h4>
                          <p className="text-xs text-primary">${product.price.toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="lg:col-span-4">
                <div className="sticky top-28 rounded-xl bg-parchment p-6 shadow-sm ring-1 ring-black/5 dark:bg-[#251b30] dark:ring-white/10 dark:shadow-2xl">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-text-dark dark:text-white">Shipping Details</h2>
                      <span className="material-symbols-outlined text-gray-400">local_shipping</span>
                    </div>
                    <div className="flex flex-col gap-3 text-sm">
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("name")}
                          placeholder="Full name"
                          type="text"
                          value={shippingAddress.name}
                        />
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("company")}
                          placeholder="Company (optional)"
                          type="text"
                          value={shippingAddress.company ?? ""}
                        />
                      </div>
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                        onChange={handleShippingChange("street1")}
                        placeholder="Street address"
                        type="text"
                        value={shippingAddress.street1}
                      />
                      <input
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                        onChange={handleShippingChange("street2")}
                        placeholder="Apartment, suite, etc. (optional)"
                        type="text"
                        value={shippingAddress.street2 ?? ""}
                      />
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("city")}
                          placeholder="City"
                          type="text"
                          value={shippingAddress.city}
                        />
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("state")}
                          placeholder="State"
                          type="text"
                          value={shippingAddress.state}
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("zip")}
                          placeholder="ZIP code"
                          type="text"
                          value={shippingAddress.zip}
                        />
                        <select
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("country")}
                          value={shippingAddress.country}
                        >
                          <option value="US">United States</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("phone")}
                          placeholder="Phone number"
                          type="tel"
                          value={shippingAddress.phone}
                        />
                        <input
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text-dark focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-[#1f1629] dark:text-white"
                          onChange={handleShippingChange("email")}
                          placeholder="Email address"
                          type="email"
                          value={shippingAddress.email}
                        />
                      </div>
                      <button
                        className="mt-2 w-full rounded-lg border border-primary bg-white py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-transparent"
                        disabled={!isShippingAddressComplete || isFetchingRates}
                        onClick={handleFetchRates}
                        type="button"
                      >
                        {isFetchingRates ? "Fetching rates..." : "Get Shipping Rates"}
                      </button>
                      {shippingError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                          {shippingError}
                        </div>
                      ) : null}
                      {shippingRates.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {shippingRates.map((rate) => (
                            <label
                              className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm transition-colors ${
                                rate.rateId === selectedRateId
                                  ? "border-primary bg-white text-text-dark dark:bg-[#1f1629] dark:text-white"
                                  : "border-gray-200 bg-transparent text-gray-600 dark:border-gray-600 dark:text-gray-300"
                              }`}
                              key={rate.rateId}
                            >
                              <span className="flex flex-col">
                                <span className="font-semibold">
                                  {rate.provider} · {rate.serviceName}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {rate.estimatedDays !== null ? `${rate.estimatedDays} days` : rate.durationTerms || "Estimated delivery"}
                                </span>
                              </span>
                              <span className="flex items-center gap-2">
                                <span className="font-semibold">
                                  ${getDisplayAmount(rate).toFixed(2)} {rate.currency}
                                </span>
                                <input
                                  checked={rate.rateId === selectedRateId}
                                  className="h-4 w-4 accent-primary"
                                  onChange={() => setSelectedRateId(rate.rateId)}
                                  type="radio"
                                />
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mb-6 flex items-center justify-between border-b border-gray-300 pb-4 dark:border-gray-600">
                    <h2 className="text-2xl font-bold text-text-dark dark:text-white">Order Summary</h2>
                    <span className="material-symbols-outlined text-gray-400">receipt_long</span>
                  </div>
                  <div className="mb-6 flex flex-col gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                      <span className="font-bold text-text-dark dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Shipping Estimate</span>
                      <span className="font-semibold text-text-dark dark:text-white">
                        {selectedRate ? `$${getDisplayAmount(selectedRate).toFixed(2)}` : "Select shipping"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Tax</span>
                      <span className="font-bold text-text-dark dark:text-white">$0.00</span>
                    </div>
                  </div>
                  <div className="mb-6 border-t border-dashed border-gray-400 pt-4 dark:border-gray-500">
                    <div className="flex items-end justify-between">
                      <span className="text-base font-bold text-text-dark dark:text-white">Total</span>
                      <span className="text-3xl font-black text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    className="group relative w-full overflow-hidden rounded-lg bg-primary py-4 text-white shadow-lg transition-transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={lineItems.length === 0 || isCheckingOut}
                    onClick={handleCheckout}
                    type="button"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 text-lg font-bold tracking-wide">
                      {isCheckingOut ? "Starting Checkout..." : "Proceed to Checkout"}
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                    <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                  </button>
                  {checkoutError ? (
                    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                      {checkoutError}
                    </div>
                  ) : null}
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
