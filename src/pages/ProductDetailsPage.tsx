import type { CSSProperties } from "react"

function ProductDetailsPage() {
  const themeStyle: CSSProperties = {
    "--color-primary": "#7311d4",
    "--color-background-light": "#f7f6f8",
    "--color-background-dark": "#191022",
    "--color-parchment": "#fdfbf7",
    "--color-chocolate": "#4a3b32",
    "--color-rope": "#d4c5b0",
    "--font-display": "Newsreader, serif",
    "--font-serif": "Newsreader, serif",
  }

  return (
    <div
      className="bg-background-light dark:bg-background-dark text-[#140d1b] dark:text-white font-display"
      style={themeStyle}
    >
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex justify-center w-full bg-[#faf8fc]">
          <div className="layout-content-container flex flex-col w-full max-w-[1280px] px-4 md:px-10">
            <div className="flex flex-wrap gap-2 py-4 items-center">
              <a className="text-[#734c9a] text-sm font-medium leading-normal hover:underline" href="#">
                Home
              </a>
              <span className="text-[#734c9a] text-sm font-medium leading-normal">/</span>
              <a className="text-[#734c9a] text-sm font-medium leading-normal hover:underline" href="#">
                Handcrafted Bows
              </a>
              <span className="text-[#734c9a] text-sm font-medium leading-normal">/</span>
              <span className="text-[#140d1b] text-sm font-medium leading-normal">The Highland Yew Longbow</span>
            </div>
          </div>
        </div>
        <div className="layout-container flex grow justify-center w-full py-6 md:py-10 bg-[#faf8fc]">
          <div className="layout-content-container flex flex-col lg:flex-row gap-10 w-full max-w-[1280px] px-4 md:px-10">
            <div className="flex flex-col w-full lg:w-3/5 gap-4">
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#ede7f3]">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-cover transform hover:scale-105 transition-transform duration-700"
                  data-alt="Close up of a handcrafted wooden longbow resting on a mossy rock in a forest"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYHMPO1UjOoPJROVfy57B7Yw4U6o8tFKHHq7b8HYqzQBNeFqRdmBH5D6ZkfxliC74lNLrCJN3neSQykmo6AuMojjo0nAU_I3eSftA9BcaY3almwToeWbxx0UQSK86NkZRvKwD71tT7cSOlGuSvsM25gcqvfCnTQL_87cTPOI53V44jSoyJeFqNuns73xgVO-YoOF85rEbTesGWPy-MN75qbqKKQPWtuM0WOszRfJW5EszUTIVOVpjLhKRvH3-WiHdNpHRK9ym5EuM")',
                  }}
                ></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                <div className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-primary">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    data-alt="Detailed view of the bow handle wrapped in leather"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCojb62glcqiRqNz7UBZzXPq31TeOzUkCyvoCypk3VWkfVNdgbght2demhljwWbWmVHN26-zU3cIshTzWOQIfuQAVBEjW7_PIm5uzLCSVrMKxzsY7XEsJnJw9M3XgRGQahLOHzDxrKPBKo1t1IMLITcKydLMaS_vQl-Q-3CIImouQzRReiszz3HLLhMbcKW6t3-NcmXwMX4SHLywCDGMKnRKiqNJX4ScGkb2CuukCrz4vdJ9JxDN1jDqOxjYNoLPwP2Z7TGVvvO5bU")',
                    }}
                  ></div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    data-alt="The bow unstrung showing the wood grain texture"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjx6Zl1j2oGGTzyvSb3gIKhHpZPRIK1yqvOnsp_PVJ2aTQF-6FE8uSeFjKDDqheN-RpvinUZ31Wnp6bidZHYSsP5as-CSZ_2xFt3ApdzrPy6weRTZkl3rwaXmD6L5o3H6abFdCgdx7x0oJBHtwHYYNOQ422zVNojOlW5MI_yMWKxkBkK8QvI0Jf_qJvTqhCMGx3nNsPxzA5sHg7amLEXFpRPQAYZNI1lzOGP_0ZiW-frOHoDJmfZduuMCQimx-TpNniHKo8lkoPnQ")',
                    }}
                  ></div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    data-alt="Archer holding the bow in a traditional stance"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZdoLeorOlfXLdlQGI6xnZ1VJ80VbkJTerTVV-uMNC8NWIIOGFvmcGTrS__6u6gNYRMA1fK0bhCz09iKQm1wnFwVHlSgvAq0h0t3Yp6cdTPIvKo1Bh8mFIxzWmdc6uZ3HUag6j1sCUCIrZLhXY0pvYfrt6YWws0BpC7WxZRUgCmjH5YXMDn1HuGlk5jIBnctHeZRg3gp94nQ7jukkdYmgsaTOZOiJR8d-OCLPcXk4oTxjftehajUiYdGmHKrFZsqCsWADH1Eur67Q")',
                    }}
                  ></div>
                </div>
                <div className="aspect-square rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    data-alt="The bow tip detail with horn nock"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDi1x-W8C5Y_OC89JqLjLDA-FHvgvwjc8PmKE9YbNq_ZbTkAhTcBhRIcTo12QAjtpchouZxeZkBnFJlXTtx8M9j7SyO-ySEkS490l0M6f3UnVcBcZ7o6GImVd080CGX3-nuxrCAFk85Hj4pQkj-WpD6Nfqof82zU02dwzbTGlsqBN9YzwbnkROsYbFkvdME4zR4xZTk6N8CQtvTilk0oYwZHY3hUgSR9WAifrBIQ7tQD42LSByTIZHWtnUy0T1lFrEp7VaA879IMnI")',
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-2/5">
              <div className="bg-parchment p-8 rounded-lg border border-[#e3dac9] shadow-sm relative overflow-hidden group">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDseb7quKIzgjsa8wlBUS6SS83kOIu-jjrBXK5e_B4XaqkZW194-bIuwXeCgPZPLWWkbfr7D-eYzgZYDP_9Hz0Xyh2T-fqXTMJ0MZoUgA08GpsC6QfaamhWoALcgONj8_9DYJYgWytlvCmAIrH_z3PcHdY87T4ZcvpDwuNgonO3LYY5ZxKX4hIKp50csklQejyGnJFW8rr-22I50hinT4aoDH0kkG7-5tZh5vKABdPYiElHyT2sXe9vOal2yQosfcRs1Pwwc3G-_40')",
                  }}
                ></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold tracking-widest uppercase text-chocolate/60">English Longbow</span>
                    <div className="flex gap-1 text-yellow-600">
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                      <span className="material-symbols-outlined text-[18px] fill-current">star_half</span>
                    </div>
                  </div>
                  <h1 className="text-[#140d1b] tracking-tight text-4xl font-bold leading-tight mb-4 font-serif text-chocolate">
                    The Highland Yew Longbow
                  </h1>
                  <p className="text-3xl font-medium text-chocolate mb-6">$850.00</p>
                  <div className="rope-divider w-full mb-6"></div>
                  <p className="text-[#4a3b32] text-lg leading-relaxed mb-8 font-normal">
                    Ideally suited for target archery and re-enactment, the Highland Yew is handcrafted from premium
                    Pacific Yew, renowned for its elasticity and strength. Each bow is tillered to perfection, offering
                    a smooth draw and powerful release reminiscent of the great war bows of history.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9]">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Draw Weight
                      </span>
                      <span className="text-lg font-semibold text-chocolate">45 - 60 lbs</span>
                    </div>
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9]">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Length
                      </span>
                      <span className="text-lg font-semibold text-chocolate">72 Inches</span>
                    </div>
                    <div className="bg-[#f5f1e8] p-4 rounded border border-[#e3dac9] col-span-2">
                      <span className="block text-xs font-bold text-chocolate/60 uppercase tracking-wider mb-1">
                        Material
                      </span>
                      <span className="text-lg font-semibold text-chocolate">Aged Pacific Yew &amp; White Ash</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 mt-auto">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Quantity</label>
                        <div className="relative flex items-center">
                          <button className="absolute left-0 w-8 h-full text-chocolate hover:bg-black/5 rounded-l">-</button>
                          <input
                            className="w-full text-center border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2"
                            readOnly
                            type="text"
                            value="1"
                          />
                          <button className="absolute right-0 w-8 h-full text-chocolate hover:bg-black/5 rounded-r">+</button>
                        </div>
                      </div>
                      <div className="w-2/3">
                        <label className="block text-xs font-bold text-chocolate/60 uppercase mb-2">Draw Weight Option</label>
                        <select className="w-full border-[#e3dac9] bg-[#f5f1e8] text-chocolate focus:ring-primary focus:border-primary rounded py-2">
                          <option>45 lbs (Target)</option>
                          <option>50 lbs (Hunting)</option>
                          <option>60 lbs (War Bow)</option>
                        </select>
                      </div>
                    </div>
                    <button className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-14 bg-primary hover:bg-[#600eb3] text-white gap-3 text-lg font-bold leading-normal tracking-wide shadow-md transition-all transform hover:-translate-y-0.5">
                      <span className="material-symbols-outlined">shopping_cart</span>
                      Add to Quiver
                    </button>
                    <p className="text-xs text-center text-chocolate/50 mt-2 italic">
                      Crafted to order. Expect 3-4 weeks for delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layout-container flex justify-center w-full py-16 bg-[#faf8fc]">
          <div className="layout-content-container max-w-[960px] px-4 md:px-10">
            <div className="relative border-t border-b border-[#e3dac9] py-12">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#faf8fc] px-4">
                <span className="material-symbols-outlined text-4xl text-rope">history_edu</span>
              </div>
              <h3 className="text-3xl font-bold text-center text-chocolate mb-10 font-serif">Craftsman's Notes</h3>
              <div className="grid md:grid-cols-2 gap-12 text-[#4a3b32] text-lg leading-relaxed font-serif">
                <div className="drop-cap">
                  The design of this longbow is steeped in the martial traditions of the 14th century. While modern
                  materials have their place, there is a soul in Yew wood that fiberglass cannot replicate. We source
                  our timber from high-altitude groves where the slow growth creates tight, dense grain rings—essential
                  for the snap and power of a true self-bow.
                </div>
                <div>
                  <p className="mb-4">
                    Every bow is worked by hand, following the natural grain of the stave rather than forcing a shape
                    upon it. This ensures that the weapon is not only beautiful but durable. The horn nocks are
                    hand-carved from water buffalo horn, polished to a glass-like finish to protect the string loops
                    from abrasion.
                  </p>
                  <p className="italic text-primary/80">
                    "A bow is life in tension." — Master Bowyer, Elden Thorne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
