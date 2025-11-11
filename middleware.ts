import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your Request with user's token.
  function middleware(req) {
    // This function runs IF the user is authenticated.
    // We can add extra logic here if needed.
    // For now, we just let it pass through.
    return NextResponse.next();
  },
  {
    // This configures the middleware's behavior
    callbacks: {
      authorized: ({ token }) => {
        // The token exists if the user is logged in
        return !!token;
      },
    },
    pages: {
      signIn: "/login", // Redirect to our dashboard login page
    },
  }
);

// This configures which routes the middleware will run on
export const config = {
  // We match all routes that start with /dashboard
  matcher: [
    "/dashboard/:path*",
  ],
};