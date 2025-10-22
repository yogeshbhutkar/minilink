"use client";

import { useMutation } from "@tanstack/react-query";
import { Rocket } from "lucide-react";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import UrlCard from "@/components/url-card";

export default function Home() {
	const [inputUrl, setInputUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	// biome-ignore lint/suspicious/noExplicitAny: OG data is fetched from the backend.
	const [ogData, setOgData] = useState<any>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: async (longUrl: string) => {
			const response = await fetch("/api/v1/shorten", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ longUrl }),
			});
			if (!response.ok) {
				throw new Error("Failed to shorten URL");
			}
			return response.json();
		},
		onMutate: () => {
			setShortUrl("");
			setOgData(null);
		},
		onSuccess: (data) => {
			setShortUrl(data.shortUrl);

			if (data.openGraphData.error) return;

			// ogImage property should be a direct url with http/https protocol, filter everything else.
			data.openGraphData.result.ogImage =
				data.openGraphData.result.ogImage.filter(
					(image: { url: string }) =>
						image.url.startsWith("http://") ||
						image.url.startsWith("https://"),
				)[0];
			setOgData(data.openGraphData.result);
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Unknown error",
				{
					description:
						"Please make sure the URL is valid and publicly accessible.",
				},
			);
		},
	});

	return (
		<main className="h-[70vh] w-full items-center justify-center flex max-sm:px-8">
			<div className="w-full max-w-lg flex flex-col gap-4 max-sm:gap-2">
				<h1 className="text-3xl max-sm:text-xl max-md:text-2xl max-sm:font-semibold font-bold text-center">
					Minilink - A Simple Link Shortener
				</h1>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						mutate(inputUrl);
					}}
					className="flex gap-2 w-full"
				>
					<div className="relative w-full mb-4">
						<Input
							placeholder="Enter your long URL here"
							className="w-full pr-28 h-12 rounded-xl"
							type="url"
							required
							value={inputUrl}
							onChange={(e) => setInputUrl(e.target.value)}
						/>
						<Button
							type="submit"
							isLoading={isPending}
							className="absolute right-2 top-1/2 -translate-y-1/2 h-8"
							size="sm"
						>
							Shorten <Rocket className="h-4 w-4" />
						</Button>
					</div>
				</form>

				{shortUrl && <UrlCard shortUrl={shortUrl} ogData={ogData} />}
			</div>
		</main>
	);
}
