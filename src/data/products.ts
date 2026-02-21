import { useEffect, useState } from "react"
import { initializeApp, type FirebaseApp } from "firebase/app"
import { getAuth, signInWithEmailAndPassword, signOut, type Auth } from "firebase/auth"
import { getFunctions, httpsCallable, type Functions } from "firebase/functions"
import {
  addDoc,
  collection,
  type DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
  serverTimestamp,
  type Firestore,
  updateDoc,
} from "firebase/firestore"

export type Product = {
  id: string
  name: string
  category: "Recurve Bows" | "Longbows" | "Strings" | "Accessories"
  price: number
  summary: string
  description: string
  image: string
  images: string[]
  badge?: string
  featured?: boolean
  stockLevel?: number
  typeLabel: string
  drawWeight: string
  length: string
  material: string
  drawWeightOptions: string[]
}

export const productCategories = ["Recurve Bows", "Longbows", "Strings", "Accessories"] as const

export const products: Product[] = [
  {
    id: "regal-recurve",
    name: "The Regal Recurve",
    category: "Recurve Bows",
    price: 450,
    summary: "Hand-carved riser with maple limbs for smooth draw.",
    description:
      "A refined recurve crafted for dependable daily shooting. The Regal Recurve blends maple laminations with a balanced limb profile for a smooth draw and crisp release.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GdopQVgbjgo4A3xTeZmsLRxWufVCKRgyBhRbyAuYfZSAmi4KnUm3LqWeu0TOptKTrREKQvIiwQn2CiOg9VRNu8H2wySGurT12L2d5E1KVHFubtB9gpj-ij9bdDhxhO2DIub9CjIzW_XRMeFIxT2DGsGT566pIgQ9ayJnToDfrLYbP2pPYQ3PbZC3vVIKc9eCcHm1JEj4GWN4Jgw3EP5C0JXPwR6AUfihz-0mNH-6WeIuogOoWx-6tiwVnvJ7TCsgfPBRPPFCp8s",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GdopQVgbjgo4A3xTeZmsLRxWufVCKRgyBhRbyAuYfZSAmi4KnUm3LqWeu0TOptKTrREKQvIiwQn2CiOg9VRNu8H2wySGurT12L2d5E1KVHFubtB9gpj-ij9bdDhxhO2DIub9CjIzW_XRMeFIxT2DGsGT566pIgQ9ayJnToDfrLYbP2pPYQ3PbZC3vVIKc9eCcHm1JEj4GWN4Jgw3EP5C0JXPwR6AUfihz-0mNH-6WeIuogOoWx-6tiwVnvJ7TCsgfPBRPPFCp8s",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zoj9j90iy1jd16-cA5oWCAAwY4R3dKGEYOgsVZTIkNNWoMq1cbUSLqFCtA1arug8XN87E-RzaoWY3HkQiZmeAYGVtlIVkFLpTeCbNBod4f0CM3g5ogTwqA5Y7FwvvsjGpDZA4345C49J1c4XKkGRRiHb4iNHcX0rAQWb1GDzkP-wawktU4kYO-0gvvUI-O_ltmfs-aDFyvnsZ4fE1Q6dl7zjeG_cCRaXzvlVW5qfduA_pm78BiTi-HqXDLZVeGX4a7juFf0hSCU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIyI3j_6rnF3ZmC0Qdt-GznQqtLHZaL_J-1Y5RGDdpWrS6wz0TOQ7FSCyHBiXxLSrSxdxUgqdp0OQXwJWW52KW64HIIeHm_-E-WbX5g5Ew0sfEtMps2137nhqGYtGx-0vsm0vZUx7K-Kzep1TbTcpW2tmGPic0ibHfA5P5I1RM_ycUMAbSaFefaROZlA5q_OzAyVcmgl3yD0cJoeq6ZvoEq0JhFAX2rKBHqHXR7Sb4dtV2Mm5CjiEynigCM12rFxzFsTefXFtAhdg",
    ],
    badge: "Best Seller",
    typeLabel: "Traditional Recurve",
    drawWeight: "40 - 55 lbs",
    length: "60 Inches",
    material: "Maple Core & Fiberglass",
    drawWeightOptions: ["40 lbs (Target)", "45 lbs (Field)", "55 lbs (Hunting)"],
  },
  {
    id: "highland-longbow",
    name: "Highland Longbow",
    category: "Longbows",
    price: 520,
    summary: "Classic design with reinforced tips for modern strings.",
    description:
      "A classic Highland profile built for stability and a smooth release. Reinforced tips support modern strings while preserving the feel of a traditional longbow.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAH8oAVbR9BGlL1sqP3cm2RnXuvJTu6Pa0UbJhZJ4vNn5Zv26Q3v7ShU3hYdcbbzg6nqSNG43VhA8_ySrd-uJ1dqSQWbPqqrkmpr5RM2-OeAxcWIwY7QBujPwrZWU7W6rdCOrpCJstwlOD58Buxs1tJJfi3dvLC9H1Iq9j0lbDkXvkU163lp-9HW3bPn7PKtDfi6lQq1f1bw3Ni1wLzpnszdyg01jDO0TElhq16F0QGrOX-0x06EL8vmw3du0JwSjpgdvgkfu6luis",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYHMPO1UjOoPJROVfy57B7Yw4U6o8tFKHHq7b8HYqzQBNeFqRdmBH5D6ZkfxliC74lNLrCJN3neSQykmo6AuMojjo0nAU_I3eSftA9BcaY3almwToeWbxx0UQSK86NkZRvKwD71tT7cSOlGuSvsM25gcqvfCnTQL_87cTPOI53V44jSoyJeFqNuns73xgVO-YoOF85rEbTesGWPy-MN75qbqKKQPWtuM0WOszRfJW5EszUTIVOVpjLhKRvH3-WiHdNpHRK9ym5EuM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCojb62glcqiRqNz7UBZzXPq31TeOzUkCyvoCypk3VWkfVNdgbght2demhljwWbWmVHN26-zU3cIshTzWOQIfuQAVBEjW7_PIm5uzLCSVrMKxzsY7XEsJnJw9M3XgRGQahLOHzDxrKPBKo1t1IMLITcKydLMaS_vQl-Q-3CIImouQzRReiszz3HLLhMbcKW6t3-NcmXwMX4SHLywCDGMKnRKiqNJX4ScGkb2CuukCrz4vdJ9JxDN1jDqOxjYNoLPwP2Z7TGVvvO5bU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjx6Zl1j2oGGTzyvSb3gIKhHpZPRIK1yqvOnsp_PVJ2aTQF-6FE8uSeFjKDDqheN-RpvinUZ31Wnp6bidZHYSsP5as-CSZ_2xFt3ApdzrPy6weRTZkl3rwaXmD6L5o3H6abFdCgdx7x0oJBHtwHYYNOQ422zVNojOlW5MI_yMWKxkBkK8QvI0Jf_qJvTqhCMGx3nNsPxzA5sHg7amLEXFpRPQAYZNI1lzOGP_0ZiW-frOHoDJmfZduuMCQimx-TpNniHKo8lkoPnQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDi1x-W8C5Y_OC89JqLjLDA-FHvgvwjc8PmKE9YbNq_ZbTkAhTcBhRIcTo12QAjtpchouZxeZkBnFJlXTtx8M9j7SyO-ySEkS490l0M6f3UnVcBcZ7o6GImVd080CGX3-nuxrCAFk85Hj4pQkj-WpD6Nfqof82zU02dwzbTGlsqBN9YzwbnkROsYbFkvdME4zR4xZTk6N8CQtvTilk0oYwZHY3hUgSR9WAifrBIQ7tQD42LSByTIZHWtnUy0T1lFrEp7VaA879IMnI",
    ],
    typeLabel: "English Longbow",
    drawWeight: "45 - 60 lbs",
    length: "72 Inches",
    material: "Pacific Yew & White Ash",
    drawWeightOptions: ["45 lbs (Target)", "50 lbs (Hunting)", "60 lbs (War Bow)"],
  },
  {
    id: "hunters-quiver",
    name: "Hunter's Quiver",
    category: "Accessories",
    price: 120,
    summary: "Genuine leather back quiver with brass fittings.",
    description:
      "A handcrafted leather back quiver with brass fittings. Built to keep arrows secure while staying comfortable across long days in the field.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0VRBHtO_pYVOqdfuSKijmtRkm1YoZsyfzYHFtHh28z6oTtsSqXvcYscvXkI4B5OByXKPkuN1L3tI5MM7bOgbdLRhvohih4D8OgM2FH0GxTZpJzgt3TwcdkxjgOcb0-8uwKmDo9ZMBNLXc77eL1M3jD0kNeRYof8Fu79m4Wa6raSGcf86MH9w4Ab8dm2nwn_ymOtf6dkx1XEX4mgJI3sn7gTmuiPmlum15IkGNibv_usn7p2cVOrzEVcCunmJ3ew0BZjnIV-m1Aac",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0VRBHtO_pYVOqdfuSKijmtRkm1YoZsyfzYHFtHh28z6oTtsSqXvcYscvXkI4B5OByXKPkuN1L3tI5MM7bOgbdLRhvohih4D8OgM2FH0GxTZpJzgt3TwcdkxjgOcb0-8uwKmDo9ZMBNLXc77eL1M3jD0kNeRYof8Fu79m4Wa6raSGcf86MH9w4Ab8dm2nwn_ymOtf6dkx1XEX4mgJI3sn7gTmuiPmlum15IkGNibv_usn7p2cVOrzEVcCunmJ3ew0BZjnIV-m1Aac",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    ],
    typeLabel: "Leather Accessory",
    drawWeight: "Standard Fit",
    length: "24 Inches",
    material: "Full Grain Leather",
    drawWeightOptions: ["Right Shoulder", "Left Shoulder"],
  },
  {
    id: "beeswax-string",
    name: "Beeswax String",
    category: "Strings",
    price: 25,
    summary: "Pre-waxed Flemish twist string for longevity.",
    description:
      "A pre-waxed Flemish twist string built for consistent performance. Ideal for traditional bows that need a quiet, reliable string.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRQ2hZ9OOR7XsWU0KvPoe5CfDKoMOuERCKE-up_wc3TTfv8F7depdeX1h89H_FdAUihzbmYrkd-RPGqqXnijz1_EZxCnuFSxTk7n7opz0lThEcXvwvPcmZFFzINCjVGRUoRbLmEYHBok6KQS-JvV22sw9Cxgj6nO_oDE1AyMJ8mXs5vzI4tIVCpSaDt5Z9w_quGUZfT7wXSeCJ-FNxsjwb5z9jKJyYdZ0KvVx3EOSA0V84lPI6zNIn8JaoebMul_4ekn6Z9y2UvSU",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRQ2hZ9OOR7XsWU0KvPoe5CfDKoMOuERCKE-up_wc3TTfv8F7depdeX1h89H_FdAUihzbmYrkd-RPGqqXnijz1_EZxCnuFSxTk7n7opz0lThEcXvwvPcmZFFzINCjVGRUoRbLmEYHBok6KQS-JvV22sw9Cxgj6nO_oDE1AyMJ8mXs5vzI4tIVCpSaDt5Z9w_quGUZfT7wXSeCJ-FNxsjwb5z9jKJyYdZ0KvVx3EOSA0V84lPI6zNIn8JaoebMul_4ekn6Z9y2UvSU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    typeLabel: "Traditional String",
    drawWeight: "Compatible 40-60 lbs",
    length: "Custom Length",
    material: "B-50 Dacron",
    drawWeightOptions: ["60 in Bow", "62 in Bow", "64 in Bow"],
  },
  {
    id: "cedar-arrows",
    name: "Cedar Arrows",
    category: "Accessories",
    price: 85,
    summary: "Matched dozen Port Orford Cedar shafts.",
    description:
      "Matched Port Orford Cedar shafts with classic feather fletching. Tuned for traditional bows and smooth flight.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC0VRBHtO_pYVOqdfuSKijmtRkm1YoZsyfzYHFtHh28z6oTtsSqXvcYscvXkI4B5OByXKPkuN1L3tI5MM7bOgbdLRhvohih4D8OgM2FH0GxTZpJzgt3TwcdkxjgOcb0-8uwKmDo9ZMBNLXc77eL1M3jD0kNeRYof8Fu79m4Wa6raSGcf86MH9w4Ab8dm2nwn_ymOtf6dkx1XEX4mgJI3sn7gTmuiPmlum15IkGNibv_usn7p2cVOrzEVcCunmJ3ew0BZjnIV-m1Aac",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAH8oAVbR9BGlL1sqP3cm2RnXuvJTu6Pa0UbJhZJ4vNn5Zv26Q3v7ShU3hYdcbbzg6nqSNG43VhA8_ySrd-uJ1dqSQWbPqqrkmpr5RM2-OeAxcWIwY7QBujPwrZWU7W6rdCOrpCJstwlOD58Buxs1tJJfi3dvLC9H1Iq9j0lbDkXvkU163lp-9HW3bPn7PKtDfi6lQq1f1bw3Ni1wLzpnszdyg01jDO0TElhq16F0QGrOX-0x06EL8vmw3du0JwSjpgdvgkfu6luis",
    ],
    typeLabel: "Traditional Arrows",
    drawWeight: "35 - 55 lbs",
    length: "29 Inches",
    material: "Port Orford Cedar",
    drawWeightOptions: ["35-40 lbs", "45-50 lbs", "55 lbs"],
  },
  {
    id: "ranger-arm-guard",
    name: "Ranger Arm Guard",
    category: "Accessories",
    price: 45,
    summary: "Protective leather bracer with lace-up back.",
    description:
      "A lace-up leather bracer that protects the forearm while keeping a traditional look. Softened leather keeps the fit comfortable.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoAOvpul-f9uY987YiwedBAP-aiMOp8keEyZ6Q08-YVhR4Vz1mrXyDCihb18fIo2xEvGCoNNTX9Yo-hUKOlcP0Dv7uCywj-Do-2JgEZJUjlRnc54oFZacDOasXZce-VeYBqLeoA-mktxqjOHFeJdYWM9-r_Z9Q63XJ_ceBZDIvLIicynOaQK2gc44P56q5X1OaQeW5Gbm0hLp7XBivK3BT9cQEVIJqoPNnAaeDg87F5yXg7s6DBZ3YFcolTmeArMEa3pEpZHPNyig",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoAOvpul-f9uY987YiwedBAP-aiMOp8keEyZ6Q08-YVhR4Vz1mrXyDCihb18fIo2xEvGCoNNTX9Yo-hUKOlcP0Dv7uCywj-Do-2JgEZJUjlRnc54oFZacDOasXZce-VeYBqLeoA-mktxqjOHFeJdYWM9-r_Z9Q63XJ_ceBZDIvLIicynOaQK2gc44P56q5X1OaQeW5Gbm0hLp7XBivK3BT9cQEVIJqoPNnAaeDg87F5yXg7s6DBZ3YFcolTmeArMEa3pEpZHPNyig",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    ],
    typeLabel: "Leather Accessory",
    drawWeight: "Standard Fit",
    length: "11 Inches",
    material: "Oil-Tanned Leather",
    drawWeightOptions: ["Standard Fit", "Long Fit"],
  },
  {
    id: "field-targets",
    name: "Field Targets",
    category: "Accessories",
    price: 15,
    summary: "Regulation size paper targets for practice.",
    description:
      "Regulation size field targets for consistent practice sessions. Crisp rings and durable stock for repeated arrow pulls.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSjbqH2nmFi2uibzK7UcHONPwhRdFCEF1JamMVSsAUAG0dEmcwYvvoApwz5nXzXPEuC-ZJthcLVLLrEzQ-EvhRXfC0GxBPB2P9L9W6g1zirc71EdX2KKu9GB3GZ5S2fa8yBFPYJICHFN5lXc1OSyBj4d4DRDNWwHbrkSoLvHGAoLrZOAUY6Pc4rEJLYV6e96GXQDRmQHLV-zY_1CTNiiJkkpU00VOyRSDeV8kmaArRVNhyzR0LwYChODm8W40tKBiwRu61b28VTxg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCSjbqH2nmFi2uibzK7UcHONPwhRdFCEF1JamMVSsAUAG0dEmcwYvvoApwz5nXzXPEuC-ZJthcLVLLrEzQ-EvhRXfC0GxBPB2P9L9W6g1zirc71EdX2KKu9GB3GZ5S2fa8yBFPYJICHFN5lXc1OSyBj4d4DRDNWwHbrkSoLvHGAoLrZOAUY6Pc4rEJLYV6e96GXQDRmQHLV-zY_1CTNiiJkkpU00VOyRSDeV8kmaArRVNhyzR0LwYChODm8W40tKBiwRu61b28VTxg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    typeLabel: "Target Accessory",
    drawWeight: "Universal",
    length: "20 Inches",
    material: "Heavyweight Paper",
    drawWeightOptions: ["Single Pack", "5 Pack", "10 Pack"],
  },
  {
    id: "shooting-glove",
    name: "Shooting Glove",
    category: "Accessories",
    price: 30,
    summary: "Soft buckskin three-finger glove.",
    description:
      "A supple three-finger glove made from buckskin to protect your draw hand without sacrificing feel.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvnli8LWJ1YNarMvtJI4xoyM-DIqBlzuX2NGl5xpytfNqvvmmYQYMzpJZM0MnDjc0CAbaL8yBeQReic60wAfRiHKRjZLUAWuDsN7zQbWCHKujK_mKjn3-eKq7sn1BSkTRSHQgdJbMlZF8HH3NaaAFZdVV-X6fYoiugMg8xXRaonH13Prc5vEUhDA6rNS79YtxDJ-jwjIAUQR91NbwKawBhh5dOBjIFXYR4pGZELciAxUU8RnAVey9UQ9_TomOAdVBjZAvHMKECRvc",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvnli8LWJ1YNarMvtJI4xoyM-DIqBlzuX2NGl5xpytfNqvvmmYQYMzpJZM0MnDjc0CAbaL8yBeQReic60wAfRiHKRjZLUAWuDsN7zQbWCHKujK_mKjn3-eKq7sn1BSkTRSHQgdJbMlZF8HH3NaaAFZdVV-X6fYoiugMg8xXRaonH13Prc5vEUhDA6rNS79YtxDJ-jwjIAUQR91NbwKawBhh5dOBjIFXYR4pGZELciAxUU8RnAVey9UQ9_TomOAdVBjZAvHMKECRvc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    ],
    typeLabel: "Leather Accessory",
    drawWeight: "Standard Fit",
    length: "One Size",
    material: "Buckskin Leather",
    drawWeightOptions: ["Right Hand", "Left Hand"],
  },
  {
    id: "timber-wolf",
    name: "The Timber Wolf",
    category: "Recurve Bows",
    price: 650,
    summary: '60" Recurve • Maple Core',
    description:
      "A rugged recurve built for reliability in the field. Maple core laminations and a crisp limb profile deliver power without sacrificing smoothness.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIyI3j_6rnF3ZmC0Qdt-GznQqtLHZaL_J-1Y5RGDdpWrS6wz0TOQ7FSCyHBiXxLSrSxdxUgqdp0OQXwJWW52KW64HIIeHm_-E-WbX5g5Ew0sfEtMps2137nhqGYtGx-0vsm0vZUx7K-Kzep1TbTcpW2tmGPic0ibHfA5P5I1RM_ycUMAbSaFefaROZlA5q_OzAyVcmgl3yD0cJoeq6ZvoEq0JhFAX2rKBHqHXR7Sb4dtV2Mm5CjiEynigCM12rFxzFsTefXFtAhdg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIyI3j_6rnF3ZmC0Qdt-GznQqtLHZaL_J-1Y5RGDdpWrS6wz0TOQ7FSCyHBiXxLSrSxdxUgqdp0OQXwJWW52KW64HIIeHm_-E-WbX5g5Ew0sfEtMps2137nhqGYtGx-0vsm0vZUx7K-Kzep1TbTcpW2tmGPic0ibHfA5P5I1RM_ycUMAbSaFefaROZlA5q_OzAyVcmgl3yD0cJoeq6ZvoEq0JhFAX2rKBHqHXR7Sb4dtV2Mm5CjiEynigCM12rFxzFsTefXFtAhdg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zoj9j90iy1jd16-cA5oWCAAwY4R3dKGEYOgsVZTIkNNWoMq1cbUSLqFCtA1arug8XN87E-RzaoWY3HkQiZmeAYGVtlIVkFLpTeCbNBod4f0CM3g5ogTwqA5Y7FwvvsjGpDZA4345C49J1c4XKkGRRiHb4iNHcX0rAQWb1GDzkP-wawktU4kYO-0gvvUI-O_ltmfs-aDFyvnsZ4fE1Q6dl7zjeG_cCRaXzvlVW5qfduA_pm78BiTi-HqXDLZVeGX4a7juFf0hSCU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    featured: true,
    typeLabel: "Traditional Recurve",
    drawWeight: "45 - 60 lbs",
    length: "60 Inches",
    material: "Maple Core & Fiberglass",
    drawWeightOptions: ["45 lbs (Target)", "50 lbs (Field)", "60 lbs (Hunting)"],
  },
  {
    id: "night-stalker",
    name: "The Night Stalker",
    category: "Longbows",
    price: 725,
    summary: '64" Longbow • Walnut/Carbon',
    description:
      "A sleek longbow with walnut laminations and carbon reinforcement. Built for archers who demand stability and refined performance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD23eXzSpC2r9jU2884knX_-ESk6JMUhK0i0OKJvxT_9NrbUt64gke4bpE8m1Ouo1TRgOMlxZuI4CUzgN1YuyQTA8Go-do3OdZc_mXdyTkdVncI7NWpflXFnNrqTPqGm-bM5EFHSV7AUANz54EuxMugOhOPqzCxLrwi_NNXJK4x7lcr1ix4ULcdFUIq1qukQFUKqWmc4hCloUbkkNWwQIUx1G6foh7Do8hcaeHUEx5kfdfqG2-S1iBzMyEkRi4L5Ksy3xWk5gnYqQQ",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD23eXzSpC2r9jU2884knX_-ESk6JMUhK0i0OKJvxT_9NrbUt64gke4bpE8m1Ouo1TRgOMlxZuI4CUzgN1YuyQTA8Go-do3OdZc_mXdyTkdVncI7NWpflXFnNrqTPqGm-bM5EFHSV7AUANz54EuxMugOhOPqzCxLrwi_NNXJK4x7lcr1ix4ULcdFUIq1qukQFUKqWmc4hCloUbkkNWwQIUx1G6foh7Do8hcaeHUEx5kfdfqG2-S1iBzMyEkRi4L5Ksy3xWk5gnYqQQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYHMPO1UjOoPJROVfy57B7Yw4U6o8tFKHHq7b8HYqzQBNeFqRdmBH5D6ZkfxliC74lNLrCJN3neSQykmo6AuMojjo0nAU_I3eSftA9BcaY3almwToeWbxx0UQSK86NkZRvKwD71tT7cSOlGuSvsM25gcqvfCnTQL_87cTPOI53V44jSoyJeFqNuns73xgVO-YoOF85rEbTesGWPy-MN75qbqKKQPWtuM0WOszRfJW5EszUTIVOVpjLhKRvH3-WiHdNpHRK9ym5EuM",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjx6Zl1j2oGGTzyvSb3gIKhHpZPRIK1yqvOnsp_PVJ2aTQF-6FE8uSeFjKDDqheN-RpvinUZ31Wnp6bidZHYSsP5as-CSZ_2xFt3ApdzrPy6weRTZkl3rwaXmD6L5o3H6abFdCgdx7x0oJBHtwHYYNOQ422zVNojOlW5MI_yMWKxkBkK8QvI0Jf_qJvTqhCMGx3nNsPxzA5sHg7amLEXFpRPQAYZNI1lzOGP_0ZiW-frOHoDJmfZduuMCQimx-TpNniHKo8lkoPnQ",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDi1x-W8C5Y_OC89JqLjLDA-FHvgvwjc8PmKE9YbNq_ZbTkAhTcBhRIcTo12QAjtpchouZxeZkBnFJlXTtx8M9j7SyO-ySEkS490l0M6f3UnVcBcZ7o6GImVd080CGX3-nuxrCAFk85Hj4pQkj-WpD6Nfqof82zU02dwzbTGlsqBN9YzwbnkROsYbFkvdME4zR4xZTk6N8CQtvTilk0oYwZHY3hUgSR9WAifrBIQ7tQD42LSByTIZHWtnUy0T1lFrEp7VaA879IMnI",
    ],
    featured: true,
    typeLabel: "Modern Longbow",
    drawWeight: "45 - 60 lbs",
    length: "64 Inches",
    material: "Walnut & Carbon",
    drawWeightOptions: ["45 lbs (Target)", "50 lbs (Hunting)", "60 lbs (War Bow)"],
  },
  {
    id: "heritage",
    name: "The Heritage",
    category: "Recurve Bows",
    price: 895,
    summary: '58" Recurve • Exotic Woods',
    description:
      "A premium recurve made from exotic laminations and hand-finished details. Crafted for collectors and devoted traditionalists.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zoj9j90iy1jd16-cA5oWCAAwY4R3dKGEYOgsVZTIkNNWoMq1cbUSLqFCtA1arug8XN87E-RzaoWY3HkQiZmeAYGVtlIVkFLpTeCbNBod4f0CM3g5ogTwqA5Y7FwvvsjGpDZA4345C49J1c4XKkGRRiHb4iNHcX0rAQWb1GDzkP-wawktU4kYO-0gvvUI-O_ltmfs-aDFyvnsZ4fE1Q6dl7zjeG_cCRaXzvlVW5qfduA_pm78BiTi-HqXDLZVeGX4a7juFf0hSCU",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zoj9j90iy1jd16-cA5oWCAAwY4R3dKGEYOgsVZTIkNNWoMq1cbUSLqFCtA1arug8XN87E-RzaoWY3HkQiZmeAYGVtlIVkFLpTeCbNBod4f0CM3g5ogTwqA5Y7FwvvsjGpDZA4345C49J1c4XKkGRRiHb4iNHcX0rAQWb1GDzkP-wawktU4kYO-0gvvUI-O_ltmfs-aDFyvnsZ4fE1Q6dl7zjeG_cCRaXzvlVW5qfduA_pm78BiTi-HqXDLZVeGX4a7juFf0hSCU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIyI3j_6rnF3ZmC0Qdt-GznQqtLHZaL_J-1Y5RGDdpWrS6wz0TOQ7FSCyHBiXxLSrSxdxUgqdp0OQXwJWW52KW64HIIeHm_-E-WbX5g5Ew0sfEtMps2137nhqGYtGx-0vsm0vZUx7K-Kzep1TbTcpW2tmGPic0ibHfA5P5I1RM_ycUMAbSaFefaROZlA5q_OzAyVcmgl3yD0cJoeq6ZvoEq0JhFAX2rKBHqHXR7Sb4dtV2Mm5CjiEynigCM12rFxzFsTefXFtAhdg",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    featured: true,
    typeLabel: "Collector Recurve",
    drawWeight: "45 - 60 lbs",
    length: "58 Inches",
    material: "Exotic Laminations",
    drawWeightOptions: ["45 lbs (Target)", "50 lbs (Field)", "60 lbs (Hunting)"],
  },
  {
    id: "black-eagle-recurve",
    name: "The Black Eagle Recurve",
    category: "Recurve Bows",
    price: 450,
    summary: "45lb Draw • Walnut Finish",
    description:
      "A signature recurve with walnut finish and a steady draw. Ideal for archers looking for an everyday bow with heritage craftsmanship.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBk0DAGUe6m7FonMagWeTqeDRhr57VmHCZ2DkX6hdodyo40Z9I_Bq332QAkc9Y1GEYnwFWBa5g4e9N_IOoLMxeAXvkJ6w6dS-W3xIJEUauSq6cuH434a4phCOc2PJfu8r2bCjM-0Tu_vsZGhfn5ypC9IUOjlGx1H7PEs7QNQKcpsz6T3BIJejdhHkmpP2j5kok8TI9xud0lHHnWnlEtPz7wwWM29bbMZMOm3wOAkczOqo7sfJNDJndWv_c3j74OFh9UvEPBaMESnWw",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA_GdopQVgbjgo4A3xTeZmsLRxWufVCKRgyBhRbyAuYfZSAmi4KnUm3LqWeu0TOptKTrREKQvIiwQn2CiOg9VRNu8H2wySGurT12L2d5E1KVHFubtB9gpj-ij9bdDhxhO2DIub9CjIzW_XRMeFIxT2DGsGT566pIgQ9ayJnToDfrLYbP2pPYQ3PbZC3vVIKc9eCcHm1JEj4GWN4Jgw3EP5C0JXPwR6AUfihz-0mNH-6WeIuogOoWx-6tiwVnvJ7TCsgfPBRPPFCp8s",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4zoj9j90iy1jd16-cA5oWCAAwY4R3dKGEYOgsVZTIkNNWoMq1cbUSLqFCtA1arug8XN87E-RzaoWY3HkQiZmeAYGVtlIVkFLpTeCbNBod4f0CM3g5ogTwqA5Y7FwvvsjGpDZA4345C49J1c4XKkGRRiHb4iNHcX0rAQWb1GDzkP-wawktU4kYO-0gvvUI-O_ltmfs-aDFyvnsZ4fE1Q6dl7zjeG_cCRaXzvlVW5qfduA_pm78BiTi-HqXDLZVeGX4a7juFf0hSCU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCIyI3j_6rnF3ZmC0Qdt-GznQqtLHZaL_J-1Y5RGDdpWrS6wz0TOQ7FSCyHBiXxLSrSxdxUgqdp0OQXwJWW52KW64HIIeHm_-E-WbX5g5Ew0sfEtMps2137nhqGYtGx-0vsm0vZUx7K-Kzep1TbTcpW2tmGPic0ibHfA5P5I1RM_ycUMAbSaFefaROZlA5q_OzAyVcmgl3yD0cJoeq6ZvoEq0JhFAX2rKBHqHXR7Sb4dtV2Mm5CjiEynigCM12rFxzFsTefXFtAhdg",
    ],
    typeLabel: "Traditional Recurve",
    drawWeight: "45 lbs",
    length: "60 Inches",
    material: "Walnut & Maple",
    drawWeightOptions: ["45 lbs (Standard)", "50 lbs (Field)"],
  },
  {
    id: "leather-arm-guard",
    name: "Leather Arm Guard",
    category: "Accessories",
    price: 35,
    summary: "Aged Brown • Standard Fit",
    description:
      "A classic leather arm guard with a broken-in feel. Provides reliable protection for the traditional archer.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDoAOvpul-f9uY987YiwedBAP-aiMOp8keEyZ6Q08-YVhR4Vz1mrXyDCihb18fIo2xEvGCoNNTX9Yo-hUKOlcP0Dv7uCywj-Do-2JgEZJUjlRnc54oFZacDOasXZce-VeYBqLeoA-mktxqjOHFeJdYWM9-r_Z9Q63XJ_ceBZDIvLIicynOaQK2gc44P56q5X1OaQeW5Gbm0hLp7XBivK3BT9cQEVIJqoPNnAaeDg87F5yXg7s6DBZ3YFcolTmeArMEa3pEpZHPNyig",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    ],
    typeLabel: "Leather Accessory",
    drawWeight: "Standard Fit",
    length: "11 Inches",
    material: "Aged Leather",
    drawWeightOptions: ["Standard Fit", "Long Fit"],
  },
  {
    id: "bowstring-wax",
    name: "Bowstring Wax",
    category: "Accessories",
    price: 8,
    summary: "Traditional bowstring wax",
    description:
      "Natural bowstring wax for keeping fibers protected and quiet. Essential for long-term string maintenance.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRQ2hZ9OOR7XsWU0KvPoe5CfDKoMOuERCKE-up_wc3TTfv8F7depdeX1h89H_FdAUihzbmYrkd-RPGqqXnijz1_EZxCnuFSxTk7n7opz0lThEcXvwvPcmZFFzINCjVGRUoRbLmEYHBok6KQS-JvV22sw9Cxgj6nO_oDE1AyMJ8mXs5vzI4tIVCpSaDt5Z9w_quGUZfT7wXSeCJ-FNxsjwb5z9jKJyYdZ0KvVx3EOSA0V84lPI6zNIn8JaoebMul_4ekn6Z9y2UvSU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    typeLabel: "Maintenance",
    drawWeight: "Universal",
    length: "2 oz",
    material: "Natural Wax",
    drawWeightOptions: ["Single Tin", "2 Pack", "5 Pack"],
  },
  {
    id: "spare-string",
    name: "Spare String",
    category: "Strings",
    price: 18,
    summary: "Backup bowstring",
    description:
      "A spare bowstring tuned for traditional bows. Ideal for keeping a backup in your kit.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vIsAiI1e3Zt45EZrFSMdSH90wFm8_ZDt2jUlHoZ-AnmDd9IdDiWCs_ilDDtPy0KKlguMxDNn4ddiZ9XGORSc6p2f-atpT_HfykOw6TyNpKG4gK_m5O0scbbAWNY4m3PbhQ-e-SZibReaC7BuOlPqwc1-wN_736DIpkxWaZ_9CBtYc9618vseZom9BHAg-FDgOTCWsFHIWHD9oDOHXmWkbdrMPiRjqWm7N1u38xD86uX5Hwh7Cy0C55gQeM-Vyyv4rDDQohodJc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCRQ2hZ9OOR7XsWU0KvPoe5CfDKoMOuERCKE-up_wc3TTfv8F7depdeX1h89H_FdAUihzbmYrkd-RPGqqXnijz1_EZxCnuFSxTk7n7opz0lThEcXvwvPcmZFFzINCjVGRUoRbLmEYHBok6KQS-JvV22sw9Cxgj6nO_oDE1AyMJ8mXs5vzI4tIVCpSaDt5Z9w_quGUZfT7wXSeCJ-FNxsjwb5z9jKJyYdZ0KvVx3EOSA0V84lPI6zNIn8JaoebMul_4ekn6Z9y2UvSU",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3_Amy-nFFW9epi9EbxpCAehOqznyeMA3tebQvhQSwswSaFmtBxoySQwVBzCncLuBSpQVxsRCIoKmndgN6ALoCx11BfoCg0WIoLh6MUPPChJmvpx2a_FqUuuszl-gT2KxHTGHLx1O_syYdQCNe7MccHklKnKGyh5JzwX9nKOJevtrUSJfcZm2dLQlioRfjoiYIPU30LpgWSIf__sH-v7CSHq6HkJg1-bJTWvrQPa9srZv_2zFErILqSN1YvdUKB7U8Z7m5iOiCc7E",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I",
    ],
    typeLabel: "Traditional String",
    drawWeight: "Compatible 40-60 lbs",
    length: "Custom Length",
    material: "FastFlight",
    drawWeightOptions: ["60 in Bow", "62 in Bow", "64 in Bow"],
  },
  {
    id: "finger-tab",
    name: "Finger Tab",
    category: "Accessories",
    price: 12,
    summary: "Leather finger tab",
    description:
      "A smooth leather finger tab for clean releases. Offers traditional protection with minimal bulk.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzwS5NIHPCRy-PUBujFkQ0RUeprLJbibTWvNH7WHXW9HNbpo8-qaf7kjKXCt8u6WyD_rGWBDfsrBW9qKYLII1GskfDet2akpOc6iisWZ95N-byqNbTZVGhi0MXwaD-ZsqAKT491YkYVu0N2KNQkwUBHQQ0wzxvSfjgwNqSipUvot1J7_eiwHycfq2fM-5i3HcTSVVi3K44bD9Zta0xFNJ43g-YjBiGN0iGpa0AD6fiBdBXdryIjifaFn2nI22BWDisSiq0fwXmHLE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvnli8LWJ1YNarMvtJI4xoyM-DIqBlzuX2NGl5xpytfNqvvmmYQYMzpJZM0MnDjc0CAbaL8yBeQReic60wAfRiHKRjZLUAWuDsN7zQbWCHKujK_mKjn3-eKq7sn1BSkTRSHQgdJbMlZF8HH3NaaAFZdVV-X6fYoiugMg8xXRaonH13Prc5vEUhDA6rNS79YtxDJ-jwjIAUQR91NbwKawBhh5dOBjIFXYR4pGZELciAxUU8RnAVey9UQ9_TomOAdVBjZAvHMKECRvc",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8qMCYwVaPQJr1Wt7jWfB3OwnDzLJE9I44UL3cfqjjpaYQwp8MG9YA0YktUO4AoShyyuHsTlY08zocM3Fip7eck7SEE5VdMpkEjbeCSO1DfyKF8tL71mYTjD2Q2hUFSOzJe0WuVvs3-2TwPiIJwdIZEMTqParPUrEepVnxgtbCAGgkYTvQVcWzBn__mTt7SWKan0iLbimZES08aktRdUbtKT9dO-ePiFYsK02AhPTFsR4eLJ6jwT9CZPFNxw6CR9nvXPBHqVBmZEk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8",
    ],
    typeLabel: "Leather Accessory",
    drawWeight: "Standard Fit",
    length: "One Size",
    material: "Split Leather",
    drawWeightOptions: ["Right Hand", "Left Hand"],
  },
]

