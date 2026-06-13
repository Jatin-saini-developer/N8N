import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  "Product",
  "Resources",
  "Customers",
  "Pricing",
  "Now",
  "Contact",
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#05070d]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white">
            <div className="h-4 w-4 rounded-full border-4 border-black border-r-transparent border-b-transparent rotate-[-45deg]" />
          </div>
          <span className="text-[22px] font-semibold tracking-tight text-white">
            DevOnboard
          </span>
        </a>

        {/* Center: Desktop nav */}
        <nav className="hidden items-center gap-9 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-[15px] font-medium text-slate-400 transition-colors hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right: Desktop actions */}
        <div className="hidden items-center gap-5 lg:flex">
          <span className="h-7 w-px bg-white/10" />
          <a
            href="#"
            className="text-[15px] font-medium text-slate-400 transition-colors hover:text-white"
          >
            Log in
          </a>
          <a
            href="#"
            className="rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-black transition-transform hover:scale-[1.02]"
          >
            Sign up
          </a>
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 p-2 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/5 bg-[#05070d] px-4 pb-5 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex gap-3 px-3">
            <a
              href="#"
              className="flex-1 rounded-full border border-white/10 px-4 py-3 text-center text-sm font-medium text-white"
            >
              Log in
            </a>
            <a
              href="#"
              className="flex-1 rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-black"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}