import { eq } from "drizzle-orm";
import { encodeId } from "@/app/api/lib/hashids";
import { db } from "@/app/db/drizzle";
import { urls } from "@/app/db/schema";

/**
 * Handles POST requests to the shorten route.
 *
 * @param {Request} request - The incoming request object.
 * @param {Response} response - The outgoing response object.
 *
 * @returns {Promise<void>} - A promise that returns the shortened URL.
 */
export async function POST(request: Request) {
	try {
		const { longUrl } = await request.json();

		// Check if the longUrl already exists.
		const existingRecord = await db
			.select()
			.from(urls)
			.where(eq(urls.longUrl, longUrl))
			.limit(1);

		if (existingRecord.length > 0) {
			const shortCode = existingRecord[0].shortCode;
			return new Response(
				JSON.stringify({
					shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const id = await db
			.insert(urls)
			.values({ longUrl, shortCode: "" })
			.returning({ id: urls.id });

		const shortCode = encodeId(id[0].id);
		await db.update(urls).set({ shortCode }).where(eq(urls.id, id[0].id));

		return new Response(
			JSON.stringify({
				shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
			}),
			{ status: 200, headers: { "Content-Type": "application/json" } },
		);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Unknown error";
		return new Response(JSON.stringify({ error: message }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