export const getProductById = (productId?: string) =>
  products.find((product) => product.id === productId)

export const featuredProducts = products.filter((product) => product.featured)

export const productsById = products.reduce<Record<string, Product>>((accumulator, product) => {
  accumulator[product.id] = product
  return accumulator
}, {})

type FirestoreProduct = Omit<Product, "id"> & {
  createdAt?: unknown
  updatedAt?: unknown
}

let cachedFirebaseApp: FirebaseApp | null = null
let cachedFirestore: Firestore | null = null
let cachedAuth: Auth | null = null
let cachedFunctions: Functions | null = null

const isBrowser = typeof window !== "undefined"

const getEnvValue = (key: string) => {
  if (!isBrowser) return ""
  const env = import.meta.env as Record<string, string | undefined>
  return env[key] ?? ""
}

export const getConfiguredStoreId = () => {
  const storeId = getEnvValue("VITE_STORE_ID").trim()
  return storeId.length > 0 ? storeId : null
}

const getFirebaseConfig = () => {
  const apiKey = getEnvValue("VITE_FIREBASE_API_KEY")
  const authDomain = getEnvValue("VITE_FIREBASE_AUTH_DOMAIN")
  const projectId = getEnvValue("VITE_FIREBASE_PROJECT_ID")
  const storageBucket = getEnvValue("VITE_FIREBASE_STORAGE_BUCKET")
  const messagingSenderId = getEnvValue("VITE_FIREBASE_MESSAGING_SENDER_ID")
  const appId = getEnvValue("VITE_FIREBASE_APP_ID")

  if (!apiKey || !authDomain || !projectId || !storageBucket || !messagingSenderId || !appId) {
    return null
  }

  return {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
  }
}

