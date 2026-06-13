export default function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        <div>
          <div className="inline-flex px-3 py-1 rounded-full border border-slate-700 text-sm">
            Built for Engineering Teams
          </div>

          <h1 className="text-6xl font-bold mt-6 leading-tight">
            Stop Losing Weeks to Developer Onboarding
          </h1>

          <p className="text-slate-400 mt-6 text-xl">
            Help every engineer understand your codebase,
            documentation, and workflows from day one.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-violet-600 px-6 py-3 rounded-xl">
              Book Demo
            </button>

            <button className="border border-slate-700 px-6 py-3 rounded-xl">
              Watch Demo
            </button>
          </div>
        </div>

        <div>
          {/* Product Mockup */}
        </div>

      </div>
    </section>
  );
}