import { useNavigate } from "react-router-dom"

function ProductsPage() {
  const navigate = useNavigate()
  const handleViewDetails = () => {
    navigate("/product-details")
  }

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-[#160c1d] dark:text-[#f3f0f5]">
      <div className="relative flex h-auto w-full flex-col overflow-x-hidden">
        <main className="w-full flex justify-center">
          <div className="layout-content-container flex flex-col w-full max-w-[1280px] px-4 md:px-10 py-8 md:py-12">
            <div className="flex flex-wrap justify-between gap-6 mb-8 items-end">
              <div className="flex flex-col gap-3 max-w-2xl">
                <p className="text-[#160c1d] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">Handcrafted for the Traditional Archer</p>
                <p className="text-[#7a45a1] dark:text-[#bcaaa4] text-lg font-normal leading-normal max-w-lg">Discover our collection of premium traditional bows, custom strings, and leather accessories.</p>
              </div>
            </div>
            <div className="mb-10 overflow-x-auto">
              <div className="flex border-b border-[#decdea] dark:border-[#3a2a45] min-w-max">
                <a className="group flex flex-col items-center justify-center border-b-[3px] border-b-primary px-6 pb-3 pt-4 cursor-pointer" href="#">
                  <p className="text-[#160c1d] dark:text-white text-base font-bold leading-normal tracking-[0.015em]">All Products</p>
                </a>
                <a className="group flex flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-primary/30 px-6 pb-3 pt-4 cursor-pointer transition-colors" href="#">
                  <p className="text-[#7a45a1] dark:text-[#a594b5] group-hover:text-primary dark:group-hover:text-[#d1c4e9] text-base font-medium leading-normal tracking-[0.015em] transition-colors">Recurve Bows</p>
                </a>
                <a className="group flex flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-primary/30 px-6 pb-3 pt-4 cursor-pointer transition-colors" href="#">
                  <p className="text-[#7a45a1] dark:text-[#a594b5] group-hover:text-primary dark:group-hover:text-[#d1c4e9] text-base font-medium leading-normal tracking-[0.015em] transition-colors">Longbows</p>
                </a>
                <a className="group flex flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-primary/30 px-6 pb-3 pt-4 cursor-pointer transition-colors" href="#">
                  <p className="text-[#7a45a1] dark:text-[#a594b5] group-hover:text-primary dark:group-hover:text-[#d1c4e9] text-base font-medium leading-normal tracking-[0.015em] transition-colors">Strings</p>
                </a>
                <a className="group flex flex-col items-center justify-center border-b-[3px] border-b-transparent hover:border-b-primary/30 px-6 pb-3 pt-4 cursor-pointer transition-colors" href="#">
                  <p className="text-[#7a45a1] dark:text-[#a594b5] group-hover:text-primary dark:group-hover:text-[#d1c4e9] text-base font-medium leading-normal tracking-[0.015em] transition-colors">Accessories</p>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Traditional wooden recurve bow leaning against a wall" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional recurve bow on display" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_GdopQVgbjgo4A3xTeZmsLRxWufVCKRgyBhRbyAuYfZSAmi4KnUm3LqWeu0TOptKTrREKQvIiwQn2CiOg9VRNu8H2wySGurT12L2d5E1KVHFubtB9gpj-ij9bdDhxhO2DIub9CjIzW_XRMeFIxT2DGsGT566pIgQ9ayJnToDfrLYbP2pPYQ3PbZC3vVIKc9eCcHm1JEj4GWN4Jgw3EP5C0JXPwR6AUfihz-0mNH-6WeIuogOoWx-6tiwVnvJ7TCsgfPBRPPFCp8s" />
                  <div className="absolute top-3 right-3">
                    <span className="bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">Best Seller</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">The Regal Recurve</h3>
                  </div>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Hand-carved riser with maple limbs for smooth draw.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$450.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Close up of a traditional wooden longbow grip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Highland Longbow detail shot" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH8oAVbR9BGlL1sqP3cm2RnXuvJTu6Pa0UbJhZJ4vNn5Zv26Q3v7ShU3hYdcbbzg6nqSNG43VhA8_ySrd-uJ1dqSQWbPqqrkmpr5RM2-OeAxcWIwY7QBujPwrZWU7W6rdCOrpCJstwlOD58Buxs1tJJfi3dvLC9H1Iq9j0lbDkXvkU163lp-9HW3bPn7PKtDfi6lQq1f1bw3Ni1wLzpnszdyg01jDO0TElhq16F0QGrOX-0x06EL8vmw3du0JwSjpgdvgkfu6luis" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Highland Longbow</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Classic design with reinforced tips for modern strings.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$520.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Leather archery quiver filled with arrows" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Brown leather arrow quiver" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0VRBHtO_pYVOqdfuSKijmtRkm1YoZsyfzYHFtHh28z6oTtsSqXvcYscvXkI4B5OByXKPkuN1L3tI5MM7bOgbdLRhvohih4D8OgM2FH0GxTZpJzgt3TwcdkxjgOcb0-8uwKmDo9ZMBNLXc77eL1M3jD0kNeRYof8Fu79m4Wa6raSGcf86MH9w4Ab8dm2nwn_ymOtf6dkx1XEX4mgJI3sn7gTmuiPmlum15IkGNibv_usn7p2cVOrzEVcCunmJ3ew0BZjnIV-m1Aac" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Hunter&apos;s Quiver</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Genuine leather back quiver with brass fittings.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$120.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Spool of yellow string for bows" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Roll of beeswax bow string" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRQ2hZ9OOR7XsWU0KvPoe5CfDKoMOuERCKE-up_wc3TTfv8F7depdeX1h89H_FdAUihzbmYrkd-RPGqqXnijz1_EZxCnuFSxTk7n7opz0lThEcXvwvPcmZFFzINCjVGRUoRbLmEYHBok6KQS-JvV22sw9Cxgj6nO_oDE1AyMJ8mXs5vzI4tIVCpSaDt5Z9w_quGUZfT7wXSeCJ-FNxsjwb5z9jKJyYdZ0KvVx3EOSA0V84lPI6zNIn8JaoebMul_4ekn6Z9y2UvSU" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Beeswax String</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Pre-waxed Flemish twist string for longevity.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$25.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Close up of traditional arrows with feather fletching" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Traditional feather fletched arrows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJr7RnuQADXhy593nnly0VRUg9AFXjq4hSVGLzHAg9wjFGZdrw2dUFtUZtdXQgNhsHLp3FTCMICFvPSuvGsj1QX-pre1AgcyjI_HPzFtaZQseDeMkh8QpKuQ2uOr3bpBRqNIobfbC7PDz2mWiAgSdRackocDD3XHrK-nAodSnrptVgHdL5u_zr0z_qmeJjNd7b0gCo8qvrkF9he7p2pvyHb1pzAEN2mbkaVa5hp88Ij2vFLHvc2jY27KobESDM3HdJmrxE8kFJ8J8" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Cedar Arrows</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Matched dozen Port Orford Cedar shafts.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$85.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Woman wearing leather arm guard holding bow" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Archer wearing leather arm guard" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoAOvpul-f9uY987YiwedBAP-aiMOp8keEyZ6Q08-YVhR4Vz1mrXyDCihb18fIo2xEvGCoNNTX9Yo-hUKOlcP0Dv7uCywj-Do-2JgEZJUjlRnc54oFZacDOasXZce-VeYBqLeoA-mktxqjOHFeJdYWM9-r_Z9Q63XJ_ceBZDIvLIicynOaQK2gc44P56q5X1OaQeW5Gbm0hLp7XBivK3BT9cQEVIJqoPNnAaeDg87F5yXg7s6DBZ3YFcolTmeArMEa3pEpZHPNyig" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Ranger Arm Guard</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Protective leather bracer with lace-up back.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$45.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Archery target face with arrows in it" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Field archery paper target face" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSjbqH2nmFi2uibzK7UcHONPwhRdFCEF1JamMVSsAUAG0dEmcwYvvoApwz5nXzXPEuC-ZJthcLVLLrEzQ-EvhRXfC0GxBPB2P9L9W6g1zirc71EdX2KKu9GB3GZ5S2fa8yBFPYJICHFN5lXc1OSyBj4d4DRDNWwHbrkSoLvHGAoLrZOAUY6Pc4rEJLYV6e96GXQDRmQHLV-zY_1CTNiiJkkpU00VOyRSDeV8kmaArRVNhyzR0LwYChODm8W40tKBiwRu61b28VTxg" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Field Targets</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Regulation size paper targets for practice.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$15.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="group flex flex-col bg-wood-light dark:bg-wood-dark border border-[#e8dfed] dark:border-[#3a2a45] rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e0e0e0]">
                  <img alt="Archery glove made of leather" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Leather three finger shooting glove" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvnli8LWJ1YNarMvtJI4xoyM-DIqBlzuX2NGl5xpytfNqvvmmYQYMzpJZM0MnDjc0CAbaL8yBeQReic60wAfRiHKRjZLUAWuDsN7zQbWCHKujK_mKjn3-eKq7sn1BSkTRSHQgdJbMlZF8HH3NaaAFZdVV-X6fYoiugMg8xXRaonH13Prc5vEUhDA6rNS79YtxDJ-jwjIAUQR91NbwKawBhh5dOBjIFXYR4pGZELciAxUU8RnAVey9UQ9_TomOAdVBjZAvHMKECRvc" />
                </div>
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white leading-tight">Shooting Glove</h3>
                  <p className="text-sm text-[#7a45a1] dark:text-[#bcaaa4] line-clamp-2 mb-2">Soft buckskin three-finger glove.</p>
                  <div className="mt-auto flex flex-col gap-3">
                    <p className="text-xl font-bold text-[#160c1d] dark:text-[#e0d6e8]">$30.00</p>
                    <button
                      className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary text-primary hover:text-white dark:text-[#d1c4e9] dark:hover:text-white rounded-lg font-bold text-sm transition-colors duration-200 border border-primary/20 hover:border-primary flex items-center justify-center gap-2"
                      onClick={handleViewDetails}
                    >
                      <span>View Details</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 mt-6">
              <a className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0e0e0] dark:hover:bg-[#3a2a45] transition-colors" href="#">
                <span className="material-symbols-outlined text-[#160c1d] dark:text-white text-lg">chevron_left</span>
              </a>
              <a className="text-sm font-bold leading-normal flex size-10 items-center justify-center text-white rounded-full bg-primary mx-1 shadow-md" href="#">1</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#160c1d] dark:text-white rounded-full hover:bg-[#eee6f4] dark:hover:bg-[#3a2a45] transition-colors" href="#">2</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#160c1d] dark:text-white rounded-full hover:bg-[#eee6f4] dark:hover:bg-[#3a2a45] transition-colors" href="#">3</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#160c1d] dark:text-white rounded-full hover:bg-[#eee6f4] dark:hover:bg-[#3a2a45] transition-colors" href="#">4</a>
              <a className="flex size-10 items-center justify-center rounded-full hover:bg-[#e0e0e0] dark:hover:bg-[#3a2a45] transition-colors" href="#">
                <span className="material-symbols-outlined text-[#160c1d] dark:text-white text-lg">chevron_right</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ProductsPage