export const isFirebaseConfigured = () => Boolean(getFirebaseConfig())

const getFirestoreClient = () => {
  if (!isBrowser) return null
  if (cachedFirestore) return cachedFirestore

  const config = getFirebaseConfig()
  if (!config) return null

  if (!cachedFirebaseApp) {
    cachedFirebaseApp = initializeApp(config)
  }

  cachedFirestore = getFirestore(cachedFirebaseApp)
  return cachedFirestore
}

const getAuthClient = () => {
  if (!isBrowser) return null
  if (cachedAuth) return cachedAuth

  const config = getFirebaseConfig()
  if (!config) return null

  if (!cachedFirebaseApp) {
    cachedFirebaseApp = initializeApp(config)
  }

  cachedAuth = getAuth(cachedFirebaseApp)
  return cachedAuth
}

const getFunctionsClient = () => {
  if (!isBrowser) return null
  if (cachedFunctions) return cachedFunctions

  const config = getFirebaseConfig()
  if (!config) return null

  if (!cachedFirebaseApp) {
    cachedFirebaseApp = initializeApp(config)
  }

  cachedFunctions = getFunctions(cachedFirebaseApp)
  return cachedFunctions
}

export const signInFirebaseAdmin = async (email: string, password: string) => {
  const auth = getAuthClient()
  if (!auth) return
  await signInWithEmailAndPassword(auth, email, password)
}

