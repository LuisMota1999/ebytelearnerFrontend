import { Session } from "inspector";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    User: User;
    AccessToken: string;
    Role: string;
  }
  interface User {
    id: string;
    Username: string;
    Email: string;
    PhoneNumber: string | null;
    ZipCode: string | null;
    NIF: string | null;
    Docn: string | null;
    Gender: string | null;
    Nationality: string | null;
    Active: boolean | null;
    Birthday: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    user: any;
  }
}
