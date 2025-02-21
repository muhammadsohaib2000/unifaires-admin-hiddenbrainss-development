import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import config from "@/app/utils/config";
import { getCookie, setCookie } from "cookies-next";

const protectedPaths: string[] = ["/dashboard"];
const nonPaths: string[] = ["/api/", "/_next/"];

/**
 * Get josn parse data
 */
const getJSONParse = (input1: any = "") => {
  try {
    return JSON.parse(input1);
  } catch (error) {
    return undefined;
  }
};

async function getUserRole(token: string, roleId: any) {
  try {
    const res = await fetch(`${config.API.API_URL}/roles/${roleId}`, {
      headers: {
        "x-token": token,
      },
    });

    const data = await res.json();
    return data?.data?.title;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;
    const token = await getToken({
      req: request,
      secret: process.env.JWT_KEY,
    });

    if (protectedPaths.some((path) => pathname.startsWith(path)) && !token) {
      return NextResponse.redirect(new URL("/login", request.url));
    } else if (
      protectedPaths.some((path) => pathname.startsWith(path)) &&
      token
    ) {
      const userRole = await getUserRole(
        token?.user?.token,
        token?.user?.roleId
      );

      if (userRole === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/403", request.url));
      }
    } else if (!nonPaths.some((path) => pathname.startsWith(path)) && token) {
      const userRole = await getUserRole(
        token?.user?.token,
        token?.user?.roleId
      );

      if (userRole === "admin") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      return NextResponse.redirect(new URL("/403", request.url));
    }

    const res = NextResponse.next();

    return res;
  } catch (error) {
    return NextResponse.error();
  }
}
