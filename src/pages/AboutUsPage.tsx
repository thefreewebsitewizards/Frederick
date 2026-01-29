import type { CSSProperties } from "react"

function AboutUsPage() {
  const themeStyle: CSSProperties = {
    "--color-background-light": "#fdfbf7",
  }

  return (
    <div
      className="font-display bg-background-light dark:bg-background-dark text-text-brown dark:text-[#e0d0c0] min-h-screen flex flex-col antialiased"
      style={themeStyle}
    >
      <main className="flex-grow flex flex-col items-center w-full">
        <div className="w-full max-w-[1200px] px-4 md:px-8 lg:px-12 py-8 flex flex-col gap-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center py-6">
            <div className="w-full lg:w-1/2 aspect-[4/3] rounded-md overflow-hidden shadow-md relative group">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <div
                className="w-full h-full bg-cover bg-center sepia-[0.2]"
                data-alt="Freddie G the master bowyer working intently at his woodworking bench with hand tools"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDopBOLp_e_HgjnJeRorfksjtmjyPoZbJTE3w0leUcaF-U-1I8h5LYbLPvTDKMFjfQ6-wjtceWCyJJFO5d7DZHZZyi2HigUP-kz82YgDj_Y5PpDuAjylhg6sg_Aojvb8h93GsB5QwH3SUN4pOapAsapCIZzg4qpoSxbRi1uxL7vZtZi5Iq1aEbQOBPNmENK-incpJg4L-1QfyGOpHjNHaRjrIFrrKiwxrJvdSoBFvKopQg003qANHnLxCfFiq2uAIT3YHuxPput_1c")',
                }}
              ></div>
            </div>
            <div className="flex flex-col gap-6 lg:w-1/2 lg:pl-12 justify-center">
              <div className="flex flex-col gap-3">
                <span className="text-primary font-bold tracking-wider uppercase text-sm">Est. 1984</span>
                <h1 className="text-text-brown dark:text-white text-5xl md:text-6xl font-black leading-[1.1] tracking-[-0.02em]">
                  The Master <br /><span className="text-primary italic">Bowyer</span>
                </h1>
                <div className="h-1 w-24 bg-primary/30 rounded-full my-2"></div>
                <h2 className="text-text-brown-light dark:text-gray-300 text-xl font-medium leading-relaxed italic">
                  Preserving Old World Tradition in a Modern Age. <br />Meet Freddie G., the artisan breathing life into ancient wood.
                </h2>
              </div>
              <div className="flex gap-4 pt-4">
                <button className="flex items-center justify-center rounded-md h-12 px-6 bg-primary text-white text-base font-bold shadow-md hover:bg-[#3d006a] transition-all">
                  View Freddie&apos;s Collection
                </button>
              </div>
            </div>
          </div>
          <div className="arrow-separator">
            <span className="material-symbols-outlined arrow-icon">flight</span>
          </div>
          <div className="max-w-[800px] mx-auto text-center px-4 py-8">
            <span className="material-symbols-outlined text-primary/40 text-4xl mb-2">format_quote</span>
            <p className="text-text-brown dark:text-white text-2xl md:text-3xl font-medium leading-normal italic">
              "The wood speaks to you if you listen. A bow isn&apos;t simply made; it&apos;s revealed from within the tree, layer by patient layer."
            </p>
            <div className="mt-6 flex flex-col items-center">
              <span className="font-bold text-lg text-primary">— Freddie G.</span>
              <span className="text-sm text-text-brown-light dark:text-gray-400">Master Artisan</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-10">
            <div className="md:col-span-7 flex flex-col gap-6 text-lg leading-relaxed text-text-brown-light dark:text-gray-300">
              <p className="drop-cap">
                Born into a family of carpenters, Freddie’s journey began not with bows, but with the simple appreciation of grain and knot. It wasn&apos;t until a trip to the historic archery ranges of England that he felt the pull of the Yew wood. He realized that the ancient art of the bowyer was fading, replaced by fiberglass and carbon molds.
              </p>
              <p>
                Determined to keep the flame alive, Freddie returned to his workshop in the Pacific Northwest, surrounding himself with staves of Osage Orange and Pacific Yew. He eschewed modern machinery, opting instead for the honest feedback of hand tools—drawknives, rasps, and cabinet scrapers.
              </p>
              <p>
                "There is no rushing a self-bow," Freddie often says. "You must wait for the wood to season, wait for it to bend, and wait for it to tell you when it is ready." This patience is what imbues every Heritage Bow with its unique character and potent snap.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col justify-center gap-6">
              <div className="bg-white dark:bg-white/5 border border-[#eaddcf] dark:border-white/10 p-8 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold text-text-brown dark:text-white mb-6 border-b border-[#eaddcf] dark:border-white/10 pb-4">The Workshop Standards</h3>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 items-start">
                    <div className="text-primary mt-1">
                      <span className="material-symbols-outlined">forest</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-brown dark:text-white text-lg">Hand-Selected Staves</h4>
                      <p className="text-sm mt-1">Sourced from sustainably harvested Osage Orange and high-altitude Yew timber.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-primary mt-1">
                      <span className="material-symbols-outlined">handyman</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-brown dark:text-white text-lg">Traditional Tools Only</h4>
                      <p className="text-sm mt-1">Shaped with drawknives and rasps. No CNC machines touch our wood.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="text-primary mt-1">
                      <span className="material-symbols-outlined">water_drop</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text-brown dark:text-white text-lg">Natural Finishes</h4>
                      <p className="text-sm mt-1">Sealed with proprietary blends of oils and beeswax, never synthetic lacquers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="arrow-separator">
            <span className="material-symbols-outlined arrow-icon">flight</span>
          </div>
          <div className="flex flex-col gap-8 py-8 w-full">
            <div className="flex flex-col items-center text-center gap-2">
              <h3 className="text-3xl font-bold text-text-brown dark:text-white">A Legacy Carved in Wood</h3>
              <p className="text-text-brown-light dark:text-gray-400 max-w-2xl">From the rough log to the polished weapon, witness the transformation.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-md shadow-md cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Roughing out a wooden bow stave with a drawknife in the workshop"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBs9bgw8XEjBY4qKCea8vsakbzAv-erAcxS99Jvo7kBDiyHRB35Wpwv9HIavg1k1iCqsLIt4T1nxXo0r-cKsxmaFFdMbjzO_IzGLlV7Ii_26YOyq_8KIA1Mn-U8RNWmLmETJnNAQaEbtH26NZfqyop-UIvXT8UKtQdH_t64InoU2kIrF2qIzPT0KeitFg0Zg6IssQBQxX08SWg26qLuzHfuus4vvG_8CT45htfRmZpBGiEmtVMk6UV2tVmx_vA_1CLP1kYQeWp_Hcc")',
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1 block">Step 01</span>
                  <h4 className="text-white text-xl font-bold">The Rough Out</h4>
                  <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Removing bulk wood to find the bow within.</p>
                </div>
              </div>
              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-md shadow-md cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Checking the bend of a wooden bow on a tillering tree against a wall"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKUHOWH5j2zmDhH11Bygkg8WBB172ZppMixCTcdEf30jsV91cNzqUPN6_CCnvONakLSEOjJtCqfiaQeIyX1UYb0DgYdeYw3v8GKA-hbOl8wli2v2jUsY3yG56iauGXasCqFpicYuu2of7oeEmT6LxVTT8r-A2T6X8sGytoda05WcVUVz_kX0hUEI5jZ2-46wg-c8CAGnI9IQEi3RNBdbz6wsjbZw7PgkPAG3gSaRTycmU0JoZ7VNGHF1EduVjhqBwhXTbvuE5FlKE")',
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1 block">Step 02</span>
                  <h4 className="text-white text-xl font-bold">The Tillering</h4>
                  <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Teaching the wood to bend without breaking.</p>
                </div>
              </div>
              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-md shadow-md cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  data-alt="Close up of hand applying oil finish to the smooth wood of a longbow"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC0QM6agPXZfWHIlh1sS644gKaHQc2_jQ_r6xwih3vPTP1QMa-TJYNUBQV5zgDmU0hqlmiV1M7MFq8Ci2mQzRv4g9oaRADALBWyPGz_6g9yMQ2Owz7YgluMBpaRWhQLOVF2Zk0VGnP4hdLoDgK6lrWn657SsKObX7CcBZiGOFL6U2c0VuLC1BPnE5Ax6_RFz5zeUVnEbdOjA2ea0igFgVAf8ZvVgMJebAk2QizYtj_n6hf4Qr9JkNGLs-WsDxMajSZQ4caIveMprz4")',
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <span className="text-primary font-bold text-xs uppercase tracking-widest mb-1 block">Step 03</span>
                  <h4 className="text-white text-xl font-bold">The Finishing</h4>
                  <p className="text-white/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">Sealing the grain for a lifetime of use.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
            <div className="font-display text-4xl text-text-brown dark:text-white italic opacity-80" style={{ fontFamily: "'Newsreader', serif" }}>
              Freddie G.
            </div>
            <h3 className="text-2xl font-bold text-text-brown dark:text-white">Own a Piece of History</h3>
            <p className="text-text-brown-light dark:text-gray-400 max-w-md">Every bow is a unique commission. Explore current stock or contact us for a custom build.</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <button className="flex items-center justify-center rounded-md h-12 px-8 bg-primary text-white text-base font-bold shadow-md hover:bg-[#3d006a] transition-all">
                Shop Available Bows
              </button>
              <button className="flex items-center justify-center rounded-md h-12 px-8 border-2 border-[#3E2723] dark:border-white/20 text-[#3E2723] dark:text-white text-base font-bold hover:bg-[#3E2723] hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                Contact Workshop
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full border-t border-[#3E2723]/10 dark:border-white/10 bg-[#f8f5f0] dark:bg-background-dark py-12">
        <div className="layout-container flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-[24px]">forest</span>
            <span className="text-lg font-bold text-text-brown dark:text-white">Heritage Bows</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-text-brown-light dark:text-gray-400">
            <a className="hover:text-primary transition-colors" href="#">Shipping &amp; Returns</a>
            <a className="hover:text-primary transition-colors" href="#">Bow Care</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
          </div>
          <p className="text-xs text-text-brown-light/60 dark:text-gray-600">© 2023 Heritage Bows. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default AboutUsPage
