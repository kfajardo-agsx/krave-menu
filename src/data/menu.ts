export interface MenuVariant {
  id: string;
  name: string;
  image?: string;
  /** Heat level for this variant: 0 = not spicy, 1 = mild, 2 = spicy, 3 = very spicy */
  spicy?: 0 | 1 | 2 | 3;
}

export interface MenuOption {
  id: string;
  name: string;
  image?: string;
  spicy?: 0 | 1 | 2 | 3;
  /** Optional small subtitle on the option card (e.g. "2 pcs") */
  description?: string;
}

export interface MenuOptionGroup {
  id: string;
  /** Section heading shown in the modal (e.g. "Normal topping") */
  name: string;
  options: MenuOption[];
  /** ID of the option pre-selected by default; if omitted, first option is used */
  defaultOptionId?: string;
}

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
  /** If present, the customer must pick one of these variants when ordering */
  variants?: MenuVariant[];
  /** Multi-group required selections (e.g. base + normal topping + premium topping) */
  optionGroups?: MenuOptionGroup[];
  /** Things automatically included in the item (e.g. "1 fresh egg") */
  includes?: string[];
  /** Shown below the price, highlighted — used for delivery caveats etc. */
  note?: string;
  /** Step-by-step assembly/prep instructions (shown in the builder modal) */
  assemblyInstructions?: string[];
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

export const APP_NAME = "KRAVE Delivery Order Helper";
export const STORE_NAME = "KRAVE ramyeon❀bingsu";
export const FACEBOOK_PAGE = "kravezamboanga";

export const menu: MenuCategory[] = [
  {
    id: "ramen",
    name: "Ramen",
    items: [
      {
        id: "samyang-cheesy-stirfry",
        name: "Samyang Cheesy Stir-Fry",
        description:
          "Samyang ramyeon cooked to perfection with our homemade cheese sauce — creamy, cheesy, mouth-watering.",
        price: 150,
        spicy: 3,
        note: "For delivery: to make sure we are giving you the best, we send our stir fry partly deconstructed so your noodles don't get mushy",
        assemblyInstructions: [
          "Drop the noodles + cheese into the bowl (we add a splash of hot water to help melt the sauce)",
          "Pour in the seasoning packets (if you want it milder, skip part of the heat packet)",
          "Mix and enjoy!",
        ],
        variants: [
          {
            id: "quattro",
            name: "Quattro Cheese",
            image: "/images/samyang%20quattro%20cheese.png",
            spicy: 3,
          },
          {
            id: "carbonara",
            name: "Carbonara",
            image: "/images/samyang%20carbonara.png",
            spicy: 3,
          },
        ],
      },
      {
        id: "ottogi-extra-cheesy-stirfry",
        name: "Ottogi Extra Cheesy Stir-Fry",
        description:
          "Ottogi stir-fry ramen loaded with our homemade cheese sauce for a creamier, even cheesier bite.",
        price: 125,
        note: "For delivery: to make sure we are giving you the best, we send our stir fry partly deconstructed so your noodles don't get mushy",
        assemblyInstructions: [
          "Drop the noodles + cheese into the bowl (we add a splash of hot water to help melt the sauce)",
          "Pour in the seasoning packets (if you want it milder, skip part of the heat packet)",
          "Mix and enjoy!",
        ],
        variants: [
          {
            id: "ottogi-original",
            name: "Original",
            image: "/images/ottogi%20stirfry%20cheese%20ramen.png",
            spicy: 0,
          },
          {
            id: "ottogi-spicy",
            name: "Spicy",
            image: "/images/ottogi%20stirfry%20cheese%20ramen%20spicy.png",
            spicy: 2,
          },
        ],
      },
      {
        id: "classic-ramyeon",
        name: "Classic Ramyeon",
        description:
          "Classic Korean soup ramyeon — rich broth, comforting bowl. Pick your flavor.",
        price: 95,
        variants: [
          {
            id: "shin-ramyun",
            name: "Shin Ramyun",
            image: "/images/shin%20ramyun.png",
            spicy: 2,
          },
          {
            id: "jin-ramen-mild",
            name: "Jin Ramen Mild",
            image: "/images/jin%20ramen%20mild.png",
            spicy: 1,
          },
          {
            id: "jin-ramen-spicy",
            name: "Jin Ramen Spicy",
            image: "/images/jin%20ramen%20spicy.png",
            spicy: 2,
          },
        ],
      },
      {
        id: "loaded-ramyeon",
        name: "Loaded Ramyeon",
        description:
          "Classic ramyeon soup bowl loaded with a fresh egg and your pick of toppings.",
        price: 150,
        includes: ["1 fresh egg"],
        optionGroups: [
          {
            id: "base",
            name: "Choose your base",
            options: [
              {
                id: "shin-ramyun",
                name: "Shin Ramyun",
                image: "/images/shin%20ramyun.png",
                spicy: 2,
              },
              {
                id: "jin-ramen-mild",
                name: "Jin Ramen Mild",
                image: "/images/jin%20ramen%20mild.png",
                spicy: 1,
              },
              {
                id: "jin-ramen-spicy",
                name: "Jin Ramen Spicy",
                image: "/images/jin%20ramen%20spicy.png",
                spicy: 2,
              },
            ],
          },
          {
            id: "normal-topping",
            name: "Normal topping (pick one)",
            defaultOptionId: "crabstick",
            options: [
              {
                id: "crabstick",
                name: "Crabstick",
                description: "1 pc",
                image: "/images/crabstick.png",
              },
              {
                id: "fishcake-triangles",
                name: "Fishcake Triangles",
                description: "4 pcs",
                image: "/images/fishcake%20triangles.png",
              },
              {
                id: "lobster-ball",
                name: "Lobster Ball",
                description: "1 pc",
                image: "/images/lobster%20ball.png",
              },
              {
                id: "fish-cheese-tofu",
                name: "Fish Cheese Tofu",
                description: "1 pc",
                image: "/images/fish%20cheese%20tofu.png",
              },
              {
                id: "golden-cheese-ball",
                name: "Golden Cheese Ball",
                description: "1 pc",
                image: "/images/golden%20cheese%20ball.png",
              },
            ],
          },
          {
            id: "premium-topping",
            name: "Premium topping (pick one)",
            options: [
              {
                id: "hello-kitty-fishcake",
                name: "Hello Kitty Fishcake",
                description: "2 pcs",
                image: "/images/hello%20kitty%20fishcake.png",
              },
              {
                id: "narutomaki",
                name: "Narutomaki",
                description: "2 pcs",
                image: "/images/narutomaki.png",
              },
              {
                id: "crab-claw",
                name: "Crab Claw",
                description: "1 pc",
                image: "/images/crab%20claw.png",
              },
              {
                id: "lobster-stick",
                name: "Lobster Stick",
                description: "1 pc",
                image: "/images/lobster%20stick.png",
              },
              {
                id: "seafood-bun",
                name: "Seafood Bun",
                description: "1 pc",
                image: "/images/seafood%20bun.png",
              },
            ],
          },
        ],
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
