// app/components/ThemeSwitcher.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ComputerIcon from "@mui/icons-material/Computer";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  let themeIcon: React.ReactNode;
  switch (theme) {
    case "light":
      themeIcon = <LightModeIcon />;
      break;
    case "dark":
      themeIcon = <DarkModeIcon />;
      break;
    case "system":
      themeIcon = <ComputerIcon />;
      break;
  }
  return (
    <>
      <div className="flex items-center gap-4 justify-end px-4 py-2">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly variant="flat">
              {themeIcon}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="light" onClick={() => setTheme("light")}>
              <LightModeIcon className="mr-2" />
              <span>Light</span>
            </DropdownItem>
            <DropdownItem
              key="dark"
              className="gap-2"
              onClick={() => setTheme("dark")}
            >
              <DarkModeIcon className="mr-2" />
              <span>Dark</span>
            </DropdownItem>
            <DropdownItem
              key="system"
              className="gap-2"
              onClick={() => setTheme("system")}
            >
              <ComputerIcon className="mr-2" />
              <span>System</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </>
  );
}
