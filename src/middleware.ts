import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  // Public routes are routes that don't require authentication
  publicRoutes: ["/"],
  async afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is logged in and trying to access the signup page, 
    // check if they already have a charity profile
    if (auth.userId && req.nextUrl.pathname === "/signup") {
      try {
        const userProfile = await prisma.userProfile.findUnique({
          where: { id: auth.userId },
          include: { charity: true },
        });

        // If they already have a profile, redirect to dashboard
        if (userProfile) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("Error checking user profile:", error);
      }
    }

    // If the user is logged in but doesn't have a charity profile
    // and they're not on the signup page, redirect them to signup
    if (auth.userId && req.nextUrl.pathname !== "/signup") {
      try {
        const userProfile = await prisma.userProfile.findUnique({
          where: { id: auth.userId },
        });

        if (!userProfile) {
          return NextResponse.redirect(new URL("/signup", req.url));
        }
      } catch (error) {
        console.error("Error checking user profile:", error);
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 