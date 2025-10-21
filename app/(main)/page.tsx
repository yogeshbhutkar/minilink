"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import CopyToClipboard from "@/components/copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	const [inputUrl, setInputUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

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
		onSuccess: (data) => {
			setShortUrl(data.shortUrl);
		},
	});

	return (
		<main className="min-h-screen w-full items-center justify-center flex">
			<div className="w-full max-w-lg flex flex-col gap-4">
				<h1 className="text-3xl font-bold text-center">
					Minilink - A Simple URL Shortener
				</h1>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						mutate(inputUrl);
					}}
					className="flex gap-2 w-full"
				>
					<Input
						placeholder="Enter your long URL here"
						className="max-w-md mb-4 w-full"
						type="url"
						required
						value={inputUrl}
						onChange={(e) => setInputUrl(e.target.value)}
					/>
					<Button type="submit" isLoading={isPending}>
						Shorten ✨
					</Button>
				</form>
				<div className="bg-muted rounded-lg p-5 flex justify-between items-center">
					{shortUrl && (
						<>
							<a
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline"
							>
								{shortUrl}
							</a>
							<CopyToClipboard href={shortUrl} />
						</>
					)}
				</div>
			</div>
		</main>
	);
}
