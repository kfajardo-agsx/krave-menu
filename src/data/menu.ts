export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  /** If true, items in this category are display-only (not orderable for delivery) */
  showcase?: boolean;
  showcaseNote?: string;
  items: MenuItem[];
}

export const STORE_NAME = "KRAVE Zamboanga";
export const FACEBOOK_PAGE = "kravezamboanga";

// Messenger link — customers tap "Send Order" and it opens Messenger with the order summary
export function getMessengerLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://www.messenger.com/t/${FACEBOOK_PAGE}?text=${encoded}`;
}

export const menu: MenuCategory[] = [
  {
    id: "ramen",
    name: "Ramen",
    items: [
      {
        id: "shin-ramyun",
        name: "Shin Ramyun",
        description: "Classic Korean spicy noodle soup",
        price: 65,
      },
      {
        id: "jin-ramen-mild",
        name: "Jin Ramen Mild",
        description: "Smooth and savory mild ramen",
        price: 55,
      },
      {
        id: "jin-ramen-spicy",
        name: "Jin Ramen Spicy",
        description: "Bold and spicy ramen",
        price: 55,
      },
      {
        id: "ottogi-cheese",
        name: "Ottogi Stir Fry Cheese Ramen",
        description: "Cheesy stir-fried noodles",
        price: 85,
      },
      {
        id: "ottogi-cheese-spicy",
        name: "Ottogi Stir Fry Cheese Ramen Spicy",
        description: "Spicy cheesy stir-fried noodles",
        price: 85,
      },
      {
        id: "samyang-quattro",
        name: "Samyang Quattro Cheese",
        description: "Four-cheese flavored fire noodles",
        price: 110,
      },
      {
        id: "samyang-carbonara",
        name: "Samyang Buldak Carbonara",
        description: "Creamy carbonara fire noodles",
        price: 110,
      },
    ],
  },
  {
    id: "cook-it",
    name: "Cook It?",
    description: "Want us to cook your ramen for you?",
    items: [
      {
        id: "cook-it",
        name: "Cook My Ramen",
        description: "We'll cook it fresh for you",
        price: 20,
      },
    ],
  },
  {
    id: "toppings",
    name: "Toppings",
    description: "Add extras to your ramen",
    items: [
      {
        id: "cheese-slice",
        name: "Cheese Slice",
        description: "",
        price: 15,
      },
      {
        id: "crabstick",
        name: "Crabstick",
        description: "",
        price: 15,
      },
      {
        id: "fresh-egg",
        name: "Fresh Egg",
        description: "",
        price: 15,
      },
      {
        id: "fishcake-triangles",
        name: "Fishcake Triangles",
        description: "",
        price: 15,
      },
      {
        id: "namkwang-seaweed",
        name: "Namkwang Seaweed Pack",
        description: "",
        price: 25,
      },
      {
        id: "fish-cheese-tofu",
        name: "Fish Cheese Tofu",
        description: "",
        price: 20,
      },
      {
        id: "golden-cheese-ball",
        name: "Golden Cheese Ball",
        description: "",
        price: 20,
      },
      {
        id: "kimchi",
        name: "Kimchi (1oz)",
        description: "",
        price: 20,
      },
      {
        id: "lobster-ball",
        name: "Lobster Ball",
        description: "",
        price: 20,
      },
      {
        id: "crab-claw",
        name: "Crab Claw",
        description: "",
        price: 25,
      },
      {
        id: "hello-kitty-fishcake",
        name: "Hello Kitty Fishcake (2pcs)",
        description: "",
        price: 25,
      },
      {
        id: "lobster-stick",
        name: "Lobster Stick",
        description: "",
        price: 25,
      },
      {
        id: "naruto-maki",
        name: "Naruto Maki (2pcs)",
        description: "",
        price: 25,
      },
      {
        id: "scallop-bun",
        name: "Scallop Bun",
        description: "",
        price: 25,
      },
      {
        id: "seafood-bun",
        name: "Seafood Bun",
        description: "",
        price: 25,
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    items: [
      {
        id: "coke-290ml",
        name: "Coke 290ml",
        description: "",
        price: 25,
      },
      {
        id: "baba-americano",
        name: "Baba Americano",
        description: "",
        price: 50,
      },
      {
        id: "baba-apple-mango-ade",
        name: "Baba Apple Mango Ade Zero",
        description: "",
        price: 50,
      },
      {
        id: "baba-caramel-macchiato",
        name: "Baba Caramel Macchiato",
        description: "",
        price: 50,
      },
      {
        id: "baba-hazelnut",
        name: "Baba Hazelnut",
        description: "",
        price: 50,
      },
      {
        id: "cantabile-strawberry",
        name: "Cantabile Strawberry Ade",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-blue-lemonade",
        name: "IceTalk Blue Lemonade",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-blueberry",
        name: "IceTalk Blueberry Ade",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-green-grape",
        name: "IceTalk Green Grape",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-kiwi",
        name: "IceTalk Kiwi Ade",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-peach",
        name: "IceTalk Peach Icetea",
        description: "",
        price: 50,
      },
      {
        id: "icetalk-pomegranate",
        name: "IceTalk Pomegranate",
        description: "",
        price: 50,
      },
    ],
  },
  {
    id: "bingsu",
    name: "Bingsu",
    description:
      "Real milk snow — Korean shaved ice made from real milk, not regular ice.",
    showcase: true,
    showcaseNote:
      "Sorry, Bingsu isn't available for delivery! We don't want it to melt on the way to you — we want you to experience it at its best. Come visit us at KRAVE next time and try it fresh!",
    items: [
      {
        id: "bingsu-cookies-cream",
        name: "Cookies & Cream Bingsu",
        description: "",
        price: 67,
      },
      {
        id: "bingsu-mango",
        name: "Mango Bingsu",
        description: "",
        price: 67,
      },
      {
        id: "bingsu-ube-cheese",
        name: "Ube & Cheese Bingsu",
        description: "",
        price: 67,
      },
      {
        id: "bingsu-extra-scoop",
        name: "Additional Ice Cream Scoop",
        description: "",
        price: 13,
      },
    ],
  },
];
