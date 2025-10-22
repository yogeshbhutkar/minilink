import GitHub from "@/icons/github";
import Logo from "@/icons/logo";
import { REPO_URL } from "@/lib/data";
import ThemeToggle from "./theme-toggle";

export default function Navbar() {
	return (
		<header className="bg-background/20 text-foreground/75 text-md sticky top-0 z-40 mb-10 w-full backdrop-blur-sm backdrop-filter max-sm:mb-4">
			<nav className="mx-auto flex h-16 items-center justify-between max-sm:px-6 sm:max-w-sm md:max-w-xl lg:max-w-2xl">
				<a href="/" className="flex items-center space-x-1.5">
					<Logo className="h-6 w-6 rounded-full p-0.5" />
					<span className="font-cursive font-semibold">Minilink</span>
				</a>
				<div className="flex items-center gap-x-2">
					<a href={REPO_URL} target="_blank" aria-label="GitHub">
						<GitHub height={16} width={16} />
					</a>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