export const signOutFirebaseAdmin = async () => {
  const auth = getAuthClient()
  if (!auth) return
  await signOut(auth)
}

export const getStoreAdminEmail = async () => {
  const storeId = getConfiguredStoreId()
  if (!storeId) return null
  const firestore = getFirestoreClient()
  if (!firestore) return null
  const storeRef = doc(firestore, "stores", storeId)
  const snapshot = await getDoc(storeRef)
  if (!snapshot.exists()) return null
  const data = snapshot.data() as { adminEmail?: string }
  const email = typeof data.adminEmail === "string" ? data.adminEmail.trim().toLowerCase() : ""
  return email.length > 0 ? email : null
}

export const getStoreStripeConnectedAccountId = async () => {
  const storeId = getConfiguredStoreId()
  if (!storeId) return null
  const firestore = getFirestoreClient()
  if (!firestore) return null
  const storeRef = doc(firestore, "stores", storeId)
  const snapshot = await getDoc(storeRef)
  if (!snapshot.exists()) return null
  const data = snapshot.data() as { stripe?: { connectedAccountId?: string } }
  const rawValue = data.stripe?.connectedAccountId
  const value = typeof rawValue === "string" ? rawValue.trim() : ""
  return value.length > 0 ? value : ""
}

export const updateStoreStripeConnectedAccountId = async (connectedAccountId: string) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const firestore = getFirestoreClient()
  if (!firestore) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const auth = getAuthClient()
  if (!auth?.currentUser) {
    throw new Error("Not signed in to Firebase. Sign in from the admin page before updating settings.")
  }

  const storeRef = doc(firestore, "stores", storeId)
  await updateDoc(storeRef, {
    "stripe.connectedAccountId": connectedAccountId.trim(),
    updatedAt: serverTimestamp(),
  })
}

