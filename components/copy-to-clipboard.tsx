"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface CopyToClipboardProps {
	href: string;
}

export default function CopyToClipboard({ href }: CopyToClipboardProps) {
	return (
		<Button
			variant={"outline"}
			onClick={() => {
				navigator.clipboard.writeText(href);
				toast.success("Copied to clipboard!");
			}}
		>
			<span className="max-sm:inline sm:hidden">Copy</span>
			<Copy className="h-4 w-4" />
		</Button>
	);
}
