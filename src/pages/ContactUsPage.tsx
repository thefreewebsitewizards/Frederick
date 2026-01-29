function ContactUsPage() {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#160c1d] dark:text-white overflow-x-hidden antialiased flex flex-col min-h-screen">
      <main className="flex-grow flex justify-center w-full px-4 sm:px-6 py-8 md:py-12">
        <div className="w-full max-w-[1080px] flex flex-col gap-10">
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
            <h1 className="text-[#160c1d] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.02em]">
              Craftsmanship Requires <span className="text-primary italic">Conversation</span>
            </h1>
            <p className="text-[#7a45a1] dark:text-[#a88cc9] text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Whether you need a custom Flemish twist bowstring or a repair on your heirloom bow, reach out to the Black Eagle workshop.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-4">
            <div className="lg:col-span-7 bg-white dark:bg-[#251530] p-6 md:p-8 rounded-xl rustic-border">
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[#160c1d] dark:text-gray-200 text-base font-semibold">Your Name</span>
                    <input className="rustic-input w-full rounded-lg border border-[#decdea] dark:border-[#4a355e] bg-[#faf8fc] dark:bg-[#1b0f23] text-[#160c1d] dark:text-white h-12 px-4 focus:ring-0 focus:outline-none transition-shadow font-sans" placeholder="Enter your full name" type="text" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[#160c1d] dark:text-gray-200 text-base font-semibold">Email Address</span>
                    <input className="rustic-input w-full rounded-lg border border-[#decdea] dark:border-[#4a355e] bg-[#faf8fc] dark:bg-[#1b0f23] text-[#160c1d] dark:text-white h-12 px-4 focus:ring-0 focus:outline-none transition-shadow font-sans" placeholder="name@example.com" type="email" />
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2">
                    <span className="text-[#160c1d] dark:text-gray-200 text-base font-semibold">Bow Model <span className="font-normal text-sm opacity-60">(Optional)</span></span>
                    <input className="rustic-input w-full rounded-lg border border-[#decdea] dark:border-[#4a355e] bg-[#faf8fc] dark:bg-[#1b0f23] text-[#160c1d] dark:text-white h-12 px-4 focus:ring-0 focus:outline-none transition-shadow font-sans" placeholder="e.g., 1965 Bear Kodiak" type="text" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-[#160c1d] dark:text-gray-200 text-base font-semibold">Service Required</span>
                    <div className="relative">
                      <select className="rustic-input w-full rounded-lg border border-[#decdea] dark:border-[#4a355e] bg-[#faf8fc] dark:bg-[#1b0f23] text-[#160c1d] dark:text-white h-12 px-4 pr-10 focus:ring-0 focus:outline-none transition-shadow appearance-none font-sans cursor-pointer">
                        <option>General Inquiry</option>
                        <option>Custom Bow Commission</option>
                        <option>Structural Repair</option>
                        <option>Custom String Request</option>
                        <option>Tuning Assistance</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none">expand_more</span>
                    </div>
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-[#160c1d] dark:text-gray-200 text-base font-semibold">How can we help?</span>
                  <textarea className="rustic-input w-full rounded-lg border border-[#decdea] dark:border-[#4a355e] bg-[#faf8fc] dark:bg-[#1b0f23] text-[#160c1d] dark:text-white min-h-[160px] p-4 focus:ring-0 focus:outline-none transition-shadow resize-y font-sans" placeholder="Describe the issue or your custom request details..."></textarea>
                </label>
                <div className="pt-2">
                  <button className="group relative w-full md:w-auto md:min-w-[200px] flex items-center justify-center gap-2 bg-primary hover:bg-[#3d006b] text-white font-bold py-3.5 px-8 rounded-lg transition-all active:scale-[0.98] shadow-md hover:shadow-lg" type="button">
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">send</span>
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-sm border border-[#eee6f4] dark:border-[#3a2a45]">
                <img alt="Close up of wooden traditional bow riser and limbs with intricate craftsmanship" className="absolute inset-0 w-full h-full object-cover" data-alt="Close up of wooden traditional bow riser and limbs with intricate craftsmanship" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD16yWQZa5-IVD4BvnvGtrMnuipSfpE0SLCFGpVZQLR03qBCC32p5IC7orPhjpIXOAIdBIN1drdX7rqdlBWehql8sb9OG8dMpDahyNPfsfk9Oo4jnBPjdBwIrPsqDJC1Dl3HBlTdhSPLJVP0zs_RLa35N6njgmXM1DuItRKpL4TLoMVh2K3u7rMl7ThwFjdIdR3HaZCvq_U8Kve5fDkwbqKTmIdfh-sO2A_vC5-Zd4buub2ymqo0oQGU1ejRo5lcR0RtBKUD3BHP4I" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-6">
                  <p className="text-white font-bold text-lg">Traditional Archery Since 1982</p>
                </div>
              </div>
              <div className="bg-primary/5 dark:bg-primary/10 p-6 md:p-8 rounded-xl border border-primary/10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">handyman</span>
                  <h3 className="text-xl font-bold text-[#160c1d] dark:text-white">Our Workshop Services</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <div>
                      <strong className="block text-[#160c1d] dark:text-gray-200">Custom Bow Commission</strong>
                      <span className="text-sm text-[#7a45a1] dark:text-gray-400">Tailored draw weights and exotic woods.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <div>
                      <strong className="block text-[#160c1d] dark:text-gray-200">Structural Repairs</strong>
                      <span className="text-sm text-[#7a45a1] dark:text-gray-400">Limb delamination and riser fixes.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <div>
                      <strong className="block text-[#160c1d] dark:text-gray-200">Flemish Twist Strings</strong>
                      <span className="text-sm text-[#7a45a1] dark:text-gray-400">Hand-spun FastFlight or B-50 Dacron.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                    <div>
                      <strong className="block text-[#160c1d] dark:text-gray-200">Tuning &amp; Maintenance</strong>
                      <span className="text-sm text-[#7a45a1] dark:text-gray-400">Nocking points, silencers, and brace height.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-xl border border-dashed border-[#d1c4dd] dark:border-[#4a355e] flex flex-col gap-3 items-start">
                <h4 className="text-lg font-bold text-[#160c1d] dark:text-white">Prefer email?</h4>
                <p className="text-[#160c1d] dark:text-gray-300">
                  Skip the form and write to us directly. We usually respond within 24 hours.
                </p>
                <a className="inline-flex items-center gap-2 text-primary font-bold hover:underline mt-1" href="mailto:workshop@blackeaglearchery.com">
                  <span className="material-symbols-outlined text-lg">mail</span>
                  workshop@blackeaglearchery.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ContactUsPage