export type CheckoutCartItem = {
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export type ShippingAddress = {
  name: string
  company?: string
  street1: string
  street2?: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  email: string
}

export type ShippingRate = {
  rateId: string
  provider: string
  carrierKey: string
  serviceName: string
  amount: string
  baseAmount?: string
  currency: string
  estimatedDays: number | null
  durationTerms: string
  isMarkedUp?: boolean
}

export type OrderItem = {
  productId?: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
  option?: string
  note?: string
}

export const createCartCheckoutSession = async (
  items: CheckoutCartItem[],
  options?: { successUrl?: string; cancelUrl?: string; orderId?: string },
) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const functions = getFunctionsClient()
  if (!functions) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  if (!isBrowser) {
    throw new Error("Checkout is only available in the browser.")
  }

  const normalizedItems = items
    .map((item) => {
      const trimmedImage = item.imageUrl?.trim()
      const safeImageUrl =
        trimmedImage && trimmedImage.length <= 2048 && (() => {
          try {
            const parsed = new URL(trimmedImage)
            if (parsed.protocol === "http:" || parsed.protocol === "https:") {
              return trimmedImage
            }
          } catch {
            return undefined
          }
          return undefined
        })()
      return {
        name: item.name.trim(),
        price: item.price,
        quantity: item.quantity,
        imageUrl: safeImageUrl,
      }
    })
    .filter((item) => item.name && Number.isFinite(item.price) && item.quantity > 0)

  if (normalizedItems.length === 0) {
    throw new Error("Cart is empty.")
  }

  const successUrl = options?.successUrl ?? `${window.location.origin}/cart?checkout=success`
  const cancelUrl = options?.cancelUrl ?? `${window.location.origin}/cart?checkout=cancel`
  const createCheckout = httpsCallable(functions, "createCheckoutSessionForFrederick")
  try {
    const response = await createCheckout({
      storeId,
      successUrl,
      cancelUrl,
      items: normalizedItems,
      orderId: options?.orderId,
    })
    const payload = response.data as { url?: string }
    const url = typeof payload?.url === "string" ? payload.url : ""
    if (!url) {
      throw new Error("Failed to start Stripe Checkout.")
    }
    return url
  } catch (error) {
    const knownError = error as {
      message?: string
      code?: string
      details?: Record<string, unknown>
    }
    const message = typeof knownError?.message === "string" ? knownError.message : ""
    const details = knownError?.details ?? {}
    const detailsMessage =
      details && typeof details === "object" && "stripeMessage" in details && typeof details.stripeMessage === "string"
        ? details.stripeMessage
        : ""
    const statusCode =
      details && typeof details === "object" && "statusCode" in details && typeof details.statusCode === "number"
        ? details.statusCode
        : null
    const responseMessage =
      details && typeof details === "object" && "message" in details && typeof details.message === "string"
        ? details.message
        : ""
    const parts = [message, responseMessage, detailsMessage].filter((part) => part && part.length > 0)
    const composed = parts.length > 0 ? parts.join(" ") : "Stripe error while creating checkout session."
    const suffix = statusCode ? ` (Stripe status ${statusCode})` : ""
    throw new Error(`${composed}${suffix}`)
  }
}

