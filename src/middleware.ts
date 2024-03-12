import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    

    if (req.nextUrl.pathname.startsWith("/teacher") && (req.nextauth.token?.user.Role !== "Admin" || req.nextauth.token?.role !== "Teacher") )
      {
        return NextResponse.rewrite(
          new URL("/sign-in?message=You Are Not Authorized!", req.url)
        );
      }
    if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.user.Role !== "Student")
      {
        return NextResponse.rewrite(
          new URL("/sign-in?message=You Are Not Authorized!", req.url)
        );
      }
  },
  {
    pages: {
      signIn: "/sign-in",
      signOut: "/sign-in",
    },
  }
);
