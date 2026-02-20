import { useEffect, useState } from "react"

export type CartItem = {
  productId: string
  quantity: number
  option?: string
  note?: string
}

const storageKey = "black-eagle-cart"

const isBrowser = typeof window !== "undefined"
const listeners = new Set<(items: CartItem[]) => void>()

const readCart = (): CartItem[] => {
  if (!isBrowser) {
    return []
  }
  const stored = window.localStorage.getItem(storageKey)
  if (!stored) {
    return []
  }
  try {
    const parsed = JSON.parse(stored) as CartItem[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return []
    }
    return parsed
  } catch {
    return []
  }
}

const writeCart = (items: CartItem[]) => {
  if (!isBrowser) {
    return
  }
  window.localStorage.setItem(storageKey, JSON.stringify(items))
  listeners.forEach((listener) => listener(items))
}

const itemKey = (item: CartItem) => `${item.productId}::${item.option ?? ""}`

export const getCart = () => readCart()

export const saveCart = (items: CartItem[]) => writeCart(items)

export const subscribeCart = (listener: (items: CartItem[]) => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

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
  if (quantity <= 0) {
    const next = items.filter((item) => !(item.productId === productId && item.option === option))
    writeCart(next)
    return next
  }
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
  return next
}

export const getCartCount = () => readCart().reduce((total, item) => total + item.quantity, 0)

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(() => readCart())

  useEffect(() => {
    const unsubscribe = subscribeCart(setItems)
    if (!isBrowser) return unsubscribe
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return
      setItems(readCart())
    }
    window.addEventListener("storage", handleStorage)
    return () => {
      window.removeEventListener("storage", handleStorage)
      unsubscribe()
    }
  }, [])

  return items
}
