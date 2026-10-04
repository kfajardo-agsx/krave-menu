export interface MenuVariant {
  id: string;
  name: string;
  image?: string;
  /** Heat level for this variant: 0 = not spicy, 1 = mild, 2 = medium, 3 = spicy, 4 = very spicy */
  spicy?: 0 | 1 | 2 | 3 | 4;
}

export interface MenuOption {
  id: string;
  name: string;
  image?: string;
  spicy?: 0 | 1 | 2 | 3 | 4;
  /** Optional small subtitle on the option card (e.g. "2 pcs") */
  description?: string;
  /** Extra cost when this option is a paid add-on (see MenuItem.addOns) */
  price?: number;
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
  /** Heat level: 0 = not spicy, 1 = mild, 2 = medium, 3 = spicy, 4 = very spicy */
  spicy?: 0 | 1 | 2 | 3 | 4;
  /** Small highlight badge shown next to the item (e.g. "0 CAL") */
  badge?: string;
  /** If present, the customer must pick one of these variants when ordering */
  variants?: MenuVariant[];
  /** Multi-group required selections (e.g. base + normal topping + premium topping) */
  optionGroups?: MenuOptionGroup[];
  /** Optional paid add-ons the customer can toggle on; each adds its own price */
  addOns?: MenuOption[];
  /** Shown below the price, highlighted — used for delivery caveats etc. */
  note?: string;
  /** Step-by-step assembly/prep instructions (shown in the builder modal) */
  assemblyInstructions?: string[];
  /** Small note on the card under the Choose line (e.g. "Includes 1 egg and 2 premium toppings") */
  extras?: string;
  /** If true, item is a teaser — not orderable, "Coming Soon" badge instead of price/Add */
  comingSoon?: boolean;
  /** Override the default 72px image size */
  imageSize?: number;
  /** If true, item is temporarily removed from the menu (kept here for easy re-enable) */
  hidden?: boolean;
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
  /** If true, the whole category is temporarily removed from the menu */
  hidden?: boolean;
  items: MenuItem[];
}

export const APP_NAME = "KRAVE Delivery Order Helper";
export const STORE_NAME = "KRAVE ramyeon❀bingsu";
export const FACEBOOK_PAGE = "kravezamboanga";

/** Soup-base flavors shared by Classic and Loaded Ramyeon. */
const RAMYEON_BASE: MenuOption[] = [
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
    spicy: 1,
  },
  {
    id: "shin-ramyun",
    name: "Shin Ramyun",
    image: "/images/shin%20ramyun.png",
    spicy: 3,
  },
  {
    id: "samyang-garlic-clam",
    name: "Samyang Garlic & Clam MEP",
    image: "/images/samyang%20mep.png",
    spicy: 4,
  },
  {
    id: "ottogi-ramen",
    name: "Ottogi Ramen",
    image: "/images/ottogi%20ramen.png",
    spicy: 3,
  },
];

/** Included fresh egg — shown as a card in the builder for Classic & Loaded. */
const INCLUDED_EGG_GROUP: MenuOptionGroup = {
  id: "included-egg",
  name: "Fresh Egg (included)",
  options: [
    {
      id: "fresh-egg",
      name: "Fresh Egg",
      description: "1 pc",
      image: "/images/egg.png",
    },
  ],
};

/** Included homemade cheese sauce — shown as a card in the Buldak builder. */
const INCLUDED_CHEESE_SAUCE_GROUP: MenuOptionGroup = {
  id: "included-cheese-sauce",
  name: "Homemade Cheese Sauce (included)",
  options: [
    {
      id: "homemade-cheese-sauce",
      name: "Homemade Cheese Sauce",
      image: "/images/homemadecheese.png",
    },
  ],
};