export const getShippingRatesForFrederick = async (toAddress: ShippingAddress) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const functions = getFunctionsClient()
  if (!functions) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const getRates = httpsCallable(functions, "getShippingRatesForFrederick")
  try {
    const response = await getRates({ storeId, toAddress })
    const payload = response.data as { shipmentId?: string; rates?: ShippingRate[] }
    const shipmentId = typeof payload?.shipmentId === "string" ? payload.shipmentId : ""
    const rates = Array.isArray(payload?.rates) ? payload.rates : []
    if (!shipmentId || rates.length === 0) {
      throw new Error("No shipping rates available for this address.")
    }
    return { shipmentId, rates }
  } catch (error) {
    const knownError = error as {
      message?: string
      code?: string
      details?: Record<string, unknown>
    }
    const message = typeof knownError?.message === "string" ? knownError.message : ""
    const details = knownError?.details ?? {}
    const responseMessage =
      details && typeof details === "object" && "message" in details && typeof details.message === "string"
        ? details.message
        : ""
    const parts = [message, responseMessage].filter((part) => part && part.length > 0)
    const composed = parts.length > 0 ? parts.join(" ") : "Unable to fetch shipping rates."
    throw new Error(composed)
  }
}

export const createOrderForFrederick = async (payload: {
  items: OrderItem[]
  customer: ShippingAddress
  shipping: { selectedRateId: string; shipmentId?: string }
}) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const functions = getFunctionsClient()
  if (!functions) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const createOrder = httpsCallable(functions, "createOrderForFrederick")
  try {
    const response = await createOrder({
      storeId,
      items: payload.items,
      customer: payload.customer,
      shipping: payload.shipping,
    })
    const data = response.data as { orderId?: string }
    const orderId = typeof data?.orderId === "string" ? data.orderId : ""
    if (!orderId) {
      throw new Error("Unable to create order.")
    }
    return orderId
  } catch (error) {
    const knownError = error as {
      message?: string
      code?: string
      details?: Record<string, unknown>
    }
    const message = typeof knownError?.message === "string" ? knownError.message : ""
    const details = knownError?.details ?? {}
    const responseMessage =
      details && typeof details === "object" && "message" in details && typeof details.message === "string"
        ? details.message
        : ""
    const parts = [message, responseMessage].filter((part) => part && part.length > 0)
    const composed = parts.length > 0 ? parts.join(" ") : "Unable to create order."
    throw new Error(composed)
  }
}

