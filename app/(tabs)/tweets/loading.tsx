export default function Loading() {
	return (
		<div className="flex flex-col gap-5 p-5 animate-pulse">
			{[...Array(5)].map((_, index) => (
				<div key={index} className="flex gap-3">
					<div className="*:rounded-md">
						<div className="size-10 bg-neutral-700" />
					</div>
					<div className="flex flex-col gap-2 *:rounded-md">
						<div className="flex gap-2 *:rounded-md ">
							<div className="bg-neutral-700 h-5 w-24" />
							<div className="bg-neutral-700 h-5 w-24" />
						</div>
						<div className="bg-neutral-700 h-20 w-3/5" />
						<div className="flex gap-2 *:rounded-md">
							<div className="bg-neutral-700 size-5" />
							<div className="bg-neutral-700 size-5" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
