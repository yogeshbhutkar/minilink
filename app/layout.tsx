import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryClientProvider } from "@/components/react-query-client-provider";
import Navbar from "@/components/navbar";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const outfit = localFont({
	src: "../public/fonts/outfit.woff2",
	variable: "--font-outfit",
	display: "swap",
	preload: true,
});

export const metadata: Metadata = {
	title: "Minilink - A simple link shortener",
	description: "A simple and easy to use link shortener built with Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`antialiased ${outfit.variable}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Navbar />
					<ReactQueryClientProvider>
						{children}
					</ReactQueryClientProvider>
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
