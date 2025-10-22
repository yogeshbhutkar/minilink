export default function Logo({
	width = 24,
	height = 24,
	...props
}: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Minilink Logo</title>
			<circle cx="12" cy="12" r="12" fill="url(#paint0_linear_1_3)" />
			<defs>
				<linearGradient
					id="paint0_linear_1_3"
					x1="12"
					y1="0"
					x2="12"
					y2="24"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#8E2DE2" />
					<stop offset="1" stopColor="#4A00E0" />
				</linearGradient>
			</defs>
		</svg>
	);
}