const normalizeCommaList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0)

export const buildProductFromForm = (input: {
  name: string
  category: Product["category"]
  price: number
  summary: string
  description: string
  badge?: string
  featured?: boolean
  typeLabel: string
  drawWeight: string
  length: string
  material: string
  drawWeightOptions: string
  image: string
  images?: string[]
  stockLevel?: number
}): Omit<Product, "id"> => {
  const images = (input.images ?? []).map((item) => item.trim()).filter((item) => item.length > 0)
  const mainImage = input.image.trim()
  const allImages = images.length > 0 ? images : mainImage ? [mainImage] : []

  return {
    name: input.name.trim(),
    category: input.category,
    price: input.price,
    summary: input.summary.trim(),
    description: input.description.trim(),
    image: mainImage,
    images: allImages,
    badge: input.badge?.trim() || undefined,
    featured: Boolean(input.featured),
    typeLabel: input.typeLabel.trim(),
    drawWeight: input.drawWeight.trim(),
    length: input.length.trim(),
    material: input.material.trim(),
    drawWeightOptions: normalizeCommaList(input.drawWeightOptions),
    stockLevel: typeof input.stockLevel === "number" ? input.stockLevel : undefined,
  }
}

export const addStoreProduct = async (product: Omit<Product, "id">) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const firestore = getFirestoreClient()
  if (!firestore) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const auth = getAuthClient()
  if (!auth?.currentUser) {
    throw new Error("Not signed in to Firebase. Sign in from the admin page before saving products.")
  }

  const productsRef = collection(firestore, "stores", storeId, "products")
  const payload: FirestoreProduct = {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(productsRef, payload)
  return docRef.id
}

