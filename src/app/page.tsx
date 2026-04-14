"use client";

import { useState } from "react";
import Image from "next/image";
import { menu, STORE_NAME, FACEBOOK_PAGE, getMessengerLink } from "@/data/menu";
import type { MenuItem } from "@/data/menu";

interface OrderItem {
  item: MenuItem;
  qty: number;
}

export default function Home() {
  const [order, setOrder] = useState<Map<string, OrderItem>>(new Map());
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [showOrder, setShowOrder] = useState(false);

  function addItem(item: MenuItem) {
    setOrder((prev) => {
      const next = new Map(prev);
      const existing = next.get(item.id);
      if (existing) {
        next.set(item.id, { item, qty: existing.qty + 1 });
      } else {
        next.set(item.id, { item, qty: 1 });
      }
      return next;
    });
  }

  function removeItem(itemId: string) {
    setOrder((prev) => {
      const next = new Map(prev);
      const existing = next.get(itemId);
      if (existing && existing.qty > 1) {
        next.set(itemId, { item: existing.item, qty: existing.qty - 1 });
      } else {
        next.delete(itemId);
      }
      return next;
    });
  }

  const orderItems = Array.from(order.values());
  const totalItems = orderItems.reduce((sum, o) => sum + o.qty, 0);
  const totalPrice = orderItems.reduce(
    (sum, o) => sum + o.item.price * o.qty,
    0
  );

  function buildOrderMessage(): string {
    const lines = [
      `Hi! I'd like to order from ${STORE_NAME}:`,
      "",
      ...orderItems.map(
        (o) => `- ${o.item.name} x${o.qty} — ₱${o.item.price * o.qty}`
      ),
      "",
      `Total: ₱${totalPrice}`,
    ];
    if (customerName.trim()) {
      lines.push(`Name: ${customerName.trim()}`);
    }
    if (customerPhone.trim()) {
      lines.push(`Mobile: ${customerPhone.trim()}`);
    }
    if (customerAddress.trim()) {
      lines.push(`Delivery Address: ${customerAddress.trim()}`);
    }
    lines.push("", "Thank you!");
    return lines.join("\n");
  }

  function handleSendOrder() {
    const message = buildOrderMessage();
    window.open(getMessengerLink(message), "_blank");
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-sakura text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{STORE_NAME}</h1>
            <p className="text-white/70 text-sm">
              Order via Facebook Messenger
            </p>
          </div>
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
      </header>

      {/* Menu */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        {menu.map((category) => {
          const isCompact = category.id === "toppings" || category.id === "drinks";
          return (
            <section key={category.id} className="mb-8">
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
                /* Showcase section — display items but not orderable */
                <div>
                  {category.items.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-lg overflow-hidden border border-sakura-light"
                        >
                          {item.image && (
                            <div className="relative w-full aspect-square">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 672px) 50vw, 336px"
                              />
                            </div>
                          )}
                          <div className="px-3 py-3">
                            <p className="text-sm font-medium text-gray-900 leading-tight">
                              {item.name}
                            </p>
                            <p className="text-xs text-sakura-dark font-bold mt-1">
                              ₱{item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {category.showcaseNote && (
                    <div className="bg-sakura-50 rounded-xl p-5 text-center border border-sakura-light">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {category.showcaseNote}
                      </p>
                    </div>
                  )}
                </div>
              ) : isCompact ? (
                /* Compact grid for toppings & drinks */
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item) => {
                    const inOrder = order.get(item.id);
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
                              className="rounded-md object-cover shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 leading-tight">
                              {item.name}
                            </p>
                            <p className="text-xs text-sakura-dark font-bold">
                              ₱{item.price}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          {inOrder ? (
                            <>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-semibold text-xs">
                                {inOrder.qty}
                              </span>
                              <button
                                onClick={() => addItem(item)}
                                className="w-6 h-6 rounded-full bg-sakura text-white font-bold text-sm flex items-center justify-center hover:bg-sakura-dark transition-colors"
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => addItem(item)}
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
                /* Full cards for ramen & cook-it */
                <div className="space-y-3">
                  {category.items.map((item) => {
                    const inOrder = order.get(item.id);
                    return (
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
                          <h3 className="font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-sm text-gray-500 mt-0.5">
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
                                onClick={() => removeItem(item.id)}
                                className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 font-bold text-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
                              >
                                -
                              </button>
                              <span className="w-6 text-center font-semibold">
                                {inOrder.qty}
                              </span>
                              <button
                                onClick={() => addItem(item)}
                                className="w-8 h-8 rounded-full bg-sakura text-white font-bold text-lg flex items-center justify-center hover:bg-sakura-dark transition-colors"
                              >
                                +
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => addItem(item)}
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

      {/* Sticky bottom bar */}
      {totalItems > 0 && !showOrder && (
        <div className="sticky bottom-0 z-10 bg-white border-t border-sakura-light shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {totalItems} item{totalItems > 1 ? "s" : ""}
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

      {/* Order review panel (slide-up) */}
      {showOrder && (
        <div className="fixed inset-0 z-30 flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowOrder(false)}
          />

          {/* Panel */}
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

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {orderItems.length === 0 ? (
                <p className="text-gray-400 text-center py-8">
                  Your order is empty
                </p>
              ) : (
                orderItems.map((o) => (
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
                        onClick={() => removeItem(o.item.id)}
                        className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {o.qty}
                      </span>
                      <button
                        onClick={() => addItem(o.item)}
                        className="w-7 h-7 rounded-full bg-sakura text-white font-bold flex items-center justify-center hover:bg-sakura-dark transition-colors"
                      >
                        +
                      </button>
                      <p className="w-16 text-right font-semibold text-gray-900">
                        ₱{o.item.price * o.qty}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {orderItems.length > 0 && (
              <div className="border-t border-sakura-light px-4 py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-sakura-dark">
                    ₱{totalPrice}
                  </span>
                </div>

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

                <button
                  onClick={handleSendOrder}
                  className="w-full bg-[#0084ff] text-white font-bold py-3.5 rounded-full text-base hover:bg-[#0073e6] transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.453 5.497 3.727 7.191V22l3.414-1.876c.91.252 1.876.388 2.859.388 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.07 12.449-2.545-2.714-4.97 2.714 5.467-5.804 2.609 2.714 4.906-2.714-5.467 5.804z" />
                  </svg>
                  Send Order via Messenger
                </button>

                <p className="text-xs text-gray-400 text-center">
                  This will open Facebook Messenger with your order summary.
                  Payment details can be discussed in chat.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Messenger button — always visible */}
      <a
        href={`https://www.messenger.com/t/${FACEBOOK_PAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-20 w-14 h-14 bg-[#0084ff] rounded-full shadow-lg flex items-center justify-center hover:bg-[#0073e6] transition-colors hover:scale-105"
        aria-label="Message us on Facebook"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M12 2C6.477 2 2 6.145 2 11.243c0 2.907 1.453 5.497 3.727 7.191V22l3.414-1.876c.91.252 1.876.388 2.859.388 5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.07 12.449-2.545-2.714-4.97 2.714 5.467-5.804 2.609 2.714 4.906-2.714-5.467 5.804z" />
        </svg>
      </a>

      {/* Delivery info */}
      <section className="max-w-2xl mx-auto w-full px-4 pb-6">
        <div className="bg-sakura-50 rounded-xl p-5 border border-sakura-light text-center">
          <h3 className="font-bold text-gray-700 mb-2">Delivery</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Delivery is done through <span className="font-semibold">Maxim</span>. The delivery fee depends on the Maxim rate based on your location.
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
