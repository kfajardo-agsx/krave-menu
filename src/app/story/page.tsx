import Link from "next/link";

export const metadata = {
  title: "Our Story — KRAVE Zamboanga",
};

const paragraphs = [
  "Hi! I'm a mom of four, a Cebuana living in Zamboanga City, and a software engineer and manager who has been working from home since 2017. After years of spending most of my days inside the house, my friends and I agreed it was time I started something of my own.",
  "KRAVE was inspired by my daughters' love of Korean ramyeon. I opened our little shop in front of PMC hospital in Tetuan, with a few of our young neighbors (students) working part-time at night. It was fun. I learned to be more social, met so many wonderful people, and learned to take life one day at a time.",
  "But it wasn't easy. The shop was far from home, I traveled there every day, and the monthly expenses were more than the shop could earn back. By July, our student crew was heading back to school with classes ending at 8pm, and I couldn't find anyone I trusted to look after the shop. Most of all, it kept me away from my kids, who need me most at this stage of their lives.",
  "So, with a heavy heart, I closed the physical shop and came back home.",
  "KRAVE lives on from my home kitchen. I do all the prep myself, with one of my daughters sometimes helping me pack your orders. Daytime orders give me a little break from work, and nighttime orders keep me company in between all the work. Fair warning: I get a little rattled when orders come in all at once, so thank you for your patience!",
  "You can still find us on Foodpanda, and ordering directly with us always gets you a discount. Every order means a lot to this small, one-mom kitchen. Thank you for being part of our story.",
];

export default function StoryPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Our Story</h1>
        <p className="text-white/70 text-sm mt-2">
          From a little shop in Tetuan to a home kitchen
        </p>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full px-4 py-8">
        <article className="space-y-4 text-sm text-gray-600 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="pt-2 font-semibold text-sakura-dark">— The mom behind KRAVE</p>
        </article>

        <div className="text-center mt-10">
          <Link
            href="/"
            className="inline-block bg-sakura text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-sakura-dark transition-colors"
          >
            Back to the menu
          </Link>
        </div>
      </main>
    </div>
  );
}
