"use client";

import { Copy } from "lucide-react";
import { Button } from "./ui/button";

interface CopyToClipboardProps {
	href: string;
}

export default function CopyToClipboard({ href }: CopyToClipboardProps) {
	return (
		<Button
			variant={"outline"}
			onClick={() => navigator.clipboard.writeText(href)}
		>
			<Copy className="h-4 w-4" />
		</Button>
	);
}
