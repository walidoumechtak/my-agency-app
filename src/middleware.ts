import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth, req) => {
  // Protect all routes starting with /dashboard
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};