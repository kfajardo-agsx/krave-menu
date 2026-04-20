export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  /** Heat level: 0 = not spicy, 1 = mild, 2 = spicy, 3 = very spicy */
  spicy?: 0 | 1 | 2 | 3;
  /** Small highlight badge shown next to the item (e.g. "0 CAL") */
  badge?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  /** If true, items in this category are display-only (not orderable for delivery) */
  showcase?: boolean;
  showcaseNote?: string;
  /** Optional hero image for the category (used in showcase layout) */
  image?: string;
  items: MenuItem[];
}

export const APP_NAME = "KRAVE Order Helper";
export const STORE_NAME = "KRAVE Zamboanga";
export const FACEBOOK_PAGE = "kravezamboanga";

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
        image: "/images/shin%20ramyun.png",
        spicy: 2,
      },
      {
        id: "jin-ramen-mild",
        name: "Jin Ramen Mild",
        description: "Smooth and savory mild ramen",
        price: 55,
        image: "/images/jin%20ramen%20mild.png",
        spicy: 1,
      },
      {
        id: "jin-ramen-spicy",
        name: "Jin Ramen Spicy",
        description: "Bold and spicy ramen",
        price: 55,
        image: "/images/jin%20ramen%20spicy.png",
        spicy: 2,
      },
      {
        id: "ottogi-cheese-soup",
        name: "Ottogi Cheese Ramen",
        description: "Creamy cheese ramen soup",
        price: 85,
        image: "/images/ottogi%20cheese%20ramen.png",
        spicy: 0,
      },
      {
        id: "ottogi-cheese",
        name: "Ottogi Stir Fry Cheese Ramen",
        description: "Cheesy stir-fried noodles",
        price: 85,
        image: "/images/ottogi%20stirfry%20cheese%20ramen.png",
        spicy: 0,
      },
      {
        id: "ottogi-cheese-spicy",
        name: "Ottogi Stir Fry Cheese Ramen Spicy",
        description: "Spicy cheesy stir-fried noodles",
        price: 85,
        image: "/images/ottogi%20stirfry%20cheese%20ramen%20spicy.png",
        spicy: 2,
      },
      {
        id: "samyang-quattro",
        name: "Samyang Quattro Cheese",
        description: "Four-cheese flavored fire noodles",
        price: 110,
        image: "/images/samyang%20quattro%20cheese.png",
        spicy: 3,
      },
      {
        id: "samyang-carbonara",
        name: "Samyang Buldak Carbonara",
        description: "Creamy carbonara fire noodles",
        price: 110,
        image: "/images/samyang%20carbonara.png",
        spicy: 3,
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
        image: "/images/cheese%20slice.png",
      },
      {
        id: "crabstick",
        name: "Crabstick",
        description: "",
        price: 15,
        image: "/images/crabstick.png",
      },
      {
        id: "fresh-egg",
        name: "Fresh Egg",
        description: "",
        price: 15,
        image: "/images/egg.png",
      },
      {
        id: "fishcake-triangles",
        name: "Fishcake Triangles",
        description: "",
        price: 15,
        image: "/images/fishcake%20triangles.png",
      },
      {
        id: "fish-cheese-tofu",
        name: "Fish Cheese Tofu",
        description: "",
        price: 20,
        image: "/images/fish%20cheese%20tofu.png",
      },
      {
        id: "golden-cheese-ball",
        name: "Golden Cheese Ball",
        description: "",
        price: 20,
        image: "/images/golden%20cheese%20ball.png",
      },
      {
        id: "kimchi",
        name: "Kimchi (1oz)",
        description: "",
        price: 20,
        image: "/images/kimchi.png",
      },
      {
        id: "lobster-ball",
        name: "Lobster Ball",
        description: "",
        price: 20,
        image: "/images/lobster%20ball.png",
      },
      {
        id: "crab-claw",
        name: "Crab Claw",
        description: "",
        price: 25,
        image: "/images/crab%20claw.png",
      },
      {
        id: "hello-kitty-fishcake",
        name: "Hello Kitty Fishcake (2pcs)",
        description: "",
        price: 25,
        image: "/images/hello%20kitty%20fishcake.png",
      },
      {
        id: "lobster-stick",
        name: "Lobster Stick",
        description: "",
        price: 25,
        image: "/images/lobster%20stick.png",
      },
      {
        id: "naruto-maki",
        name: "Naruto Maki (2pcs)",
        description: "",
        price: 25,
        image: "/images/narutomaki.png",
      },
      {
        id: "scallop-bun",
        name: "Scallop Bun",
        description: "",
        price: 25,
        image: "/images/scallop%20bun.png",
      },
      {
        id: "seafood-bun",
        name: "Seafood Bun",
        description: "",
        price: 25,
        image: "/images/seafood%20bun.png",
      },
    ],
  },
  {
    id: "sides",
    name: "Sides",
    items: [
      {
        id: "namkwang-seaweed",
        name: "Namkwang Seaweed Pack",
        description: "",
        price: 25,
        image: "/images/namkwang%20seaweed.png",
      },
    ],
  },
  {
    id: "drinks",
    name: "Drinks",
    description:
      "Pouch drinks (Baba, IceTalk, Cantabile) are meant to be poured over ice — they're intentionally concentrated and sweeter so the flavor balances perfectly as the ice melts.",
    items: [
      {
        id: "coke-290ml",
        name: "Coke 290ml",
        description: "",
        price: 25,
        image: "/images/coke.png",
      },
      {
        id: "baba-americano",
        name: "Baba Americano",
        description: "",
        price: 50,
        image: "/images/baba%20americano.png",
      },
      {
        id: "baba-apple-mango-ade",
        name: "Baba Apple Mango Ade Zero",
        description: "",
        price: 50,
        image: "/images/baba%20apple%20mango%20ade%20zero.png",
        badge: "0 CAL",
      },
      {
        id: "baba-caramel-macchiato",
        name: "Baba Caramel Macchiato",
        description: "",
        price: 50,
        image: "/images/baba%20caramel%20machiatto.png",
      },
      {
        id: "baba-hazelnut",
        name: "Baba Hazelnut",
        description: "",
        price: 50,
        image: "/images/baba%20hazelnut.png",
      },
      {
        id: "cantabile-strawberry",
        name: "Cantabile Strawberry Ade",
        description: "",
        price: 50,
        image: "/images/cantabile%20strawberry.png",
      },
      {
        id: "icetalk-blue-lemonade",
        name: "IceTalk Blue Lemonade",
        description: "",
        price: 50,
        image: "/images/icetalk%20blue%20lemonade.png",
      },
      {
        id: "icetalk-blueberry",
        name: "IceTalk Blueberry Ade",
        description: "",
        price: 50,
        image: "/images/icetalk%20blueberry.png",
      },
      {
        id: "icetalk-green-grape",
        name: "IceTalk Green Grape",
        description: "",
        price: 50,
        image: "/images/icetalk%20greengrape.png",
      },
      {
        id: "icetalk-kiwi",
        name: "IceTalk Kiwi Ade",
        description: "",
        price: 50,
        image: "/images/icetalk%20kiwi.png",
      },
      {
        id: "icetalk-peach",
        name: "IceTalk Peach Icetea",
        description: "",
        price: 50,
        image: "/images/icetalk%20peach.png",
      },
      {
        id: "icetalk-pomegranate",
        name: "IceTalk Pomegranate",
        description: "",
        price: 50,
        image: "/images/icetalk%20pomegranate.png",
      },
    ],
  },
  {
    id: "bingsu",
    name: "Bingsu",
    description:
      "Real milk snow — Korean shaved ice made from real milk, not regular ice.",
    showcase: true,
    image: "/images/bingsu.png",
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
