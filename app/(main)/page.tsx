"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	const [inputUrl, setInputUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");

	const mutation = useMutation({
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
		<main>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					mutation.mutate(inputUrl);
				}}
			>
				<Input
					placeholder="Enter your long URL here"
					className="w-full max-w-md mb-4"
					type="url"
					value={inputUrl}
					onChange={(e) => setInputUrl(e.target.value)}
				/>
				<Button type="submit">Generate Link</Button>
			</form>
			{shortUrl && (
				<p className="mt-4">
					Your shortened URL:{" "}
					<a
						href={shortUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-blue-500 underline"
					>
						{shortUrl}
					</a>
				</p>
			)}
		</main>
	);
}
