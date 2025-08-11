import { MegamenuItem, NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";
import { Route } from "@/routers/types";
import __megamenu from "./jsons/__megamenu.json";

const otherPageChildMenus: NavItemType[] = [
  { id: ncNanoId(), href: "/blog", name: "Blog" },
  { id: ncNanoId(), href: "/about", name: "About" },
  { id: ncNanoId(), href: "/contact", name: "Contact us" },
  { id: ncNanoId(), href: "/login", name: "Login" },
  { id: ncNanoId(), href: "/signup", name: "Signup" },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
  },
  {
        id: ncNanoId(),
        href: "/listing-stay",
        name: "Stays",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-stay", name: "Stay" },
          {
            id: ncNanoId(),
            href: "/listing-stay-map",
            name: "Stay (map)",
          },
        ],
  },
  {
        id: ncNanoId(),
        href: "/listing-car",
        name: "Cars",
        type: "dropdown",
        children: [
          { id: ncNanoId(), href: "/listing-car", name: "Cars" },
          { id: ncNanoId(), href: "/listing-car-map", name: "Cars (map)" },
        ],
  },
  {
        id: ncNanoId(),
        href: "/listing-real-estate",
        name: "Hotels",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/listing-real-estate",
            name: "Hotels",
          },
          {
            id: ncNanoId(),
            href: "/listing-real-estate-map",
            name: "Hotels Maps",
          },
        ],
  },
  {
        id: ncNanoId(),
        href: "/listing-experiences",
        name: "Experiences",
        type: "dropdown",
        children: [
          {
            id: ncNanoId(),
            href: "/listing-experiences",
            name: "Experiences",
          },
          {
            id: ncNanoId(),
            href: "/listing-experiences-map",
            name: "Experiences (map)",
          },
        ],
  },
  {
    id: ncNanoId(),
    href: "/blog",
    name: "More",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];

export const NAVIGATION_DEMO_2: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/blog",
    name: "More",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
