import { notFound, redirect } from "next/navigation";

interface PageProps {
	params: Promise<{ slug: string }>;
}

async function fetchLongUrl(slug: string): Promise<string | null> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/shorten/${slug}`,
			{
				cache: "no-store",
			},
		);

		if (!response.ok) {
			return null;
		}

		const data = await response.json();
		return data.longUrl || null;
	} catch (error) {
		console.error("Error fetching long URL:", error);
		return null;
	}
}

export default async function RedirectPage({ params }: PageProps) {
	const { slug } = await params;

	const longUrl = await fetchLongUrl(slug);

	if (!longUrl) {
		notFound();
	}

	// Ensure URL has protocol
	const redirectUrl = longUrl.startsWith("http")
		? longUrl
		: `https://${longUrl}`;

	redirect(redirectUrl);
}
