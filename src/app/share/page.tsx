import Link from "next/link";
import PhotoUpload from "./photo-upload";

const STORE_NAME = "KRAVE Zamboanga";

const socials = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/kravezamboanga/",
    color: "bg-[#1877F2] hover:bg-[#166FE5]",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/krave_zamboanga/",
    color:
      "bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@krave_zamboanga",
    color: "bg-black hover:bg-gray-800",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.16 8.16 0 005.58 2.2V11.7a4.85 4.85 0 01-3.77-1.85V6.69h3.77z" />
      </svg>
    ),
  },
];

export default function SharePage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="bg-sakura text-white py-12 px-4 text-center relative">
        <Link
          href="/"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors flex items-center gap-1 text-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Menu
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">{STORE_NAME}</h1>
        <p className="text-white/70 text-sm mt-2">
          Korean ramen, bingsu &amp; more — Zamboanga City
        </p>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8 space-y-10">
        {/* Photo Upload */}
        <section className="space-y-3">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Share Your Photos
          </h2>
          <p className="text-center text-sm text-gray-500 leading-relaxed">
            We&apos;d love a copy of your photos! As a small business, it means
            the world when you share your memories with us — we may feature them
            on our socials to help others discover KRAVE too. Thank you!
          </p>
          <PhotoUpload />
        </section>

        {/* Social Links */}
        <section className="space-y-3">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Follow Us
          </h2>
          <div className="space-y-3">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 w-full py-3.5 rounded-full text-white font-semibold text-base transition-all ${s.color}`}
              >
                {s.icon}
                {s.name}
              </a>
            ))}
          </div>
        </section>

        {/* Feedback */}
        <section className="space-y-3">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Questions &amp; Suggestions
          </h2>
          <p className="text-center text-sm text-gray-400">
            Got feedback? We&apos;d love to hear from you.
          </p>
          <a
            href="https://www.messenger.com/t/kravezamboanga"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full text-white font-semibold text-base bg-[#0084ff] hover:bg-[#0073e6] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.453 5.497 3.727 7.191V22l3.414-1.876c.91.252 1.876.388 2.859.388 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.07 12.449-2.545-2.714-4.97 2.714 5.467-5.804 2.609 2.714 4.906-2.714-5.467 5.804z" />
            </svg>
            Chat with us on Messenger
          </a>
        </section>
      </main>

      <footer className="bg-sakura-50 border-t border-sakura-light py-4 text-center text-xs text-gray-400">
        <span>{STORE_NAME}</span>
      </footer>
    </div>
  );
}
