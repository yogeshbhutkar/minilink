import { eq } from "drizzle-orm";
import { decodeId } from "@/app/api/lib/hashids";
import { db } from "@/app/db/drizzle";
import { urls } from "@/app/db/schema";

/**
 * Handles GET requests to redirect to the original long URL.
 *
 * @param {Object} params - The parameters object containing the slug.
 * @param {string} params.slug - The short code slug from the URL.
 *
 * @returns {Promise<Response>} - A promise that returns a redirect response or an error response.
 */
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	try {
		const { slug } = await params;

		const id = decodeId(slug);
		if (id === null) {
			return new Response(
				JSON.stringify({ error: "Invalid short URL" }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const urlRecord = await db
			.select()
			.from(urls)
			.where(eq(urls.id, id))
			.limit(1);

		if (urlRecord.length === 0) {
			return new Response(JSON.stringify({ error: "URL not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}

		const longUrl = urlRecord[0].longUrl;
		return new Response(JSON.stringify({ longUrl }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";

		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
