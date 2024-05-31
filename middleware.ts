import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface IRoutes {
	[key: string]: boolean;
}

// object type이 array type보다 data 검색 / 반환 속도가 빠름
const publicOnlyUrls: IRoutes = {
	"/": true,
	"/login": true,
	"/create-account": true,
};

// 모든 rquest 마다 호출 됨
// middleware와 config는 예약어
export async function middleware(request: NextRequest) {
	const session = await getSession();
	const exists = publicOnlyUrls[request.nextUrl.pathname];
	// 세션 없음 > 로그인 안되어 있음
	if (!session.id) {
		if (!exists) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	} /* else {
		if (exists) {
			return NextResponse.redirect(new URL("/profile", request.url));
		}
	} */

	/* const pathname = request.nextUrl.pathname;
	if (pathname === "/") {
	} else if (pathname === "/profile") {
		return NextResponse.redirect(new URL("/", request.url));
		//return Response.json({ error: "You are not allowed here!" });
	} */
}

export const config = {
	// 경로를 일일이 지정하거나 특정 경로의 모든 url을 지정하거나 정규표현식으로 사용할 수 있음
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
	//matcher: ["/", "/profile", "/create-account"];
	//matcher: ["/user/:path*"] >>> user 경로의 모든 url이 대상이 됨
};
