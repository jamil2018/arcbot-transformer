"use client";

import { Route } from "@/types/Navigation";
import {
  Link as PageLink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppNavbar({ routes }: { routes: Route[] }) {
  const currentPath = usePathname();
  return (
    <Navbar maxWidth="2xl" isBordered={true}>
      <NavbarBrand>
        <Link href="/" className="font-semibold tracking-wide text-2xl">
          // arcbot
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        {routes.map((route) => (
          <NavbarItem
            key={route.path}
            isActive={currentPath === route.path ? true : false}
          >
            <PageLink
              href={route.path}
              className="tracking-wide text-sm"
              color="foreground"
              as={Link}
            >
              {route.name}
            </PageLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
