"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
	const { setTheme } = useTheme();
	return (
		<Button
			id="theme-toggle"
			aria-label="Toggle theme"
			className="hover:bg-muted/15 cursor-pointer rounded-md p-2"
			variant="ghost"
			onClick={() =>
				setTheme((prevTheme) =>
					prevTheme === "light" ? "dark" : "light",
				)
			}
		>
			<Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
			<Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
		</Button>
	);
}
