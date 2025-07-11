import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "/",
      name: i.Country,
    })),
  },
];

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Online booking",
  },
  {
    id: ncNanoId(),
    href: "/home-2",
    name: "Real estate",
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/home-3",
    name: "Home 3",
    isNew: true,
  },
];

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog page" },
  { id: ncNanoId(), href: "/blog/single" as Route, name: "Blog single" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

const templatesChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/add-listing/1" as Route,
    name: "Add listing",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/add-listing/1" as Route,
        name: "Add listing 1",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/2" as Route,
        name: "Add listing 2",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/3" as Route,
        name: "Add listing 3",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/4" as Route,
        name: "Add listing 4",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/5" as Route,
        name: "Add listing 5",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/6" as Route,
        name: "Add listing 6",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/7" as Route,
        name: "Add listing 7",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/8" as Route,
        name: "Add listing 8",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/9" as Route,
        name: "Add listing 9",
      },
      {
        id: ncNanoId(),
        href: "/add-listing/10" as Route,
        name: "Add listing 10",
      },
    ],
  },
  //
  { id: ncNanoId(), href: "/checkout", name: "Checkout" },
  { id: ncNanoId(), href: "/pay-done", name: "Pay done" },
  //
  { id: ncNanoId(), href: "/author", name: "Author page" },
  { id: ncNanoId(), href: "/account", name: "Account page" },
  //
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Five columns",
    type: "megaMenu",
    megaMenu: megaMenuDemo,
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Listing Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/",
        name: "Stay listings",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/", name: "Stay page" },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Stay page (map)",
          },
          { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay Detail" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Experiences listings",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/",
            name: "Experiences page",
          },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Experiences page (map)",
          },
          {
            id: ncNanoId(),
            href: "/listing-stay-detail",
            name: "Experiences Detail",
          },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Cars listings",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/", name: "Cars page" },
          { id: ncNanoId(), href: "/listing-stay-map", name: "Cars page (map)" },
          { id: ncNanoId(), href: "/listing-stay-detail", name: "Car Detail" },
        ],
      },

      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Real Estate Listings",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/",
            name: "Real Estate Listings",
          },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Real Estate Maps",
          },
        ],
      },
      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Flights listings",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    type: "dropdown",
    children: demoChildMenus,
    isNew: true,
  },

  //
  {
    id: ncNanoId(),
    href: "/",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/", name: "Stay listings" },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Stay listings (map)",
      },
      { id: ncNanoId(), href: "/listing-stay-detail", name: "Stay detail" },

      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Experiences listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Experiences (map)",
      },
      {
        id: ncNanoId(),
        href: "/listing-stay-detail",
        name: "Experiences detail",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/",
    name: "Listing pages",
    children: [
      { id: ncNanoId(), href: "/", name: "Cars listings" },
      { id: ncNanoId(), href: "/listing-stay-map", name: "Cars listings (map)" },
      { id: ncNanoId(), href: "/listing-stay-detail", name: "Car detail" },

      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Real estate listings",
      },
      {
        id: ncNanoId(),
        href: "/listing-stay-map",
        name: "Real estate (map)",
      },
      //
      {
        id: ncNanoId(),
        href: "/",
        name: "Flights listings",
      },
    ],
  },

  //
  {
    id: ncNanoId(),
    href: "/author",
    name: "Templates",
    type: "dropdown",
    children: templatesChildrenMenus,
  },

  //
  {
    id: ncNanoId(),
    href: "/blog",
    name: "Other pages",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];


export const NAVIGATION_DATA: NavItemType[] = [
  {
    id: ncNanoId(),
    name: "Properties",
    children: [
      { id: ncNanoId(), href: "/", name: "All Properties" },
      { id: ncNanoId(), href: "/", name: "Luxury Homes" },
      { id: ncNanoId(), href: "/", name: "Apartments" },
      { id: ncNanoId(), href: "/", name: "Houses" },
      { id: ncNanoId(), href: "/", name: "Commercial Spaces" },
    ],
  },

  {
    id: ncNanoId(),
    name: "Marketplace",
    children: [
      { id: ncNanoId(), href: "/market-property", name: "Explore Properties" },
      { id: ncNanoId(), href: "/market-cars", name: "Explore Cars" },
      { id: ncNanoId(), href: "/auctions/live", name: "Live Auctions" },
    ],
  },

  {
    id: ncNanoId(),
    name: "Services",
    children: [
      { id: ncNanoId(), href: "/", name: "Property Management" },
      { id: ncNanoId(), href: "/", name: "Mortgage Services" },
      { id: ncNanoId(), href: "/", name: "Legal & Documentation" },
      { id: ncNanoId(), href: "/", name: "Interior Design" },
    ],
  },

  {
    id: ncNanoId(),
    name: "Agents",
    children: [
      { id: ncNanoId(), href: "/", name: "Our Agents" },
      { id: ncNanoId(), href: "/", name: "Top Rated Agents" },
    ],
  },

  {
    id: ncNanoId(),
    name: "Blog",
    type: "dropdown",
    children: [
      { id: ncNanoId(), href: "/blog", name: "All Articles" },
      { id: ncNanoId(), href: "/blog", name: "Buying Guide" },
      { id: ncNanoId(), href: "/blog", name: "Real Estate Investing" },
      { id: ncNanoId(), href: "/blog", name: "Home Improvement" },
      { id: ncNanoId(), href: "/blog", name: "Market News" },
    ],
  },

];

