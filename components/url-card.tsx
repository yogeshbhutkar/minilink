import { ExternalLink } from "lucide-react";
import Image from "next/image";
import CopyToClipboard from "@/components/copy-to-clipboard";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function UrlCard({
	shortUrl,
	ogData,
}: {
	shortUrl: string;
	// biome-ignore lint/suspicious/noExplicitAny: OG data is fetched from the backend.
	ogData: any;
}) {
	return !ogData ? (
		<Card>
			<CardContent className="flex justify-between">
				<a
					href={shortUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-500 underline"
				>
					{shortUrl}
				</a>
				<CopyToClipboard href={shortUrl} />
			</CardContent>
		</Card>
	) : (
		<Card>
			<CardHeader className="relative w-full h-48 overflow-hidden">
				{ogData.ogImage && (
					<Image
						src={ogData.ogImage.url}
						alt={ogData.ogTitle ?? "OG Image"}
						width={300}
						height={150}
						className="w-full object-cover rounded-md"
					/>
				)}
			</CardHeader>
			<CardContent>
				<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<div className="flex flex-col gap-2">
						<CardTitle className="flex gap-2">
							<a
								href={shortUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="decoration-blue-400 decoration-wavy decoration-2 underline-offset-2 hover:underline dark:decoration-blue-300"
							>
								{ogData.ogTitle ?? "Untitled"}
							</a>
							<ExternalLink className="h-4 w-4" />
						</CardTitle>
						<CardDescription>
							{ogData.ogDescription ?? "No description found."}
						</CardDescription>
					</div>
					<CopyToClipboard href={shortUrl} />
				</div>
			</CardContent>
		</Card>
	);
}
