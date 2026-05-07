"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { menu, APP_NAME, STORE_NAME, FACEBOOK_PAGE } from "@/data/menu";
import type { MenuItem, MenuVariant, MenuOption } from "@/data/menu";

/* ── Types ── */

interface Bowl {
  id: string;
  ramen: MenuItem;
  variant: MenuVariant | null;
  /** Selected option per optionGroup.id */
  options: Record<string, MenuOption>;
}

interface OrderItem {
  item: MenuItem;
  qty: number;
}

/* ── Spicy rating ── */

function SpicyRating({ level }: { level: number }) {
  if (!level) return null;
  const labels = ["", "Mild", "Spicy", "Very Spicy"];
  return (
    <span
      className="inline-flex items-center text-sm leading-none align-middle"
      title={labels[level]}
      aria-label={labels[level]}
    >
      {"🌶️".repeat(level)}
    </span>
  );
}

/* ── Component ── */

export default function Home() {
  /* Order state */
  const [bowls, setBowls] = useState<Bowl[]>([]);
  const [extras, setExtras] = useState<Map<string, OrderItem>>(new Map());
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /* Bowl builder state */
  const [buildingRamen, setBuildingRamen] = useState<MenuItem | null>(null);
  const [buildingVariant, setBuildingVariant] = useState<MenuVariant | null>(
    null
  );
  const [buildingOptions, setBuildingOptions] = useState<
    Record<string, MenuOption>
  >({});

  const mainCategories = menu;

  /* Tabbed nav — scrollspy + click-to-scroll */
  const [activeCategory, setActiveCategory] = useState<string>(
    mainCategories[0]?.id ?? ""
  );
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const tabButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const suppressObserverRef = useRef(false);

  useEffect(() => {
    // rootMargin top = header (~72px) + tabs (~44px) + a touch of breathing room
    const observer = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return;
        // Pick the entry closest to the top of the detection zone
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveCategory(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 }
    );
    for (const c of mainCategories) {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [mainCategories]);

  // Keep the active tab pill centered in the horizontally-scrolling tab bar
  useEffect(() => {
    const btn = tabButtonRefs.current.get(activeCategory);
    if (btn) btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeCategory]);

  function scrollToCategory(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    setActiveCategory(id);
    // Suppress observer briefly so mid-scroll intersections don't fight the click
    suppressObserverRef.current = true;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      suppressObserverRef.current = false;
    }, 700);
  }

  /* ── Bowl builder helpers ── */

  function startBowl(ramen: MenuItem) {
    setBuildingRamen(ramen);
    setBuildingVariant(ramen.variants?.[0] ?? null);
    const initialOptions: Record<string, MenuOption> = {};
    if (ramen.optionGroups) {
      for (const group of ramen.optionGroups) {
        const def =
          group.options.find((o) => o.id === group.defaultOptionId) ??
          group.options[0];
        if (def) initialOptions[group.id] = def;
      }
    }
    setBuildingOptions(initialOptions);
  }

  function closeBowlBuilder() {
    setBuildingRamen(null);
  }

  function confirmBowl() {
    if (!buildingRamen) return;
    setBowls((prev) => [
      ...prev,
      {
        id: `bowl-${Date.now()}`,
        ramen: buildingRamen,
        variant: buildingVariant,
        options: buildingOptions,
      },
    ]);
    closeBowlBuilder();
  }

  function removeBowl(bowlId: string) {
    setBowls((prev) => prev.filter((b) => b.id !== bowlId));
  }

  /* ── Extras (drinks, etc.) ── */

  function addExtra(item: MenuItem) {
    setExtras((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);
      if (existing) next.set(item.id, { item, qty: existing.qty + 1 });
      else next.set(item.id, { item, qty: 1 });
      return next;
    });
  }

  function removeExtra(itemId: string) {
    setExtras((prev) => {
      const next = new Map(prev);
      const existing = next.get(itemId);
      if (existing && existing.qty > 1)
        next.set(itemId, { item: existing.item, qty: existing.qty - 1 });
      else next.delete(itemId);
      return next;
    });
  }

  /* ── Totals ── */

  const bowlsTotal = bowls.reduce((sum, b) => sum + b.ramen.price, 0);
  const extrasItems = Array.from(extras.values());
  const extrasTotal = extrasItems.reduce(
    (sum, o) => sum + o.item.price * o.qty,
    0
  );
  const totalPrice = bowlsTotal + extrasTotal;
  const totalItems =
    bowls.length + extrasItems.reduce((sum, o) => sum + o.qty, 0);

  /* Bowl builder running total */
  const buildingTotal = buildingRamen?.price ?? 0;

  /* ── Messenger message ── */

  function buildOrderMessage(): string {
    const lines = [`Hi! I'd like to order from ${STORE_NAME}:`, ""];
    bowls.forEach((bowl, i) => {
      const ramenLabel = bowl.variant
        ? `${bowl.ramen.name} (${bowl.variant.name})`
        : bowl.ramen.name;
      lines.push(`Bowl ${i + 1}: ${ramenLabel} — ₱${bowl.ramen.price}`);
      if (bowl.ramen.optionGroups) {
        for (const group of bowl.ramen.optionGroups) {
          const picked = bowl.options[group.id];
          if (picked) {
            const extra = picked.description ? ` (${picked.description})` : "";
            lines.push(`  • ${group.name}: ${picked.name}${extra}`);
          }
        }
      }
    });
    if (extrasItems.length > 0) {
      lines.push("");
      for (const o of extrasItems) {
        lines.push(
          `- ${o.item.name} x${o.qty} — ₱${o.item.price * o.qty}`
        );
      }
    }
    lines.push("", `Total: ₱${totalPrice}`);
    if (customerName.trim()) lines.push(`Name: ${customerName.trim()}`);
    if (customerPhone.trim()) lines.push(`Mobile: ${customerPhone.trim()}`);
    if (customerAddress.trim())
      lines.push(`Delivery Address: ${customerAddress.trim()}`);
    lines.push("", "Thank you!");
    return lines.join("\n");
  }

  async function handleSendOrder() {
    const message = buildOrderMessage();
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(message);
        copied = true;
      }
    } catch {
      // Clipboard may be blocked (insecure context, permissions) — fall through
    }
    if (!copied) {
      // Fallback: a hidden textarea + execCommand still works on older mobile browsers
      try {
        const ta = document.createElement("textarea");
        ta.value = message;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        copied = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        copied = false;
      }
    }
    setToast(
      copied
        ? "Order copied! Paste it in Messenger to send."
        : "Couldn't auto-copy — please type your order in Messenger."
    );
    window.setTimeout(() => setToast(null), 4000);
    window.open(`https://www.messenger.com/t/${FACEBOOK_PAGE}`, "_blank");
  }

  /* ── Render ── */

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-sakura text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{APP_NAME}</h1>
            <p className="text-white/70 text-sm">
              Order via Facebook Messenger
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/share"
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-2 rounded-full text-sm transition-colors whitespace-nowrap"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Share photos
            </Link>
            {totalItems > 0 && (
              <button
                onClick={() => setShowOrder(true)}
                className="relative bg-white text-sakura-dark font-semibold px-4 py-2 rounded-full text-sm hover:bg-sakura-50 transition-colors"
              >
                View Order
                <span className="absolute -top-2 -right-2 bg-red-400 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Category tabs */}
      <nav className="sticky top-[72px] z-10 bg-white border-b border-sakura-light pt-2">
        <div
          ref={tabsRef}
          className="max-w-2xl mx-auto px-4 flex gap-2 overflow-x-auto scrollbar-hide"
        >
          {mainCategories.map((c) => {
            const isActive = c.id === activeCategory;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  if (el) tabButtonRefs.current.set(c.id, el);
                  else tabButtonRefs.current.delete(c.id);
                }}
                onClick={() => scrollToCategory(c.id)}
                className={`shrink-0 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-sakura text-sakura-dark"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Menu */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed mb-6">
          <span className="font-semibold">Heads up:</span> Availability depends
          on current stock at the shop — we also serve walk-ins, so we&apos;ll
          confirm everything with you in chat before finalizing your order.
        </p>

        {mainCategories.map((category) => {
          const isRamen = category.id === "ramen";
          const isCompact = category.id === "drinks";

          return (
            <section key={category.id} id={category.id} className="mb-8 scroll-mt-32">
              <h2 className="text-lg font-bold text-gray-700 border-b-2 border-sakura-light pb-2 mb-1">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-sm text-gray-500 mb-4 mt-1">
                  {category.description}
                </p>
              )}
              {!category.description && <div className="mb-4" />}

              {category.showcase ? (
                /* ── Showcase (bingsu) — compact ── */
                <div className="space-y-3">
                  {category.items.length > 0 && (() => {
                    const mainItems = category.items.filter((i) => !i.name.toLowerCase().includes("additional") && !i.name.toLowerCase().includes("extra"));
                    const extraItems = category.items.filter((i) => i.name.toLowerCase().includes("additional") || i.name.toLowerCase().includes("extra"));
                    const mainPrice = mainItems[0]?.price;
                    return (
                      <div className="bg-white rounded-xl p-4 border border-sakura-light">
                        <div className="flex items-start gap-3">
                          {category.image && (
                            <Image
                              src={category.image}
                              alt={category.name}
                              width={80}
                              height={80}
                              className="rounded-lg object-contain shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {mainItems.map((i) => i.name.replace(" Bingsu", "")).join(", ")}
                            </p>
                            {extraItems.map((i) => (
                              <p key={i.id} className="text-xs text-gray-400 mt-1">
                                {i.name} +₱{i.price}
                              </p>
                            ))}
                          </div>
                          {mainPrice && (
                            <p className="text-sakura-dark font-bold shrink-0">
                              ₱{mainPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                  {category.showcaseNote && (
                    <div className="bg-sakura-50 rounded-xl p-4 text-center border border-sakura-light">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.showcaseNote}
                      </p>
                    </div>
                  )}
                </div>
              ) : isRamen ? (
                /* ── Ramen cards — tap to build a bowl ── */
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                    >
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={72}
                          height={72}
                          className="rounded-lg object-cover shrink-0 mr-3"
                        />
                      )}
                      <div className="flex-1 min-w-0 mr-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.spicy ? <SpicyRating level={item.spicy} /> : null}
                          {item.badge && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full leading-none">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                        )}
                        {(() => {
                          const choices =
                            item.variants ?? item.optionGroups?.[0]?.options;
                          if (!choices || choices.length === 0) return null;
                          return (
                            <p className="text-xs text-gray-500 mt-1 flex flex-wrap items-center gap-x-1 gap-y-0.5">
                              <span>Choose:</span>
                              {choices.map((v, idx) => (
                                <span
                                  key={v.id}
                                  className="inline-flex items-center gap-1"
                                >
                                  {idx > 0 && (
                                    <span className="text-gray-400">or</span>
                                  )}
                                  <span>{v.name}</span>
                                  {v.spicy ? (
                                    <SpicyRating level={v.spicy} />
                                  ) : null}
                                </span>
                              ))}
                            </p>
                          );
                        })()}
                        {item.extras && (
                          <p className="text-xs text-gray-500 mt-1">
                            {item.extras}
                          </p>
                        )}
                        <p className="text-sakura-dark font-bold mt-1">
                          ₱{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => startBowl(item)}
                        className="px-4 py-1.5 bg-sakura text-white text-sm font-semibold rounded-full hover:bg-sakura-dark transition-colors shrink-0"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                  <div className="bg-sakura-50 rounded-xl p-4 border border-sakura-light">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-sakura-dark">Prefer to cook at home?</span>{" "}
                      You can also buy or have any ramen delivered uncooked at base price — perfect for adding your own toppings and customizations.{" "}
                      <a
                        href={`https://www.messenger.com/t/${FACEBOOK_PAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sakura-dark font-semibold underline"
                      >
                        Just PM us!
                      </a>
                    </p>

                    <div className="mt-3 space-y-2">
                      <div>
                        <p className="text-xs font-bold text-sakura-dark uppercase tracking-wide mb-1">— Soup Base —</p>
                        <div className="space-y-0.5">
                          {[
                            { name: "Shin Ramyun Red", price: 65 },
                            { name: "Jin Ramen Mild", price: 55 },
                            { name: "Jin Ramen Spicy", price: 55 },
                            { name: "Samyang Garlic and Clam MEP", price: 65 },
                            { name: "Ottogi Ramen", price: 50 },
                            { name: "Ottogi Cheese Ramen", price: 85 },
                            { name: "Otoki Cheesy Ramen", price: 90 },
                          ].map((r) => (
                            <div key={r.name} className="flex justify-between text-sm text-gray-700">
                              <span>{r.name}</span>
                              <span className="font-semibold text-sakura-dark shrink-0 ml-3">₱{r.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-sakura-dark uppercase tracking-wide mb-1 mt-3 border-t border-sakura-light pt-2">— Stir-Fry —</p>
                        <div className="space-y-0.5">
                          {[
                            { name: "Otoki Cheesy Ramen", price: 90 },
                            { name: "Otoki Cheesy Ramen Spicy", price: 90 },
                            { name: "Samyang Buldak Quattro Cheese", price: 110 },
                            { name: "Samyang Buldak Carbonara", price: 110 },
                            { name: "Samyang Buldak Rosè", price: 110 },
                            { name: "Ottogi Stir-Fry Cheese Ramen", price: 85 },
                            { name: "Ottogi Stir-Fry Cheese Ramen Spicy", price: 85 },
                          ].map((r) => (
                            <div key={r.name} className="flex justify-between text-sm text-gray-700">
                              <span>{r.name}</span>
                              <span className="font-semibold text-sakura-dark shrink-0 ml-3">₱{r.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed mt-3">
                      <span className="font-semibold text-sakura-dark">✨ Heads up</span> — we sometimes run base-price promos tied to special occasions. Feel free to{" "}
                      <a
                        href={`https://www.messenger.com/t/${FACEBOOK_PAGE}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sakura-dark font-semibold underline"
                      >
                        PM us
                      </a>{" "}
                      to ask if any are coming up!
                    </p>
                  </div>
                </div>
              ) : isCompact ? (
                /* ── Compact grid (drinks) ── */
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => {
                    const inOrder = extras.get(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between bg-white rounded-lg px-3 py-2.5 border transition-colors ${
                          inOrder
                            ? "border-sakura bg-sakura-50"
                            : "border-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 mr-2">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={36}
                              height={36}
                              className="rounded-md object-contain shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 leading-tight">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <p className="text-xs text-sakura-dark font-bold">
                                ₱{item.price}
                              </p>
                              {item.badge && (
                                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full leading-none">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-[10px] text-gray-400 leading-tight mt-0.5">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {inOrder ? (
                            <>
                              <button
                                onClick={() => removeExtra(item.id)}
                                className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-semibold text-xs">
                                {inOrder.qty}
                              </span>
                              <button
                                onClick={() => addExtra(item)}
                                className="w-6 h-6 rounded-full bg-sakura text-white font-bold text-sm flex items-center justify-center hover:bg-sakura-dark transition-colors"
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => addExtra(item)}
                              className="px-3 py-1 bg-sakura text-white text-xs font-semibold rounded-full hover:bg-sakura-dark transition-colors"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* ── Full cards fallback ── */
                <div className="space-y-3">
                  {category.items.map((item) => {
                    const inOrder = extras.get(item.id);
                    if (item.comingSoon) {
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-sakura-50 rounded-xl p-4 border border-sakura-light"
                        >
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={item.imageSize ?? 72}
                              height={item.imageSize ?? 72}
                              className="rounded-lg object-contain shrink-0 mr-3 opacity-70"
                            />
                          )}
                          <div className="flex-1 min-w-0 mr-3">
                            <h3 className="font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            {item.description && (
                              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                                {item.description}
                              </p>
                            )}
                            {item.note && (
                              <p className="text-xs text-sakura-dark mt-1 italic">
                                {item.note}
                              </p>
                            )}
                          </div>
                          <span className="shrink-0 text-xs font-bold text-sakura-dark bg-white border border-sakura-light px-3 py-1.5 rounded-full">
                            Coming Soon
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100"
                      >
                        {item.image && (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={item.imageSize ?? 72}
                            height={item.imageSize ?? 72}
                            className="rounded-lg object-contain shrink-0 mr-3"
                          />
                        )}
                        <div className="flex-1 min-w-0 mr-3">
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                              {item.description}
                            </p>
                          )}
                          <p className="text-sakura-dark font-bold mt-1">
                            ₱{item.price}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {inOrder ? (
                            <>
                              <button
                                onClick={() => removeExtra(item.id)}
                                className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-semibold">
                                {inOrder.qty}
                              </span>
                              <button
                                onClick={() => addExtra(item)}
                                className="w-8 h-8 rounded-full bg-sakura text-white font-bold text-lg flex items-center justify-center hover:bg-sakura-dark transition-colors"
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => addExtra(item)}
                              className="px-4 py-1.5 bg-sakura text-white text-sm font-semibold rounded-full hover:bg-sakura-dark transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* ── Bowl Builder Sheet ── */}
      {buildingRamen && (
        <div className="fixed inset-0 z-30 flex flex-col">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeBowlBuilder}
          />
          <div className="relative mt-auto bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="px-4 py-4 border-b border-sakura-light flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Build Your Bowl
                </h2>
                <p className="text-sm text-gray-500 flex items-center gap-1.5">
                  <span>
                    {buildingRamen.name}
                    {buildingVariant ? ` (${buildingVariant.name})` : ""}
                  </span>
                  {(() => {
                    const s = buildingVariant?.spicy ?? buildingRamen.spicy;
                    return s ? <SpicyRating level={s} /> : null;
                  })()}
                </p>
              </div>
              <button
                onClick={closeBowlBuilder}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
              {/* Variant picker */}
              {buildingRamen.variants && buildingRamen.variants.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2">
                    Choose your flavor
                  </h3>
                  <div
                    className={`grid gap-2 ${
                      buildingRamen.variants.length >= 3
                        ? "grid-cols-3"
                        : "grid-cols-2"
                    }`}
                  >
                    {buildingRamen.variants.map((variant) => {
                      const selected = buildingVariant?.id === variant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setBuildingVariant(variant)}
                          className={`flex flex-col items-center gap-2 rounded-lg px-3 py-3 border transition-colors ${
                            selected
                              ? "border-sakura bg-sakura-50"
                              : "border-gray-100 bg-white"
                          }`}
                        >
                          {variant.image && (
                            <Image
                              src={variant.image}
                              alt={variant.name}
                              width={72}
                              height={72}
                              className="rounded-md object-cover"
                            />
                          )}
                          <span
                            className={`text-sm font-semibold text-center flex items-center gap-1 flex-wrap justify-center ${
                              selected ? "text-sakura-dark" : "text-gray-800"
                            }`}
                          >
                            <span>{variant.name}</span>
                            {variant.spicy ? (
                              <SpicyRating level={variant.spicy} />
                            ) : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Option groups (multi-pick) */}
              {buildingRamen.optionGroups?.map((group) => {
                const selectedId = buildingOptions[group.id]?.id;
                return (
                  <div key={group.id}>
                    <h3 className="text-sm font-bold text-gray-700 mb-2">
                      {group.name}
                    </h3>
                    <div
                      className={`grid gap-2 ${
                        group.options.length >= 3
                          ? "grid-cols-3"
                          : "grid-cols-2"
                      }`}
                    >
                      {group.options.map((option) => {
                        const selected = selectedId === option.id;
                        return (
                          <button
                            key={option.id}
                            onClick={() =>
                              setBuildingOptions((prev) => ({
                                ...prev,
                                [group.id]: option,
                              }))
                            }
                            className={`flex flex-col items-center gap-2 rounded-lg px-2 py-3 border transition-colors ${
                              selected
                                ? "border-sakura bg-sakura-50"
                                : "border-gray-100 bg-white"
                            }`}
                          >
                            {option.image && (
                              <Image
                                src={option.image}
                                alt={option.name}
                                width={64}
                                height={64}
                                className="rounded-md object-cover"
                              />
                            )}
                            <span
                              className={`text-xs font-semibold text-center flex items-center gap-1 flex-wrap justify-center leading-tight ${
                                selected ? "text-sakura-dark" : "text-gray-800"
                              }`}
                            >
                              <span>{option.name}</span>
                              {option.spicy ? (
                                <SpicyRating level={option.spicy} />
                              ) : null}
                            </span>
                            {option.description && (
                              <span className="text-[10px] text-gray-500 leading-none">
                                {option.description}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Delivery note */}
              {buildingRamen.note && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
                  {buildingRamen.note}
                </p>
              )}

              {/* Assembly instructions */}
              {buildingRamen.assemblyInstructions &&
                buildingRamen.assemblyInstructions.length > 0 && (
                  <div className="bg-sakura-50 border border-sakura-light rounded-lg px-3 py-2.5">
                    <p className="text-xs font-semibold text-gray-700 mb-1.5">
                      Easy to assemble — we include a note in the bag:
                    </p>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-gray-600 leading-relaxed">
                      {buildingRamen.assemblyInstructions.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}

            </div>

            {/* Confirm button */}
            <div className="border-t border-sakura-light px-4 py-4">
              <button
                onClick={confirmBowl}
                className="w-full bg-sakura text-white font-bold py-3.5 rounded-full text-base hover:bg-sakura-dark transition-colors"
              >
                Add to Order — ₱{buildingTotal}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky bottom bar */}
      {totalItems > 0 && !showOrder && !buildingRamen && (
        <div className="sticky bottom-0 z-10 bg-white border-t border-sakura-light shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {bowls.length} bowl{bowls.length !== 1 ? "s" : ""}
                {extrasItems.length > 0 &&
                  ` + ${extrasItems.reduce((s, o) => s + o.qty, 0)} drink${extrasItems.reduce((s, o) => s + o.qty, 0) !== 1 ? "s" : ""}`}
              </p>
              <p className="text-lg font-bold text-gray-900">₱{totalPrice}</p>
            </div>
            <button
              onClick={() => setShowOrder(true)}
              className="bg-sakura text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-sakura-dark transition-colors"
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {/* ── Order Review Panel ── */}
      {showOrder && (
        <div className="fixed inset-0 z-30 flex flex-col">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowOrder(false)}
          />
          <div className="relative mt-auto bg-white rounded-t-2xl shadow-2xl max-h-[85vh] flex flex-col">
            <div className="px-4 py-4 border-b border-sakura-light flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Your Order</h2>
              <button
                onClick={() => setShowOrder(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
              {bowls.length === 0 && extrasItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Your order is empty
                </p>
              ) : (
                <>
                  {/* Bowls */}
                  {bowls.map((bowl, i) => (
                    <div
                      key={bowl.id}
                      className="bg-gray-50 rounded-xl p-3 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Bowl {i + 1}: {bowl.ramen.name}
                            {bowl.variant ? ` (${bowl.variant.name})` : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₱{bowl.ramen.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeBowl(bowl.id)}
                          className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      {bowl.ramen.optionGroups?.map((group) => {
                        const picked = bowl.options[group.id];
                        if (!picked) return null;
                        return (
                          <p
                            key={group.id}
                            className="text-sm text-gray-600 pl-3"
                          >
                            <span className="text-gray-400">{group.name}:</span>{" "}
                            {picked.name}
                            {picked.description ? ` (${picked.description})` : ""}
                          </p>
                        );
                      })}
                      <p className="text-sm font-semibold text-sakura-dark text-right">
                        ₱{bowl.ramen.price}
                      </p>
                    </div>
                  ))}

                  {/* Extras */}
                  {extrasItems.map((o) => (
                    <div
                      key={o.item.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900">
                          {o.item.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₱{o.item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeExtra(o.item.id)}
                          className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-300 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-semibold text-sm">
                          {o.qty}
                        </span>
                        <button
                          onClick={() => addExtra(o.item)}
                          className="w-7 h-7 rounded-full bg-sakura text-white font-bold flex items-center justify-center hover:bg-sakura-dark transition-colors"
                        >
                          +
                        </button>
                        <p className="w-16 text-right font-semibold text-gray-900">
                          ₱{o.item.price * o.qty}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Customer details (scrolls with order) */}
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sakura-light focus:border-sakura"
                    />
                    <input
                      type="tel"
                      placeholder="Mobile number (e.g. 09171234567)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sakura-light focus:border-sakura"
                    />
                    <textarea
                      placeholder="Delivery address"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      rows={2}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sakura-light focus:border-sakura resize-none"
                    />
                    <div className="bg-sakura-50 border border-sakura-light rounded-xl p-3 text-sm text-gray-700 leading-relaxed">
                      <p className="font-semibold text-gray-800 mb-1">
                        How to send your order
                      </p>
                      <ol className="list-decimal list-inside space-y-0.5 text-xs text-gray-600">
                        <li>Tap the button below — we&apos;ll copy your order.</li>
                        <li>Messenger will open in a new tab.</li>
                        <li>
                          <span className="font-semibold text-sakura-dark">
                            Paste the order into the chat
                          </span>{" "}
                          and hit send.
                        </li>
                      </ol>
                    </div>
                  </div>
                </>
              )}
            </div>

            {(bowls.length > 0 || extrasItems.length > 0) && (
              <div className="border-t border-sakura-light px-4 py-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-sakura-dark">
                    ₱{totalPrice}
                  </span>
                </div>

                <button
                  onClick={handleSendOrder}
                  className="w-full bg-[#0084ff] text-white font-bold py-3 rounded-full text-base hover:bg-[#0073e6] transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.453 5.497 3.727 7.191V22l3.414-1.876c.91.252 1.876.388 2.859.388 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.07 12.449-2.545-2.714-4.97 2.714 5.467-5.804 2.609 2.714 4.906-2.714-5.467 5.804z" />
                  </svg>
                  Copy Order & Open Messenger
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Availability and Payment details can be discussed in chat.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg max-w-[90vw] text-center">
          {toast}
        </div>
      )}

      {/* Floating Messenger button */}
      <a
        href={`https://www.messenger.com/t/${FACEBOOK_PAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-20 w-14 h-14 bg-[#0084ff] rounded-full shadow-lg flex items-center justify-center hover:bg-[#0073e6] transition-colors hover:scale-105"
        aria-label="Message us on Facebook"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.453 5.497 3.727 7.191V22l3.414-1.876c.91.252 1.876.388 2.859.388 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.07 12.449-2.545-2.714-4.97 2.714 5.467-5.804 2.609 2.714 4.906-2.714-5.467 5.804z" />
        </svg>
      </a>

      {/* Hours */}
      <section className="max-w-2xl mx-auto w-full px-4 pb-4">
        <div className="bg-sakura-50 rounded-xl p-5 border border-sakura-light text-center">
          <h3 className="font-bold text-gray-700 mb-2">Hours</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-semibold">Mon – Fri:</span> 10am – 10pm
            <br />
            <span className="font-semibold">Saturday:</span> 12nn – 8pm
            <br />
            <span className="font-semibold">Sunday:</span>{" "}
            <span className="text-gray-400">Closed</span>
          </p>
        </div>
      </section>

      {/* Delivery info */}
      <section className="max-w-2xl mx-auto w-full px-4 pb-6">
        <div className="bg-sakura-50 rounded-xl p-5 border border-sakura-light text-center">
          <h3 className="font-bold text-gray-700 mb-2">Delivery</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Delivery is done through{" "}
            <span className="font-semibold">Maxim</span>. The delivery fee
            depends on the Maxim rate based on your location.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sakura-50 border-t border-sakura-light py-4 text-center text-xs text-gray-400">
        <a
          href="https://www.facebook.com/kravezamboanga/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sakura-dark transition-colors"
        >
          Follow us on Facebook
        </a>
        <span className="mx-2">·</span>
        <span>{STORE_NAME}</span>
      </footer>
    </div>
  );
}