export const updateStoreProduct = async (productId: string, product: Omit<Product, "id">) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const firestore = getFirestoreClient()
  if (!firestore) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const auth = getAuthClient()
  if (!auth?.currentUser) {
    throw new Error("Not signed in to Firebase. Sign in from the admin page before updating products.")
  }

  const productRef = doc(firestore, "stores", storeId, "products", productId)
  await updateDoc(productRef, {
    ...product,
    updatedAt: serverTimestamp(),
  })
}

export const deleteStoreProduct = async (productId: string) => {
  const storeId = getConfiguredStoreId()
  if (!storeId) {
    throw new Error("Missing VITE_STORE_ID. Set it in the Frederick .env file.")
  }

  const firestore = getFirestoreClient()
  if (!firestore) {
    throw new Error("Missing Firebase config env vars. Check VITE_FIREBASE_* in .env.")
  }

  const auth = getAuthClient()
  if (!auth?.currentUser) {
    throw new Error("Not signed in to Firebase. Sign in from the admin page before deleting products.")
  }

  const productRef = doc(firestore, "stores", storeId, "products", productId)
  await deleteDoc(productRef)
}

const readProductsSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
  return snapshot.docs
    .map((docSnap: QueryDocumentSnapshot<DocumentData>) => {
      const data = docSnap.data() as Partial<FirestoreProduct>
      const product: Product = {
        id: docSnap.id,
        name: data.name ?? "",
        category: (data.category as Product["category"]) ?? "Accessories",
        price: typeof data.price === "number" ? data.price : 0,
        summary: data.summary ?? "",
        description: data.description ?? "",
        image: data.image ?? "",
        images: Array.isArray(data.images) ? (data.images as string[]) : [],
        badge: typeof data.badge === "string" ? data.badge : undefined,
        featured: Boolean(data.featured),
        typeLabel: data.typeLabel ?? "",
        drawWeight: data.drawWeight ?? "",
        length: data.length ?? "",
        material: data.material ?? "",
        drawWeightOptions: Array.isArray(data.drawWeightOptions) ? (data.drawWeightOptions as string[]) : [],
        stockLevel: typeof data.stockLevel === "number" ? data.stockLevel : undefined,
      }
      return product
    })
    .filter((product: Product) => product.name.trim().length > 0 && product.image.trim().length > 0)
}

export const useStoreProducts = () => {
  const [remoteProducts, setRemoteProducts] = useState<Product[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storeId = getConfiguredStoreId()
    const firestore = getFirestoreClient()
    if (!storeId || !firestore) {
      return
    }

    const productsRef = collection(firestore, "stores", storeId, "products")
    const productsQuery = query(productsRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        setError(null)
        setRemoteProducts(readProductsSnapshot(snapshot))
      },
      (snapshotError) => {
        setRemoteProducts(null)
        setError(snapshotError instanceof Error ? snapshotError.message : "Failed to load products.")
      },
    )

    return () => unsubscribe()
  }, [])

  return {
    products: remoteProducts ?? [],
    error,
    loading: remoteProducts === null && error === null && Boolean(getConfiguredStoreId()) && Boolean(getFirestoreClient()),
  }
}

export const useStoreProduct = (productId?: string) => {
  const storeId = getConfiguredStoreId()
  const firestore = getFirestoreClient()
  const [remoteProduct, setRemoteProduct] = useState<Product | null>(null)
  const [resolvedProductId, setResolvedProductId] = useState<string | null>(null)
  const [remoteError, setRemoteError] = useState<{ productId: string; message: string } | null>(null)

  useEffect(() => {
    if (!productId || !storeId || !firestore) return

    const docRef = doc(firestore, "stores", storeId, "products", productId)
    void getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          setResolvedProductId(productId)
          setRemoteProduct(null)
          setRemoteError(null)
          return
        }

        const data = snapshot.data() as Partial<FirestoreProduct>
        const parsed: Product = {
          id: snapshot.id,
          name: data.name ?? "",
          category: (data.category as Product["category"]) ?? "Accessories",
          price: typeof data.price === "number" ? data.price : 0,
          summary: data.summary ?? "",
          description: data.description ?? "",
          image: data.image ?? "",
          images: Array.isArray(data.images) ? (data.images as string[]) : [],
          badge: typeof data.badge === "string" ? data.badge : undefined,
          featured: Boolean(data.featured),
          typeLabel: data.typeLabel ?? "",
          drawWeight: data.drawWeight ?? "",
          length: data.length ?? "",
          material: data.material ?? "",
          drawWeightOptions: Array.isArray(data.drawWeightOptions) ? (data.drawWeightOptions as string[]) : [],
          stockLevel: typeof data.stockLevel === "number" ? data.stockLevel : undefined,
        }
        setResolvedProductId(productId)
        setRemoteProduct(parsed)
        setRemoteError(null)
      })
      .catch((docError) => {
        setResolvedProductId(productId)
        setRemoteProduct(null)
        setRemoteError({
          productId,
          message: docError instanceof Error ? docError.message : "Failed to load product.",
        })
      })
  }, [firestore, productId, storeId])

  const loading = Boolean(productId && storeId && firestore && resolvedProductId !== productId)
  const error = remoteError && remoteError.productId === productId ? remoteError.message : null
  const remote = resolvedProductId === productId ? remoteProduct : null

  return { product: remote, error, loading }
}