/** The 12 add-on toppings for Loaded Ramyeon (each topping group picks one). */
const LOADED_TOPPINGS: MenuOption[] = [
  {
    id: "crabstick",
    name: "Crabstick",
    description: "1 pc",
    image: "/images/crabstick.png",
  },
  {
    id: "fish-cheese-tofu",
    name: "Fish Cheese Tofu",
    description: "1 pc",
    image: "/images/fish%20cheese%20tofu.png",
  },
  {
    id: "lobster-ball",
    name: "Lobster Ball",
    description: "1 pc",
    image: "/images/lobster%20ball.png",
  },
  {
    id: "kimchi",
    name: "Kimchi",
    description: "1 oz",
    image: "/images/kimchi.png",
  },
  {
    id: "golden-cheese-ball",
    name: "Golden Cheese Ball",
    description: "1 pc",
    image: "/images/golden%20cheese%20ball.png",
  },
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
  {
    id: "scallop-bun",
    name: "Scallop Bun",
    description: "1 pc",
    image: "/images/scallop%20bun.png",
  },
];

const STIRFRY_DELIVERY_NOTE =
  "For delivery: to make sure we are giving you the best, we send our stir fry partly deconstructed so your noodles don't get mushy";

const STIRFRY_ASSEMBLY = [
  "Drop the noodles + cheese into the bowl (we add a splash of hot water to help melt the sauce)",
  "Pour in the seasoning packets (if you want it milder, skip part of the heat packet)",
  "Mix and enjoy!",
];

