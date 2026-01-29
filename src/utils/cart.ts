export type CartItem = {
  productId: string
  quantity: number
  option?: string
  note?: string
}

const storageKey = "black-eagle-cart"

const defaultCart: CartItem[] = [
  { productId: "black-eagle-recurve", quantity: 1, note: "45lb Draw • Walnut Finish" },
  { productId: "leather-arm-guard", quantity: 1, note: "Aged Brown • Standard Fit" },
]

const isBrowser = typeof window !== "undefined"

const readCart = (): CartItem[] => {
  if (!isBrowser) {
    return defaultCart
  }
  const stored = window.localStorage.getItem(storageKey)
  if (!stored) {
    return defaultCart
  }
  try {
    const parsed = JSON.parse(stored) as CartItem[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return defaultCart
    }
    return parsed
  } catch {
    return defaultCart
  }
}

const writeCart = (items: CartItem[]) => {
  if (!isBrowser) {
    return
  }
  window.localStorage.setItem(storageKey, JSON.stringify(items))
}

const itemKey = (item: CartItem) => `${item.productId}::${item.option ?? ""}`

export const getCart = () => readCart()

export const saveCart = (items: CartItem[]) => writeCart(items)

export const addToCart = (item: CartItem) => {
  const items = readCart()
  const key = itemKey(item)
  const existingIndex = items.findIndex((entry) => itemKey(entry) === key)
  if (existingIndex >= 0) {
    const existing = items[existingIndex]
    const merged = {
      ...existing,
      quantity: existing.quantity + item.quantity,
      note: item.note ?? existing.note,
    }
    const next = [...items]
    next[existingIndex] = merged
    writeCart(next)
    return next
  }
  const next = [...items, item]
  writeCart(next)
  return next
}

export const updateCartItemQuantity = (productId: string, option: string | undefined, quantity: number) => {
  const items = readCart()
  const next = items.map((item) => {
    if (item.productId !== productId || item.option !== option) {
      return item
    }
    return { ...item, quantity }
  })
  writeCart(next)
  return next
}

export const removeFromCart = (productId: string, option?: string) => {
  const items = readCart()
  const next = items.filter((item) => !(item.productId === productId && item.option === option))
  writeCart(next)
  return next.length === 0 ? defaultCart : next
}
