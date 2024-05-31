export function formatToTimeAgo(date: string): string {
	const dayInMs = 1000 * 60 * 60;
	const time = new Date(date).getTime();
	const now = new Date().getTime();
	const diff = Math.round((time - now) / dayInMs);
	const formatter = new Intl.RelativeTimeFormat("en");

	if (Math.abs(diff) < 24) return formatter.format(diff, "hours");
	else return new Date(date).toLocaleDateString("ko-kr");
}