const fullMenu: MenuCategory[] = [
  {
    id: "ramen",
    name: "Ramyeon",
    items: [
      {
        id: "classic-ramyeon",
        name: "Classic Ramyeon",
        description:
          "Classic Korean ramyeon in a spicy broth cooked with love and a fresh egg. A comforting bowl that warms the soul with every savory slurp.",
        price: 139,
        image: "/images/classic.jpg",
        extras: "Includes 1 fresh egg",
        variants: RAMYEON_BASE,
        optionGroups: [INCLUDED_EGG_GROUP],
      },
      {
        id: "loaded-ramyeon",
        name: "Loaded Ramyeon",
        description:
          "Classic spicy Korean ramyeon elevated with premium toppings.",
        price: 199,
        image: "/images/loaded.jpg",
        extras: "Includes 1 egg and 2 toppings",
        optionGroups: [
          {
            id: "base",
            name: "Choose your base",
            options: RAMYEON_BASE,
          },
          INCLUDED_EGG_GROUP,
          {
            id: "topping-1",
            name: "Topping 1 (pick one)",
            defaultOptionId: "crabstick",
            options: LOADED_TOPPINGS,
          },
          {
            id: "topping-2",
            name: "Topping 2 (pick one)",
            defaultOptionId: "fish-cheese-tofu",
            options: LOADED_TOPPINGS,
          },
        ],
      },
      {
        id: "cheesy-samyang-buldak",
        name: "Cheesy Samyang Buldak",
        description:
          "Your favorite Samyang stir-fried spicy noodles topped with a homemade cheese sauce.",
        price: 209,
        image: "/images/cheese%20samyang.jpg",
        extras: "Includes homemade cheese sauce",
        note: STIRFRY_DELIVERY_NOTE,
        assemblyInstructions: STIRFRY_ASSEMBLY,
        optionGroups: [INCLUDED_CHEESE_SAUCE_GROUP],
        variants: [
          {
            id: "buldak-carbonara",
            name: "Carbonara",
            image: "/images/samyang%20carbonara.png",
            spicy: 2,
          },
          {
            id: "buldak-cream-carbonara",
            name: "Cream Carbonara",
            image: "/images/samyang%20cream%20carbonara.png",
            spicy: 1,
          },
          {
            id: "buldak-rose",
            name: "Rosé",
            image: "/images/samyang%20rose.png",
            spicy: 2,
          },
          {
            id: "buldak-quattro-cheese",
            name: "Quattro Cheese",
            image: "/images/samyang%20quattro%20cheese.png",
            spicy: 3,
          },
          {
            id: "buldak-2x-spicy",
            name: "2x Spicy",
            image: "/images/samyang%202x%20spicy.png",
            spicy: 4,
          },
          {
            id: "buldak-3x-spicy",
            name: "3x Spicy",
            image: "/images/samyang%203x.png",
            spicy: 4,
          },
        ],
      },
      {
        id: "cheesy-stirfry-ramyeon",
        name: "Cheesy Stir-Fry Ramyeon",
        description:
          "Creamy cheesy Korean stir-fried ramyeon noodles, available in mild or spicy heat levels.",
        price: 149,
        image: "/images/cheese%20ramyeon.jpg",
        note: STIRFRY_DELIVERY_NOTE,
        assemblyInstructions: STIRFRY_ASSEMBLY,
        addOns: [
          {
            id: "cheese-sauce",
            name: "Homemade Creamy Cheese Sauce",
            price: 30,
            image: "/images/homemadecheese.png",
          },
        ],
        variants: [
          {
            id: "ottogi-cheese-ramen",
            name: "Ottogi Cheese Ramen",
            image: "/images/ottogi%20stirfry%20cheese%20ramen.png",
            spicy: 0,
          },
          {
            id: "ottogi-cheese-ramen-spicy",
            name: "Ottogi Cheese Ramen Spicy",
            image: "/images/ottogi%20stirfry%20cheese%20ramen%20spicy.png",
            spicy: 2,
          },
          {
            id: "otoki-cheddar-mascarpone",
            name: "Otoki Cheddar & Mascarpone",
            image: "/images/otoki%20blue.png",
            spicy: 0,
          },
          {
            id: "otoki-spicy-chili-cheddar",
            name: "Otoki Spicy Chili & Cheddar",
            image: "/images/otoki%20pink.jpeg",
            spicy: 2,
          },
        ],
      },
      {
        id: "cheesy-broth-ramyeon",
        name: "Cheesy Broth Ramyeon",
        description: "Korean ramyeon in a rich, creamy cheese broth.",
        price: 149,
        image: "/images/cheesy%20broth%20ramyeon.png",
        variants: [
          {
            id: "otoki-cheesy-ramen-cheddar",
            name: "Otoki Cheesy Ramen Cheddar",
            image: "/images/otoki%20broth%20cheesy.png",
          },
          {
            id: "ottogi-cheese-ramen-broth",
            name: "Ottogi Cheese Ramen",
            image: "/images/ottogi%20cheese%20ramen.png",
          },
        ],
      },
    ],
  },
  {
    id: "cupbaps",
    name: "Cupbaps",
    hidden: true,
    items: [
      {
        id: "mayak-cupbap",
        name: "Mayak Cupbap",
        description:
          "Hot rice topped with our signature Mayak egg (a sweet, savory, and slightly spicy soy-marinated soft-boiled egg), diced chicken luncheon meat, tangy kimchi, and crushed nori. Ultimate comfort in a cup.",
        price: 129,
        image: "/images/mayak.jpg",
        note: "We only marinate a few eggs a day, so stocks are limited.",
      },
      {
        id: "popper-cupbap",
        name: "Popper Cupbap",
        description:
          "A flavor-packed rice bowl topped with crispy, bite-sized Korean popcorn chicken in a sticky sweet-savory sauce, served with a side of kimchi and crushed seaweed.",
        price: 179,
        image: "/images/popper.jpg",
      },
    ],
  },
  {
    id: "snacks",
    name: "Snacks",
    items: [
      {
        id: "namkwang-seaweed",
        name: "Namkwang Seaweed",
        description:
          "Crispy roasted seaweed snack with a savory umami flavor and delightful crunch. Perfect for satisfying snack cravings anytime.",
        price: 40,
        image: "/images/namkwang%20seaweed.png",
      },
      {
        id: "bibigo-seaweed",
        name: "Bibigo Seaweed",
        description:
          "Light crispy seaweed with savory umami flavor, packed with essential minerals, fiber, and iodine. A nutritious, health-conscious snack.",
        price: 45,
        image: "/images/bibigo.jpg",
        imageSize: 48,
      },
      {
        id: "cheese-sticks",
        name: "Cheese Sticks",
        description:
          "Four pieces of golden crispy cheese sticks with a crunchy exterior, paired with a mayo-ketchup dip.",
        price: 75,
        image: "/images/csticks.jpg",
        hidden: true,
      },
      {
        id: "regular-fries",
        name: "Regular Fries",
        description:
          "Golden fries served plain or seasoned with a powder of your choice (plain salt, cheese, BBQ, or sour cream & onion). A perfect snack or side dish for any meal.",
        price: 55,
        image: "/images/rfries.jpg",
        hidden: true,
      },
      {
        id: "kimchi",
        name: "Kimchi (100g)",
        description: "100g of tangy, spicy Korean fermented cabbage.",
        price: 80,
        image: "/images/kimchi.png",
      },
    ],
  },
  {
    id: "coffee",
    name: "KRAVE Coffee",
    description:
      "Made with a medium roast Arabica blend from Benguet. Our vanilla syrup has real vanilla bean flecks, and we use Monin for our caramel sauce and syrup. Premium quality, at a more affordable price.",
    items: [
      {
        id: "iced-spanish-latte",
        name: "Iced Spanish Latte",
        description: "",
        price: 120,
      },
      {
        id: "iced-caramel-latte",
        name: "Iced Caramel Latte",
        description: "",
        price: 140,
      },
      {
        id: "iced-vanilla-americano",
        name: "Iced Vanilla Americano",
        description: "",
        price: 85,
      },
      {
        id: "iced-caramel-macchiato",
        name: "Iced Caramel Macchiato",
        description: "",
        price: 130,
      },
    ],
  },
  {
    id: "drinks",
    name: "Korean Pouch Drinks",
    description:
      "Korean pouch drinks (Baba, IceTalk, Cantabile) come with a cup of ice — just pour and sip. They're concentrated on purpose so the flavor balances perfectly as the ice melts.",
    items: [
      {
        id: "icetalk-blue-lemonade",
        name: "IceTalk Blue Lemonade",
        description: "with cup of ice",
        price: 70,
        image: "/images/icetalk%20blue%20lemonade.png",
      },
      {
        id: "icetalk-green-grape",
        name: "IceTalk Green Grape Ade",
        description: "with cup of ice",
        price: 70,
        image: "/images/icetalk%20greengrape.png",
      },
      {
        id: "icetalk-pomegranate",
        name: "IceTalk Pomegranate Ade",
        description: "with cup of ice",
        price: 70,
        image: "/images/icetalk%20pomegranate.png",
      },
      {
        id: "cantabile-strawberry",
        name: "Cantabile Strawberry Ade",
        description: "with cup of ice",
        price: 70,
        image: "/images/cantabile%20strawberry.png",
      },
      {
        id: "baba-apple-mango-ade",
        name: "Baba Apple Mango Ade Zero",
        description: "with cup of ice",
        price: 70,
        image: "/images/baba%20apple%20mango%20ade%20zero.png",
        badge: "0 CAL",
      },
      {
        id: "icetalk-watermelon",
        name: "IceTalk Watermelon Ade",
        description: "with cup of ice",
        price: 70,
        image: "/images/icetalk%20watermelon.png",
      },
      {
        id: "icetalk-passion-mango",
        name: "IceTalk Passion Mango Ade",
        description: "with cup of ice",
        price: 70,
        image: "/images/icetalk%20passion%20mango.png",
      },
    ],
  },
  {
    id: "bingsu",
    name: "Bingsu",
    hidden: true,
    description:
      "Real milk snow — Korean shaved ice made from real milk, not regular ice.",
    showcase: true,
    image: "/images/bingsu.png",
    showcaseNote:
      "Sorry, Bingsu isn't available for delivery — we don't want it to melt on the way to you! That said, if you're less than 5 minutes away, send us a message and we'll see if we can work something out.",
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

/** Menu with hidden categories/items filtered out. */
export const menu: MenuCategory[] = fullMenu
  .filter((category) => !category.hidden)
  .map((category) => ({
    ...category,
    items: category.items.filter((item) => !item.hidden),
  }))
  .filter((category) => category.items.length > 0);
